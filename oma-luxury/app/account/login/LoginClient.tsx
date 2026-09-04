"use client";

import Link from "next/link";
import { useRouter, useSearchParams } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/store/AuthContext";

export function LoginClient() {
  const { login, configured, configError } = useAuth();
  const router = useRouter();
  const searchParams = useSearchParams();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const nextPath = searchParams.get("next") || "/account";

  return (
    <div className="mx-auto max-w-xl px-6 py-20 lg:px-10">
      <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Sign in</p>
        <h1 className="mt-3 font-heading text-5xl">Welcome back</h1>
        <form
          className="mt-8 space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            setError("");
            try {
              await login(email, password);
              router.push(nextPath);
            } catch (err) {
              setError(err instanceof Error ? err.message : "Unable to sign in.");
            } finally {
              setLoading(false);
            }
          }}
        >
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Email</label>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Password</label>
            <Input type="password" minLength={8} value={password} onChange={(event) => setPassword(event.target.value)} required />
          </div>
          {!configured && configError ? <p className="text-sm text-amber-700">{configError}</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          <Button className="w-full" disabled={loading || !configured}>{loading ? "Signing in..." : "Sign in"}</Button>
        </form>
        <div className="mt-6 flex flex-col gap-3 text-sm text-neutral-600 sm:flex-row sm:justify-between">
          <Link href="/account/register" className="hover:text-brand-black">Create account</Link>
          <Link href="/account/forgot-password" className="hover:text-brand-black">Forgot password?</Link>
        </div>
      </div>
    </div>
  );
}
