import { notFound } from "next/navigation";
import { customerService } from "@/services/customerService";
import EditCustomerClient from "./EditCustomerClient";
import { Title } from "@/components/ui/Title";
import type { Customer } from "@/types/customer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  if (!id) notFound();

  const customer = await customerService.getCustomer(id);

  if (!customer) notFound();

  async function updateCustomer(data: Omit<Customer, "id">) {
    "use server";
    await customerService.updateCustomer(id, data);
  }

  return (
    <>
      <Title>Editar Cliente</Title>
      <EditCustomerClient customer={customer} onUpdate={updateCustomer} />
    </>
  );
}