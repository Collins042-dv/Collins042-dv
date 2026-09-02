import type { Product } from "@/data/products";

export interface AdminProductService {
  list(): Promise<Product[]>;
  getById(id: string): Promise<Product | null>;
  create(product: Product): Promise<Product>;
  update(id: string, product: Partial<Product>): Promise<Product>;
  remove(id: string): Promise<void>;
}
