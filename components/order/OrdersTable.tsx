"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/table/DataTable";
import type { Order } from "@/types/order";
import { statusStyles } from "@/lib/entityStyles";

type Props = {
  orders: Order[];
  customerMap: Record<string, string>;
};

export default function OrdersTable({ orders, customerMap }: Props) {
  const router = useRouter();

  return (
    <DataTable
      data={orders}
      emptyMessage="No hay órdenes."
      onRowClick={(order) => router.push(`/orders/${order.id}/edit`)}
      columns={[
        {
          header: "Cliente",
          render: (order) => customerMap[order.customerId] ?? "-",
        },
        {
          header: "Estado",
          render: (order) => {
            return (
              <span
                className={`px-2 py-1 rounded text-xs font-medium ${statusStyles[order.orderStatus]}`}
              >
                {order.orderStatus}
              </span>
            );
          },
        },
        { header: "Items", render: (order) => order.items.length },
        {
          header: "Total",
          render: (order) =>
            `$${order.items.reduce(
              (sum, item) => sum + item.quantity * item.price,
              0,
            )}`,
        },
        {
          header: "Pagado",
          render: (order) =>
            `$${order.payments.reduce((sum, p) => sum + p.amount, 0)}`,
        },
      ]}
    />
  );
}