import { cn } from "@/lib/utils";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "ghost";
};

export function Button({
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <button
      className={cn(
        "px-4 py-2 rounded-md text-sm transition duration-200",

        // 🌿 shadow sketch SIEMPRE presente
        "shadow-[4px_4px_0px_0px_rgba(0,0,0)]",

        // 🌱 variantes
        variant === "primary" &&
          "bg-primary text-white border border-primary-dark hover:bg-primary-light",

        variant === "danger" &&
          "bg-red-600 text-white border border-red-700 hover:bg-red-700",

        variant === "ghost" &&
          "bg-transparent text-primary border border-primary hover:bg-green-300",

        // 🌿 interacción mejorada (no pierdes shadow, solo animas)
        "hover:translate-x-[1px] hover:translate-y-[1px]",

        "focus:outline-none focus:ring-2 focus:ring-primary-light",

        className
      )}
      {...props}
    />
  );
}