"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import type { AuthUser } from "@/services/auth";

const adminLinks = [
  { href: "/admin", label: "Overview" },
  { href: "/admin/products", label: "Products" },
  { href: "/admin/orders", label: "Orders" },
  { href: "/admin/customers", label: "Customers" },
  { href: "/admin/collections", label: "Collections" },
  { href: "/admin/categories", label: "Categories" },
  { href: "/admin/inventory", label: "Inventory" },
  { href: "/admin/content", label: "Content" },
  { href: "/admin/settings", label: "Settings" },
];

export function AdminShell({
  user,
  children,
}: {
  user: AuthUser;
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  return (
    <div className="mx-auto max-w-7xl px-6 py-16 lg:px-10">
      <div className="mb-10 flex flex-col gap-4 rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="text-xs uppercase tracking-[0.3em] text-neutral-500">Admin dashboard</p>
          <h1 className="mt-3 font-heading text-5xl">OMA LUXURY Control Room</h1>
          <p className="mt-4 max-w-2xl text-sm leading-7 text-neutral-600">
            Manage products, customers, orders and merchandising from a single secure workspace.
          </p>
        </div>
        <div className="rounded-[1.5rem] border border-brand-beige bg-brand-cream px-5 py-4 text-sm text-neutral-700">
          Signed in as <span className="font-semibold text-brand-black">{user.name}</span> · {user.role}
        </div>
      </div>

      <div className="grid gap-8 lg:grid-cols-[260px_1fr]">
        <aside className="rounded-[2rem] border border-black/5 bg-white p-4 shadow-soft lg:sticky lg:top-28 lg:self-start">
          <nav className="space-y-2">
            {adminLinks.map((link) => {
              const active = pathname === link.href;

              return (
                <Link
                  key={link.href}
                  href={link.href}
                  className={cn(
                    "block rounded-full px-4 py-3 text-sm uppercase tracking-[0.2em] transition",
                    active ? "bg-brand-black text-white" : "text-neutral-600 hover:bg-brand-cream hover:text-brand-black",
                  )}
                >
                  {link.label}
                </Link>
              );
            })}
          </nav>
        </aside>
        <div>{children}</div>
      </div>
    </div>
  );
}
