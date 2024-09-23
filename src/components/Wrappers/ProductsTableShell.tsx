"use client";

import type { ColumnDef } from "@tanstack/react-table";
import type { Product } from "~/db/schema";

import { useMemo, useState, useTransition } from "react";

import Link from "next/link";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";

import { DataTable } from "~/components/Modules/DataTable/DataTable";
import { DataTableColumnHeader } from "~/components/Modules/DataTable/DataTableColumnHeader";
import { Badge } from "~/components/ui/badge";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";
import { products } from "~/db/schema";
import { formatDate } from "~/utils/date";
import { formatPrice } from "~/utils/number";

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
            className="translate-y-[2px]"
            aria-label="Select row"
            checked={row.getIsSelected()}
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
            className="translate-y-[2px]"
            aria-label="Select all"
            checked={table.getIsAllPageRowsSelected()}
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
          // const categories = Object.values(products.category.enumValues);
          // const category = cell.getValue() as Product["category"];

          // if (!categories.includes(category)) {
          // return null;
          // }

          return (
            <Badge className="capitalize" variant="outline">
              {/* {category} */}🟠
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
                className="flex size-8 p-0 data-[state=open]:bg-muted"
                aria-label="Open menu"
                variant="ghost"
              >
                <DotsHorizontalIcon className="size-4" aria-hidden="true" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent className="w-[160px]" align="end">
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
      newRowLink={`/dashboard/stores/${storeId}/products/new`}
      pageCount={pageCount}
      deleteRowsAction={() => {
        deleteSelectedRows();
      }}
      filterableColumns={[
        {
          // @ts-expect-error TODO: Fix ts
          id: "category",
          // @ts-expect-error TODO: Fix ts
          options: products.category.enumValues.map((category) => ({
            label: `${category.charAt(0).toUpperCase()}${category.slice(1)}`,
            value: category,
          })),
          title: "Category",
        },
      ]}
      searchableColumns={[
        {
          id: "name",
          title: "names",
        },
      ]}
    />
  );
}
