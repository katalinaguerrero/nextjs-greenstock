"use client";

import { useState } from "react";
import type { Customer } from "@/types/customer";

import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";

type Props = {
  initialData?: Customer;
  onSubmit: (data: Omit<Customer, "id">) => void;
  loading?: boolean;
};

export default function CustomerForm({
  initialData,
  onSubmit,
  loading,
}: Props) {
  const emptyState = {
    name: "",
    lastname: "",
    rut: "",
    phone: "",
    email: "",
    comments: "",
  };

  const [name, setName] = useState(initialData?.name ?? emptyState.name);
  const [lastname, setLastname] = useState(
    initialData?.lastname ?? emptyState.lastname
  );
  const [rut, setRut] = useState(initialData?.rut ?? emptyState.rut);
  const [phone, setPhone] = useState(initialData?.phone ?? emptyState.phone);
  const [email, setEmail] = useState(initialData?.email ?? emptyState.email);
  const [comments, setComments] = useState(
    initialData?.comments ?? emptyState.comments
  );

  function resetForm() {
    setName(emptyState.name);
    setLastname(emptyState.lastname);
    setRut(emptyState.rut);
    setPhone(emptyState.phone);
    setEmail(emptyState.email);
    setComments(emptyState.comments);
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    onSubmit({
      name,
      lastname: lastname || undefined,
      rut: rut || undefined,
      phone: phone || undefined,
      email: email || undefined,
      comments: comments || undefined,
    });

    // 👉 SOLO reset si es creación
    if (!initialData) {
      resetForm();
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 border rounded-xl p-6 bg-[#dde7c7]"
    >
      <div>
        <label className="text-sm">Nombre</label>
        <Input value={name} onChange={(e) => setName(e.target.value)} />
      </div>

      <div>
        <label className="text-sm">Apellido</label>
        <Input value={lastname} onChange={(e) => setLastname(e.target.value)} />
      </div>

      <div>
        <label className="text-sm">RUT</label>
        <Input value={rut} onChange={(e) => setRut(e.target.value)} />
      </div>

      <div>
        <label className="text-sm">Teléfono</label>
        <Input value={phone} onChange={(e) => setPhone(e.target.value)} />
      </div>

      <div>
        <label className="text-sm">Email</label>
        <Input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
      </div>

      <div>
        <label className="text-sm">Comentarios</label>
        <Input value={comments} onChange={(e) => setComments(e.target.value)} />
      </div>

      <Button type="submit" loading={loading}>
        {loading
          ? "Guardando..."
          : initialData
          ? "Actualizar cliente"
          : "Crear cliente"}
      </Button>
    </form>
  );
}