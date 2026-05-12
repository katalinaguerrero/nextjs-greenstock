import { customerService } from "@/services/customerService";
import CustomerTable from "@/components/customer/CustomersTable";
import PageHeader from "@/components/layout/PageHeader";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function CustomersPage() {
  const customers = await customerService.getCustomers();

  return (
    <div>
      <PageHeader
        title="Lista de Clientes"
        createHref="/customers/new"
        createLabel="+ Nuevo cliente"
      />
      <CustomerTable customers={customers} />
    </div>
  );
}