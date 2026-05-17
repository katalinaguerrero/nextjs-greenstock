import type { Plant } from "@/types/plant";
import type { Customer } from "@/types/customer";
import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlantAge(plantationYear: number) {
  const currentYear = new Date().getFullYear();
  return currentYear - plantationYear;
}

export function getPlantLabel(plant: Plant): string {
  return `${plant.name} | ${getPlantAge(
    plant.plantationYear,
  )} años ${plant.heightRangeCm.min}cm - ${plant.heightRangeCm.max}cm`;
}
export function getCustomerLabel(customer?: Customer | null): string {
  if (!customer) return "";

  return `${customer.name ?? ""} ${customer.lastname ?? ""}  ${customer.rut ?? ""}`.trim();
}