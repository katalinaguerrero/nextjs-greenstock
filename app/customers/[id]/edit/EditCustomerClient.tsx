"use client";

import { useState } from "react";
import type { Customer } from "@/types/customer";
import CustomerForm from "@/components/customer/CustomersForm";
import { useRouter } from "next/navigation";

export default function EditCustomerClient({
  customer,
  onUpdate,
}: {
  customer: Customer;
  onUpdate: (data: Omit<Customer, "id">) => Promise<void>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Omit<Customer, "id">) => {
    setLoading(true);

    try {
      await onUpdate(data);
      router.push("/customers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomerForm
      initialData={customer}
      onSubmit={handleSubmit}
      loading={loading}
    />
  );
}