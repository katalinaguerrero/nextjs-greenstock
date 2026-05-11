import { notFound } from "next/navigation";
import { plantService } from "@/services/plantService";
import EditPlantClient from "./EditPlantClient";
import { Title } from "@/components/ui/Title";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  if (!id) notFound();

  const plant = await plantService.getPlant(id);

  if (!plant) notFound();

  async function updatePlant(data: Omit<typeof plant, "id">) {
    "use server";
    await plantService.updatePlant(id, data);
  }

  return (
    <>
      <Title>Editar Planta</Title>
      <EditPlantClient plant={plant} onUpdate={updatePlant} />
    </>
  );
}