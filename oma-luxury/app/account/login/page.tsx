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
  searchParams?: { next?: string };
}) {
  const nextPath =
    typeof searchParams?.next === "string" && searchParams.next.startsWith("/")
      ? searchParams.next
      : "/account";

  return <LoginClient nextPath={nextPath} />;
}
