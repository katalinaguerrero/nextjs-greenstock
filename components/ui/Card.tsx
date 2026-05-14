export function Card({ title, value }: { title: string; value: string | number }) {
  return (
    <div className="border rounded-xl p-4 bg-white shadow-sm">
      <div className="text-sm text-gray-500">{title}</div>
      <div className="text-2xl font-bold">{value}</div>
    </div>
  );
}