"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

export function ForgotPasswordClient() {
  const [email, setEmail] = useState("");
  const [sent, setSent] = useState(false);

  return (
    <div className="mx-auto max-w-xl px-6 py-20 lg:px-10">
      <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Password reset</p>
        <h1 className="mt-3 font-heading text-5xl">Forgot your password?</h1>
        <p className="mt-4 text-sm leading-7 text-neutral-600">This is a stubbed flow for now. Submit your email and we'll display a confirmation message.</p>
        <form className="mt-8 space-y-5" onSubmit={(event) => { event.preventDefault(); setSent(true); }}>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Email</label>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
          <Button className="w-full">Send reset link</Button>
        </form>
        {sent ? <p className="mt-4 text-sm text-emerald-700">If an account exists, a reset link has been sent to {email}.</p> : null}
      </div>
    </div>
  );
}
