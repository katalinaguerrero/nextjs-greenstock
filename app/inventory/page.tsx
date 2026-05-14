import { inventoryService } from "@/services/inventoryService";
import InventoryTable from "@/components/inventory/InventoryTable";
import PageHeader from "@/components/layout/PageHeader";
import { plantService } from "@/services/plantService";
import { Title } from "@/components/ui/Title";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function InventoryPage() {
  const movements = await inventoryService.getMovements();
  const plants = await plantService.getPlants();
  const sections = await inventoryService.getAllSections();

  const totalMovements = movements.length;

  const stockByPlant = plants.map((plant) => {
    const stock = movements.reduce((acc, movement) => {
      if (movement.plantId !== plant.id) return acc;
      return movement.type === "IN" ? acc + movement.quantity : acc - movement.quantity;
    }, 0);

    return {
      ...plant,
      stock,
    };
  });

  const stockBySection = sections.map((section) => {
    const stock = movements.reduce((acc, movement) => {
      if (movement.sectionId !== section.id) return acc;
      return movement.type === "IN" ? acc + movement.quantity : acc - movement.quantity;
    }, 0);

    return {
      ...section,
      stock,
    };
  });

  return (
    <div className="space-y-6">
      <PageHeader
        title="Inventario"
        createHref="/inventory/new"
        createLabel="+ Nuevo movimiento"
      />

      <InventoryTable movements={movements} plants={plants} sections={sections} />

      <div className="space-y-4">
        <Title>🌿 Dashboard de Inventario</Title>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <Card title="Total movimientos" value={totalMovements} />
          <Card title="Plantas registradas" value={plants.length} />
          <Card title="Secciones activas" value={sections.length} />
        </div>

        <Section title="🌱 Stock por planta">
          <div className="grid md:grid-cols-2 gap-3">
            {stockByPlant.map((plant) => (
              <div key={plant.id} className="border rounded-xl p-4 bg-white shadow-sm">
                <div className="font-medium">{plant.name}</div>
                <div className="text-sm text-gray-500">Categoría: {plant.category}</div>
                <div className="mt-2 text-lg font-bold">Stock: {plant.stock}</div>
              </div>
            ))}
          </div>
        </Section>

        <Section title="📦 Stock por sección">
          <div className="grid md:grid-cols-3 gap-3">
            {stockBySection.map((section) => (
              <div key={section.id} className="border rounded-xl p-4 bg-green-50">
                <div className="font-medium">{section.name}</div>
                <div className="text-sm text-gray-500">Ubicación: {section.location ?? "—"}</div>
                <div className="mt-2 text-lg font-bold">Stock: {section.stock}</div>
              </div>
            ))}
          </div>
        </Section>
      </div>
    </div>
  );
}
