import type { Metadata } from "next";
import { brand } from "@/config/brand";
import { ContactClient } from "./ContactClient";

export const metadata: Metadata = {
  title: "Contact",
  description: `Get in touch with ${brand.name} for enquiries and support.`,
  openGraph: { title: `Contact | ${brand.name}`, description: brand.description, type: "website" },
};

export default function ContactPage() {
  return <ContactClient />;
}
