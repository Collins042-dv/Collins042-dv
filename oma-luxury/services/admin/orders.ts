import type { Order } from "@/services/orders";

export interface AdminOrderService {
  list(): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  updateStatus(id: string, status: string): Promise<Order>;
  exportOrders(): Promise<Order[]>;
}
