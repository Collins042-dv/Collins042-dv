"use client";

import { createContext, useContext, useEffect, useMemo, useState } from "react";
import {
  authIsConfigured,
  getAuthConfigurationError,
  getCurrentUser,
  login as loginService,
  logout as logoutService,
  register as registerService,
  resetPassword as resetPasswordService,
  updateCurrentUser,
  type AuthUser,
} from "@/services/auth";

interface AuthContextValue {
  user: AuthUser | null;
  loading: boolean;
  configured: boolean;
  configError: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  resetPassword: (email: string) => Promise<void>;
  updateProfile: (data: Partial<AuthUser>) => Promise<void>;
}

const AuthContext = createContext<AuthContextValue | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [loading, setLoading] = useState(true);
  const configured = authIsConfigured();
  const configError = configured ? null : getAuthConfigurationError();

  useEffect(() => {
    if (!configured) {
      setLoading(false);
      return;
    }

    getCurrentUser()
      .then(setUser)
      .finally(() => setLoading(false));
  }, [configured]);

  const login = async (email: string, password: string) => {
    const authUser = await loginService(email, password);
    setUser(authUser);
  };

  const register = async (name: string, email: string, password: string) => {
    const authUser = await registerService(name, email, password);
    setUser(authUser);
  };

  const logout = async () => {
    await logoutService();
    setUser(null);
  };

  const resetPassword = async (email: string) => {
    await resetPasswordService(email);
  };

  const updateProfile = async (data: Partial<AuthUser>) => {
    const authUser = await updateCurrentUser(data);
    setUser(authUser);
  };

  const value = useMemo(
    () => ({ user, loading, configured, configError, login, register, logout, resetPassword, updateProfile }),
    [configError, configured, user, loading],
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within AuthProvider");
  }
  return context;
}
