import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { AccountOverviewClient } from "./AccountOverviewClient";

export const metadata: Metadata = {
  title: "Account",
  description: `Manage your ${brand.name} profile, wishlist and orders.`,
  openGraph: {
    title: `Account | ${brand.name}`,
    description: brand.description,
    type: "website",
  },
};

export default function AccountPage({
  searchParams,
}: {
  searchParams?: { welcome?: string | string[] };
}) {
  const welcomeValue = Array.isArray(searchParams?.welcome)
    ? searchParams?.welcome[0]
    : searchParams?.welcome;

  return <AccountOverviewClient welcome={welcomeValue === "1"} />;
}
