"use client";

import { useEffect, useState } from "react";
import { formatCurrency } from "@/lib/utils";
import { adminCustomerService } from "@/services/admin/customers";
import { adminOrderService } from "@/services/admin/orders";
import { adminProductService } from "@/services/admin/products";

interface SummaryState {
  products: number;
  customers: number;
  orders: number;
  revenue: number;
  error: string;
}

export function OverviewClient() {
  const [summary, setSummary] = useState<SummaryState>({
    products: 0,
    customers: 0,
    orders: 0,
    revenue: 0,
    error: "",
  });

  useEffect(() => {
    Promise.allSettled([
      adminProductService.list(),
      adminCustomerService.list(),
      adminOrderService.list(),
    ]).then(([products, customers, orders]) => {
      const orderRows = orders.status === "fulfilled" ? orders.value : [];
      setSummary({
        products: products.status === "fulfilled" ? products.value.length : 0,
        customers: customers.status === "fulfilled" ? customers.value.length : 0,
        orders: orderRows.length,
        revenue: orderRows.reduce((total, order) => total + order.total, 0),
        error:
          customers.status === "rejected"
            ? customers.reason instanceof Error
              ? customers.reason.message
              : "Some dashboard data could not be loaded."
            : "",
      });
    });
  }, []);

  return (
    <div className="space-y-6">
      {summary.error ? (
        <div className="rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {summary.error}
        </div>
      ) : null}
      <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
        {[
          { label: "Products", value: summary.products.toString() },
          { label: "Customers", value: summary.customers.toString() },
          { label: "Orders", value: summary.orders.toString() },
          { label: "Revenue", value: formatCurrency(summary.revenue) },
        ].map((card) => (
          <div key={card.label} className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
            <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{card.label}</p>
            <p className="mt-4 font-heading text-5xl">{card.value}</p>
          </div>
        ))}
      </div>
      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
          <h3 className="font-heading text-3xl">Operational focus</h3>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-neutral-600">
            <li>Keep catalog content fresh through the products workspace.</li>
            <li>Review local draft orders until the production order database is connected.</li>
            <li>Seed the first admin from the secure server-side script before launch.</li>
          </ul>
        </div>
        <div className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
          <h3 className="font-heading text-3xl">Integration status</h3>
          <ul className="mt-6 space-y-3 text-sm leading-7 text-neutral-600">
            <li>Supabase Auth and `profiles` role checks now gate customer/admin access.</li>
            <li>Orders and catalog drafts remain replaceable service-layer implementations.</li>
            <li>Payment, media storage and admin analytics still require external production configuration.</li>
          </ul>
        </div>
      </div>
    </div>
  );
}
