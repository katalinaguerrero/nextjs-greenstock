"use client";

import {
  Table,
  TableHeader,
  TableBody,
  TableRow,
  TableHead,
  TableCell,
} from "@/components/ui/Table";

type Column<T> = {
  header: string;
  render: (item: T) => React.ReactNode;
};

type Props<T> = {
  data: T[];
  columns: Column<T>[];
  onRowClick?: (item: T) => void;
  emptyMessage?: string;
};

export function DataTable<T>({
  data,
  columns,
  onRowClick,
  emptyMessage = "No hay datos.",
}: Props<T>) {
  if (!data.length) {
    return <p>{emptyMessage}</p>;
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          {columns.map((column) => (
            <TableHead key={column.header}>
              {column.header}
            </TableHead>
          ))}
        </TableRow>
      </TableHeader>

      <TableBody>
        {data.map((item, index) => (
          <TableRow
            key={index}
            onClick={() => onRowClick?.(item)}
            className={
              onRowClick
                ? "cursor-pointer hover:bg-green-50 transition"
                : ""
            }
          >
            {columns.map((column) => (
              <TableCell key={column.header}>
                {column.render(item)}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}