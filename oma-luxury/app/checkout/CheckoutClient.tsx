"use client";

import { useMemo, useState } from "react";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";
import { brand } from "@/config/brand";
import { nigeriaStates } from "@/data/nigeriaStates";
import { initiatePayment } from "@/services/payments";
import { createOrder } from "@/services/orders";
import { useAuth } from "@/store/AuthContext";
import { useCart } from "@/store/CartContext";
import { formatCurrency } from "@/lib/utils";

export function CheckoutClient() {
  const { items, subtotal, clearCart } = useCart();
  const { user } = useAuth();
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState<{ orderId: string; reference: string } | null>(null);
  const [form, setForm] = useState({
    fullName: user?.name ?? "",
    email: user?.email ?? "",
    phone: "",
    address: "",
    city: "",
    state: "Lagos",
    country: "Nigeria",
  });

  const total = useMemo(() => subtotal, [subtotal]);

  const handleChange = (key: keyof typeof form, value: string) => setForm((current) => ({ ...current, [key]: value }));

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (!items.length) {
      return;
    }
    setSubmitting(true);
    try {
      const order = await createOrder({
        items,
        subtotal,
        total,
        customer: { ...form, userId: user?.id },
      });
      const payment = await initiatePayment({
        orderId: order.id,
        amount: total,
        email: form.email,
      });
      clearCart();
      setSuccess({ orderId: order.id, reference: payment.reference });
    } finally {
      setSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 lg:px-10">
        <div className="rounded-[2rem] border border-black/5 bg-white p-10 text-center shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Order confirmed</p>
          <h1 className="mt-4 font-heading text-5xl">Thank you for shopping {brand.name}</h1>
          <p className="mt-6 text-sm leading-8 text-neutral-600">
            Your order <span className="font-semibold text-brand-black">{success.orderId}</span> has been created. Payment provider is being configured — you will be contacted to confirm payment.
          </p>
          <p className="mt-4 text-sm text-neutral-500">Reference: {success.reference}</p>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Checkout</p>
        <h1 className="mt-3 font-heading text-5xl">Secure your luxury edit</h1>
      </div>
      <div className="grid gap-8 lg:grid-cols-[1.1fr_0.9fr]">
        <form onSubmit={handleSubmit} className="space-y-5 rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
          <div className="grid gap-5 md:grid-cols-2">
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Full name</label>
              <Input value={form.fullName} onChange={(event) => handleChange("fullName", event.target.value)} required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Email</label>
              <Input type="email" value={form.email} onChange={(event) => handleChange("email", event.target.value)} required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Phone</label>
              <Input value={form.phone} onChange={(event) => handleChange("phone", event.target.value)} required />
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Delivery address</label>
              <Input value={form.address} onChange={(event) => handleChange("address", event.target.value)} required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">City</label>
              <Input value={form.city} onChange={(event) => handleChange("city", event.target.value)} required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">State</label>
              <select value={form.state} onChange={(event) => handleChange("state", event.target.value)} className="w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm" required>
                {nigeriaStates.map((state) => (
                  <option key={state} value={state}>{state}</option>
                ))}
              </select>
            </div>
            <div className="md:col-span-2">
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Country</label>
              <Input value={form.country} onChange={(event) => handleChange("country", event.target.value)} required />
            </div>
          </div>
          <Button className="w-full" disabled={submitting || !items.length}>
            {submitting ? "Creating order..." : "Place order"}
          </Button>
        </form>

        <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft lg:sticky lg:top-28 lg:self-start">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Order summary</p>
          <h2 className="mt-3 font-heading text-4xl">Your order</h2>
          <div className="mt-8 space-y-4">
            {items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex items-start justify-between gap-4 border-b border-black/5 pb-4 last:border-none">
                <div>
                  <p className="font-medium text-brand-black">{item.product.name}</p>
                  <p className="text-sm text-neutral-500">Qty {item.quantity} {item.selectedSize ? `• ${item.selectedSize}` : ""} {item.selectedColor ? `• ${item.selectedColor}` : ""}</p>
                </div>
                <p className="text-sm font-medium text-brand-black">{formatCurrency((item.product.salePrice ?? item.product.price) * item.quantity)}</p>
              </div>
            ))}
          </div>
          <div className="mt-8 space-y-4 text-sm text-neutral-600">
            <div className="flex items-center justify-between"><span>Subtotal</span><span className="font-medium text-brand-black">{formatCurrency(subtotal)}</span></div>
            <div className="flex items-center justify-between"><span>Delivery fee</span><span className="font-medium text-brand-black">To be confirmed</span></div>
            <div className="flex items-center justify-between border-t border-black/5 pt-4 text-base font-semibold text-brand-black"><span>Total</span><span>{formatCurrency(total)}</span></div>
          </div>
        </div>
      </div>
    </div>
  );
}
