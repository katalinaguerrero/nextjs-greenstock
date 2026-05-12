"use client";

import Link from "next/link";
import { Title } from "../ui/Title";
import { Button } from "@/components/ui/Button";

type Props = {
  title: string;
  createHref?: string;
  createLabel?: string;
};

export default function PageHeader({
  title,
  createHref,
  createLabel,
}: Props) {
  return (
    <div className="flex items-center justify-between mb-4">
      <Title>{title}</Title>

      {createHref && createLabel && (
        <Link href={createHref}>
          <Button>{createLabel}</Button>
        </Link>
      )}
    </div>
  );
}