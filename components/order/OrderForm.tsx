"use client";

import { useState, type FormEvent } from "react";
import type { Order, OrderStatus, OrderItem, Payment, PaymentMethod } from "@/types/order";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import Select from "../ui/Select";
import CustomerModal from "./CustomerModal";

type Props = {
  customers?: { label: string; value: string }[];
  plants?: { label: string; value: string; price?: number }[];
  initialData?: Order;
  onSubmit: (data: Order) => void;
  loading?: boolean;
};

const orderStatusOptions = [
  { label: "Pendiente", value: "PENDIENTE" },
  { label: "Pagada", value: "PAGADA" },
  { label: "Reserva", value: "RESERVA" },
  { label: "Anticipo", value: "ANTICIPO" },
];

const paymentMethodOptions = [
  { label: "Efectivo", value: "EFECTIVO" },
  { label: "Transferencia", value: "TRANSFERENCIA" },
  { label: "Tarjeta", value: "TARJETA" },
  { label: "Cheque", value: "CHEQUE" },
];

function getTotalOrdered(orderItems: OrderItem[]) {
  return orderItems.reduce((sum, item) => sum + item.quantity * item.price, 0);
}

function getTotalPaid(paymentList: Payment[]) {
  return paymentList.reduce((sum, payment) => sum + payment.amount, 0);
}

function syncOrderStatus(balance: number, currentStatus: OrderStatus) {
  if (balance <= 0) return "PAGADA";
  if (currentStatus === "PAGADA") return "PENDIENTE";
  return currentStatus;
}

export default function OrderForm({
  customers = [],
  plants = [],
  initialData,
  onSubmit,
  loading,
}: Props) {
  // Basic order info
  const [customerId, setCustomerId] = useState(initialData?.customerId ?? "");
  const [orderStatus, setOrderStatus] = useState<OrderStatus>(
    initialData?.orderStatus ?? "PENDIENTE"
  );
  const [compromisedDate, setCompramisedDate] = useState(
    initialData?.compromisedDate ?? ""
  );
  const [comments, setComments] = useState(initialData?.comments ?? "");

  // Order items
  const [items, setItems] = useState<OrderItem[]>(initialData?.items ?? []);
  const [newItemPlantId, setNewItemPlantId] = useState("");
  const [newItemQuantity, setNewItemQuantity] = useState(0);
  const [newItemPrice, setNewItemPrice] = useState(0);

  // Payments
  const [payments, setPayments] = useState<Payment[]>(initialData?.payments ?? []);
  const [newPaymentAmount, setNewPaymentAmount] = useState(0);
  const [newPaymentMethod, setNewPaymentMethod] = useState<PaymentMethod>("EFECTIVO");
  const [newPaymentDate, setNewPaymentDate] = useState("");
  const [newPaymentComments, setNewPaymentComments] = useState("");
  const [isCustomerModalOpen, setIsCustomerModalOpen] = useState(false);

  function resetForm() {
    setCustomerId("");
    setOrderStatus("PENDIENTE");
    setCompramisedDate("");
    setComments("");
    setItems([]);
    setNewItemPlantId("");
    setNewItemQuantity(0);
    setNewItemPrice(0);
    setPayments([]);
    setNewPaymentAmount(0);
    setNewPaymentMethod("EFECTIVO");
    setNewPaymentDate("");
    setNewPaymentComments("");
  }

  function addItem() {
    if (!newItemPlantId || newItemQuantity <= 0 || newItemPrice <= 0) {
      alert("Por favor completa todos los campos del item");
      return;
    }

    const newItem: OrderItem = {
      id: Math.random().toString(36).slice(2, 11),
      plantId: newItemPlantId,
      quantity: newItemQuantity,
      price: newItemPrice,
      collectedQuantity: 0,
      collected: false,
      delivered: false,
    };

    const updatedItems = [...items, newItem];
    setItems(updatedItems);

    const updatedBalance = getTotalOrdered(updatedItems) - getTotalPaid(payments);
    setOrderStatus((prevStatus) => syncOrderStatus(updatedBalance, prevStatus));

    setNewItemPlantId("");
    setNewItemQuantity(0);
    setNewItemPrice(0);
  }

  function removeItem(id: string) {
    const updatedItems = items.filter((item) => item.id !== id);
    setItems(updatedItems);

    const updatedBalance = getTotalOrdered(updatedItems) - getTotalPaid(payments);
    setOrderStatus((prevStatus) => syncOrderStatus(updatedBalance, prevStatus));
  }

  function addPayment() {
    if (!newPaymentAmount || newPaymentAmount <= 0 || !newPaymentDate) {
      alert("Por favor completa monto y fecha del pago");
      return;
    }

    const newPayment: Payment = {
      id: Math.random().toString(36).slice(2, 11),
      orderId: initialData?.id ?? "new",
      amount: newPaymentAmount,
      method: newPaymentMethod,
      paidAt: newPaymentDate,
      comments: newPaymentComments || undefined,
      createdAt: new Date(),
    };

    const updatedPayments = [...payments, newPayment];
    setPayments(updatedPayments);

    const updatedBalance = getTotalOrdered(items) - getTotalPaid(updatedPayments);
    setOrderStatus((prevStatus) => syncOrderStatus(updatedBalance, prevStatus));

    setNewPaymentAmount(0);
    setNewPaymentMethod("EFECTIVO");
    setNewPaymentDate("");
    setNewPaymentComments("");
  }

  function removePayment(id: string) {
    const updatedPayments = payments.filter((payment) => payment.id !== id);
    setPayments(updatedPayments);

    const updatedBalance = getTotalOrdered(items) - getTotalPaid(updatedPayments);
    setOrderStatus((prevStatus) => syncOrderStatus(updatedBalance, prevStatus));
  }

  function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (!customerId) {
      alert("Por favor selecciona un cliente");
      return;
    }

    if (items.length === 0) {
      alert("Por favor añade al menos un item a la orden");
      return;
    }

    const orderData: Order = {
      id: initialData?.id ?? Math.random().toString(36).slice(2, 11),
      customerId,
      items,
      payments,
      orderStatus,
      compromisedDate: compromisedDate || undefined,
      createdAt: initialData?.createdAt ?? new Date(),
      comments: comments || undefined,
    };

    onSubmit(orderData);

    if (!initialData) {
      resetForm();
    }
  }

  function openCustomerModal() {
    if (!customerId) return;
    setIsCustomerModalOpen(true);
  }

  function closeCustomerModal() {
    setIsCustomerModalOpen(false);
  }

  function handlePlantChange(value: string) {
    setNewItemPlantId(value);
    const selectedPlant = plants.find((plant) => plant.value === value);

    if (selectedPlant?.price != null) {
      setNewItemPrice(selectedPlant.price);
    }
  }

  const selectedPlant = plants.find((plant) => plant.value === newItemPlantId);

  const plantLabel = (plantId: string) => {
    return plants.find((p) => p.value === plantId)?.label ?? plantId;
  };

  const totalOrdered = items.reduce((sum, item) => sum + item.quantity * item.price, 0);
  const totalPaid = payments.reduce((sum, payment) => sum + payment.amount, 0);
  const balance = totalOrdered - totalPaid;
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 border rounded-xl p-6 bg-[#dde7c7]"
    >
      {/* ORDER INFO SECTION */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-4">Información de la Orden</h3>
        <div className="space-y-4">
          <div>
            <label className="text-sm">Cliente *</label>
            <div className="flex gap-2 items-end">
              <div className="flex-1">
                <Select
                  value={customerId}
                  onChange={setCustomerId}
                  options={customers}
                />
              </div>
              <button
                type="button"
                disabled={!customerId}
                onClick={openCustomerModal}
                className="rounded border border-black bg-white px-3 py-2 text-sm disabled:cursor-not-allowed disabled:opacity-40"
              >
                Ver cliente
              </button>
            </div>
          </div>

          <div>
            <label className="text-sm">Estado de la Orden</label>
            <Select
              value={orderStatus}
              onChange={(value) => setOrderStatus(value as OrderStatus)}
              options={orderStatusOptions}
            />
          </div>

          <div>
            <label className="text-sm">Fecha Comprometida (opcional)</label>
            <Input
              type="date"
              value={compromisedDate}
              onChange={(e) => setCompramisedDate(e.target.value)}
            />
          </div>

          <div>
            <label className="text-sm">Comentarios</label>
            <Input
              value={comments}
              onChange={(e) => setComments(e.target.value)}
            />
          </div>
        </div>
      </div>

      <CustomerModal
        open={isCustomerModalOpen}
        customerId={customerId}
        customerLabel={customers.find((customer) => customer.value === customerId)?.label}
        editHref={`/customers/${customerId}/edit`}
        onClose={closeCustomerModal}
      />

      {/* ORDER ITEMS SECTION */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-4">Items de la Orden *</h3>

        {items.length > 0 && (
          <div className="mb-4 bg-white rounded-lg overflow-hidden border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Planta</th>
                  <th className="px-4 py-2 text-left">Cantidad</th>
                  <th className="px-4 py-2 text-left">Precio</th>
                  <th className="px-4 py-2 text-left">Subtotal</th>
                  <th className="px-4 py-2 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {items.map((item) => (
                  <tr key={item.id} className="border-t">
                    <td className="px-4 py-2">{plantLabel(item.plantId)}</td>
                    <td className="px-4 py-2">{item.quantity}</td>
                    <td className="px-4 py-2">${item.price}</td>
                    <td className="px-4 py-2 font-semibold">
                      ${(item.quantity * item.price)}
                    </td>
                    <td className="px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removeItem(item.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border-t bg-gray-50 font-semibold">
                  <td colSpan={3} className="px-4 py-2 text-right">
                    Total:
                  </td>
                  <td className="px-4 py-2">${totalOrdered}</td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="bg-white rounded-lg p-4 border space-y-3">
          <div className="grid grid-cols-3 gap-3">
            <div>
              <label className="text-xs">Planta</label>
              <Select
                value={newItemPlantId}
                onChange={handlePlantChange}
                options={plants}
              />
            </div>
            <div>
              <label className="text-xs">Cantidad</label>
              <Input
                type="number"
                value={newItemQuantity}
                onChange={(e) => setNewItemQuantity(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-xs">Precio</label>
              <Input
                type="number"
                step="0.01"
                value={newItemPrice}
                onChange={(e) => setNewItemPrice(Number(e.target.value))}
              />
            </div>
          </div>
          {selectedPlant?.price != null ? (
            <p className="text-xs text-gray-600">
              Precio sugerido: ${selectedPlant.price} — puedes usar otro precio si lo deseas.
            </p>
          ) : (
            <p className="text-xs text-gray-600">
              Ingresa el precio manual para este item.
            </p>
          )}
          <Button
            type="button"
            onClick={addItem}
            className="w-full bg-blue-600 hover:bg-blue-700"
          >
            + Añadir Item
          </Button>
        </div>
      </div>

      {/* PAYMENTS SECTION */}
      <div className="border-b pb-4">
        <h3 className="text-lg font-semibold mb-4">Pagos</h3>

        {payments.length > 0 && (
          <div className="mb-4 bg-white rounded-lg overflow-hidden border">
            <table className="w-full text-sm">
              <thead className="bg-gray-100">
                <tr>
                  <th className="px-4 py-2 text-left">Monto</th>
                  <th className="px-4 py-2 text-left">Método</th>
                  <th className="px-4 py-2 text-left">Fecha</th>
                  <th className="px-4 py-2 text-left">Comentarios</th>
                  <th className="px-4 py-2 text-center">Acción</th>
                </tr>
              </thead>
              <tbody>
                {payments.map((payment) => (
                  <tr key={payment.id} className="border-t">
                    <td className="px-4 py-2 font-semibold">
                      ${payment.amount}
                    </td>
                    <td className="px-4 py-2">{payment.method}</td>
                    <td className="px-4 py-2">{payment.paidAt}</td>
                    <td className="px-4 py-2 text-xs">{payment.comments || "-"}</td>
                    <td className="px-4 py-2 text-center">
                      <button
                        type="button"
                        onClick={() => removePayment(payment.id)}
                        className="text-red-600 hover:text-red-800 text-sm"
                      >
                        Eliminar
                      </button>
                    </td>
                  </tr>
                ))}
                <tr className="border-t bg-gray-50 font-semibold">
                  <td className="px-4 py-2">${totalPaid}</td>
                  <td colSpan={3} className="px-4 py-2 text-right">
                    Balance pendiente: ${(totalOrdered - totalPaid)}
                  </td>
                  <td></td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        <div className="bg-white rounded-lg p-4 border space-y-3">
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Monto</label>
              <Input
                type="number"
                step="0.01"
                value={newPaymentAmount}
                onChange={(e) => setNewPaymentAmount(Number(e.target.value))}
              />
            </div>
            <div>
              <label className="text-xs">Método</label>
              <Select
                value={newPaymentMethod}
                onChange={(value) => setNewPaymentMethod(value as PaymentMethod)}
                options={paymentMethodOptions}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="text-xs">Fecha del Pago</label>
              <Input
                type="date"
                value={newPaymentDate}
                onChange={(e) => setNewPaymentDate(e.target.value)}
              />
            </div>
            <div>
              <label className="text-xs">Comentarios (opcional)</label>
              <Input
                value={newPaymentComments}
                onChange={(e) => setNewPaymentComments(e.target.value)}
              />
            </div>
          </div>
          <Button
            type="button"
            onClick={addPayment}
            className="w-full bg-green-600 hover:bg-green-700"
          >
            + Añadir Pago
          </Button>
        </div>
      </div>

      <Button type="submit" loading={loading}>
        {loading
          ? "Guardando..."
          : initialData
          ? "Actualizar orden"
          : "Crear orden"}
      </Button>
    </form>
  );
}
