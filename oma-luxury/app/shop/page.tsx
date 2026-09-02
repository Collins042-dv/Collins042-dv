import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { getProducts } from "@/services/products";
import { ShopClient } from "./ShopClient";

export const metadata: Metadata = {
  title: "Shop",
  description: `Shop premium women's fashion, luxury bags, perfumes and accessories from ${brand.name}.`,
  openGraph: {
    title: `Shop | ${brand.name}`,
    description: brand.description,
    type: "website",
  },
};

export default async function ShopPage({
  searchParams,
}: {
  searchParams?: { q?: string | string[]; collection?: string | string[]; category?: string | string[] };
}) {
  const products = await getProducts({ sort: "featured" });
  const initialSearch = typeof searchParams?.q === "string" ? searchParams.q : "";
  const initialCollection = typeof searchParams?.collection === "string" ? searchParams.collection : "";
  const initialCategory =
    typeof searchParams?.category === "string" &&
    ["womens-wear", "bags", "perfumes", "accessories"].includes(searchParams.category)
      ? (searchParams.category as "womens-wear" | "bags" | "perfumes" | "accessories")
      : "";
  return (
    <ShopClient
      products={products}
      initialSearch={initialSearch}
      initialCollection={initialCollection}
      initialCategory={initialCategory}
    />
  );
}
