"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AccountShell } from "@/components/account/AccountShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { brand } from "@/config/brand";
import { useAuth } from "@/store/AuthContext";

export function ProfileClient() {
  const { user, loading, updateProfile } = useAuth();
  const router = useRouter();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/account/login");
    }
    if (user) {
      setName(user.name);
      setEmail(user.email);
    }
  }, [loading, router, user]);

  if (!user) {
    return <div className="px-6 py-20 text-center text-sm text-neutral-500">Loading profile...</div>;
  }

  return (
    <AccountShell title="Profile" description={`Update the personal details attached to your ${brand.name} account.`}>
      <form
        className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft"
        onSubmit={async (event) => {
          event.preventDefault();
          await updateProfile({ name, email });
          setMessage("Profile updated successfully.");
        }}
      >
        <div className="grid gap-5 md:grid-cols-2">
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Name</label>
            <Input value={name} onChange={(event) => setName(event.target.value)} required />
          </div>
          <div>
            <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Email</label>
            <Input type="email" value={email} onChange={(event) => setEmail(event.target.value)} required />
          </div>
        </div>
        {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
        <Button className="mt-6">Save changes</Button>
      </form>
    </AccountShell>
  );
}
