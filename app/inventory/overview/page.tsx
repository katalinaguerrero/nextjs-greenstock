import { plantService } from "@/services/plantService";
import { inventoryService } from "@/services/inventoryService";
import { Title } from "@/components/ui/Title";
import { Card } from "@/components/ui/Card";
import { Section } from "@/components/ui/Section";

export default async function DashboardPage() {
  const plants = await plantService.getPlants();
  const movements = await inventoryService.getMovements();
  const sections = await inventoryService.getAllSections();

  // fake aggregation (luego puedes moverlo a service)
  const totalMovements = movements.length;

  const stockByPlant = plants.map((plant) => {
    const stock = movements.reduce((acc, m) => {
      if (m.plantId !== plant.id) return acc;
      return m.type === "IN" ? acc + m.quantity : acc - m.quantity;
    }, 0);

    return {
      ...plant,
      stock,
    };
  });

  const stockBySection = sections.map((section) => {
    const stock = movements.reduce((acc, m) => {
      if (m.sectionId !== section.id) return acc;
      return m.type === "IN" ? acc + m.quantity : acc - m.quantity;
    }, 0);

    return {
      ...section,
      stock,
    };
  });

  return (
    <div className="space-y-6">
      <Title>🌿 Dashboard Vivero</Title>

      {/* KPI CARDS */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card title="Total movimientos" value={totalMovements} />
        <Card title="Plantas registradas" value={plants.length} />
        <Card title="Secciones activas" value={sections.length} />
      </div>

      {/* STOCK POR PLANTA */}
      <Section title="🌱 Stock por planta">
        <div className="grid md:grid-cols-2 gap-3">
          {stockByPlant.map((p) => (
            <div
              key={p.id}
              className="border rounded-xl p-4 bg-white shadow-sm"
            >
              <div className="font-medium">{p.name}</div>
              <div className="text-sm text-gray-500">
                Categoría: {p.category}
              </div>

              <div className="mt-2 text-lg font-bold">
                Stock: {p.stock}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* STOCK POR SECCIÓN */}
      <Section title="📦 Stock por sección">
        <div className="grid md:grid-cols-3 gap-3">
          {stockBySection.map((s) => (
            <div
              key={s.id}
              className="border rounded-xl p-4 bg-green-50"
            >
              <div className="font-medium">{s.name}</div>
              <div className="text-sm text-gray-500">
                Ubicación: {s.location ?? "—"}
              </div>

              <div className="mt-2 text-lg font-bold">
                Stock: {s.stock}
              </div>
            </div>
          ))}
        </div>
      </Section>
    </div>
  );
}