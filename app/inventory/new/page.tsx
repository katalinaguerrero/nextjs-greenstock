import { inventoryService } from "@/services/inventoryService";

import type { InventoryMovement } from "@/types/inventory";

import InventoryForm from "@/components/inventory/InventoryForm";
import { CreateEntity } from "@/components/crud/CreateEntity";
import { Title } from "@/components/ui/Title";
import { plantService } from "@/services/plantService";
import { getPlantLabel } from "@/lib/utils";
export default async function NewInventoryMovementPage() {
  async function handleCreate(
    data: Omit<InventoryMovement, "id" | "createdAt">
  ) {
    "use server";

    await inventoryService.registerMovement(data);
  }

  const plantsRaw = await plantService.getPlants();
  const sectionsRaw = await inventoryService.getAllSections();

  const sections = sectionsRaw.map((s) => ({
    label: s.name,
    value: s.id,
  }));

  const plants = plantsRaw.map((plant) => ({
    label: getPlantLabel(plant),
    value: plant.id,
  }));

  return (
    <>
      <Title>Agregar Movimiento de Inventario</Title>

      <CreateEntity
        Form={InventoryForm}
        onCreate={handleCreate}
        redirectTo="/inventory"
        formProps={{
          plants,
          sections,
        }}
      />
    </>
  );
}