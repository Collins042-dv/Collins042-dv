import type { User } from "@supabase/supabase-js";
import { AUTH_CONFIGURATION_MESSAGE, isAuthConfigured } from "@/lib/auth-config";
import { createServerComponentSupabaseClient } from "@/lib/supabase/server";
import type { AuthUser, UserRole } from "@/services/auth";

export interface ProfileRecord {
  id: string;
  email: string;
  name: string;
  role: UserRole;
}

function profileConfigurationError() {
  return new Error("Supabase profiles table is not configured. Create the `profiles` table and policies from the README.");
}

export function mapAuthErrorMessage(message: string | undefined) {
  const normalized = message?.toLowerCase() ?? "";

  if (
    normalized.includes("already registered") ||
    normalized.includes("already exists") ||
    normalized.includes("duplicate")
  ) {
    return "An account with this email already exists.";
  }

  if (normalized.includes("invalid login credentials")) {
    return "Invalid credentials.";
  }

  if (normalized.includes("email not confirmed")) {
    return "Email verification is required before signing in.";
  }

  return message || "Authentication failed.";
}

export function buildAuthUser(user: User, profile?: Partial<ProfileRecord> | null): AuthUser {
  return {
    id: user.id,
    name:
      profile?.name ||
      (typeof user.user_metadata.name === "string" ? user.user_metadata.name : "") ||
      (typeof user.user_metadata.full_name === "string" ? user.user_metadata.full_name : "") ||
      user.email?.split("@")[0] ||
      "Customer",
    email: profile?.email || user.email || "",
    role: (profile?.role as UserRole | undefined) || "CUSTOMER",
  };
}

export async function getProfileByUserId(
  supabase: ReturnType<typeof createServerComponentSupabaseClient>,
  userId: string,
) {
  const { data, error } = await supabase
    .from("profiles")
    .select("id, email, name, role")
    .eq("id", userId)
    .maybeSingle();

  if (error) {
    throw profileConfigurationError();
  }

  return (data as ProfileRecord | null) ?? null;
}

export async function upsertProfile(
  supabase: ReturnType<typeof createServerComponentSupabaseClient>,
  profile: ProfileRecord,
) {
  const { error } = await supabase.from("profiles").upsert(profile, { onConflict: "id" });

  if (error) {
    throw profileConfigurationError();
  }

  return profile;
}

export async function getServerAuthState() {
  if (!isAuthConfigured()) {
    return {
      configured: false,
      error: AUTH_CONFIGURATION_MESSAGE,
      user: null as AuthUser | null,
    };
  }

  const supabase = createServerComponentSupabaseClient();
  const {
    data: { user },
    error,
  } = await supabase.auth.getUser();

  if (error) {
    return {
      configured: true,
      error: mapAuthErrorMessage(error.message),
      user: null as AuthUser | null,
    };
  }

  if (!user) {
    return {
      configured: true,
      error: null,
      user: null as AuthUser | null,
    };
  }

  const profile = await getProfileByUserId(supabase, user.id).catch(() => null);

  return {
    configured: true,
    error: null,
    user: buildAuthUser(user, profile),
  };
}
