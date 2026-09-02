"use client";

import Link from "next/link";
import { useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { ImageGallery } from "@/components/product/ImageGallery";
import { ProductCard } from "@/components/shop/ProductCard";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import { calculateDiscount, colorSwatches, formatCurrency } from "@/lib/utils";
import { useCart } from "@/store/CartContext";
import { useWishlist } from "@/store/WishlistContext";

export function ProductDetailClient({ product, related }: { product: Product; related: Product[] }) {
  const { addToCart } = useCart();
  const { addToWishlist, removeFromWishlist, isInWishlist } = useWishlist();
  const [selectedSize, setSelectedSize] = useState(product.sizes?.[0]);
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]);
  const [quantity, setQuantity] = useState(1);
  const [openSection, setOpenSection] = useState<"shipping" | "returns" | null>("shipping");
  const discount = calculateDiscount(product.price, product.salePrice);
  const wished = isInWishlist(product.id);
  const unavailable = useMemo(() => ["SOLD_OUT", "COMING_SOON"].includes(product.status), [product.status]);
  const selectorLabel = product.category === "perfumes" ? "Select size" : product.category === "bags" ? "Select colour" : "Choose size";

  const handleAddToCart = () => addToCart(product, quantity, selectedSize, selectedColor);

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-6 text-sm text-neutral-500">
        <Link href="/shop" className="hover:text-brand-black">Shop</Link> / <span>{product.name}</span>
      </div>

      <div className="grid gap-12 lg:grid-cols-[1.05fr_0.95fr]">
        <ImageGallery images={product.images} alt={product.name} />

        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">{product.collection}</p>
          <h1 className="mt-4 font-heading text-5xl text-brand-black">{product.name}</h1>
          <div className="mt-6 flex flex-wrap items-center gap-4">
            <p className="text-2xl font-semibold text-brand-black">{formatCurrency(product.salePrice ?? product.price)}</p>
            {product.salePrice ? <p className="text-lg text-neutral-400 line-through">{formatCurrency(product.price)}</p> : null}
            {discount > 0 ? <span className="rounded-full bg-brand-gold px-3 py-1 text-xs font-semibold uppercase tracking-[0.2em] text-brand-black">Save {discount}%</span> : null}
          </div>

          <Badge status={product.status} className="mt-5" />
          <p className="mt-6 max-w-2xl text-sm leading-8 text-neutral-600">{product.description}</p>

          {product.sizes?.length ? (
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-600">{selectorLabel}</p>
              <div className="flex flex-wrap gap-2">
                {product.sizes.map((size) => (
                  <button
                    key={size}
                    type="button"
                    onClick={() => setSelectedSize(size)}
                    className={`rounded-full border px-5 py-3 text-sm ${selectedSize === size ? "border-brand-black bg-brand-black text-white" : "border-brand-beige text-brand-black"}`}
                  >
                    {size}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          {product.colors?.length ? (
            <div className="mt-8">
              <p className="mb-3 text-xs uppercase tracking-[0.25em] text-neutral-600">Select colour</p>
              <div className="flex flex-wrap gap-3">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    type="button"
                    onClick={() => setSelectedColor(color)}
                    className={`flex items-center gap-3 rounded-full border px-4 py-3 text-sm ${selectedColor === color ? "border-brand-black" : "border-brand-beige"}`}
                  >
                    <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: colorSwatches[color] ?? color.toLowerCase() }} />
                    {color}
                  </button>
                ))}
              </div>
            </div>
          ) : null}

          <div className="mt-8 flex items-center gap-3">
            <button type="button" onClick={() => setQuantity((value) => Math.max(1, value - 1))} className="h-12 w-12 rounded-full border border-brand-beige">−</button>
            <div className="flex h-12 w-16 items-center justify-center rounded-full border border-brand-beige text-sm">{quantity}</div>
            <button type="button" onClick={() => setQuantity((value) => value + 1)} className="h-12 w-12 rounded-full border border-brand-beige">+</button>
          </div>

          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button className="flex-1" disabled={unavailable} onClick={handleAddToCart}>
              {unavailable ? "Unavailable" : "Add to Bag"}
            </Button>
            <Link href="/checkout" className="flex-1" onClick={!unavailable ? handleAddToCart : undefined}>
              <Button variant="secondary" className="w-full" disabled={unavailable}>Buy now</Button>
            </Link>
            <button
              type="button"
              className="rounded-full border border-brand-beige px-5 text-2xl"
              aria-label={wished ? "Remove from wishlist" : "Add to wishlist"}
              onClick={() => (wished ? removeFromWishlist(product.id) : addToWishlist(product))}
            >
              {wished ? "♥" : "♡"}
            </button>
          </div>

          <div className="mt-10 rounded-[2rem] border border-black/5 bg-white p-6 shadow-soft">
            <div className="border-b border-black/5 pb-5">
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Description</p>
              <p className="mt-4 text-sm leading-8 text-neutral-600">{product.description}</p>
            </div>
            {[{ key: "shipping", title: "Shipping information", body: "We currently confirm delivery pricing and timelines after checkout. A team member will contact you with final delivery details across Lagos and nationwide." }, { key: "returns", title: "Returns information", body: "Returns and exchanges are reviewed on a case-by-case basis for eligible items. Please contact customer care within 48 hours of receiving your order." }].map((section) => (
              <div key={section.key} className="border-b border-black/5 py-5 last:border-none last:pb-0">
                <button
                  type="button"
                  className="flex w-full items-center justify-between text-left"
                  onClick={() => setOpenSection(openSection === section.key ? null : (section.key as "shipping" | "returns"))}
                >
                  <span className="text-sm font-medium uppercase tracking-[0.2em] text-brand-black">{section.title}</span>
                  <span>{openSection === section.key ? "−" : "+"}</span>
                </button>
                {openSection === section.key ? <p className="mt-4 text-sm leading-7 text-neutral-600">{section.body}</p> : null}
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-20">
        <div className="mb-8 flex items-end justify-between gap-6">
          <div>
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Related products</p>
            <h2 className="mt-3 font-heading text-4xl">More from this category</h2>
          </div>
        </div>
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {related.map((item) => (
            <ProductCard key={item.id} product={item} />
          ))}
        </div>
      </div>
    </div>
  );
}
