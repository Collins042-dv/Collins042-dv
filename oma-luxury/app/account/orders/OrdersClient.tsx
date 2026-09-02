"use client";

import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { AccountShell } from "@/components/account/AccountShell";
import { formatCurrency } from "@/lib/utils";
import { getOrders, type Order } from "@/services/orders";
import { useAuth } from "@/store/AuthContext";

export function OrdersClient() {
  const { user, loading } = useAuth();
  const router = useRouter();
  const [orders, setOrders] = useState<Order[]>([]);

  useEffect(() => {
    if (!loading && !user) {
      router.replace("/account/login");
    }
    if (user) {
      getOrders(user.id).then(setOrders);
    }
  }, [loading, router, user]);

  if (!user) {
    return <div className="px-6 py-20 text-center text-sm text-neutral-500">Loading orders...</div>;
  }

  return (
    <AccountShell title="Orders" description="Track your previous purchases and order confirmations.">
      <div className="space-y-5">
        {orders.length ? orders.map((order) => (
          <div key={order.id} className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div>
                <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{order.id}</p>
                <h2 className="mt-2 font-heading text-3xl">{order.status.replace(/_/g, " ")}</h2>
              </div>
              <div className="text-sm text-neutral-600 sm:text-right">
                <p>{new Date(order.createdAt).toLocaleDateString()}</p>
                <p className="mt-2 font-semibold text-brand-black">{formatCurrency(order.total)}</p>
              </div>
            </div>
            <div className="mt-6 space-y-2 text-sm text-neutral-600">
              {order.items.map((item) => (
                <p key={`${order.id}-${item.product.id}-${item.selectedSize}-${item.selectedColor}`}>
                  {item.product.name} × {item.quantity}
                </p>
              ))}
            </div>
          </div>
        )) : <div className="rounded-[2rem] border border-dashed border-brand-beige bg-white p-10 text-center shadow-soft"><h2 className="font-heading text-4xl">No orders yet</h2><p className="mt-4 text-sm text-neutral-600">Your order history will appear here after checkout.</p></div>}
      </div>
    </AccountShell>
  );
}
