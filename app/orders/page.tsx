import PageHeader from "@/components/layout/PageHeader";
import OrdersTable from "@/components/order/OrdersTable";
import { orderService } from "@/services/orderService";
import { customerService } from "@/services/customerService";
import { getCustomerLabel } from "@/lib/utils";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OrdersPage() {
  const [orders, customers] = await Promise.all([
    orderService.getOrders(),
    customerService.getCustomers(),
  ]);

  const customerMap = Object.fromEntries(
    customers.map((customer) => [customer.id, getCustomerLabel(customer)])
  );
  return (
    <div className="space-y-6">
      <PageHeader
        title="Ordenes"
        createHref="/orders/new"
        createLabel="+ Nueva Orden"
      />

      <OrdersTable orders={orders} customerMap={customerMap} />
    </div>
  );
}
