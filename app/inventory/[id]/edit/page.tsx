import { notFound } from "next/navigation";
import { inventoryService } from "@/services/inventoryService";
import InventoryForm from "@/components/inventory/InventoryForm";
import { EditEntity } from "@/components/crud/EditEntity";
import { Title } from "@/components/ui/Title";
import { plantService } from "@/services/plantService";
import { getPlantAge } from "@/lib/utils";

import type { InventoryMovement } from "@/types/inventory";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  if (!id) notFound();
  const movement = await inventoryService.getMovementById(id);

  if (!movement) notFound();

  async function handleUpdate(
    data: Omit<InventoryMovement, "id" | "createdAt">
  ) {
    "use server";

    await inventoryService.updateMovement(id, data);
  }

  const plantsRaw = await plantService.getPlants();
  const sectionsRaw = await inventoryService.getAllSections();
  const sections = sectionsRaw.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  const plants = plantsRaw.map((plant) => ({
    label: `${plant.name} | ${getPlantAge(
      plant.plantationYear
    )} años ${plant.heightRangeCm.min}cm - ${
      plant.heightRangeCm.max
    }cm`,
    value: plant.id,
  }));

  return (
    <>
      <Title>Editar Movimiento de Inventario</Title>

      <EditEntity<
        Omit<InventoryMovement, "id" | "createdAt">,
        InventoryMovement
      >
        initialData={movement}
        Form={InventoryForm}
        onUpdate={handleUpdate}
        redirectTo="/inventory"
        formProps={{
          plants,
          sections,
        }}
      />
    </>
  );
}