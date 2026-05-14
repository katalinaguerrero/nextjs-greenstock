import { inventoryService } from "@/services/inventoryService";
import InventoryTable from "@/components/inventory/InventoryTable";
import PageHeader from "@/components/layout/PageHeader";
import { plantService } from "@/services/plantService";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function InventoryPage() {
  const movements = await inventoryService.getMovements();
  const plants = await plantService.getPlants();
  const sections = await inventoryService.getAllSections();
  console.log(movements);
  console.log(plants);
  console.log(sections);


  return (
    <div>
      <PageHeader
        title="Inventario"
        createHref="/inventory/new"
        createLabel="+ Nuevo movimiento"
      />

      <InventoryTable
        movements={movements}
        plants={plants}
        sections={sections}
      />
    </div>
  );
}