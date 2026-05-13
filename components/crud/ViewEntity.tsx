"use client";

import { useRouter } from "next/navigation";

export function ViewEntity({
  children,
  title,
  backTo,
  editTo,
}: {
  children: React.ReactNode;
  title: string;
  backTo: string;
  editTo?: string;
}) {
  const router = useRouter();

  return (
    <div className="space-y-4">
      <div className="flex gap-2 justify-between">
        <h1 className="font-bold">{title}</h1>

        <div className="flex gap-2">
          <button onClick={() => router.push(backTo)}>Volver</button>

          {editTo && (
            <button onClick={() => router.push(editTo)}>Editar</button>
          )}
        </div>
      </div>

      <div className="border rounded-xl p-4">
        {children}
      </div>
    </div>
  );
}