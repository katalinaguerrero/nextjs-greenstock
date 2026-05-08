
export type PlantType = "NATIVO" | "EXOTICO";

export type Plant = {
  id: string;
  shortId: string;
  name: string;
  heightRangeCm: {
    min: number;
    max: number;
  };
  category: PlantType;
  plantationYear: number;
  priceWholesale: number; // precio neto mayorista
  priceWithIVA: number; // precio con IVA
  priceRetail: number; // precio al detalle
  comments?: string;
};