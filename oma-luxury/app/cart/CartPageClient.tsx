"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/Button";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/store/CartContext";

export function CartPageClient() {
  const { items, subtotal, removeFromCart, updateQuantity } = useCart();

  if (!items.length) {
    return (
      <div className="mx-auto max-w-3xl px-6 py-20 text-center lg:px-10">
        <div className="rounded-[2rem] border border-dashed border-brand-beige bg-white p-12 shadow-soft">
          <h1 className="font-heading text-5xl">Your bag is waiting</h1>
          <p className="mt-4 text-sm leading-8 text-neutral-600">Explore our latest edit of premium women's fashion, bags and fragrances.</p>
          <Link href="/shop" className="mt-8 inline-flex rounded-full bg-brand-black px-6 py-3 text-sm uppercase tracking-[0.22em] text-white">
            Continue shopping
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto grid max-w-7xl gap-8 px-6 py-16 lg:grid-cols-[1.2fr_0.8fr] lg:px-10">
      <div>
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Bag</p>
        <h1 className="mt-3 font-heading text-5xl">Your curated selection</h1>
        <div className="mt-8 space-y-5">
          {items.map((item) => (
            <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="grid gap-4 rounded-[2rem] border border-black/5 bg-white p-4 shadow-soft sm:grid-cols-[120px_1fr_auto] sm:items-center">
              <div className="relative aspect-[4/5] overflow-hidden rounded-2xl bg-brand-cream">
                <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="120px" />
              </div>
              <div>
                <p className="font-heading text-3xl text-brand-black">{item.product.name}</p>
                <p className="mt-2 text-sm text-neutral-500">{[item.selectedSize, item.selectedColor].filter(Boolean).join(" • ") || "Standard selection"}</p>
                <p className="mt-3 text-sm font-semibold text-brand-black">Unit price: {formatCurrency(item.product.salePrice ?? item.product.price)}</p>
              </div>
              <div className="space-y-3 sm:text-right">
                <div className="flex items-center gap-2 sm:justify-end">
                  <button className="h-10 w-10 rounded-full border border-brand-beige" onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}>−</button>
                  <span className="w-8 text-center text-sm">{item.quantity}</span>
                  <button className="h-10 w-10 rounded-full border border-brand-beige" onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}>+</button>
                </div>
                <p className="text-sm font-semibold text-brand-black">{formatCurrency((item.product.salePrice ?? item.product.price) * item.quantity)}</p>
                <button className="text-xs uppercase tracking-[0.2em] text-neutral-500" onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}>Remove</button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="lg:sticky lg:top-28 lg:self-start">
        <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Summary</p>
          <h2 className="mt-3 font-heading text-4xl">Order total</h2>
          <div className="mt-8 space-y-4 text-sm text-neutral-600">
            <div className="flex items-center justify-between">
              <span>Subtotal</span>
              <span className="font-medium text-brand-black">{formatCurrency(subtotal)}</span>
            </div>
            <div className="flex items-center justify-between">
              <span>Delivery</span>
              <span className="font-medium text-brand-black">Calculated at checkout</span>
            </div>
            <div className="flex items-center justify-between border-t border-black/5 pt-4 text-base font-semibold text-brand-black">
              <span>Total</span>
              <span>{formatCurrency(subtotal)}</span>
            </div>
          </div>
          <Link href="/checkout" className="mt-8 block">
            <Button className="w-full">Proceed to checkout</Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
