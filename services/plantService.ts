import { adminDb } from "@/lib/firebase-admin";
import type { Plant } from "@/types/plant";
import { FieldValue } from "firebase-admin/firestore";

export const plantService = {
  async createPlant(input: Omit<Plant, "id">): Promise<string> {
    const ref = adminDb.collection("plants").doc();

    const plant: Plant = {
      id: ref.id,
      ...input,
    };

    await ref.set(plant);

    return ref.id;
  },

  async getPlant(id: string): Promise<Plant | null> {
    const snap = await adminDb.collection("plants").doc(id).get();

    if (!snap.exists) return null;

    return snap.data() as Plant;
  },

  async getPlants(): Promise<Plant[]> {
    const snap = await adminDb.collection("plants").get();

    return snap.docs.map((d) => d.data() as Plant);
  },

  async updatePlant(id: string, data: Partial<Plant>) {
    await adminDb.collection("plants").doc(id).update(data);
  },

  async deletePlant(id: string) {
    await adminDb.collection("plants").doc(id).delete();
  },
  async increaseStock(plantId: string, qty: number) {
    await adminDb.collection("plants").doc(plantId).update({
      stock: FieldValue.increment(qty),
    });
  },

  async decreaseStock(plantId: string, qty: number) {
    await adminDb.collection("plants").doc(plantId).update({
      stock: FieldValue.increment(-qty),
    });
  },
};
