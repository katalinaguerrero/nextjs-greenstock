import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function getPlantAge(plantationYear: number) {
  const currentYear = new Date().getFullYear();
  return currentYear - plantationYear;
}