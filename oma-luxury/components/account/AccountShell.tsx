"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const links = [
  { href: "/account", label: "Overview" },
  { href: "/account/profile", label: "Profile" },
  { href: "/account/addresses", label: "Addresses" },
  { href: "/account/wishlist", label: "Wishlist" },
  { href: "/account/orders", label: "Orders" },
];

export function AccountShell({ title, description, children }: { title: string; description: string; children: React.ReactNode }) {
  const pathname = usePathname();
  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-10">
        <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Account</p>
        <h1 className="mt-3 font-heading text-5xl">{title}</h1>
        <p className="mt-4 max-w-2xl text-sm leading-8 text-neutral-600">{description}</p>
      </div>
      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-soft lg:sticky lg:top-28 lg:self-start">
          <nav className="space-y-2">
            {links.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className={cn(
                  "block rounded-full px-4 py-3 text-sm uppercase tracking-[0.2em] transition",
                  pathname === link.href ? "bg-brand-black text-white" : "text-neutral-600 hover:bg-brand-cream hover:text-brand-black",
                )}
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
