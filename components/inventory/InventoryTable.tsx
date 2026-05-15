"use client";

import { useRouter } from "next/navigation";
import { DataTable } from "@/components/table/DataTable";

import type { InventoryMovement } from "@/types/inventory";
import type { Plant } from "@/types/plant";
import type { Section } from "@/types/inventory";
import { getPlantAge } from "@/lib/utils";

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

  const plantDetailsMap = Object.fromEntries(
    plants.map((p) => [p.id, p])
  );

  const sectionMap = Object.fromEntries(
    sections.map((s) => [s.id, s.name])
  );

  return (
    <DataTable
      data={movements}
      emptyMessage="No hay movimientos de inventario."
      onRowClick={(m) =>
        router.push(`/inventory/${m.id}/edit`)
      }
      columns={[
        {
          header: "Planta",
          render: (m) => plantMap[m.plantId] ?? "—",
        },
        {
          header: "Año plantación",
          render: (m) => {
            const plant = plantDetailsMap[m.plantId];
            return plant?.plantationYear ? getPlantAge(plant.plantationYear) : "—";
          },
        },
        {
          header: "Tamaño",
          render: (m) => {
            const plant = plantDetailsMap[m.plantId];
            return plant
              ? `${plant.heightRangeCm.min}-${plant.heightRangeCm.max} cm`
              : "—";
          },
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