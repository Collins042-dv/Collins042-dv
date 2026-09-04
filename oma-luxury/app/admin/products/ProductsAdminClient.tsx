"use client";

import { useEffect, useMemo, useState } from "react";
import type { Product, ProductCategory, ProductStatus } from "@/data/products";
import { collections } from "@/data/products";
import { formatCurrency } from "@/lib/utils";
import { adminProductService } from "@/services/admin/products";
import { AdminSectionIntro } from "@/components/admin/AdminSectionIntro";
import { Button } from "@/components/ui/Button";
import { Input } from "@/components/ui/Input";

interface ProductFormState {
  id: string;
  name: string;
  slug: string;
  description: string;
  price: string;
  salePrice: string;
  category: ProductCategory;
  collection: string;
  stock: string;
  status: ProductStatus;
  sizes: string;
  colors: string;
  images: string;
  featured: boolean;
  newArrival: boolean;
}

const defaultForm: ProductFormState = {
  id: "",
  name: "",
  slug: "",
  description: "",
  price: "",
  salePrice: "",
  category: "womens-wear",
  collection: collections[0],
  stock: "0",
  status: "IN_STOCK",
  sizes: "",
  colors: "",
  images: "",
  featured: false,
  newArrival: false,
};

function slugify(value: string) {
  return value
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function productToForm(product: Product): ProductFormState {
  return {
    id: product.id,
    name: product.name,
    slug: product.slug,
    description: product.description,
    price: String(product.price),
    salePrice: product.salePrice ? String(product.salePrice) : "",
    category: product.category,
    collection: product.collection ?? "",
    stock: String(product.stock),
    status: product.status,
    sizes: product.sizes?.join(", ") ?? "",
    colors: product.colors?.join(", ") ?? "",
    images: product.images.join("\n"),
    featured: product.featured,
    newArrival: product.newArrival,
  };
}

function formToProduct(form: ProductFormState): Product {
  const now = new Date().toISOString();

  return {
    id: form.id || `${form.category}-${crypto.randomUUID().slice(0, 8)}`,
    name: form.name.trim(),
    slug: slugify(form.slug || form.name),
    description: form.description.trim(),
    price: Number(form.price),
    salePrice: form.salePrice ? Number(form.salePrice) : undefined,
    category: form.category,
    collection: form.collection || undefined,
    stock: Number(form.stock),
    status: form.status,
    sizes: form.sizes ? form.sizes.split(",").map((item) => item.trim()).filter(Boolean) : undefined,
    colors: form.colors ? form.colors.split(",").map((item) => item.trim()).filter(Boolean) : undefined,
    images: form.images.split("\n").map((item) => item.trim()).filter(Boolean),
    featured: form.featured,
    newArrival: form.newArrival,
    createdAt: now,
    updatedAt: now,
  };
}

export function ProductsAdminClient() {
  const [products, setProducts] = useState<Product[]>([]);
  const [form, setForm] = useState<ProductFormState>(defaultForm);
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const editing = useMemo(() => products.find((product) => product.id === form.id) ?? null, [form.id, products]);

  const loadProducts = () => {
    adminProductService.list().then(setProducts);
  };

  useEffect(() => {
    loadProducts();
  }, []);

  const submit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setMessage("");
    setError("");

    try {
      const product = formToProduct(form);

      if (!product.images.length) {
        throw new Error("Add at least one product image URL.");
      }

      if (editing) {
        await adminProductService.update(editing.id, product);
        setMessage("Product updated in the draft admin catalog.");
      } else {
        await adminProductService.create(product);
        setMessage("Product added to the draft admin catalog.");
      }

      setForm(defaultForm);
      loadProducts();
    } catch (err) {
      setError(err instanceof Error ? err.message : "Unable to save product.");
    }
  };

  return (
    <>
      <AdminSectionIntro
        eyebrow="Products"
        title="Catalog management"
        description="Manage product structure, pricing, stock, merchandising flags, sizes, colours and image URLs. Draft changes are saved in the service layer so a database can replace them later without rewriting the UI."
      />
      <div className="mb-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
        Media storage is not connected yet. Use secure product image URLs for now, then swap the service layer to Supabase Storage or another backend later.
      </div>
      <div className="grid gap-8 xl:grid-cols-[1.2fr_0.8fr]">
        <div className="space-y-4">
          {products.map((product) => (
            <div key={product.id} className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-4 lg:flex-row lg:items-start lg:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{product.category}</p>
                  <h3 className="mt-2 font-heading text-3xl">{product.name}</h3>
                  <p className="mt-3 max-w-2xl text-sm leading-7 text-neutral-600">{product.description}</p>
                </div>
                <div className="text-sm text-neutral-600 lg:text-right">
                  <p className="font-semibold text-brand-black">{formatCurrency(product.salePrice ?? product.price)}</p>
                  <p className="mt-2">Stock: {product.stock}</p>
                  <p>{product.status.replace(/_/g, " ")}</p>
                </div>
              </div>
              <div className="mt-5 flex flex-wrap gap-3">
                <Button type="button" variant="secondary" onClick={() => setForm(productToForm(product))}>
                  Edit
                </Button>
                <Button
                  type="button"
                  variant="ghost"
                  onClick={async () => {
                    await adminProductService.remove(product.id);
                    if (form.id === product.id) {
                      setForm(defaultForm);
                    }
                    loadProducts();
                  }}
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>

        <form onSubmit={submit} className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft xl:sticky xl:top-28 xl:self-start">
          <h3 className="font-heading text-3xl">{editing ? "Edit product" : "Add product"}</h3>
          <div className="mt-6 space-y-4">
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Name</label>
              <Input value={form.name} onChange={(event) => setForm((current) => ({ ...current, name: event.target.value, slug: current.slug || slugify(event.target.value) }))} required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Slug</label>
              <Input value={form.slug} onChange={(event) => setForm((current) => ({ ...current, slug: slugify(event.target.value) }))} required />
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Description</label>
              <textarea
                value={form.description}
                onChange={(event) => setForm((current) => ({ ...current, description: event.target.value }))}
                className="min-h-28 w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm text-brand-black outline-none transition focus:border-brand-gold"
                required
              />
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Price</label>
                <Input type="number" min="0" value={form.price} onChange={(event) => setForm((current) => ({ ...current, price: event.target.value }))} required />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Sale price</label>
                <Input type="number" min="0" value={form.salePrice} onChange={(event) => setForm((current) => ({ ...current, salePrice: event.target.value }))} />
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Category</label>
                <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value as ProductCategory }))} className="w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm">
                  {["womens-wear", "bags", "perfumes", "accessories"].map((category) => (
                    <option key={category} value={category}>
                      {category}
                    </option>
                  ))}
                </select>
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Collection</label>
                <select value={form.collection} onChange={(event) => setForm((current) => ({ ...current, collection: event.target.value }))} className="w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm">
                  {collections.map((collection) => (
                    <option key={collection} value={collection}>
                      {collection}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Stock</label>
                <Input type="number" min="0" value={form.stock} onChange={(event) => setForm((current) => ({ ...current, stock: event.target.value }))} required />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Status</label>
                <select value={form.status} onChange={(event) => setForm((current) => ({ ...current, status: event.target.value as ProductStatus }))} className="w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm">
                  {["IN_STOCK", "LOW_STOCK", "SOLD_OUT", "COMING_SOON", "PREORDER"].map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="grid gap-4 md:grid-cols-2">
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Sizes</label>
                <Input value={form.sizes} onChange={(event) => setForm((current) => ({ ...current, sizes: event.target.value }))} placeholder="S, M, L" />
              </div>
              <div>
                <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Colours</label>
                <Input value={form.colors} onChange={(event) => setForm((current) => ({ ...current, colors: event.target.value }))} placeholder="Black, Ivory" />
              </div>
            </div>
            <div>
              <label className="mb-2 block text-xs uppercase tracking-[0.2em] text-neutral-600">Image URLs</label>
              <textarea
                value={form.images}
                onChange={(event) => setForm((current) => ({ ...current, images: event.target.value }))}
                className="min-h-28 w-full rounded-2xl border border-brand-beige bg-white px-4 py-3 text-sm text-brand-black outline-none transition focus:border-brand-gold"
                placeholder="One image URL per line"
                required
              />
            </div>
            <div className="grid gap-3 sm:grid-cols-2">
              <label className="flex items-center gap-3 rounded-2xl border border-brand-beige px-4 py-3 text-sm text-neutral-600">
                <input type="checkbox" checked={form.featured} onChange={(event) => setForm((current) => ({ ...current, featured: event.target.checked }))} />
                Featured
              </label>
              <label className="flex items-center gap-3 rounded-2xl border border-brand-beige px-4 py-3 text-sm text-neutral-600">
                <input type="checkbox" checked={form.newArrival} onChange={(event) => setForm((current) => ({ ...current, newArrival: event.target.checked }))} />
                New arrival
              </label>
            </div>
          </div>
          {error ? <p className="mt-4 text-sm text-red-600">{error}</p> : null}
          {message ? <p className="mt-4 text-sm text-emerald-700">{message}</p> : null}
          <div className="mt-6 flex flex-wrap gap-3">
            <Button>{editing ? "Save product" : "Add product"}</Button>
            <Button type="button" variant="secondary" onClick={() => setForm(defaultForm)}>
              Reset
            </Button>
          </div>
        </form>
      </div>
    </>
  );
}
