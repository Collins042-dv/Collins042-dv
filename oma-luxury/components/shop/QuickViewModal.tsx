"use client";

import Image from "next/image";
import { useEffect, useMemo, useRef, useState } from "react";
import type { Product } from "@/data/products";
import { Button } from "@/components/ui/Button";
import { Badge } from "@/components/ui/Badge";
import { colorSwatches, formatCurrency } from "@/lib/utils";
import { useCart } from "@/store/CartContext";

interface QuickViewModalProps {
  product: Product;
  open: boolean;
  onClose: () => void;
}

export function QuickViewModal({ product, open, onClose }: QuickViewModalProps) {
  const closeButtonRef = useRef<HTMLButtonElement | null>(null);
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);

  useEffect(() => {
    if (!open) {
      return;
    }
    closeButtonRef.current?.focus();
    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        onClose();
      }
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", handleEscape);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", handleEscape);
    };
  }, [open, onClose]);

  useEffect(() => {
    setSelectedSize(product.sizes?.[0]);
    setSelectedColor(product.colors?.[0]);
    setQuantity(1);
  }, [product]);

  const actionDisabled = useMemo(
    () => product.status === "SOLD_OUT" || product.status === "COMING_SOON",
    [product.status],
  );

  if (!open) {
    return null;
  }

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <button className="absolute inset-0 bg-black/60" aria-label="Close quick view" onClick={onClose} />
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby={`quick-view-${product.id}`}
        className="relative z-10 grid max-h-[90vh] w-full max-w-4xl overflow-hidden rounded-[2rem] bg-white shadow-soft md:grid-cols-2"
      >
        <div className="relative aspect-[4/5] min-h-[320px] bg-brand-cream">
          <Image src={product.images[0]} alt={product.name} fill className="object-cover" sizes="(max-width: 768px) 100vw, 40vw" />
        </div>
        <div className="overflow-y-auto p-6 md:p-8">
          <div className="mb-6 flex items-start justify-between gap-4">
            <div>
              <p className="mb-2 text-xs uppercase tracking-[0.3em] text-neutral-600">Quick view</p>
              <h3 id={`quick-view-${product.id}`} className="font-heading text-3xl text-brand-black">
                {product.name}
              </h3>
            </div>
            <button ref={closeButtonRef} onClick={onClose} className="rounded-full border border-brand-beige p-2">
              ✕
            </button>
          </div>

          <div className="mb-4 flex items-center gap-4">
            <p className="text-lg font-medium text-brand-black">
              {formatCurrency(product.salePrice ?? product.price)}
            </p>
            {product.salePrice ? (
              <p className="text-sm text-neutral-400 line-through">{formatCurrency(product.price)}</p>
            ) : null}
          </div>

          <Badge status={product.status} className="mb-5" />
          <p className="mb-6 text-sm leading-7 text-neutral-600">{product.description}</p>

          {product.sizes?.length ? (
            <div className="mb-5">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-600">Select size</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-4 py-2 text-sm ${selectedSize === size ? "border-brand-black bg-brand-black text-white" : "border-brand-beige text-brand-black"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {product.colors?.length ? (
            <div className="mb-5">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-600">Select colour</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-2 rounded-full border px-3 py-2 text-sm ${selectedColor === color ? "border-brand-black" : "border-brand-beige"}`}
                  >
                    <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: colorSwatches[color] ?? color.toLowerCase() }} />
                    {color}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mb-6 flex items-center gap-3">
            <button
              type="button"
              onClick={() => setQuantity((value) => Math.max(1, value - 1))}
              className="h-11 w-11 rounded-full border border-brand-beige"
            >
              −
            </button>
            <div className="flex h-11 w-14 items-center justify-center rounded-full border border-brand-beige text-sm">
              {quantity}
            </div>
            <button
              type="button"
              onClick={() => setQuantity((value) => value + 1)}
              className="h-11 w-11 rounded-full border border-brand-beige"
            >
              +
            </button>
          </div>

          <Button
            className="w-full"
            disabled={actionDisabled}
            onClick={() => {
              addToCart(product, quantity, selectedSize, selectedColor);
              onClose();
            }}
          >
            {actionDisabled ? "Unavailable" : "Add to Bag"}
          </Button>
        </div>
      </div>
    </div>
  );
}
