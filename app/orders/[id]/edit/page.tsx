import { notFound } from "next/navigation";

import { orderService } from "@/services/orderService";
import { plantService } from "@/services/plantService";
import { customerService } from "@/services/customerService";

import OrderForm from "@/components/order/OrderForm";
import { EditEntity } from "@/components/crud/EditEntity";
import { Title } from "@/components/ui/Title";

import { getCustomerLabel, getPlantLabel } from "@/lib/utils";

import type { Order } from "@/types/order";

export default async function Page(props: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await props.params;

  if (!id) notFound();

  const order = await orderService.getOrder(id);

  if (!order) notFound();

  async function handleUpdate(
    data: Omit<Order, "id" | "createdAt">
  ) {
    "use server";

    await orderService.updateOrder(id, data);
  }

  const plantsRaw = await plantService.getPlants();
  const customersRaw = await customerService.getCustomers();

  const plants = plantsRaw.map((plant) => ({
    label: getPlantLabel(plant),
    value: plant.id,
    price: plant.prices.retail,
  }));

  const customers = customersRaw.map((customer) => ({
    label: getCustomerLabel(customer),
    value: customer.id,
  }));

  return (
    <>
      <Title>Editar Orden</Title>

      <EditEntity<
        Omit<Order, "id" | "createdAt">,
        Order
      >
        initialData={order}
        Form={OrderForm}
        onUpdate={handleUpdate}
        redirectTo="/orders"
        formProps={{
          plants,
          customers,
        }}
      />
    </>
  );
}