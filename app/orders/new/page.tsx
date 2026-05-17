import { orderService } from "@/services/orderService";

import type { OrderItem } from "@/types/order";

import { CreateEntity } from "@/components/crud/CreateEntity";
import { Title } from "@/components/ui/Title";
import { plantService } from "@/services/plantService";
import { customerService } from "@/services/customerService";
import OrderForm from "@/components/order/OrderForm";
import { getCustomerLabel, getPlantLabel } from "@/lib/utils";

export default async function NewOrderPage() {
  async function handleCreate(data: {
    customerId: string;
    items: OrderItem[];
    comments?: string;
  }) {
    "use server";

    await orderService.createOrder(data);
  }

  const plantsRaw = await plantService.getPlants();
  const customersRaw = await customerService.getCustomers();

  const plants = plantsRaw.map((plant) => ({
    label: getPlantLabel(plant),
    value: plant.id,
    price: plant.prices.retail
  }));

  const customers = customersRaw.map((customer) => ({
    label: getCustomerLabel(customer),
    value: customer.id,
  }));

  return (
    <>
      <Title>Agregar Orden</Title>

      <CreateEntity
        Form={OrderForm}
        onCreate={handleCreate}
        redirectTo="/orders"
        formProps={{
          plants,
          customers,
        }}
      />
    </>
  );
}