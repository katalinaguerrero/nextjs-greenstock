"use client";

import { useState } from "react";

import type { InventoryMovement } from "@/types/inventory";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Select from "@/components/ui/Select";

type Props = {
  plants?: { label: string; value: string }[];
  sections?: { label: string; value: string }[]; // 👈 NUEVO
  initialData?: Omit<InventoryMovement, "id" | "createdAt">;
  onSubmit: (data: Omit<InventoryMovement, "id" | "createdAt">) => void;
  loading?: boolean;
};

export default function InventoryMovementForm({
  plants = [],
  sections = [],
  initialData,
  onSubmit,
  loading,
}: Props) {
  const emptyState: Omit<InventoryMovement, "id" | "createdAt"> = {
    plantId: "",
    type: "IN",
    quantity: 0,
    sectionId: "", // 👈 FIX
    orderId: undefined,
    comments: undefined,
  };

  const [plantId, setPlantId] = useState(
    initialData?.plantId ?? emptyState.plantId
  );

  const [type, setType] = useState<"IN" | "OUT">(
    initialData?.type ?? emptyState.type
  );

  const [quantity, setQuantity] = useState(
    initialData?.quantity ?? emptyState.quantity
  );

  const [sectionId, setSectionId] = useState(
    initialData?.sectionId ?? emptyState.sectionId
  );

  const [orderId, setOrderId] = useState(
    initialData?.orderId ?? ""
  );

  const [comments, setComments] = useState(
    initialData?.comments ?? ""
  );

  function resetForm() {
    setPlantId("");
    setType("IN");
    setQuantity(0);
    setSectionId("");
    setOrderId("");
    setComments("");
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      plantId,
      type,
      quantity,
      sectionId, // 👈 FIX REAL
      orderId: orderId.trim() ? orderId : undefined,
      comments: comments.trim() ? comments : undefined,
    });

    if (!initialData) resetForm();
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border rounded-xl p-6 bg-[#dde7c7]"
    >
      <div>
        <label className="text-sm">Planta</label>

        <Select
          value={plantId}
          onChange={setPlantId}
          options={plants}
        />
      </div>

      <div>
        <label className="text-sm">Sección</label>

        <Select
          value={sectionId}
          onChange={setSectionId}
          options={sections}
        />
      </div>

      <div>
        <label className="text-sm">Tipo</label>

        <Select
          value={type}
          onChange={(value) => setType(value as "IN" | "OUT")}
          options={[
            { label: "Entrada", value: "IN" },
            { label: "Salida", value: "OUT" },
          ]}
        />
      </div>

      <div>
        <label className="text-sm">Cantidad</label>

        <Input
          type="number"
          value={quantity}
          onChange={(e) => setQuantity(Number(e.target.value))}
        />
      </div>

      <div>
        <label className="text-sm">Order ID (opcional)</label>

        <Input
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm">Comentarios (opcional)</label>

        <Input
          value={comments}
          onChange={(e) => setComments(e.target.value)}
        />
      </div>

      <Button type="submit" loading={loading}>
        {loading
          ? "Guardando..."
          : initialData
          ? "Actualizar movimiento"
          : "Registrar movimiento"}
      </Button>
    </form>
  );
}