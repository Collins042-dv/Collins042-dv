"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AccountShell } from "@/components/account/AccountShell";
import { Button } from "@/components/ui/Button";
import { brand } from "@/config/brand";
import { useAuth } from "@/store/AuthContext";

export function AccountOverviewClient() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/account/login");
    }
  }, [loading, router, user]);

  if (loading || !user) {
    return <div className="px-6 py-20 text-center text-sm text-neutral-500">Loading account...</div>;
  }

  return (
    <AccountShell title={`Welcome, ${user.name}`} description="Manage your profile, wishlist, delivery details and order history.">
      <div className="grid gap-6 md:grid-cols-2">
        {[
          { title: "Profile", description: "Update your personal details.", href: "/account/profile" },
          { title: "Addresses", description: "Manage saved delivery addresses.", href: "/account/addresses" },
          { title: "Wishlist", description: "View pieces you've saved for later.", href: "/account/wishlist" },
          { title: "Orders", description: `Track your recent ${brand.name} orders.`, href: "/account/orders" },
        ].map((card) => (
          <div key={card.href} className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
            <h2 className="font-heading text-3xl">{card.title}</h2>
            <p className="mt-4 text-sm leading-7 text-neutral-600">{card.description}</p>
            <Link href={card.href} className="mt-6 inline-flex text-sm uppercase tracking-[0.2em] text-brand-black underline-offset-4 hover:underline">
              Open
            </Link>
          </div>
        ))}
      </div>
      <Button className="mt-8" variant="secondary" onClick={async () => { await logout(); router.push('/account/login'); }}>
        Logout
      </Button>
    </AccountShell>
  );
}
