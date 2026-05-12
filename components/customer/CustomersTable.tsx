"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import type { Customer } from "@/types/customer";
import { useRouter } from "next/navigation";

type Props = {
  customers: Customer[];
};

export default function CustomersTable({ customers }: Props) {
  const router = useRouter();

  if (!customers.length) return <p>No hay clientes registrados.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Apellido</TableHead>
          <TableHead>RUT</TableHead>
          <TableHead>Teléfono</TableHead>
          <TableHead>Email</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {customers.map((customer) => (
          <TableRow
            key={customer.id}
            onClick={() => router.push(`/customers/${customer.id}/edit`)}
            className="cursor-pointer hover:bg-green-50 transition"
          >
            <TableCell>{customer.name}</TableCell>

            <TableCell>{customer.lastname ?? "-"}</TableCell>

            <TableCell>{customer.rut ?? "-"}</TableCell>

            <TableCell>{customer.phone ?? "-"}</TableCell>

            <TableCell>{customer.email ?? "-"}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}