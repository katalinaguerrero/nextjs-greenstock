import { plantService } from "@/services/plantService";
import PlantForm from "@/components/plant/PlantsForm";
import type { Plant } from "@/types/plant";
import { Title } from "@/components/ui/Title";

export default function NewPlantPage() {
  async function handleCreate(data: Omit<Plant, "id">) {
    "use server";

    await plantService.createPlant(data);
  }

  return (
    <div>
      <Title>Agregar Planta Nueva</Title>

      <PlantForm onSubmit={handleCreate} />
    </div>
  );
}