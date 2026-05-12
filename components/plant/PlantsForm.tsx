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

export default function PlantsForm({
  initialData,
  onSubmit,
  loading,
}: Props) {
  const emptyState = {
    name: "",
    category: "NATIVO" as PlantType,
    minHeight: 0,
    maxHeight: 0,
    year: 0,
    wholesale: 0,
    retail: 0,
    iva: 0,
    comments: "",
  };

  const [name, setName] = useState(initialData?.name ?? emptyState.name);
  const [category, setCategory] = useState<PlantType>(
    initialData?.category ?? emptyState.category
  );
  const [minHeight, setMinHeight] = useState(
    initialData?.heightRangeCm.min ?? emptyState.minHeight
  );
  const [maxHeight, setMaxHeight] = useState(
    initialData?.heightRangeCm.max ?? emptyState.maxHeight
  );
  const [year, setYear] = useState(
    initialData?.plantationYear ?? emptyState.year
  );
  const [wholesale, setWholesale] = useState(
    initialData?.prices.wholesale ?? emptyState.wholesale
  );
  const [retail, setRetail] = useState(
    initialData?.prices.retail ?? emptyState.retail
  );
  const [iva, setIva] = useState(
    initialData?.prices.withIVA ?? emptyState.iva
  );
  const [comments, setComments] = useState(
    initialData?.comments ?? emptyState.comments
  );

  function resetForm() {
    setName(emptyState.name);
    setCategory(emptyState.category);
    setMinHeight(emptyState.minHeight);
    setMaxHeight(emptyState.maxHeight);
    setYear(emptyState.year);
    setWholesale(emptyState.wholesale);
    setRetail(emptyState.retail);
    setIva(emptyState.iva);
    setComments(emptyState.comments);
  }

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

    // 👉 SOLO reset si es creación
    if (!initialData) {
      resetForm();
    }
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
              value={minHeight}
              onChange={(e) => setMinHeight(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs">Max</label>
            <Input
              type="number"
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
              value={wholesale}
              onChange={(e) => setWholesale(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs">Al Detalle</label>
            <Input
              type="number"
              value={retail}
              onChange={(e) => setRetail(Number(e.target.value))}
            />
          </div>

          <div className="flex flex-col w-full">
            <label className="text-xs">Con IVA</label>
            <Input
              type="number"
              value={iva}
              onChange={(e) => setIva(Number(e.target.value))}
            />
          </div>
        </div>
      </div>

      <div>
        <label className="text-sm">Comentarios</label>
        <Input
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <Button type="submit" loading={loading}>
        {loading
          ? "Guardando..."
          : initialData
          ? "Actualizar planta"
          : "Crear planta"}
      </Button>
    </form>
  );
}