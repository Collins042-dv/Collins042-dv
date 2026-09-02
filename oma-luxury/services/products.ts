import { products, type Product } from "@/data/products";
import type { ProductFiltersState } from "@/types/commerce";

type ProductQuery = Partial<ProductFiltersState> & { featuredOnly?: boolean; newArrivalsOnly?: boolean };

export async function getProducts(filters?: ProductQuery) {
  let filtered = [...products];

  if (filters?.search) {
    const search = filters.search.toLowerCase();
    filtered = filtered.filter(
      (product) =>
        product.name.toLowerCase().includes(search) ||
        product.description.toLowerCase().includes(search) ||
        product.collection?.toLowerCase().includes(search),
    );
  }

  if (filters?.categories?.length) {
    filtered = filtered.filter((product) => filters.categories?.includes(product.category));
  }

  if (filters?.collection) {
    filtered = filtered.filter((product) => product.collection === filters.collection);
  }

  if (typeof filters?.minPrice === "number") {
    filtered = filtered.filter((product) => (product.salePrice ?? product.price) >= filters.minPrice!);
  }

  if (typeof filters?.maxPrice === "number") {
    filtered = filtered.filter((product) => (product.salePrice ?? product.price) <= filters.maxPrice!);
  }

  if (filters?.sizes?.length) {
    filtered = filtered.filter((product) => product.sizes?.some((size) => filters.sizes?.includes(size)));
  }

  if (filters?.colors?.length) {
    filtered = filtered.filter((product) => product.colors?.some((color) => filters.colors?.includes(color)));
  }

  if (filters?.availability?.length) {
    filtered = filtered.filter((product) => filters.availability?.includes(product.status));
  }

  if (filters?.featuredOnly) {
    filtered = filtered.filter((product) => product.featured);
  }

  if (filters?.newArrivalsOnly) {
    filtered = filtered.filter((product) => product.newArrival);
  }

  switch (filters?.sort) {
    case "price-asc":
      filtered.sort((a, b) => (a.salePrice ?? a.price) - (b.salePrice ?? b.price));
      break;
    case "price-desc":
      filtered.sort((a, b) => (b.salePrice ?? b.price) - (a.salePrice ?? a.price));
      break;
    case "name-asc":
      filtered.sort((a, b) => a.name.localeCompare(b.name));
      break;
    case "name-desc":
      filtered.sort((a, b) => b.name.localeCompare(a.name));
      break;
    case "featured":
      filtered.sort((a, b) => Number(b.featured) - Number(a.featured) || Date.parse(b.createdAt) - Date.parse(a.createdAt));
      break;
    case "newest":
    default:
      filtered.sort((a, b) => Date.parse(b.createdAt) - Date.parse(a.createdAt));
  }

  return filtered;
}

export async function getProductBySlug(slug: string) {
  return products.find((product) => product.slug === slug) ?? null;
}

export async function getFeaturedProducts() {
  return products.filter((product) => product.featured).slice(0, 8);
}

export async function getNewArrivals() {
  return products.filter((product) => product.newArrival).slice(0, 8);
}

export async function getRelatedProducts(product: Product) {
  return products.filter((item) => item.category === product.category && item.id !== product.id).slice(0, 4);
}
