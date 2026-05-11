import { cn } from "@/lib/utils";
import React from "react";

type TitleProps = {
  children: React.ReactNode;
  className?: string;
};

export function Title({ children, className }: TitleProps) {
  return (
    <h1 className={cn("text-xl font-bold mb-4 text-primary-dark", className)}>
      {children}
    </h1>
  );
}