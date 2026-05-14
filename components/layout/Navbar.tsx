"use client";

import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="w-full bg-[#c9d8b6] border-b shadow-sm px-6 py-3 flex items-center justify-between">
      {/* Logo / Nombre */}
      <Link href="/" className="font-bold text-lg">
        Vivero Life 🌱
      </Link>

      {/* Links */}
      <div className="flex gap-4 text-sm">
        <Link href="/plants" className="hover:underline">
          Plantas
        </Link>

        <Link href="/customers" className="hover:underline">
          Clientes
        </Link>
        <Link href="/inventory" className="hover:underline">
          Inventario
        </Link>
      </div>
    </nav>
  );
}