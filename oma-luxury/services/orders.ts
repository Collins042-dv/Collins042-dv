import type { CartItem, CheckoutFormData } from "@/types/commerce";

const ORDERS_KEY = "oma-luxury-orders";

export interface Order {
  id: string;
  userId?: string;
  items: CartItem[];
  total: number;
  subtotal: number;
  status: string;
  createdAt: string;
  customer: CheckoutFormData;
}

interface CreateOrderData {
  items: CartItem[];
  total: number;
  subtotal: number;
  customer: CheckoutFormData;
}

function getStorage() {
  if (typeof window === "undefined") {
    return null;
  }
  return window.localStorage;
}

function readOrders(): Order[] {
  const storage = getStorage();
  if (!storage) {
    return [];
  }
  const raw = storage.getItem(ORDERS_KEY);
  return raw ? (JSON.parse(raw) as Order[]) : [];
}

function writeOrders(orders: Order[]) {
  const storage = getStorage();
  if (!storage) {
    return;
  }
  storage.setItem(ORDERS_KEY, JSON.stringify(orders));
}

export async function createOrder(data: CreateOrderData): Promise<Order> {
  const orders = readOrders();
  const order: Order = {
    id: `OMA-${Date.now().toString().slice(-8)}`,
    userId: data.customer.userId,
    items: data.items,
    total: data.total,
    subtotal: data.subtotal,
    status: "PENDING_CONFIRMATION",
    createdAt: new Date().toISOString(),
    customer: data.customer,
  };
  orders.unshift(order);
  writeOrders(orders);
  return order;
}

export async function getOrders(userId: string): Promise<Order[]> {
  return readOrders().filter((order) => order.userId === userId);
}
