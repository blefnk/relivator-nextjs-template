import type { MouseEventHandler } from "react";
import { useCallback, useEffect, useMemo, useState } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type {
  DataTableFilterableColumn,
  DataTableSearchableColumn,
} from "@/types/reliverse/store";
import type {
  ColumnDef,
  ColumnFiltersState,
  PaginationState,
  SortingState,
  VisibilityState,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useDebounce } from "@/hooks-react/use-debounce";
import {
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import destr from "destr";

import { DataTablePagination } from "~/components/Modules/DataTable/DataTablePagination";
import { DataTableToolbar } from "~/components/Modules/DataTable/DataTableToolbar";

const isString = (a: unknown): a is string => typeof a === "string";
const defaultFilterableColumns: DataTableFilterableColumn<unknown>[] = [];
const defaultSearchableColumns: DataTableSearchableColumn<unknown>[] = [];

type DataTableProps<TData, TValue> = {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  deleteRowsAction?: MouseEventHandler<HTMLButtonElement>;
  filterableColumns?: DataTableFilterableColumn<TData>[];
  newRowLink?: string;
  pageCount: number;
  searchableColumns?: DataTableSearchableColumn<TData>[];
};

// eslint-disable-next-line max-lines-per-function
export function DataTable<TData, TValue>({
  columns,
  data,
  deleteRowsAction,
  filterableColumns = defaultFilterableColumns,
  newRowLink,
  pageCount,
  searchableColumns = defaultSearchableColumns,
}: DataTableProps<TData, TValue>) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();

  // Search params
  const page = (searchParameters && searchParameters.get("page")) || "1";

  const per_page =
    (searchParameters && searchParameters.get("per_page")) || "10";

  const sort = searchParameters && searchParameters.get("sort");
  const [column, order] = (sort && sort.split(".")) || [];

  // Create query string
  const createQueryString = useCallback(
    (parameters: Record<string, null | number | string>) => {
      const newSearchParameters = new URLSearchParams(
        searchParameters && searchParameters.toString(),
      );

      for (const [key, value] of Object.entries(parameters)) {
        if (value === null) {
          newSearchParameters.delete(key);
        } else {
          newSearchParameters.set(key, String(value));
        }
      }

      return newSearchParameters.toString();
    },
    [searchParameters],
  );

  // Table states
  const [rowSelection, onRowSelectionChange] = useState({
    //
  });

  const [columnVisibility, onColumnVisibilityChange] =
    useState<VisibilityState>({});

  const [columnFilters, onColumnFiltersChange] = useState<ColumnFiltersState>(
    [],
  );

  // Handle server-side pagination
  const [{ pageIndex, pageSize }, setPagination] = useState<PaginationState>({
    pageIndex: Number(page) - 1,
    pageSize: Number(per_page),
  });

  const pagination = useMemo(
    () => ({
      pageIndex,
      pageSize,
    }),
    [pageIndex, pageSize],
  );

  useEffect(() => {
    setPagination({
      pageIndex: Number(page) - 1,
      pageSize: Number(per_page),
    });
  }, [page, per_page]);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page: pageIndex + 1,
        per_page: pageSize,
      })}`,
      {
        scroll: false,
      },
    );
  }, [pageIndex, pageSize]);

  // Handle server-side sorting
  const [sorting, onSortingChange] = useState<SortingState>([
    {
      id: column || "",
      desc: order === "desc",
    },
  ]);

  useEffect(() => {
    router.push(
      `${pathname}?${createQueryString({
        page,
        sort: sorting[0]?.id
          ? `${sorting[0] && sorting[0].id}.${sorting[0] && sorting[0].desc ? "desc" : "asc"}`
          : null,
      })}`,
      {
        scroll: false,
      },
    );
  }, [sorting]);

  // Handle server-side filtering
  const debouncedSearchableColumnFilters = destr(
    useDebounce(
      JSON.stringify(
        columnFilters.filter((filter) => {
          return searchableColumns.find((column) => column.id === filter.id);
        }),
      ),
      500,
    ),
  ) as ColumnFiltersState;

  const filterableColumnFilters = columnFilters.filter((filter) => {
    return filterableColumns.find((column) => column.id === filter.id);
  });

  useEffect(() => {
    for (const column of debouncedSearchableColumnFilters) {
      if (isString(column.value)) {
        router.push(
          `${pathname}?${createQueryString({
            [column.id]: isString(column.value) ? column.value : null,
            page: 1,
          })}`,
          {
            scroll: false,
          },
        );
      }
    }

    for (const key of (searchParameters && searchParameters.keys()) || "") {
      if (
        searchableColumns.some((column) => column.id === key) &&
        !debouncedSearchableColumnFilters.some((column) => column.id === key)
      ) {
        router.push(
          `${pathname}?${createQueryString({
            [key]: null,
            page: 1,
          })}`,
          {
            scroll: false,
          },
        );
      }
    }
  }, [debouncedSearchableColumnFilters]);

  useEffect(() => {
    for (const column of filterableColumnFilters) {
      if (typeof column.value === "object" && Array.isArray(column.value)) {
        router.push(
          `${pathname}?${createQueryString({
            [column.id]: column.value.join("."),
            page: 1,
          })}`,
          {
            scroll: false,
          },
        );
      }
    }

    for (const key of (searchParameters && searchParameters.keys()) || "") {
      if (
        filterableColumns.some((column) => column.id === key) &&
        !filterableColumnFilters.some((column) => column.id === key)
      ) {
        router.push(
          `${pathname}?${createQueryString({
            [key]: null,
            page: 1,
          })}`,
          {
            scroll: false,
          },
        );
      }
    }
  }, [filterableColumnFilters]);

  const table = useReactTable({
    columns,
    data,
    enableRowSelection: true,
    getCoreRowModel: getCoreRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    manualFiltering: true,
    manualPagination: true,
    manualSorting: true,
    onColumnFiltersChange,
    onColumnVisibilityChange,
    onPaginationChange: setPagination,
    onRowSelectionChange,
    onSortingChange,
    pageCount: pageCount || -1,
    state: {
      columnFilters,
      columnVisibility,
      pagination,
      rowSelection,
      sorting,
    },
  });

  return (
    <div className="w-full space-y-3 overflow-auto">
      <DataTableToolbar
        deleteRowsAction={deleteRowsAction}
        filterableColumns={filterableColumns}
        newRowLink={newRowLink}
        searchableColumns={searchableColumns}
        table={table}
      />
      <div className="rounded-lg border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => (
                  <TableHead className="whitespace-nowrap" key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext(),
                        )}
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows && table.getRowModel().rows.length > 0 ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  data-state={row.getIsSelected() && "selected"}
                  key={row.id}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext(),
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  className="h-24 text-center"
                  colSpan={columns.length}
                >
                  No result.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
      <DataTablePagination table={table} />
    </div>
  );
}
