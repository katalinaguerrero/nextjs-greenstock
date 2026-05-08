
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
    const snap = await adminDb.collection("customers").doc(id).get();

    if (!snap.exists) return null;

    return snap.data() as Customer;
  },

  async getCustomers(): Promise<Customer[]> {
    const snap = await adminDb.collection("customers").get();

    return snap.docs.map((d) => d.data() as Customer);
  },

  async updateCustomer(id: string, data: Partial<Customer>) {
    await adminDb.collection("customers").doc(id).update(data);
  },

  async deleteCustomer(id: string) {
    await adminDb.collection("customers").doc(id).delete();
  },
};