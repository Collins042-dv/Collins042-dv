"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";
import { AccountShell } from "@/components/account/AccountShell";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { nigeriaStates } from "@/data/nigeriaStates";
import { useAuth } from "@/store/AuthContext";

interface SavedAddress {
  id: string;
  label: string;
  address: string;
  city: string;
  state: string;
}

export function AddressesClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [addresses, setAddresses] = useState<SavedAddress[]>([]);
  const [form, setForm] = useState({ label: "Home", address: "", city: "", state: "Lagos" });
  const storageKey = useMemo(() => `oma-luxury-addresses-${user?.id ?? 'guest'}`, [user?.id]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/account/login");
    }
  }, [loading, router, user]);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const raw = window.localStorage.getItem(storageKey);
    setAddresses(raw ? JSON.parse(raw) : []);
  }, [storageKey]);

  const saveAddresses = (next: SavedAddress[]) => {
    setAddresses(next);
    window.localStorage.setItem(storageKey, JSON.stringify(next));
  };

  if (!user) {
    return <div className="px-6 py-20 text-center text-sm text-neutral-500">Loading addresses...</div>;
  }

  return (
    <AccountShell title="Addresses" description="Save your preferred delivery locations for a faster checkout experience.">
      <div className="grid gap-6 lg:grid-cols-[1fr_0.9fr]">
        <div className="space-y-4 rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
          {addresses.length ? addresses.map((address) => (
            <div key={address.id} className="rounded-[1.5rem] border border-brand-beige p-5">
              <div className="flex items-center justify-between gap-4">
                <h2 className="font-heading text-2xl">{address.label}</h2>
                <button className="text-xs uppercase tracking-[0.2em] text-neutral-500" onClick={() => saveAddresses(addresses.filter((item) => item.id !== address.id))}>Remove</button>
              </div>
              <p className="mt-3 text-sm leading-7 text-neutral-600">{address.address}<br />{address.city}, {address.state}</p>
            </div>
          )) : <p className="text-sm text-neutral-500">No saved addresses yet.</p>}
        </div>
        <form
          className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft"
          onSubmit={(event) => {
            event.preventDefault();
            const next = [{ id: crypto.randomUUID(), ...form }, ...addresses];
            saveAddresses(next);
            setForm({ label: "Home", address: "", city: "", state: "Lagos" });
          }}
        >
          <h2 className="font-heading text-3xl">Add address</h2>
          <div className="mt-6 space-y-5">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Label</label>
              <Input value={form.label} onChange={(event) => setForm((current) => ({ ...current, label: event.target.value }))} required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Address</label>
              <Input value={form.address} onChange={(event) => setForm((current) => ({ ...current, address: event.target.value }))} required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">City</label>
              <Input value={form.city} onChange={(event) => setForm((current) => ({ ...current, city: event.target.value }))} required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">State</label>
              <select value={form.state} onChange={(event) => setForm((current) => ({ ...current, state: event.target.value }))} className="w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm">
                {nigeriaStates.map((state) => <option key={state} value={state}>{state}</option>)}
              </select>
            </div>
          </div>
          <Button className="mt-6">Save address</Button>
        </form>
      </div>
    </AccountShell>
  );
}
