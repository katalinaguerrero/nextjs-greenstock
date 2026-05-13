"use client";

import { useRouter } from "next/navigation";

import { DataTable } from "@/components/table/DataTable";
import type { Customer } from "@/types/customer";

type Props = {
  customers: Customer[];
};

export default function CustomersTable({ customers }: Props) {
  const router = useRouter();

  return (
    <DataTable
      data={customers}
      emptyMessage="No hay clientes."
      onRowClick={(customer) =>
        router.push(`/customers/${customer.id}/edit`)
      }
      columns={[
        {
          header: "Nombre",
          render: (customer) => customer.name,
        },
        {
          header: "Apellido",
          render: (customer) => customer.lastname,
        },
        {
          header: "Teléfono",
          render: (customer) => customer.phone,
        },
        {
          header: "Email",
          render: (customer) => customer.email,
        },
      ]}
    />
  );
}