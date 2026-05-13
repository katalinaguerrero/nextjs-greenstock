"use client";

import { useRouter } from "next/navigation";

import { DataTable } from "@/components/table/DataTable";
import type { Plant } from "@/types/plant";
import { getPlantAge } from "@/lib/utils";

type Props = {
  plants: Plant[];
};

export default function PlantsTable({ plants }: Props) {
  const router = useRouter();

  return (
    <DataTable
      data={plants}
      emptyMessage="No hay plantas registradas."
      onRowClick={(plant) =>
        router.push(`/plants/${plant.id}/edit`)
      }
      columns={[
        {
          header: "Nombre",
          render: (plant) => plant.name,
        },
        {
          header: "Categoría",
          render: (plant) => plant.category,
        },
        {
          header: "Altura (cm)",
          render: (plant) =>
            `${plant.heightRangeCm.min} - ${plant.heightRangeCm.max}`,
        },
        {
          header: "Edad",
          render: (plant) =>
            getPlantAge(plant.plantationYear),
        },
        {
          header: "Precio",
          render: (plant) =>
            `$${plant.prices.retail.toLocaleString("es-CL")}`,
        },
      ]}
    />
  );
}