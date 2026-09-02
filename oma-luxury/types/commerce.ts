import type { Product, ProductCategory, ProductStatus } from "@/data/products";

export interface CartItem {
  product: Product;
  quantity: number;
  selectedSize?: string;
  selectedColor?: string;
}

export interface ProductFiltersState {
  search: string;
  categories: ProductCategory[];
  collection: string;
  minPrice: number;
  maxPrice: number;
  sizes: string[];
  colors: string[];
  availability: ProductStatus[];
  sort:
    | "featured"
    | "newest"
    | "price-asc"
    | "price-desc"
    | "name-asc"
    | "name-desc";
}

export interface CheckoutFormData {
  fullName: string;
  email: string;
  phone: string;
  address: string;
  city: string;
  state: string;
  country: string;
  userId?: string;
}
