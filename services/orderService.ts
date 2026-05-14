import { adminDb } from "@/lib/firebase-admin";

import type { Order, OrderStatus, OrderItem } from "../types/order";
import { inventoryService } from "./inventoryService";

export const orderService = {
  // CREATE ORDER
  async createOrder(input: {
    customerId: string;
    items: OrderItem[];
    comments?: string;
  }): Promise<string> {
    const ref = adminDb.collection("orders").doc();

    const order: Order = {
      id: ref.id,
      customerId: input.customerId,
      items: input.items,
      payments: [],
      orderStatus: "PENDIENTE",
      createdAt: new Date(),
      comments: input.comments || "",
    };

    await ref.set(order);
    for (const item of input.items) {
      await inventoryService.registerMovement({
        plantId: item.plantId,
        type: "OUT",
        quantity: item.quantity,
        orderId: ref.id,
        sectionId: ""
      });
    }

    return ref.id;
  },

  // GET ONE
  async getOrder(orderId: string): Promise<Order | null> {
    const snap = await adminDb.collection("orders").doc(orderId).get();

    if (!snap.exists) return null;

    return snap.data() as Order;
  },

  // GET ALL
  async getOrders(): Promise<Order[]> {
    const snap = await adminDb.collection("orders").get();

    return snap.docs.map((d) => d.data() as Order);
  },

  // UPDATE PARTIAL ORDER
  async updateOrder(orderId: string, data: Partial<Order>) {
    await adminDb.collection("orders").doc(orderId).update(data);
  },

  // DELETE ORDER
  async deleteOrder(orderId: string) {
    await adminDb.collection("orders").doc(orderId).delete();
  },

  // UPDATE STATUS MANUAL (admin override)
  async updateStatus(orderId: string, status: OrderStatus) {
    await adminDb.collection("orders").doc(orderId).update({
      orderStatus: status,
    });
  },

  // RECOMPUTE STATUS FROM PAYMENTS
  async recalcStatus(order: Order): Promise<OrderStatus> {
    const totalPaid = order.payments.reduce(
      (sum, p) => sum + p.amount,
      0
    );

    const total = order.items.reduce(
      (sum, i) => sum + i.price * i.quantity,
      0
    );

    if (totalPaid >= total) return "PAGADA";

    return "PENDIENTE";
  },
};