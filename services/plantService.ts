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

    if (!id || typeof id !== "string") {
      throw new Error("getPlant: id is required and must be a string");
    }

    const snap = await adminDb.collection("plants").doc(id).get();

    if (!snap.exists) return null;

    return {
      id: snap.id,
      ...snap.data(),
    } as Plant;
  },

  async getPlants(): Promise<Plant[]> {
    const snap = await adminDb.collection("plants").orderBy("name","asc").get();

    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Plant[];
  },

  async updatePlant(id: string, data: Partial<Plant>) {
    if (!id || typeof id !== "string") {
      throw new Error("updatePlant: id is required");
    }

    await adminDb.collection("plants").doc(id).update(data);
  },

  async deletePlant(id: string) {
    if (!id || typeof id !== "string") {
      throw new Error("deletePlant: id is required");
    }

    await adminDb.collection("plants").doc(id).delete();
  },

  async increaseStock(plantId: string, qty: number) {
    if (!plantId) throw new Error("plantId required");

    await adminDb.collection("plants").doc(plantId).update({
      stock: FieldValue.increment(qty),
    });
  },

  async decreaseStock(plantId: string, qty: number) {
    if (!plantId) throw new Error("plantId required");

    await adminDb.collection("plants").doc(plantId).update({
      stock: FieldValue.increment(-qty),
    });
  },
};