import { plantService } from "@/services/plantService";
import type { Plant } from "@/types/plant";

import PlantsForm from "@/components/plant/PlantsForm";
import { CreateEntity } from "@/components/crud/CreateEntity";
import { Title } from "@/components/ui/Title";

export default function NewPlantPage() {
  async function handleCreate(data: Omit<Plant, "id">) {
    "use server";

    await plantService.createPlant(data);
  }

  return (
    <>
      <Title>Agregar Planta</Title>

      <CreateEntity<Omit<Plant, "id">>
        Form={PlantsForm}
        onCreate={handleCreate}
        redirectTo="/plants"
      />
    </>
  );
}