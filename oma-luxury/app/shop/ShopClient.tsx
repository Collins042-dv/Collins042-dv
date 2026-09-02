"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { Product } from "@/data/products";
import { ProductCard } from "@/components/shop/ProductCard";
import { ProductFilters } from "@/components/shop/ProductFilters";
import { ProductGrid } from "@/components/shop/ProductGrid";
import { Button } from "@/components/ui/Button";
import { brand } from "@/config/brand";
import { getProducts } from "@/services/products";
import type { ProductFiltersState } from "@/types/commerce";

const DEFAULT_MAX_PRICE = 250000;

export function ShopClient({
  products,
  initialSearch,
  initialCollection,
  initialCategory,
}: {
  products: Product[];
  initialSearch: string;
  initialCollection: string;
  initialCategory: Product["category"] | "";
}) {
  const [filters, setFilters] = useState<ProductFiltersState>({
    search: initialSearch,
    categories: initialCategory ? [initialCategory] : [],
    collection: initialCollection,
    minPrice: 0,
    maxPrice: DEFAULT_MAX_PRICE,
    sizes: [],
    colors: [],
    availability: [],
    sort: "featured",
  });
  const [filteredProducts, setFilteredProducts] = useState<Product[]>(products);

  const featuredProducts = useMemo(() => products.filter((product) => product.featured).slice(0, 3), [products]);
  const collections = useMemo(() => Array.from(new Set(products.map((product) => product.collection).filter(Boolean))) as string[], [products]);
  const sizes = useMemo(() => Array.from(new Set(products.flatMap((product) => product.sizes ?? []))), [products]);
  const colors = useMemo(() => Array.from(new Set(products.flatMap((product) => product.colors ?? []))), [products]);
  const maxPriceLimit = useMemo(
    () => Math.max(...products.map((product) => product.price), DEFAULT_MAX_PRICE),
    [products],
  );

  useEffect(() => {
    setFilters((current) => ({ ...current, maxPrice: maxPriceLimit }));
  }, [maxPriceLimit]);

  useEffect(() => {
    getProducts(filters).then(setFilteredProducts);
  }, [filters]);

  const resetFilters = () => {
    setFilters({
      search: initialSearch,
      categories: initialCategory ? [initialCategory] : [],
      collection: initialCollection,
      minPrice: 0,
      maxPrice: maxPriceLimit,
      sizes: [],
      colors: [],
      availability: [],
      sort: "featured",
    });
  };

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-12 grid gap-6 rounded-[2rem] bg-brand-black px-8 py-10 text-white lg:grid-cols-[1.1fr_0.9fr]">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-brand-champagne">Shop {brand.name}</p>
          <h1 className="mt-4 font-heading text-5xl">A curated wardrobe of elevated essentials</h1>
          <p className="mt-5 max-w-2xl text-sm leading-8 text-white/70">
            Filter by category, collection, size, colour and availability to build your personal luxury edit.
          </p>
        </div>
        <div className="rounded-[2rem] border border-white/10 bg-white/5 p-6">
          <p className="text-xs uppercase tracking-[0.25em] text-brand-champagne">Featured now</p>
          <div className="mt-5 space-y-4">
            {featuredProducts.map((product) => (
              <div key={product.id} className="flex items-center justify-between gap-4 border-b border-white/10 pb-4 last:border-none last:pb-0">
                <div>
                  <p className="font-heading text-2xl">{product.name}</p>
                  <p className="text-xs uppercase tracking-[0.2em] text-white/60">{product.collection}</p>
                </div>
                <Link href={`/shop/${product.slug}`}>
                  <Button variant="secondary" className="border-white/30 text-white hover:bg-white hover:text-brand-black">View</Button>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="grid gap-8 xl:grid-cols-[300px_1fr]">
        <div className="xl:sticky xl:top-28 xl:self-start">
          <ProductFilters
            filters={filters}
            maxPriceLimit={maxPriceLimit}
            collections={collections}
            sizes={sizes}
            colors={colors}
            onChange={setFilters}
            onReset={resetFilters}
          />
        </div>

        <div>
          <div className="mb-8 flex flex-col gap-3 rounded-[2rem] border border-black/5 bg-white px-6 py-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">Shop results</p>
              <p className="mt-2 text-sm text-neutral-600">Showing {filteredProducts.length} products matching your filters.</p>
            </div>
            {filteredProducts.length ? null : (
              <Button variant="secondary" onClick={resetFilters}>Clear filters</Button>
            )}
          </div>

          {filteredProducts.length ? (
            <ProductGrid>
              {filteredProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </ProductGrid>
          ) : (
            <div className="rounded-[2rem] border border-dashed border-brand-beige bg-brand-cream px-8 py-16 text-center">
              <h2 className="font-heading text-4xl">No products match this edit</h2>
              <p className="mt-4 text-sm leading-7 text-neutral-600">Try widening your price range or removing a few filters to discover more pieces.</p>
              <Button variant="secondary" className="mt-8" onClick={resetFilters}>Reset filters</Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
