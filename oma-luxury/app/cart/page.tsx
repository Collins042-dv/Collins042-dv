import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { CartPageClient } from "./CartPageClient";

export const metadata: Metadata = {
  title: "Cart",
  description: `Review the items in your ${brand.name} shopping bag before checkout.`,
  openGraph: {
    title: `Cart | ${brand.name}`,
    description: brand.description,
    type: "website",
  },
};

export default function CartPage() {
  return <CartPageClient />;
}
