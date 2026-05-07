import { Timestamp } from "firebase/firestore";

export type PaymentMethod = "EFECTIVO" | "TRANSFERENCIA" | "TARJETA" | "CHEQUE";

export type Payment = {
  id: string;
  orderId: string; // importante para trazabilidad
  amount: number; // cuánto pagó en este abono
  method: PaymentMethod;
  paidAt: string; // fecha del pago
  comments?: string; // opcional (ej: "abono 1", "segunda cuota", etc)
  createdAt: Timestamp;
};