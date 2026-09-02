import type { Metadata } from "next";
import { Footer } from "@/components/layout/Footer";
import { Navbar } from "@/components/layout/Navbar";
import { CartDrawer } from "@/components/layout/CartDrawer";
import { AppProviders } from "@/components/providers/AppProviders";
import { brand } from "@/config/brand";
import "./globals.css";

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | ${brand.tagline}`,
    template: `%s | ${brand.name}`,
  },
  description: brand.description,
  openGraph: {
    title: `${brand.name} | ${brand.tagline}`,
    description: brand.description,
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <AppProviders>
          <Navbar />
          <main className="min-h-screen pt-24">{children}</main>
          <Footer />
          <CartDrawer />
        </AppProviders>
      </body>
    </html>
  );
}
