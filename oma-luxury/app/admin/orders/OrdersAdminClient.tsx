"use client";

import { useEffect, useState } from "react";
import { AdminSectionIntro } from "@/components/admin/AdminSectionIntro";
import { formatCurrency } from "@/lib/utils";
import { adminOrderService } from "@/services/admin/orders";
import type { Order } from "@/services/orders";

const orderStatuses = [
  "PENDING_CONFIRMATION",
  "PROCESSING",
  "SHIPPED",
  "DELIVERED",
  "CANCELLED",
];

export function OrdersAdminClient() {
  const [orders, setOrders] = useState<Order[]>([]);
  const [error, setError] = useState("");
  const [updatingOrderId, setUpdatingOrderId] = useState("");

  useEffect(() => {
    adminOrderService
      .list()
      .then(setOrders)
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "Unable to load orders.");
      });
  }, []);

  return (
    <>
      <AdminSectionIntro
        eyebrow="Orders"
        title="Order operations"
        description="Review locally captured orders, customer details and fulfillment status while the production order database and payment webhooks are being connected."
      />
      {error ? (
        <div className="mb-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {error}
        </div>
      ) : null}
      <div className="space-y-4">
        {orders.length ? (
          orders.map((order) => (
            <div key={order.id} className="rounded-[2rem] border border-black/5 bg-white p-6 shadow-soft">
              <div className="flex flex-col gap-5 xl:flex-row xl:items-center xl:justify-between">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{order.id}</p>
                  <h3 className="mt-2 font-heading text-3xl">{order.customer.fullName}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{order.customer.email}</p>
                </div>
                <div className="grid gap-3 text-sm text-neutral-600 sm:grid-cols-2 xl:min-w-[380px]">
                  <div>
                    <p className="uppercase tracking-[0.2em] text-neutral-400">Products</p>
                    <p className="mt-1">{order.items.map((item) => `${item.product.name} × ${item.quantity}`).join(", ")}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.2em] text-neutral-400">Total</p>
                    <p className="mt-1 font-semibold text-brand-black">{formatCurrency(order.total)}</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.2em] text-neutral-400">Payment</p>
                    <p className="mt-1">Pending provider setup</p>
                  </div>
                  <div>
                    <p className="uppercase tracking-[0.2em] text-neutral-400">Date</p>
                    <p className="mt-1">{new Date(order.createdAt).toLocaleString()}</p>
                  </div>
                </div>
              </div>
              <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <p className="text-sm text-neutral-600">
                  Delivery: {order.customer.address}, {order.customer.city}, {order.customer.state}
                </p>
                <select
                  value={order.status}
                  onChange={async (event) => {
                    setError("");
                    setUpdatingOrderId(order.id);
                    try {
                      const updated = await adminOrderService.updateStatus(order.id, event.target.value);
                      setOrders((current) => current.map((item) => (item.id === order.id ? updated : item)));
                    } catch (err) {
                      setError(err instanceof Error ? err.message : "Unable to update the order status.");
                    } finally {
                      setUpdatingOrderId("");
                    }
                  }}
                  aria-label={`Update status for order ${order.id}`}
                  className="rounded-full border border-brand-beige bg-white px-4 py-3 text-xs uppercase tracking-[0.2em]"
                  disabled={updatingOrderId === order.id}
                >
                  {orderStatuses.map((status) => (
                    <option key={status} value={status}>
                      {status.replace(/_/g, " ")}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[2rem] border border-dashed border-brand-beige bg-white p-10 text-center shadow-soft">
            <h3 className="font-heading text-4xl">No orders yet</h3>
            <p className="mt-4 text-sm text-neutral-600">Orders will appear here after customers complete checkout.</p>
          </div>
        )}
      </div>
    </>
  );
}
