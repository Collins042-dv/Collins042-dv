export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: UserRole;
}

import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import {
  validateLoginInput,
  validatePassword,
  validatePasswordResetInput,
  validateProfileInput,
  validateRegistrationInput,
} from "@/lib/auth-validation";

export type UserRole = "CUSTOMER" | "ADMIN";

interface AuthResponse {
  user: AuthUser | null;
}

function assertAuthConfigured() {
  if (!isAuthConfigured()) {
    throw new Error(AUTH_CONFIGURATION_MESSAGE);
  }
}

async function requestAuth<T>(input: string, init?: RequestInit): Promise<T> {
  const response = await fetch(input, {
    ...init,
    cache: "no-store",
    headers: {
      "Content-Type": "application/json",
      ...(init?.headers ?? {}),
    },
  });

  const payload = (await response.json().catch(() => null)) as { error?: string } | null;

  if (!response.ok) {
    throw new Error(payload?.error || "Authentication request failed.");
  }

  return payload as T;
}

export function authIsConfigured() {
  return isAuthConfigured();
}

export function getAuthConfigurationError() {
  return AUTH_CONFIGURATION_MESSAGE;
}

export async function register(name: string, email: string, password: string): Promise<AuthUser> {
  assertAuthConfigured();
  validateRegistrationInput(name, email, password);
  const response = await requestAuth<AuthResponse>("/api/auth/register", {
    method: "POST",
    body: JSON.stringify({ name, email, password }),
  });

  if (!response.user) {
    throw new Error("Unable to create account.");
  }

  return response.user;
}

export async function login(email: string, password: string): Promise<AuthUser> {
  assertAuthConfigured();
  validateLoginInput(email, password);
  const response = await requestAuth<AuthResponse>("/api/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });

  if (!response.user) {
    throw new Error("Invalid credentials.");
  }

  return response.user;
}

export async function logout(): Promise<void> {
  if (!isAuthConfigured()) {
    return;
  }

  await requestAuth("/api/auth/logout", { method: "POST" });
}

export async function resetPassword(email: string): Promise<void> {
  assertAuthConfigured();
  validatePasswordResetInput(email);
  await requestAuth("/api/auth/reset-password", {
    method: "POST",
    body: JSON.stringify({ email }),
  });
}

export async function updatePassword(password: string): Promise<void> {
  assertAuthConfigured();
  validatePassword(password);
  await requestAuth("/api/auth/update-password", {
    method: "POST",
    body: JSON.stringify({ password }),
  });
}

export async function getCurrentUser(): Promise<AuthUser | null> {
  if (!isAuthConfigured()) {
    return null;
  }

  try {
    const response = await requestAuth<AuthResponse>("/api/auth/me");
    return response.user;
  } catch (error) {
    if (error instanceof Error && error.message === "Authentication request failed.") {
      return null;
    }
    throw error;
  }
}

export async function updateCurrentUser(data: Partial<AuthUser>): Promise<AuthUser> {
  assertAuthConfigured();
  validateProfileInput(data.name ?? "", data.email ?? "");
  const response = await requestAuth<AuthResponse>("/api/auth/profile", {
    method: "PATCH",
    body: JSON.stringify(data),
  });

  if (!response.user) {
    throw new Error("Unable to update profile.");
  }

  return response.user;
}
