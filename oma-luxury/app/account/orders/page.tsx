import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { OrdersClient } from "./OrdersClient";

export const metadata: Metadata = {
  title: "Orders",
  description: `Review your ${brand.name} order history.`,
  openGraph: { title: `Orders | ${brand.name}`, description: brand.description, type: "website" },
};

export default function OrdersPage() {
  return <OrdersClient />;
}
