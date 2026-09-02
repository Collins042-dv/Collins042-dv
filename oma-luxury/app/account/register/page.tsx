import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { RegisterClient } from "./RegisterClient";

export const metadata: Metadata = {
  title: "Register",
  description: `Create your ${brand.name} account.`,
  openGraph: { title: `Register | ${brand.name}`, description: brand.description, type: "website" },
};

export default function RegisterPage() {
  return <RegisterClient />;
}
