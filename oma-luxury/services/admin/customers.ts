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
