import type { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";
import { useTranslations } from "next-intl";

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
            onValueChange={(value) => {
              table.setPageSize(Number(value));
            }}
            value={String(table.getState().pagination.pageSize)}
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
            aria-label="Go to first page"
            className={`
              hidden size-8

              lg:flex
            `}
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.setPageIndex(0);
            }}
            size="icon"
            variant="outline"
          >
            <DoubleArrowLeftIcon aria-hidden="true" className="size-4" />
          </Button>
          <Button
            aria-label="Go to previous page"
            className="size-8"
            disabled={!table.getCanPreviousPage()}
            onClick={() => {
              table.previousPage();
            }}
            size="icon"
            variant="outline"
          >
            <ChevronLeftIcon aria-hidden="true" className="size-4" />
          </Button>
          <Button
            aria-label="Go to next page"
            className="size-8"
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.nextPage();
            }}
            size="icon"
            variant="outline"
          >
            <ChevronRightIcon aria-hidden="true" className="size-4" />
          </Button>
          <Button
            aria-label="Go to last page"
            className={`
              hidden size-8

              lg:flex
            `}
            disabled={!table.getCanNextPage()}
            onClick={() => {
              table.setPageIndex(table.getPageCount() - 1);
            }}
            size="icon"
            variant="outline"
          >
            <DoubleArrowRightIcon aria-hidden="true" className="size-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}
