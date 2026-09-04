"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { getAuthConfigurationError } from "@/services/auth";
import { useAuth } from "@/store/AuthContext";

function getRecoveryTokens() {
  if (typeof window === "undefined") {
    return null;
  }

  const hashParams = new URLSearchParams(window.location.hash.replace(/^#/, ""));
  const queryParams = new URLSearchParams(window.location.search);
  const accessToken = hashParams.get("access_token") || queryParams.get("access_token");
  const refreshToken = hashParams.get("refresh_token") || queryParams.get("refresh_token");

  if (!accessToken || !refreshToken) {
    return null;
  }

  return { accessToken, refreshToken };
}

export function ResetPasswordClient() {
  const { configured, configError, updatePassword } = useAuth();
  const router = useRouter();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [recoveryReady, setRecoveryReady] = useState(false);
  const [recoveryError, setRecoveryError] = useState("");
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState("");

  useEffect(() => {
    if (!configured) {
      setRecoveryError(configError || getAuthConfigurationError());
      setLoading(false);
      return;
    }

    const tokens = getRecoveryTokens();

    if (!tokens) {
      setRecoveryError("Open this page from the password reset email to continue.");
      setLoading(false);
      return;
    }

    fetch("/api/auth/recovery", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(tokens),
    })
      .then(async (response) => {
        const payload = (await response.json().catch(() => null)) as { error?: string } | null;

        if (!response.ok) {
          throw new Error(payload?.error || "Unable to verify the recovery session.");
        }

        window.history.replaceState(null, "", "/account/reset-password");
        setRecoveryReady(true);
      })
      .catch((error: unknown) => {
        setRecoveryError(error instanceof Error ? error.message : "Unable to verify the recovery session.");
      })
      .finally(() => setLoading(false));
  }, [configError, configured]);

  return (
    <div className="mx-auto max-w-xl px-6 py-20 lg:px-10">
      <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Reset password</p>
        <h1 className="mt-3 font-heading text-5xl">Choose a new password</h1>
        <p className="mt-4 text-sm leading-7 text-neutral-600">
          Use at least 8 characters and include 1 number to secure your account.
        </p>

        {loading ? <p className="mt-8 text-sm text-neutral-500">Verifying reset link...</p> : null}
        {!loading && recoveryError ? <p className="mt-8 text-sm text-red-600">{recoveryError}</p> : null}

        {!loading && recoveryReady ? (
          <form
            className="mt-8 space-y-5"
            onSubmit={async (event) => {
              event.preventDefault();
              setRecoveryError("");
              setSuccess("");

              if (password !== confirmPassword) {
                setRecoveryError("Passwords do not match.");
                return;
              }

              setSubmitting(true);

              try {
                await updatePassword(password);
                setSuccess("Password updated successfully. Redirecting to sign in...");
                window.setTimeout(() => {
                  router.push("/account/login");
                }, 1200);
              } catch (error) {
                setRecoveryError(error instanceof Error ? error.message : "Unable to update password.");
              } finally {
                setSubmitting(false);
              }
            }}
          >
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">New password</label>
              <Input
                type="password"
                minLength={8}
                pattern="^(?=.*\\d).{8,}$"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                required
              />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Confirm password</label>
              <Input
                type="password"
                minLength={8}
                pattern="^(?=.*\\d).{8,}$"
                value={confirmPassword}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required
              />
            </div>
            {recoveryError ? <p className="text-sm text-red-600">{recoveryError}</p> : null}
            {success ? <p className="text-sm text-emerald-700">{success}</p> : null}
            <Button className="w-full" disabled={submitting}>
              {submitting ? "Updating password..." : "Update password"}
            </Button>
          </form>
        ) : null}

        {!recoveryReady ? (
          <div className="mt-8 text-sm text-neutral-600">
            Need another link?{" "}
            <Link href="/account/forgot-password" className="text-brand-black underline-offset-4 hover:underline">
              Request a new reset email
            </Link>
          </div>
        ) : null}
      </div>
    </div>
  );
}
