"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Plant } from "@/types/plant";
import PlantsForm from "@/components/plant/PlantsForm";

export default function NewPlantClient({
  onCreate,
}: {
  onCreate: (data: Omit<Plant, "id">) => Promise<void>;
}) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (data: Omit<Plant, "id">) => {
    setLoading(true);

    try {
      await onCreate(data);
      router.push("/plants");
    } finally {
      setLoading(false);
    }
  };

  return <PlantsForm onSubmit={handleSubmit} loading={loading} />;
}