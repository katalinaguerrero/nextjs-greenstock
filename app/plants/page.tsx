import { plantService } from "@/services/plantService";
import PlantsTable from "@/components/plant/PlantsTable";

export default async function PlantsPage() {
  const plants = await plantService.getPlants();

  return (
    <div>
      <h1>Plantas</h1>
      <PlantsTable plants={plants} />
    </div>
  );
}