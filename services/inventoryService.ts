import { adminDb } from "@/lib/firebase-admin";
import { FieldValue } from "firebase-admin/firestore";

export const inventoryService = {
  // movimiento de stock
  async registerMovement(input: {
    plantId: string;
    type: "IN" | "OUT";
    quantity: number;
    orderId?: string;
  }) {
    // 1. guardar movimiento
    await adminDb.collection("inventoryMovements").add({
      ...input,
      createdAt: new Date(),
    });

    // 2. actualizar stock
    const plantRef = adminDb.collection("plants").doc(input.plantId);

    const delta =
      input.type === "IN"
        ? input.quantity
        : -input.quantity;

    await plantRef.update({
      stock: FieldValue.increment(delta),
    });
  },
};