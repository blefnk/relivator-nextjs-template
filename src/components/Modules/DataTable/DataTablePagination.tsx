import type { Table } from "@tanstack/react-table";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "~/components/ui/select";

type DataTablePaginationProps<TData> = {
  pageSizeOptions?: number[];
  table: Table<TData>;
};

export function DataTablePagination<TData>({
  pageSizeOptions,
  table,
}: DataTablePaginationProps<TData>) {
  const t = useTranslations();

  return (
    <div
      className={`
        flex w-full flex-col items-center justify-between gap-4 overflow-auto
        px-2 py-1

        sm:flex-row sm:gap-8
      `}
    >
      <div className="flex-1 whitespace-nowrap text-sm text-muted-foreground">
        {table.getFilteredSelectedRowModel().rows.length} of{" "}
        {table.getFilteredRowModel().rows.length} row(s) selected.
      </div>
      <div
        className={`
          flex flex-col items-center gap-4

          lg:gap-8

          sm:flex-row sm:gap-6
        `}
      >
        <div className="flex items-center space-x-2">
          <p className="whitespace-nowrap text-sm font-medium">
            {t("DataTablePagination.rowsPerPage")}
          </p>
          <Select
            value={String(table.getState().pagination.pageSize)}
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
          >
            <SelectTrigger className="h-8 w-[70px]">
              <SelectValue placeholder={table.getState().pagination.pageSize} />
            </SelectTrigger>
            <SelectContent side="top">
              {pageSizeOptions?.map((pageSize) => (
                <SelectItem key={pageSize} value={String(pageSize)}>
                  {pageSize}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div
          className={`
            flex w-[100px] items-center justify-center text-sm font-medium
          `}
        >
          Page {table.getState().pagination.pageIndex + 1} of{" "}
          {table.getPageCount()}
        </div>
        <div className="flex items-center space-x-2">
          <Button
            className={`
              hidden size-8

              lg:flex
            `}
            aria-label="Go to first page"
            disabled={!table.getCanPreviousPage()}
            size="icon"
            variant="outline"
            onClick={() => {
              table.setPageIndex(0);
            }}
          >
            <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            className="size-8"
            aria-label="Go to previous page"
            disabled={!table.getCanPreviousPage()}
            size="icon"
            variant="outline"
            onClick={() => {
              table.previousPage();
            }}
          >
            <ChevronLeftIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            className="size-8"
            aria-label="Go to next page"
            disabled={!table.getCanNextPage()}
            size="icon"
            variant="outline"
            onClick={() => {
              table.nextPage();
            }}
          >
            <ChevronRightIcon className="size-4" aria-hidden="true" />
          </Button>
          <Button
            className={`
              hidden size-8

              lg:flex
            `}
            aria-label="Go to last page"
            disabled={!table.getCanNextPage()}
            size="icon"
            variant="outline"
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
          >
            <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
          </Button>
        </div>
      </div>
    </div>
  );
}
