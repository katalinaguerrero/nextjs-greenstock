import { adminDb } from "@/lib/firebase-admin";
import { plantService } from "./plantService";

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

    // 2. actualizar stock automáticamente
    if (input.type === "IN") {
      await plantService.increaseStock(input.plantId, input.quantity);
    } else {
      await plantService.decreaseStock(input.plantId, input.quantity);
    }
  },
};