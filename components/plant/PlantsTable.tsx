
"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";
import type { Plant } from "@/types/plant";
import { useRouter } from "next/navigation";

type Props = {
  plants: Plant[];
};

export default function PlantsTable({ plants }: Props) {
  const router = useRouter();
  if (!plants.length) return <p>No hay plantas registradas.</p>;

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Nombre</TableHead>
          <TableHead>Categoría</TableHead>
          <TableHead>Altura (cm)</TableHead>
          <TableHead>Año plantación</TableHead>
          <TableHead>Precio retail</TableHead>
        </TableRow>
      </TableHeader>

      <TableBody>
        {plants.map((plant) => (
          <TableRow
            key={plant.id}
            onClick={() => router.push(`/plants/${plant.id}/edit`)}
            className="cursor-pointer hover:bg-green-50 transition"
          >
            <TableCell>{plant.name}</TableCell>

            <TableCell>{plant.category}</TableCell>

            <TableCell>
              {plant.heightRangeCm.min} - {plant.heightRangeCm.max}
            </TableCell>

            <TableCell>{plant.plantationYear}</TableCell>

            <TableCell>${plant.prices.retail.toLocaleString()}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}
