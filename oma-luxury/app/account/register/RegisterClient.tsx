"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { useAuth } from "@/store/AuthContext";

export function RegisterClient() {
  const { register, configured, configError } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");

  return (
    <div className="mx-auto max-w-xl px-6 py-20 lg:px-10">
      <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Create account</p>
        <h1 className="mt-3 font-heading text-5xl">Join the world of luxury</h1>
        <form
          className="mt-8 space-y-5"
          onSubmit={async (event) => {
            event.preventDefault();
            setLoading(true);
            setError("");
            setSuccess("");
            try {
              await register(name, email, password);
              setSuccess("Account created successfully. Redirecting to your account...");
              router.push("/account?welcome=1");
            } catch (err) {
              setError(err instanceof Error ? err.message : "Unable to create account.");
            } finally {
              setLoading(false);
            }
          }}
        >
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Full name</label>
            <Input value={name} onChange={(event) => setName(event.target.value)} required />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Email</label>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Password</label>
            <Input
              type="password"
              minLength={8}
              pattern="^(?=.*\d).{8,}$"
              value={password}
              onChange={(event) => setPassword(event.target.value)}
              required
            />
            <p className="mt-2 text-xs text-neutral-500">Use at least 8 characters and include 1 number.</p>
          </div>
          {!configured && configError ? <p className="text-sm text-amber-700">{configError}</p> : null}
          {error ? <p className="text-sm text-red-600">{error}</p> : null}
          {success ? <p className="text-sm text-emerald-700">{success}</p> : null}
          <Button className="w-full" disabled={loading || !configured}>{loading ? "Creating account..." : "Create Account"}</Button>
        </form>
        <p className="mt-6 text-sm text-neutral-600">
          Already have an account? <Link href="/account/login" className="text-brand-black underline-offset-4 hover:underline">Sign in</Link>
        </p>
      </div>
    </div>
  );
}
