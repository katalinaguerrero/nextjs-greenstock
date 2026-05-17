import { adminDb } from "@/lib/firebase-admin";
import type { Customer } from "@/types/customer";

export const customerService = {
  async createCustomer(input: Omit<Customer, "id">): Promise<string> {
    const ref = adminDb.collection("customers").doc();

    const customer: Customer = {
      id: ref.id,
      ...input,
    };

    await ref.set(customer);

    return ref.id;
  },

  async getCustomer(id: string): Promise<Customer | null> {
    if (!id || typeof id !== "string") {
      throw new Error("getCustomer: id is required and must be a string");
    }

    const snap = await adminDb.collection("customers").doc(id).get();

    if (!snap.exists) return null;

    return {
      id: snap.id,
      ...snap.data(),
    } as Customer;
  },

  async getCustomers(): Promise<Customer[]> {
    const snap = await adminDb.collection("customers").orderBy("name").get();

    return snap.docs.map((doc) => ({
      id: doc.id,
      ...doc.data(),
    })) as Customer[];
  },

  async updateCustomer(id: string, data: Partial<Customer>) {
    if (!id || typeof id !== "string") {
      throw new Error("updateCustomer: id is required");
    }

    await adminDb.collection("customers").doc(id).update(data);
  },

  async deleteCustomer(id: string) {
    if (!id || typeof id !== "string") {
      throw new Error("deleteCustomer: id is required");
    }

    await adminDb.collection("customers").doc(id).delete();
  },
};