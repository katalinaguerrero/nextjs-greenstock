"use client";

import type { Plant } from "@/types/plant";
import PlantsForm from "@/components/plant/PlantsForm";
import { useRouter } from "next/navigation";

export default function EditPlantClient({
  plant,
  onUpdate,
}: {
  plant: Plant;
  onUpdate: (data: Omit<Plant, "id">) => Promise<void>;
}) {
  const router = useRouter();

  const handleSubmit = async (data: Omit<Plant, "id">) => {
    await onUpdate(data);
    router.push("/plants");
  };

  return (
    <div>
      <PlantsForm
        initialData={plant}
        onSubmit={handleSubmit}
      />
    </div>
  );
}