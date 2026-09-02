import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { brand } from "@/config/brand";
import { getProductBySlug, getRelatedProducts } from "@/services/products";
import { ProductDetailClient } from "./ProductDetailClient";

export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    return {
      title: `Product not found | ${brand.name}`,
    };
  }

  return {
    title: `${product.name}`,
    description: product.description,
    openGraph: {
      title: `${product.name} | ${brand.name}`,
      description: product.description,
      type: "website",
    },
  };
}

export default async function ProductPage({ params }: { params: { slug: string } }) {
  const product = await getProductBySlug(params.slug);
  if (!product) {
    notFound();
  }
  const related = await getRelatedProducts(product);
  return <ProductDetailClient product={product} related={related} />;
}
