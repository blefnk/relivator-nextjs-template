"use client";

import type { MouseEventHandler } from "react";
import { useTransition } from "react";

import Link from "next/link";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/reliverse/store";
import type { Table } from "@tanstack/react-table";

import { Button, buttonVariants } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils/reliverse/cn";
import { Cross2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

import { DataTableFacetedFilter } from "~/components/Modules/DataTable/Faceted";
import { DataTableViewOptions } from "~/components/Modules/DataTable/Options";

type DataTableToolbarProps<TData> = {
  deleteRowsAction?: MouseEventHandler<HTMLButtonElement>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  newRowLink?: string;
  searchableColumns?: DataTableSearchableColumn<TData>[];
  storeId?: number;
  table: Table<TData>;
};

const defaultFilterableColumns: DataTableFilterableColumn<unknown>[] = [];
const defaultSearchableColumns: DataTableSearchableColumn<unknown>[] = [];

export function DataTableToolbar<TData>({
  deleteRowsAction,
  filterableColumns = defaultFilterableColumns,
  newRowLink,
  searchableColumns = defaultSearchableColumns,
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={`
        flex w-full items-center justify-between space-x-2 overflow-auto p-1
      `}
    >
      <div className="flex flex-1 items-center space-x-2">
        {searchableColumns.length > 0 &&
          searchableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <Input
                  className={`
                    h-8 w-[150px]

                    lg:w-[250px]
                  `}
                  key={String(column.id)}
                  onChange={(event) =>
                    table.getColumn(String(column.id)) && // @ts-expect-error TODO: fix
                    // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
                    table
                      .getColumn(String(column.id))
                      .setFilterValue(event.target.value)
                  }
                  placeholder={`Filter ${column.title}...`}
                  value={
                    (table.getColumn(String(column.id)) && // @ts-expect-error TODO: fix
                      (table
                        .getColumn(String(column.id))
                        .getFilterValue() as string)) ||
                    ""
                  }
                />
              ),
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  key={String(column.id)}
                  options={column.options}
                  title={column.title}
                />
              ),
          )}
        {isFiltered && (
          <Button
            aria-label="Reset filters"
            className={`
              h-8 px-2

              lg:px-3
            `}
            onClick={() => {
              table.resetColumnFilters();
            }}
            variant="ghost"
          >
            Reset
            <Cross2Icon aria-hidden="true" className="ml-2 size-4" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
          <Button
            aria-label="Delete selected rows"
            className="h-8"
            disabled={isPending}
            onClick={(event) => {
              startTransition(() => {
                table.toggleAllPageRowsSelected(false);
                deleteRowsAction(event);
              });
            }}
            size="sm"
            variant="outline"
          >
            <TrashIcon aria-hidden="true" className="mr-2 size-4" />
            Delete
          </Button>
        ) : newRowLink ? (
          <Link
            aria-label="Create new row"
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "default",
              }),
              "h-8",
            )}
            href={newRowLink}
          >
            <PlusCircledIcon aria-hidden="true" className="mr-2 size-4" />
            Add new product
          </Link>
        ) : null}
        {/* {process.env.NODE_ENV !== "production" && storeId !== undefined && (
          <GenerateButton storeId={storeId} />
        )} */}
        <DataTableViewOptions table={table} />
      </div>
    </div>
  );
}
