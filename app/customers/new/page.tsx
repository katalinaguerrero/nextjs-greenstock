import { customerService } from "@/services/customerService";
import type { Customer } from "@/types/customer";
import CustomersForm from "@/components/customer/CustomersForm";
import { CreateEntity } from "@/components/crud/CreateEntity";
import { Title } from "@/components/ui/Title";

export default function NewCustomerPage() {
  async function handleCreate(data: Omit<Customer, "id">) {
    "use server";
    await customerService.createCustomer(data);
  }

  return (
    <>
      <Title>Agregar Cliente</Title>

      <CreateEntity
        Form={CustomersForm}
        onCreate={handleCreate}
        redirectTo="/customers"
      />
    </>
  );
}