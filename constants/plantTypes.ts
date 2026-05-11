
export const plantTypeValues = ["NATIVO", "EXOTICO"] as const;

export const plantTypeOptions = plantTypeValues.map((value) => ({
  value,
  label: value,
}));