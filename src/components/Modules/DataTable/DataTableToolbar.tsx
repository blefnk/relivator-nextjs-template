"use client";

import type { Table } from "@tanstack/react-table";
import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "~/types/store";

import type { MouseEventHandler } from "react";
import { useTransition } from "react";

import Link from "next/link";

import { Cross2Icon, PlusCircledIcon, TrashIcon } from "@radix-ui/react-icons";

import { DataTableFacetedFilter } from "~/components/Modules/DataTable/Faceted";
import { DataTableViewOptions } from "~/components/Modules/DataTable/Options";
import { Button, buttonVariants } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import { cn } from "~/utils/cn";

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
                  key={String(column.id)}
                  className={`
                    h-8 w-[150px]

                    lg:w-[250px]
                  `}
                  placeholder={`Filter ${column.title}...`}
                  value={
                    (table.getColumn(String(column.id)) && // @ts-expect-error TODO: fix
                      (table
                        .getColumn(String(column.id))
                        .getFilterValue() as string)) ||
                    ""
                  }
                  onChange={(event) =>
                    table.getColumn(String(column.id)) && // @ts-expect-error TODO: fix
                    table
                      .getColumn(String(column.id))
                      .setFilterValue(event.target.value)
                  }
                />
              ),
          )}
        {filterableColumns.length > 0 &&
          filterableColumns.map(
            (column) =>
              table.getColumn(column.id ? String(column.id) : "") && (
                <DataTableFacetedFilter
                  key={String(column.id)}
                  column={table.getColumn(column.id ? String(column.id) : "")}
                  options={column.options}
                  title={column.title}
                />
              ),
          )}
        {isFiltered && (
          <Button
            className={`
              h-8 px-2

              lg:px-3
            `}
            aria-label="Reset filters"
            variant="ghost"
            onClick={() => {
              table.resetColumnFilters();
            }}
          >
            Reset
            <Cross2Icon className="ml-2 size-4" aria-hidden="true" />
          </Button>
        )}
      </div>
      <div className="flex items-center space-x-2">
        {deleteRowsAction && table.getSelectedRowModel().rows.length > 0 ? (
          <Button
            className="h-8"
            aria-label="Delete selected rows"
            disabled={isPending}
            size="sm"
            variant="outline"
            onClick={(event) => {
              startTransition(() => {
                table.toggleAllPageRowsSelected(false);
                deleteRowsAction(event);
              });
            }}
          >
            <TrashIcon className="mr-2 size-4" aria-hidden="true" />
            Delete
          </Button>
        ) : newRowLink ? (
          <Link
            className={cn(
              buttonVariants({
                size: "sm",
                variant: "default",
              }),
              "h-8",
            )}
            aria-label="Create new row"
            href={newRowLink}
          >
            <PlusCircledIcon className="mr-2 size-4" aria-hidden="true" />
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
