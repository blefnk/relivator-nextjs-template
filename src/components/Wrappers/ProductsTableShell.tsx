"use client";

import { useMemo, useState, useTransition } from "react";

import Link from "next/link";

import type { ColumnDef } from "@tanstack/react-table";

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { formatDate } from "@/utils/reliverse/date";
import { formatPrice } from "@/utils/reliverse/number";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import type { Product } from "~/db/schema/provider";

import { DataTable } from "~/components/Modules/DataTable/DataTable";
import { DataTableColumnHeader } from "~/components/Modules/DataTable/DataTableColumnHeader";
import { products } from "~/db/schema/provider";

type ProductsTableShellProps = {
  data: Product[];
  pageCount: number;
  storeId: string;
};

export function ProductsTableShell({
  data,
  pageCount,
  storeId,
}: ProductsTableShellProps) {
  const [isPending, startTransition] = useTransition();

  const [, setSelectedRowIds] = useState<number[]>([]);

  // Memoize the columns so they don't re-render on every render
  const columns = useMemo<ColumnDef<Product, unknown>[]>(
    () => [
      {
        id: "select",
        cell: ({ row }) => (
          <Checkbox
            aria-label="Select row"
            checked={row.getIsSelected()}
            className="translate-y-[2px]"
            onCheckedChange={(value) => {
              row.toggleSelected(!!value);
              // @ts-expect-error TODO: fix id type
              setSelectedRowIds((previous) =>
                value
                  ? [...previous, row.original.id]
                  : previous.filter(
                      (
                        id, // @ts-expect-error TODO: fix id type
                      ) => id !== row.original.id,
                    ),
              );
            }}
          />
        ),
        enableHiding: false,
        enableSorting: false,
        header: ({ table }) => (
          <Checkbox
            aria-label="Select all"
            checked={table.getIsAllPageRowsSelected()}
            className="translate-y-[2px]"
            onCheckedChange={(value) => {
              table.toggleAllPageRowsSelected(!!value);
              // @ts-expect-error TODO: fix id type
              setSelectedRowIds((previous) =>
                previous.length === data.length
                  ? []
                  : data.map((row) => row.id),
              );
            }}
          />
        ),
      },
      {
        accessorKey: "name",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Name" />
        ),
      },
      {
        accessorKey: "category",
        cell: ({ cell }) => {
          const categories = Object.values(products.category.enumValues);
          const category = cell.getValue() as Product["category"];

          // @ts-expect-error TODO: fix id type
          if (!categories.includes(category)) {
            return null;
          }

          return (
            <Badge className="capitalize" variant="outline">
              {category}
            </Badge>
          );
        },
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Category" />
        ),
      },
      {
        accessorKey: "price",
        cell: ({ cell }) => formatPrice(cell.getValue() as number),
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Price" />
        ),
      },
      {
        accessorKey: "inventory",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Inventory" />
        ),
      },
      {
        accessorKey: "rating",
        header: ({ column }) => (
          <DataTableColumnHeader column={column} title="Rating" />
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
      {
        id: "actions",
        cell: ({ row }) => (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                aria-label="Open menu"
                className="flex size-8 p-0 data-[state=open]:bg-muted"
                variant="ghost"
              >
                <DotsHorizontalIcon aria-hidden="true" className="size-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end" className="w-[160px]">
              <DropdownMenuItem asChild>
                <Link
                  href={`/dashboard/stores/${storeId}/products/${row.original.id}`}
                >
                  Edit
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href={`/product/${row.original.id}`}>View</Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                disabled={isPending}
                onClick={() => {
                  startTransition(() => {
                    row.toggleSelected(false);

                    // toast.promise(

                    // deleteProductAction({

                    // id: row.original.id,

                    // storeId,

                    // }),

                    // {

                    // loading: "Deleting...",

                    // success: () => "Product deleted successfully.",

                    // error: (err: unknown) => catchError(err),

                    // },

                    // );
                  });
                }}
              >
                Delete
                <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        ),
      },
    ],
    [data, isPending, storeId],
  );

  function deleteSelectedRows() {
    // toast.promise(
    // Promise.all(
    // selectedRowIds.map((id) =>
    // deleteProductAction({
    // id,
    // storeId,
    // }),
    // ),
    // ),
    // {
    // loading: "Deleting...",
    // success: () => {
    // setSelectedRowIds([]);
    // return "Products deleted successfully.";
    // },
    // error: (err: unknown) => {
    // setSelectedRowIds([]);
    // return catchError(err);
    // },
    // },
    // ); */
  }

  return (
    <DataTable
      columns={columns}
      data={data}
      deleteRowsAction={() => {
        deleteSelectedRows();
      }}
      filterableColumns={[
        {
          id: "category",
          options: products.category.enumValues.map((category) => ({
            label: `${category.charAt(0).toUpperCase()}${category.slice(1)}`,
            value: category,
          })),
          title: "Category",
        },
      ]}
      newRowLink={`/dashboard/stores/${storeId}/products/new`}
      pageCount={pageCount}
      searchableColumns={[
        {
          id: "name",
          title: "names",
        },
      ]}
    />
  );
}
