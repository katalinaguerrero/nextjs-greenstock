import type { OrderStatus } from "@/types/order";

export const statusStyles: Record<OrderStatus, string> = {
  PENDIENTE: "bg-yellow-100 text-yellow-700",
  PAGADA: "bg-green-100 text-green-700",
  RESERVA: "bg-orange-100 text-orange-700",
  ANTICIPO: "bg-blue-100 text-blue-700",
};