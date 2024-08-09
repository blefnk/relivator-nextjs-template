import { Skeleton } from "@/components/ui/skeleton";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

type DataTableLoadingProps = {
  columnCount: number;
  isNewRowCreatable?: boolean;
  isRowsDeletable?: boolean;
  rowCount?: number;
};

export function DataTableLoading({
  columnCount,
  isNewRowCreatable = false,
  isRowsDeletable = false,
  rowCount = 10,
}: DataTableLoadingProps) {
  return (
    <div className="w-full space-y-3 overflow-auto">
      <div
        className={`
          flex w-full items-center justify-between space-x-2 overflow-auto p-1
        `}
      >
        <div className="flex flex-1 items-center space-x-2">
          <Skeleton
            className={`
              h-7 w-[150px]

              lg:w-[250px]
            `}
          />
          <Skeleton className="h-7 w-[70px] border-dashed" />
        </div>
        <div className="flex items-center space-x-2">
          {isRowsDeletable ? (
            <Skeleton className="h-7 w-[70px]" />
          ) : isNewRowCreatable ? (
            <Skeleton className="h-7 w-[70px]" />
          ) : null}
          <Skeleton
            className={`
              ml-auto hidden h-7 w-[70px]

              lg:flex
            `}
          />
        </div>
      </div>
      <div className="rounded-lg border">
        <Table className="min-w-[640px]">
          <TableHeader>
            {Array.from({
              length: 1,
            }).map((_, index) => (
              <TableRow className="hover:bg-transparent" key={index}>
                {Array.from({
                  length: columnCount,
                }).map((_, index) => (
                  <TableHead key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableHead>
                ))}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {Array.from({
              length: rowCount,
            }).map((_, index) => (
              <TableRow className="hover:bg-transparent" key={index}>
                {Array.from({
                  length: columnCount,
                }).map((_, index) => (
                  <TableCell key={index}>
                    <Skeleton className="h-6 w-full" />
                  </TableCell>
                ))}
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
      <div
        className={`
          flex w-full flex-col items-center justify-between gap-4 overflow-auto
          px-2 py-1

          sm:flex-row sm:gap-8
        `}
      >
        <div className="flex-1">
          <Skeleton className="h-8 w-40" />
        </div>
        <div
          className={`
            flex flex-col items-center gap-4

            lg:gap-8

            sm:flex-row sm:gap-6
          `}
        >
          <div className="flex items-center space-x-2">
            <Skeleton className="h-8 w-24" />
            <Skeleton className="h-8 w-[70px]" />
          </div>
          <div
            className={`
              flex w-[100px] items-center justify-center text-sm font-medium
            `}
          >
            <Skeleton className="h-8 w-20" />
          </div>
          <div className="flex items-center space-x-2">
            <Skeleton
              className={`
                hidden size-8

                lg:block
              `}
            />
            <Skeleton className="size-8" />
            <Skeleton className="size-8" />
            <Skeleton
              className={`
                hidden size-8

                lg:block
              `}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
