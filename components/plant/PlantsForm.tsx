"use client";

import { useState } from "react";
import type { Plant, PlantType } from "@/types/plant";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Select from "../ui/Select";
import { plantTypeOptions } from "@/constants/plantTypes";

type Props = {
  initialData?: Plant;
  onSubmit: (data: Omit<Plant, "id">) => void;
  loading?: boolean;
};

export default function PlantsForm({ initialData, onSubmit, loading }: Props) {
  const [name, setName] = useState(initialData?.name ?? "");
  const [category, setCategory] = useState<PlantType>(
    initialData?.category ?? "NATIVO"
  );

  const [minHeight, setMinHeight] = useState(
    initialData?.heightRangeCm.min ?? 0
  );
  const [maxHeight, setMaxHeight] = useState(
    initialData?.heightRangeCm.max ?? 0
  );

  const [year, setYear] = useState(initialData?.plantationYear ?? 0);

  const [wholesale, setWholesale] = useState(
    initialData?.prices.wholesale ?? 0
  );
  const [retail, setRetail] = useState(initialData?.prices.retail ?? 0);
  const [iva, setIva] = useState(initialData?.prices.withIVA ?? 0);

  const [comments, setComments] = useState(initialData?.comments ?? "");

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      name,
      category,
      heightRangeCm: {
        min: minHeight,
        max: maxHeight,
      },
      plantationYear: year,
      prices: {
        wholesale,
        retail,
        withIVA: iva,
      },
      comments: comments || undefined,
    });
  }

  return (
   <form
  onSubmit={handleSubmit}
  className="space-y-4 border rounded-xl p-6 bg-[#dde7c7]"
>
      <div>
        <label className="text-sm">Nombre</label>
        <Input
          placeholder="Nombre"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </div>
      <div>
        <label className="text-sm">Categoría</label>
        <Select
          value={category}
          onChange={(value) => setCategory(value as PlantType)}
          options={plantTypeOptions}
        />
      </div>
      <div>
        <label className="text-sm">Altura (cm)</label>

        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <label className="text-xs">Min</label>
            <Input
              type="number"
              placeholder="Min"
              value={minHeight}
              onChange={(e) => setMinHeight(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs">Max</label>
            <Input
              type="number"
              placeholder="Max"
              value={maxHeight}
              onChange={(e) => setMaxHeight(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm">Año plantación</label>
        <Input
          type="number"
          value={year}
          onChange={(e) => setYear(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="text-sm">Precios</label>

        <div className="flex gap-2">
          <div className="flex flex-col w-full">
            <label className="text-xs">Mayorista</label>
            <Input
              type="number"
              placeholder="Mayorista"
              value={wholesale}
              onChange={(e) => setWholesale(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-xs">Al Detalle</label>
            <Input
              type="number"
              placeholder="Retail"
              value={retail}
              onChange={(e) => setRetail(Number(e.target.value))}
            />
          </div>
          <div className="flex flex-col w-full">
            <label className="text-xs">Con IVA</label>
            <Input
              type="number"
              placeholder="IVA"
              value={iva}
              onChange={(e) => setIva(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm">Comentarios</label>
        <Input value={comments} onChange={(e) => setComments(e.target.value)} />
      </div>

      <Button type="submit" disabled={loading}>
        {loading ? "Guardando..." : initialData ? "Actualizar" : "Crear planta"}
      </Button>
    </form>
  );
}