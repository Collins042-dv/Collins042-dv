"use client";

import { useEffect, useState } from "react";
import { AdminSectionIntro } from "@/components/admin/AdminSectionIntro";
import { formatCurrency } from "@/lib/utils";
import { adminCustomerService, type AdminCustomerRecord } from "@/services/admin/customers";

export function CustomersAdminClient() {
  const [customers, setCustomers] = useState<AdminCustomerRecord[]>([]);
  const [error, setError] = useState("");

  useEffect(() => {
    adminCustomerService
      .list()
      .then(setCustomers)
      .catch((reason: unknown) => {
        setError(reason instanceof Error ? reason.message : "Unable to load customers.");
      });
  }, []);

  return (
    <>
      <AdminSectionIntro
        eyebrow="Customers"
        title="Customer accounts"
        description="Review registered customers from the Supabase `profiles` table and prepare future CRM workflows without exposing admin access in the browser."
      />
      {error ? (
        <div className="mb-6 rounded-[1.5rem] border border-amber-200 bg-amber-50 px-5 py-4 text-sm text-amber-900">
          {error}
        </div>
      ) : null}
      <div className="grid gap-6 lg:grid-cols-2">
        {customers.length ? (
          customers.map((customer) => (
            <div key={customer.id} className="rounded-[2rem] border border-black/5 bg-white p-8 shadow-soft">
              <div className="flex items-start justify-between gap-4">
                <div>
                  <p className="text-xs uppercase tracking-[0.25em] text-neutral-500">{customer.role}</p>
                  <h3 className="mt-2 font-heading text-3xl">{customer.name}</h3>
                  <p className="mt-3 text-sm text-neutral-600">{customer.email}</p>
                </div>
                <div className="rounded-full border border-brand-beige px-4 py-2 text-xs uppercase tracking-[0.2em] text-neutral-600">
                  {customer.ordersCount} orders
                </div>
              </div>
              <div className="mt-6 grid gap-4 sm:grid-cols-2">
                <div className="rounded-[1.5rem] bg-brand-cream px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Total spend</p>
                  <p className="mt-2 text-lg font-semibold text-brand-black">{formatCurrency(customer.totalSpend)}</p>
                </div>
                <div className="rounded-[1.5rem] bg-brand-cream px-4 py-4">
                  <p className="text-xs uppercase tracking-[0.2em] text-neutral-500">Last order</p>
                  <p className="mt-2 text-lg font-semibold text-brand-black">{customer.lastOrderAt ? new Date(customer.lastOrderAt).toLocaleDateString() : "No orders yet"}</p>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="rounded-[2rem] border border-dashed border-brand-beige bg-white p-10 text-center shadow-soft lg:col-span-2">
            <h3 className="font-heading text-4xl">No customer records yet</h3>
            <p className="mt-4 text-sm text-neutral-600">Customer profiles will appear here after registration and the `profiles` table is connected.</p>
          </div>
        )}
      </div>
    </>
  );
}
