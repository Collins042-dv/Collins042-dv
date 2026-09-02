import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { ForgotPasswordClient } from "./ForgotPasswordClient";

export const metadata: Metadata = {
  title: "Forgot Password",
  description: `Request a password reset for your ${brand.name} account.`,
  openGraph: { title: `Forgot Password | ${brand.name}`, description: brand.description, type: "website" },
};

export default function ForgotPasswordPage() {
  return <ForgotPasswordClient />;
}
