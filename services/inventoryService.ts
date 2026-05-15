import { adminDb } from "@/lib/firebase-admin";
import { plantService } from "./plantService";

export const inventoryService = {
  // =========================
  // MOVIMIENTOS
  // =========================
  async registerMovement(input: {
    plantId: string;
    type: "IN" | "OUT";
    quantity: number;
    sectionId: string;
    orderId?: string;
    comments?: string;
  }) {
    await adminDb.collection("inventoryMovements").add({
      ...input,
      createdAt: new Date(),
    });

    if (input.type === "IN") {
      await plantService.increaseStock(input.plantId, input.quantity);
    } else {
      await plantService.decreaseStock(input.plantId, input.quantity);
    }
  },
  // =========================
  // MOVEMENTS - READ
  // =========================
  async getMovements() {
    const snapshot = await adminDb
      .collection("inventoryMovements")
      .orderBy("createdAt", "desc")
      .get();

    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        plantId: data.plantId,
        type: data.type,
        quantity: data.quantity,
        sectionId: data.sectionId,
        orderId: data.orderId ?? null,
        comments: data.comments ?? null,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
      };
    });
  },
  async getMovementById(id: string) {
    console.log(id);
    const doc = await adminDb.collection("inventoryMovements").doc(id).get();

    if (!doc.exists) return null;

    const data = doc.data();

    return {
      id: doc.id,
      plantId: data?.plantId,
      type: data?.type,
      quantity: data?.quantity,
      sectionId: data?.sectionId,
      orderId: data?.orderId ?? null,
      comments: data?.comments ?? null,
      createdAt: data?.createdAt?.toDate?.().toISOString() ?? null,
    };
  },
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  async updateMovement(id: string, input: any) {
  if (!id || typeof id !== "string") {
    throw new Error("Invalid movement id");
  }

  return adminDb
    .collection("inventoryMovements")
    .doc(id)
    .update(input);
},
  // =========================
  // SECTIONS
  // =========================
  async getAllSections() {
    const snapshot = await adminDb.collection("sections").orderBy("name", "asc").get();
    return snapshot.docs.map((doc) => {
      const data = doc.data();

      return {
        id: doc.id,
        name: data.name,
        location: data.location ?? null,
        createdAt: data.createdAt?.toDate?.().toISOString() ?? null,
      };
    });
  },

  async getSectionById(id: string) {
    const doc = await adminDb.collection("sections").doc(id).get();

    if (!doc.exists) return null;

    return {
      id: doc.id,
      ...(doc.data() as {
        name: string;
        location?: string;
      }),
    };
  },
};