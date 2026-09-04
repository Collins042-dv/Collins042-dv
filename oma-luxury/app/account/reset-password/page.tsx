import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { ResetPasswordClient } from "./ResetPasswordClient";

export const metadata: Metadata = {
  title: "Reset Password",
  description: `Create a new ${brand.name} account password.`,
  openGraph: {
    title: `Reset Password | ${brand.name}`,
    description: brand.description,
    type: "website",
  },
};

export default function ResetPasswordPage() {
  return <ResetPasswordClient />;
}
