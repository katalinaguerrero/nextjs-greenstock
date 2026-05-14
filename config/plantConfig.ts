import { EntityConfig } from "./entityConfig";
import type { Plant } from "@/types/plant";

export const plantConfig: EntityConfig<Plant> = {
  title: "Planta",
  fields: [
    {
      label: "Nombre",
      render: (p) => p.name,
    },
    {
      label: "Categoría",
      render: (p) => p.category,
    },
    {
      label: "Altura",
      render: (p) => `${p.heightRangeCm.min} - ${p.heightRangeCm.max}`,
    },
    {
      label: "Edad",
      render: (p) => `${new Date().getFullYear() - p.plantationYear} años`,
    },
    {
      label: "Precio x Mayor",
      render: (p) => `$${p.prices.wholesale}`,
    },
    {
      label: "Precio retail",
      render: (p) => `$${p.prices.retail}`,
    },
    {
      label: "Precio con IVA",
      render: (p) => `$${p.prices.withIVA}`,
    },
    {
      label: "Comentarios",
      render: (p) => `${p.comments}`,
    },
  ],
};
