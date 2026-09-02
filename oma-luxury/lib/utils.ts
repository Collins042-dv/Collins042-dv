import type { ProductStatus } from "@/data/products";
import { brand } from "@/config/brand";

export function cn(...classes: Array<string | false | null | undefined>) {
  return classes.filter(Boolean).join(" ");
}

export function formatCurrency(amount: number) {
  return new Intl.NumberFormat("en-NG", {
    style: "currency",
    currency: brand.currencyCode,
    maximumFractionDigits: 0,
  }).format(amount);
}

export function calculateDiscount(price: number, salePrice?: number) {
  if (!salePrice || salePrice >= price) {
    return 0;
  }
  return Math.round(((price - salePrice) / price) * 100);
}

export const colorSwatches: Record<string, string> = {
  Black: "#0A0A0A",
  Ivory: "#FAF8F5",
  Cream: "#F5F0E8",
  Beige: "#E8DDD0",
  Champagne: "#C9A96E",
  Gold: "#B8922A",
  Chocolate: "#5A4632",
};

export const statusCopy: Record<ProductStatus, string> = {
  IN_STOCK: "In stock",
  LOW_STOCK: "Low stock",
  SOLD_OUT: "Sold out",
  COMING_SOON: "Coming soon",
  PREORDER: "Preorder",
};
