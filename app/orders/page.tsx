import PageHeader from "@/components/layout/PageHeader";


export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function OrdersPage() {

  return (
    <div className="space-y-6">
      <PageHeader
        title="Ordenens"
        createHref="/orders/new"
        createLabel="+ Nueva Orden"
      />

    </div>
  );
}
