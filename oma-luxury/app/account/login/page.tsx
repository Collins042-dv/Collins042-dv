import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { LoginClient } from "./LoginClient";

export const metadata: Metadata = {
  title: "Login",
  description: `Sign in to your ${brand.name} account.`,
  openGraph: { title: `Login | ${brand.name}`, description: brand.description, type: "website" },
};

export default function LoginPage() {
  return <LoginClient />;
}
