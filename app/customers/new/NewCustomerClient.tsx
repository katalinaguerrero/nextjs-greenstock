"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Customer } from "@/types/customer";
import CustomerForm from "@/components/customer/CustomersForm";

export default function NewCustomerClient({
  onCreate,
}: {
  onCreate: (data: Omit<Customer, "id">) => Promise<void>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Omit<Customer, "id">) => {
    setLoading(true);

    try {
      await onCreate(data);
      router.push("/customers");
    } finally {
      setLoading(false);
    }
  };

  return (
    <CustomerForm onSubmit={handleSubmit} loading={loading} />
  );
}