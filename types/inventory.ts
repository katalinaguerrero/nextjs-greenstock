export type InventoryMovement = {
  id: string;
  plantId: string;
  type: "IN" | "OUT";
  quantity: number;
  sectionId: string;
  orderId?: string;
  comments?: string;
  createdAt: Date;
};

export type Section = {
  id: string;
  name: string;
  location?: string;
};