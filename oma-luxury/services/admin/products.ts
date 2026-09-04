import type { Product } from "@/data/products";
import { products as seedProducts } from "@/data/products";

export interface AdminProductService {
  list(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  remove(id: string): Promise<void>;
}

const PRODUCTS_KEY = "oma-luxury-admin-products";

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }

  return window.localStorage;
}

function readProducts() {
  const storage = getStorage();

  if (!storage) {
    return [...seedProducts];
  }

  const raw = storage.getItem(PRODUCTS_KEY);

  if (!raw) {
    storage.setItem(PRODUCTS_KEY, JSON.stringify(seedProducts));
    return [...seedProducts];
  }

  return JSON.parse(raw) as Product[];
}

function writeProducts(products: Product[]) {
  const storage = getStorage();

  if (!storage) {
    return;
  }

  storage.setItem(PRODUCTS_KEY, JSON.stringify(products));
}

export const adminProductService: AdminProductService = {
  async list() {
    return readProducts();
  },
  async getById(id) {
    return readProducts().find((product) => product.id === id) ?? null;
  },
  async create(product) {
    const products = readProducts();
    const next = [product, ...products];
    writeProducts(next);
    return product;
  },
  async update(id, product) {
    const products = readProducts();
    const current = products.find((item) => item.id === id);

    if (!current) {
      throw new Error("Product not found.");
    }

    const updated = {
      ...current,
      ...product,
      updatedAt: new Date().toISOString(),
    };

    writeProducts(products.map((item) => (item.id === id ? updated : item)));
    return updated;
  },
  async remove(id) {
    writeProducts(readProducts().filter((product) => product.id !== id));
  },
};
