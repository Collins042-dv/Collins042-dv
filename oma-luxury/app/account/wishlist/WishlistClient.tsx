"use client";

import { useRouter } from "next/navigation";
import { useEffect } from "react";
import { AccountShell } from "@/components/account/AccountShell";
import { ProductCard } from "@/components/shop/ProductCard";
import { useAuth } from "@/store/AuthContext";
import { useWishlist } from "@/store/WishlistContext";

export function WishlistClient() {
  const { user, loading } = useAuth();
  const { items } = useWishlist();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/account/login");
    }
  }, [loading, router, user]);

  if (!user) {
    return <div className="px-6 py-20 text-center text-sm text-neutral-500">Loading wishlist...</div>;
  }

  return (
    <AccountShell title="Wishlist" description="Keep your favourite fashion, bags and fragrances close for later.">
      {items.length ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
          {items.map((product) => <ProductCard key={product.id} product={product} />)}
        </div>
      ) : (
        <div className="rounded-[2rem] border border-dashed border-brand-beige bg-white p-10 text-center shadow-soft">
          <h2 className="font-heading text-4xl">Your wishlist is empty</h2>
          <p className="mt-4 text-sm text-neutral-600">Save standout pieces from the shop to revisit them anytime.</p>
        </div>
      )}
    </AccountShell>
  );
}
