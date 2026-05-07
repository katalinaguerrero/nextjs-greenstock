export type OrderStatus = "PENDIENTE" | "CANCELADA" | "RESERVA" | "ANTICIPO";
export type Order = {
  id: string;
  clientId: string; // relación con cliente
  items: OrderItem[]; // lista de items
  payments: Payment[]; // lista de abonos
  orderStatus: OrderStatus;
  createdAt: string;
  comments?: string;
};

export type PaymentMethod = "EFECTIVO" | "TRANSFERENCIA" | "TARJETA" | "CHEQUE";

export type Payment = {
  id: string;
  orderId: string; // importante para trazabilidad
  amount: number; // cuánto pagó en este abono
  method: PaymentMethod;
  paidAt: string; // fecha del pago
  comments?: string; // opcional (ej: "abono 1", "segunda cuota", etc)
  createdAt: string;
};

export type OrderItem = {
  id: string;
  plantId: string;
  quantity: number;
  price: number;
  collectedQuantity: number;
  collected: boolean; // ya recolectado del inventario
  delivered: boolean; // ya entregado al cliente
  comments?: string;
};
