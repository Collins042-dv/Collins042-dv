"use client";

import { useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { brand } from "@/config/brand";

export function ContactClient() {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-12 max-w-3xl">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Contact</p>
        <h1 className="mt-3 font-heading text-5xl">Speak with {brand.name}</h1>
        <p className="mt-5 text-sm leading-8 text-neutral-600">{brand.contactDescription}</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.05fr_0.95fr]">
        <form
          className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft"
          onSubmit={(event) => {
            event.preventDefault();
            setSubmitted(true);
          }}
        >
          <div className="grid gap-5 md:grid-cols-2">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Name</label>
              <Input required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Email</label>
              <Input type="email" required />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Message</label>
              <textarea className="min-h-[180px] w-full rounded-[1.5rem] border border-brand-beige px-4 py-3 text-sm outline-none focus:border-brand-gold" required />
            </div>
          </div>
          <Button className="mt-6">Send message</Button>
          {submitted ? <p className="mt-4 text-sm text-emerald-700">Thanks for reaching out. This contact form is currently stubbed and will be connected to a real inbox soon.</p> : null}
        </form>
        <div className="rounded-[2rem] bg-brand-black p-8 text-white shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-brand-champagne">Customer care</p>
          <h2 className="mt-3 font-heading text-4xl">Luxury support with a personal touch</h2>
          <div className="mt-8 space-y-6 text-sm text-white/80">
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Email</p>
              <p className="mt-2">{brand.email}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Phone</p>
              <p className="mt-2">{brand.phone}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">Location</p>
              <p className="mt-2">{brand.address}</p>
            </div>
            <div>
              <p className="text-xs uppercase tracking-[0.2em] text-white/50">WhatsApp</p>
              <a href={brand.social.whatsapp} className="mt-2 inline-flex text-brand-champagne">Start a conversation</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
