
export type PlantType = "NATIVO" | "EXOTICO";

export type Plant = {
  id: string;
  name: string;
  heightRangeCm: {
    min: number;
    max: number;
  };
  category: PlantType;
  plantationYear: number;
  prices: {
    wholesale: number; // precio neto mayorista
    retail: number; // precio al detalle
    withIVA: number; // precio con IVA
  };
  comments?: string;
};