
export type PlantType = "NATIVO" | "EXOTICO";

export type Plant = {
  id: string;
  shortId: string;
  name: string;
  minHeight: string;
  maxHeight: string;
  category: PlantType;
  age: number;
  priceWholesale: number; // precio neto mayorista
  priceWithIVA: number; // precio con IVA
  priceRetail: number; // precio al detalle
  comments?: string;
}