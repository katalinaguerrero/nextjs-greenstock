import { plantService } from "@/services/plantService";
import { Title } from "@/components/ui/Title";
import NewPlantClient from "./NewPlantClient";
import type { Plant } from "@/types/plant";

export default function NewPlantPage() {
  async function handleCreate(data: Omit<Plant, "id">) {
    "use server";
    await plantService.createPlant(data);
  }

  return (
    <>
      <Title>Agregar Planta Nueva</Title>

      <NewPlantClient onCreate={handleCreate} />
    </>
  );
}