import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { WishlistClient } from "./WishlistClient";

export const metadata: Metadata = {
  title: "Wishlist",
  description: `Review your saved favourites from ${brand.name}.`,
  openGraph: { title: `Wishlist | ${brand.name}`, description: brand.description, type: "website" },
};

export default function WishlistPage() {
  return <WishlistClient />;
}
