"use client";

import { useMemo } from "react";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/browser/reliverse/ui/Badge";

import type { Order } from "~/db/schema";
import type { CheckoutItem } from "~/types";

import { DataTable } from "~/components/Modules/DataTable/DataTable";
import { DataTableColumnHeader } from "~/components/Modules/DataTable/DataTableColumnHeader";
import { cn, formatDate, formatPrice } from "~/utils";

type OrdersTableShellProps = {
  data: Order[];
  pageCount: number;
};

export function OrdersTableShell({ data, pageCount }: OrdersTableShellProps) {
  // Memoize the columns so they don't re-render on every render
  const columns = useMemo<ColumnDef<Order, unknown>[]>(
    () => [
      {
        accessorKey: "id",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Order ID" />
        ),
      },
      {
        accessorKey: "email",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Customer" />
        ),
      },
      {
        accessorKey: "stripePaymentIntentStatus",
        cell: ({ cell }) => (
          <Badge
            className={cn(
              "pointer-events-none text-sm capitalize",
              cell.getValue() === "paid" ? "bg-green-600" : "bg-red-600",
            )}
            variant="outline"
          >
            {String(cell.getValue())}
          </Badge>
        ),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Payment Status" />
        ),
      },
      {
        accessorKey: "total",
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Total" />
        ),
      },
      {
        accessorKey: "items",
        cell: ({ cell }) => {
          const checkoutItems = cell.getValue() as CheckoutItem[];
          let totalItems = 0;

          for (const item of checkoutItems) {
            totalItems += item.quantity;
          }

          return <span>{totalItems}</span>;
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Item Count" />
        ),
      },
      {
        accessorKey: "createdAt",
        cell: ({ cell }) => formatDate(cell.getValue() as Date),
        enableColumnFilter: false,
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Created At" />
        ),
      },
    ],
    [],
  );

  return (
    <DataTable
      columns={columns}
      data={data}
      pageCount={pageCount}
      searchableColumns={[
        {
          id: "email",
          title: "customers",
        },
      ]}
    />
  );
}
