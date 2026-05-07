import { OrderItem } from "./orderItem";
import { Payment } from "./payment";

export type Order = {
  id: string;
  clientId: string; // relación con cliente
  items: OrderItem[]; // lista de items
  payments: Payment[]; // lista de abonos
  createdAt: string;
  comments?: string;
};
