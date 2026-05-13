import { plantService } from "@/services/plantService";
import { notFound } from "next/navigation";
import { EntityView } from "@/components/table/EntityView";
import { plantConfig } from "@/config/plantConfig";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const plant = await plantService.getPlant(id);

  if (!plant) notFound();

  return (
    <EntityView
      data={plant}
      config={plantConfig}
      backTo="/plants"
      editTo={`/plants/${plant.id}/edit`}
    />
  );
}