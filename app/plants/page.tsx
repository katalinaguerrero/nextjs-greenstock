import { plantService } from "@/services/plantService";
import PlantsTable from "@/components/plant/PlantsTable";
import PageHeader from "@/components/layout/PageHeader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function PlantsPage() {
  const plants = await plantService.getPlants();

  return (
    <div>
        <PageHeader
        title="Lista de Plantas"
        createHref="/plants/new"
        createLabel="+ Nueva planta"
      />
      <PlantsTable plants={plants} />
    </div>
  );
}