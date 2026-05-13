import { notFound } from "next/navigation";

import { plantService } from "@/services/plantService";
import type { Plant } from "@/types/plant";

import PlantsForm from "@/components/plant/PlantsForm";
import { EditEntity } from "@/components/crud/EditEntity";
import { Title } from "@/components/ui/Title";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  if (!id) notFound();

  const plant = await plantService.getPlant(id);

  if (!plant) notFound();

  async function updatePlant(data: Omit<Plant, "id">) {
    "use server";

    await plantService.updatePlant(id, data);
  }

  return (
    <>
      <Title>Editar Planta</Title>

      <EditEntity<Omit<Plant, "id">, Plant>
        initialData={plant}
        Form={PlantsForm}
        onUpdate={updatePlant}
        redirectTo="/plants"
      />
    </>
  );
}