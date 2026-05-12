import { cn } from "@/lib/utils";
import { Spinner } from "./Spinner";

type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "danger" | "ghost";
  loading?: boolean;
};

export function Button({
  className,
  variant = "primary",
  loading = false,
  disabled,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      disabled={loading || disabled}
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

        // 🌿 interacción
        "hover:translate-x-[1px] hover:translate-y-[1px]",
        "focus:outline-none focus:ring-2 focus:ring-primary-light",

        // 🚫 disabled state (IMPORTANTE para UX)
        (loading || disabled) && "opacity-60 cursor-not-allowed",

        className
      )}
      {...props}
    >
      <span className="flex items-center justify-center gap-2">
        {loading && <Spinner />}
        {children}
      </span>
    </button>
  );
}