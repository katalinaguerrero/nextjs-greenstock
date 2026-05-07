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
