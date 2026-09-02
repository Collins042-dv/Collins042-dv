import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { AddressesClient } from "./AddressesClient";

export const metadata: Metadata = {
  title: "Addresses",
  description: `Manage saved delivery addresses for your ${brand.name} account.`,
  openGraph: { title: `Addresses | ${brand.name}`, description: brand.description, type: "website" },
};

export default function AddressesPage() {
  return <AddressesClient />;
}
