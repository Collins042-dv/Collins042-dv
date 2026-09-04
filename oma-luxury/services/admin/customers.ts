import type { AuthUser } from "@/services/auth";

export interface AdminCustomerRecord extends AuthUser {
  ordersCount: number;
  totalSpend: number;
  lastOrderAt?: string;
}

export interface AdminCustomerService {
  list(): Promise<AdminCustomerRecord[]>;
  getById(id: string): Promise<AdminCustomerRecord | null>;
  tagCustomer(id: string, tag: string): Promise<void>;
}

async function readCustomers() {
  const response = await fetch("/api/admin/customers", {
    cache: "no-store",
  });

  const payload = (await response.json().catch(() => null)) as
    | { customers?: AdminCustomerRecord[]; error?: string }
    | null;

  if (!response.ok) {
    throw new Error(payload?.error || "Unable to load customers.");
  }

  return payload?.customers ?? [];
}

export const adminCustomerService: AdminCustomerService = {
  async list() {
    return readCustomers();
  },
  async getById(id) {
    const customers = await readCustomers();
    return customers.find((customer) => customer.id === id) ?? null;
  },
  async tagCustomer() {
    throw new Error("Customer tagging will be enabled when the admin CRM backend is connected.");
  },
};
