"use client";

type Props = {
  open: boolean;
  customerId: string;
  customerLabel?: string;
  editHref: string;
  onClose: () => void;
};

export default function CustomerModal({
  open,
  customerId,
  customerLabel,
  editHref,
  onClose,
}: Props) {
  if (!open) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
      <div className="w-full max-w-lg rounded-2xl bg-white p-6 shadow-xl">
        <div className="flex items-start justify-between gap-4">
          <div>
            <h2 className="text-xl font-semibold">Detalle del cliente</h2>
            <p className="text-sm text-gray-600">ID: {customerId}</p>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="text-sm text-gray-700 hover:text-black"
          >
            Cerrar
          </button>
        </div>

        <div className="mt-4 space-y-3 text-sm text-gray-700">
          <p className="font-semibold">Nombre</p>
          <p>{customerLabel ?? "Cliente desconocido"}</p>
        </div>

        <div className="mt-6 flex flex-col gap-2 sm:flex-row">
          <button
            type="button"
            onClick={() => window.open(editHref, "_blank")}
            className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white hover:bg-blue-700"
          >
            Editar cliente en nueva pestaña
          </button>
          <button
            type="button"
            onClick={onClose}
            className="rounded border border-black bg-white px-4 py-2 text-sm font-semibold"
          >
            Volver a la orden
          </button>
        </div>
      </div>
    </div>
  );
}
