import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { CheckoutClient } from "./CheckoutClient";

export const metadata: Metadata = {
  title: "Checkout",
  description: `Complete your ${brand.name} purchase and confirm delivery details.`,
  openGraph: {
    title: `Checkout | ${brand.name}`,
    description: brand.description,
    type: "website",
  },
};

export default function CheckoutPage() {
  return <CheckoutClient />;
}
