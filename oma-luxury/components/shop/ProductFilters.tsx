"use client";

import type { ProductCategory, ProductStatus } from "@/data/products";
import { Input } from "@/components/ui/Input";
import { colorSwatches, cn } from "@/lib/utils";
import type { ProductFiltersState } from "@/types/commerce";

interface ProductFiltersProps {
  filters: ProductFiltersState;
  maxPriceLimit: number;
  collections: string[];
  sizes: string[];
  colors: string[];
  onChange: (filters: ProductFiltersState) => void;
  onReset: () => void;
}

const categories: { label: string; value: ProductCategory }[] = [
  { label: "Women's Wear", value: "womens-wear" },
  { label: "Bags", value: "bags" },
  { label: "Perfumes", value: "perfumes" },
  { label: "Accessories", value: "accessories" },
];

const statuses: { label: string; value: ProductStatus }[] = [
  { label: "In Stock", value: "IN_STOCK" },
  { label: "Low Stock", value: "LOW_STOCK" },
  { label: "Sold Out", value: "SOLD_OUT" },
  { label: "Coming Soon", value: "COMING_SOON" },
  { label: "Preorder", value: "PREORDER" },
];

const pill = "rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition";

export function ProductFilters({
  filters,
  maxPriceLimit,
  collections,
  sizes,
  colors,
  onChange,
  onReset,
}: ProductFiltersProps) {
  const toggleValue = <T extends string>(values: T[], value: T) =>
    values.includes(value) ? values.filter((item) => item !== value) : [...values, value];

  return (
    <div className="space-y-6 rounded-[2rem] border border-black/5 bg-white p-6 shadow-soft">
      <div className="flex items-center justify-between gap-4">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-600">Refine</p>
          <h2 className="mt-2 font-heading text-2xl text-brand-black">Shop Filters</h2>
        </div>
        <button type="button" onClick={onReset} className="text-xs uppercase tracking-[0.2em] text-neutral-500 underline-offset-4 hover:underline">
          Reset
        </button>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Search</label>
        <Input
          value={filters.search}
          onChange={(event) => onChange({ ...filters, search: event.target.value })}
          placeholder="Search products"
        />
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-600">Categories</p>
        <div className="flex flex-wrap gap-2">
          {categories.map((category) => {
            const active = filters.categories.includes(category.value);
            return (
              <button
                key={category.value}
                type="button"
                onClick={() => onChange({ ...filters, categories: toggleValue(filters.categories, category.value) })}
                className={cn(pill, active ? "border-brand-black bg-brand-black text-white" : "border-brand-beige text-brand-black")}
              >
                {category.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Collection</label>
        <select
          value={filters.collection}
          onChange={(event) => onChange({ ...filters, collection: event.target.value })}
          className="w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm"
        >
          <option value="">All Collections</option>
          {collections.map((collection) => (
            <option key={collection} value={collection}>
              {collection}
            </option>
          ))}
        </select>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-600">Price Range</p>
        <div className="space-y-4">
          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
              <span>Minimum</span>
              <span>₦{filters.minPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPriceLimit}
              step={5000}
              value={filters.minPrice}
              onChange={(event) =>
                onChange({
                  ...filters,
                  minPrice: Number(event.target.value),
                  maxPrice: Math.max(Number(event.target.value), filters.maxPrice),
                })
              }
              className="w-full accent-black"
            />
          </div>
          <div>
            <div className="mb-2 flex items-center justify-between text-xs text-neutral-500">
              <span>Maximum</span>
              <span>₦{filters.maxPrice.toLocaleString()}</span>
            </div>
            <input
              type="range"
              min={0}
              max={maxPriceLimit}
              step={5000}
              value={filters.maxPrice}
              onChange={(event) =>
                onChange({
                  ...filters,
                  maxPrice: Number(event.target.value),
                  minPrice: Math.min(filters.minPrice, Number(event.target.value)),
                })
              }
              className="w-full accent-black"
            />
          </div>
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-600">Sizes</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((size) => {
            const active = filters.sizes.includes(size);
            return (
              <button
                key={size}
                type="button"
                onClick={() => onChange({ ...filters, sizes: toggleValue(filters.sizes, size) })}
                className={cn(pill, active ? "border-brand-black bg-brand-black text-white" : "border-brand-beige text-brand-black")}
              >
                {size}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-600">Colours</p>
        <div className="flex flex-wrap gap-3">
          {colors.map((color) => {
            const active = filters.colors.includes(color);
            return (
              <button
                key={color}
                type="button"
                onClick={() => onChange({ ...filters, colors: toggleValue(filters.colors, color) })}
                className={cn(
                  "flex items-center gap-2 rounded-full border px-3 py-2 text-sm transition",
                  active ? "border-brand-black" : "border-brand-beige",
                )}
              >
                <span className="h-4 w-4 rounded-full border border-black/10" style={{ backgroundColor: colorSwatches[color] ?? color.toLowerCase() }} />
                {color}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <p className="mb-3 text-xs uppercase tracking-[0.2em] text-neutral-600">Availability</p>
        <div className="flex flex-wrap gap-2">
          {statuses.map((status) => {
            const active = filters.availability.includes(status.value);
            return (
              <button
                key={status.value}
                type="button"
                onClick={() => onChange({ ...filters, availability: toggleValue(filters.availability, status.value) })}
                className={cn(pill, active ? "border-brand-black bg-brand-black text-white" : "border-brand-beige text-brand-black")}
              >
                {status.label}
              </button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Sort By</label>
        <select
          value={filters.sort}
          onChange={(event) => onChange({ ...filters, sort: event.target.value as ProductFiltersState["sort"] })}
          className="w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm"
        >
          <option value="newest">Newest</option>
          <option value="featured">Featured</option>
          <option value="price-asc">Price: Low to High</option>
          <option value="price-desc">Price: High to Low</option>
          <option value="name-asc">Name: A - Z</option>
          <option value="name-desc">Name: Z - A</option>
        </select>
      </div>
    </div>
  );
}
