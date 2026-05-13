import { notFound } from "next/navigation";
import { customerService } from "@/services/customerService";
import CustomersForm from "@/components/customer/CustomersForm";
import { EditEntity } from "@/components/crud/EditEntity";
import { Title } from "@/components/ui/Title";
import type { Customer } from "@/types/customer";

export default async function Page({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;

  const customer = await customerService.getCustomer(id);

  if (!customer) notFound();

  async function handleUpdate(data: Omit<Customer, "id">) {
    "use server";
    await customerService.updateCustomer(id, data);
  }

  return (
    <>
      <Title>Editar Cliente</Title>

      <EditEntity<Omit<Customer, "id">, Customer>
        initialData={customer}
        Form={CustomersForm}
        onUpdate={handleUpdate}
        redirectTo="/customers"
      />
    </>
  );
}