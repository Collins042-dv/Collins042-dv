import type { Order } from "@/services/orders";
import { getAllOrders, updateOrderStatus } from "@/services/orders";

export interface AdminOrderService {
  list(): Promise<Order[]>;
  getById(id: string): Promise<Order | null>;
  updateStatus(id: string, status: string): Promise<Order>;
  exportOrders(): Promise<Order[]>;
}

export const adminOrderService: AdminOrderService = {
  async list() {
    return getAllOrders();
  },
  async getById(id) {
    const orders = await getAllOrders();
    return orders.find((order) => order.id === id) ?? null;
  },
  async updateStatus(id, status) {
    return updateOrderStatus(id, status);
  },
  async exportOrders() {
    return getAllOrders();
  },
};
