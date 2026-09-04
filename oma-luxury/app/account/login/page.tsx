import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { LoginClient } from "./LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: `Sign in to your ${brand.name} account.`,
  openGraph: { title: `Login | ${brand.name}`, description: brand.description, type: "website" },
};

export default function LoginPage({
  searchParams,
}: {
  searchParams?: { next?: string | string[] };
}) {
  const rawNextPath = Array.isArray(searchParams?.next)
    ? searchParams?.next[0]
    : searchParams?.next;
  const nextPath =
    typeof rawNextPath === "string" && rawNextPath.startsWith("/")
      ? rawNextPath
      : "/account";

  return <LoginClient nextPath={nextPath} />;
}
