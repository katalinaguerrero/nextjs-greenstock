"use client";

type Option = {
  value: string;
  label: string;
};

type Props = {
  options: Option[];
  value: string;
  onChange: (value: string) => void;
  placeholder?: string;
  className?: string;
};

export default function Select({
  options,
  value,
  onChange,
  placeholder = "Selecciona una opción",
  className = "",
}: Props) {
  return (
    <select
      className={`border border-black rounded px-3 py-2 w-full ${className}`}
      value={value}
      onChange={(e) => onChange(e.target.value)}
    >
      <option value="">{placeholder}</option>

      {options.map((opt) => (
        <option key={opt.value} value={opt.value}>
          {opt.label}
        </option>
      ))}
    </select>
  );
}