"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { QuickViewModal } from "@/components/shop/QuickViewModal";
import { calculateDiscount, formatCurrency } from "@/lib/utils";
import { useCart } from "@/store/CartContext";
import { useWishlist } from "@/store/WishlistContext";

export function ProductCard({ product }: { product: Product }) {
  const [quickViewOpen, setQuickViewOpen] = useState(false);
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const discount = calculateDiscount(product.price, product.salePrice);
  const wished = isInWishlist(product.id);
  const isUnavailable = useMemo(
    () => product.status === "SOLD_OUT" || product.status === "COMING_SOON",
    [product.status],
  );

  return (
    <>
      <article className="group animate-fadeIn overflow-hidden rounded-[2rem] border border-black/5 bg-white shadow-soft">
        <div className="relative aspect-[4/5] overflow-hidden bg-brand-cream">
          <Link href={`/shop/${product.slug}`} className="block h-full w-full">
            <Image
              src={product.images[0]}
              alt={product.name}
              fill
              className="object-cover transition duration-700 group-hover:scale-105"
              sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
            />
            {product.images[1] ? (
              <Image
                src={product.images[1]}
                alt={`${product.name} alternate view`}
                fill
                className="object-cover opacity-0 transition duration-700 group-hover:opacity-100"
                sizes="(max-width: 768px) 50vw, (max-width: 1280px) 33vw, 25vw"
              />
            ) : null}
          </Link>

          <div className="absolute left-4 top-4 flex flex-col gap-2">
            <Badge status={product.status} />
            {discount > 0 ? <span className="rounded-full bg-brand-gold px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-brand-black">-{discount}%</span> : null}
          </div>

          <button
            type="button"
            aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
            className="absolute right-4 top-4 flex h-10 w-10 items-center justify-center rounded-full bg-white/90 text-brand-black shadow transition hover:bg-white"
            onClick={() => (wished ? removeFromWishlist(product.id) : addToWishlist(product))}
          >
            {wished ? "♥" : "♡"}
          </button>

          <div className="absolute inset-x-4 bottom-4 translate-y-4 opacity-0 transition duration-300 group-hover:translate-y-0 group-hover:opacity-100">
            <div className="flex gap-2">
              <Button variant="secondary" className="flex-1 bg-white/90 backdrop-blur" onClick={() => setQuickViewOpen(true)}>
                Quick view
              </Button>
              <Button
                className="flex-1"
                disabled={isUnavailable}
                onClick={() => addToCart(product, 1, product.sizes?.[0], product.colors?.[0])}
              >
                {isUnavailable ? "Unavailable" : "Add to bag"}
              </Button>
            </div>
          </div>
        </div>

        <div className="space-y-3 p-5">
          <div className="flex items-start justify-between gap-3">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{product.collection}</p>
              <Link href={`/shop/${product.slug}`} className="mt-2 block font-heading text-2xl text-brand-black transition hover:text-brand-gold">
                {product.name}
              </Link>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <p className="text-sm font-semibold text-brand-black">{formatCurrency(product.salePrice ?? product.price)}</p>
            {product.salePrice ? <p className="text-sm text-neutral-400 line-through">{formatCurrency(product.price)}</p> : null}
          </div>
        </div>
      </article>

      <QuickViewModal product={product} open={quickViewOpen} onClose={() => setQuickViewOpen(false)} />
    </>
  );
}
