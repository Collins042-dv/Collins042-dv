"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/Button";
import { brand } from "@/config/brand";
import { formatCurrency } from "@/lib/utils";
import { useCart } from "@/store/CartContext";

export function CartDrawer() {
  const { items, subtotal, isCartOpen, closeCart, updateQuantity, removeFromCart } = useCart();
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);

  useEffect(() => {
    if (!isCartOpen) {
      return;
    }
    closeButtonRef.current?.focus();
    document.body.style.overflow = "hidden";
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        closeCart();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [isCartOpen, closeCart]);

  return (
    <div className={`fixed inset-0 z-[80] ${isCartOpen ? "pointer-events-auto" : "pointer-events-none"}`}>
      <button
        aria-label="Close cart drawer"
        onClick={closeCart}
        className={`absolute inset-0 bg-black/50 transition ${isCartOpen ? "opacity-100" : "opacity-0"}`}
      />
      <aside
        role="dialog"
        aria-modal="true"
        aria-labelledby="cart-drawer-title"
        className={`absolute right-0 top-0 flex h-full w-full max-w-md flex-col bg-white shadow-2xl transition duration-300 ${isCartOpen ? "translate-x-0" : "translate-x-full"}`}
      >
        <div className="flex items-center justify-between border-b border-black/5 px-6 py-5">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Your bag</p>
            <h2 id="cart-drawer-title" className="mt-2 font-heading text-2xl text-brand-black">
              Cart Summary
            </h2>
          </div>
          <button ref={closeButtonRef} onClick={closeCart} className="rounded-full border border-brand-beige p-2">
            ✕
          </button>
        </div>

        <div className="flex-1 space-y-4 overflow-y-auto px-6 py-5">
          {items.length ? (
            items.map((item) => (
              <div key={`${item.product.id}-${item.selectedSize}-${item.selectedColor}`} className="flex gap-4 rounded-3xl border border-black/5 p-3">
                <div className="relative h-24 w-20 flex-none overflow-hidden rounded-2xl bg-brand-cream">
                  <Image src={item.product.images[0]} alt={item.product.name} fill className="object-cover" sizes="80px" />
                </div>
                <div className="flex flex-1 flex-col justify-between gap-3">
                  <div>
                    <p className="font-medium text-brand-black">{item.product.name}</p>
                    <p className="text-xs text-neutral-500">
                      {[item.selectedSize, item.selectedColor].filter(Boolean).join(" • ") || "Standard selection"}
                    </p>
                    <p className="mt-2 text-sm text-brand-black">{formatCurrency(item.product.salePrice ?? item.product.price)}</p>
                  </div>
                  <div className="flex items-center justify-between gap-3">
                    <div className="flex items-center gap-2">
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity - 1, item.selectedSize, item.selectedColor)}
                        className="h-8 w-8 rounded-full border border-brand-beige"
                      >
                        −
                      </button>
                      <span className="text-sm">{item.quantity}</span>
                      <button
                        type="button"
                        onClick={() => updateQuantity(item.product.id, item.quantity + 1, item.selectedSize, item.selectedColor)}
                        className="h-8 w-8 rounded-full border border-brand-beige"
                      >
                        +
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeFromCart(item.product.id, item.selectedSize, item.selectedColor)}
                      className="text-xs uppercase tracking-[0.2em] text-neutral-500"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))
          ) : (
            <div className="flex h-full flex-col items-center justify-center rounded-[2rem] border border-dashed border-brand-beige bg-brand-ivory p-8 text-center">
              <h3 className="font-heading text-3xl text-brand-black">Your bag is empty</h3>
              <p className="mt-3 text-sm leading-7 text-neutral-600">Add curated pieces from {brand.name} to begin your edit.</p>
              <Link href="/shop" onClick={closeCart} className="mt-6 inline-flex rounded-full bg-brand-black px-6 py-3 text-sm uppercase tracking-[0.2em] text-white">
                Shop now
              </Link>
            </div>
          )}
        </div>

        <div className="border-t border-black/5 px-6 py-5">
          <div className="mb-4 flex items-center justify-between text-sm text-neutral-600">
            <span>Subtotal</span>
            <span className="font-medium text-brand-black">{formatCurrency(subtotal)}</span>
          </div>
          <p className="mb-5 text-xs uppercase tracking-[0.2em] text-neutral-500">Delivery is calculated at checkout</p>
          <div className="space-y-3">
            <Link href="/cart" onClick={closeCart} className="block">
              <Button variant="secondary" className="w-full">View cart</Button>
            </Link>
            <Link href="/checkout" onClick={closeCart} className="block">
              <Button className="w-full" disabled={!items.length}>Checkout</Button>
            </Link>
          </div>
        </div>
      </aside>
    </div>
  );
}
