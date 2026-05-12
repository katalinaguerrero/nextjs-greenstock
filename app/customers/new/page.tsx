import { customerService } from "@/services/customerService";
import { Title } from "@/components/ui/Title";
import NewCustomerClient from "./NewCustomerClient";
import type { Customer } from "@/types/customer";

export default function NewCustomerPage() {
  async function handleCreate(data: Omit<Customer, "id">) {
    "use server";
    await customerService.createCustomer(data);
  }

  return (
    <div>
      <Title>Agregar Cliente Nuevo</Title>

      <NewCustomerClient onCreate={handleCreate} />
    </div>
  );
}