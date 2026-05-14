"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/table/DataTable";

import type { InventoryMovement } from "@/types/inventory";
import type { Plant } from "@/types/plant";
import type { Section } from "@/types/inventory";

type Props = {
  movements: InventoryMovement[];
  plants: Plant[];
  sections: Section[];
};

export default function InventoryTable({
  movements,
  plants,
  sections,
}: Props) {
  const router = useRouter();

  const plantMap = Object.fromEntries(
    plants.map((p) => [p.id, p.name])
  );

  const sectionMap = Object.fromEntries(
    sections.map((s) => [s.id, s.name])
  );

  return (
    <DataTable
      data={movements}
      emptyMessage="No hay movimientos de inventario."
      onRowClick={(m) =>
        router.push(`/inventory/${m.id}`)
      }
      columns={[
        {
          header: "Planta",
          render: (m) => plantMap[m.plantId] ?? "—",
        },
        {
          header: "Tipo",
          render: (m) =>
            m.type === "IN" ? "Entrada" : "Salida",
        },
        {
          header: "Cantidad",
          render: (m) => m.quantity,
        },
        {
          header: "Sección",
          render: (m) => sectionMap[m.sectionId] ?? "—",
        },
        {
          header: "Orden",
          render: (m) => m.orderId ?? "-",
        },
        {
          header: "Comentarios",
          render: (m) => m.comments ?? "-",
        },
        {
          header: "Fecha",
           render: (m) => new Date(m.createdAt).toLocaleString("es-CL"),
        },
      ]}
    />
  );
}