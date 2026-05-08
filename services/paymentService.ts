import { adminDb } from "@/lib/firebase-admin";
import type { Payment, Order } from "@/types/order";

export const paymentService = {
  // add payment
  async addPayment(input: {
    orderId: string;
    amount: number;
    method: Payment["method"];
    comments?: string;
  }) {
    // 1. crear payment
    const paymentRef = adminDb.collection("payments").doc();

    const payment = {
      id: paymentRef.id,
      orderId: input.orderId,
      amount: input.amount,
      method: input.method,
      comments: input.comments || "",
      createdAt: new Date(),
      paidAt: new Date(),
    };

    await paymentRef.set(payment);

    // 2. obtener order
    const orderRef = adminDb.collection("orders").doc(input.orderId);
    const snap = await orderRef.get();

    if (!snap.exists) return;

    const order = snap.data() as Order;

    // 3. actualizar payments en order
    const updatedPayments = [
      ...(order.payments || []),
      payment,
    ];

    await orderRef.update({
      payments: updatedPayments,
    });

    return paymentRef.id;
  },
};