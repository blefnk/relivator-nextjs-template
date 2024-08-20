import type {
  DetailedHTMLProps,
  HTMLAttributes,
  TransitionStartFunction,
} from "react";
import { useMemo } from "react";

import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

type PaginationButtonProps = {
  createQueryString: (
    parameters: Record<string, null | number | string>,
  ) => string;
  isPending: boolean;
  page: string;
  pageCount: number;
  pathname: null | string;
  per_page?: string;
  router: AppRouterInstance;
  siblingCount?: number;
  sort: string;
  startTransition: TransitionStartFunction;
} & DetailedHTMLProps<HTMLAttributes<HTMLDivElement>, HTMLDivElement>;

export function PaginationButton({
  className,
  createQueryString,
  isPending,
  page,
  pageCount,
  pathname,
  per_page,
  router,
  siblingCount = 1,
  sort,
  startTransition,
  ...props
}: PaginationButtonProps) {
  // Memoize pagination range to avoid unnecessary re-renders
  const paginationRange = useMemo(() => {
    const delta = siblingCount + 2;

    const range: ("..." | number)[] = [];

    for (
      let index = Math.max(2, Number(page) - delta);
      index <= Math.min(pageCount - 1, Number(page) + delta);
      index++
    ) {
      range.push(index);
    }

    if (Number(page) - delta > 2) {
      range.unshift("...");
    }

    if (Number(page) + delta < pageCount - 1) {
      range.push("...");
    }

    range.unshift(1);

    if (pageCount !== 1) {
      range.push(pageCount);
    }

    return range;
  }, [pageCount, page, siblingCount]);

  return (
    <div
      className={cn(
        "flex flex-wrap items-center justify-center gap-2",
        className,
      )}
      {...props}
    >
      <Button
        aria-label="Go to first page"
        className={`
          hidden size-8

          lg:flex
        `}
        disabled={Number(page) === 1 || isPending}
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                page: 1,
                per_page: per_page || null,
                sort,
              })}`,
            );
          });
        }}
        size="icon"
        variant="outline"
      >
        <DoubleArrowLeftIcon aria-hidden="true" className="size-4" />
      </Button>
      <Button
        aria-label="Go to previous page"
        className="size-8"
        disabled={Number(page) === 1 || isPending}
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                page: Number(page) - 1,
                per_page: per_page || null,
                sort,
              })}`,
            );
          });
        }}
        size="icon"
        variant="outline"
      >
        <ChevronLeftIcon aria-hidden="true" className="size-4" />
      </Button>
      {paginationRange.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <Button
            aria-label="Page separator"
            className="size-8"
            disabled
            key={index}
            size="icon"
            variant="outline"
          >
            ...
          </Button>
        ) : (
          <Button
            aria-label={`Page ${pageNumber}`}
            className="size-8"
            disabled={isPending}
            key={index}
            onClick={() => {
              startTransition(() => {
                router.push(
                  `${pathname}?${createQueryString({
                    page: pageNumber,
                    per_page: per_page || null,
                    sort,
                  })}`,
                );
              });
            }}
            size="icon"
            variant={Number(page) === pageNumber ? "default" : "outline"}
          >
            {pageNumber}
          </Button>
        ),
      )}
      <Button
        aria-label="Go to next page"
        className="size-8"
        disabled={Number(page) === (pageCount || 10) || isPending}
        onClick={() => {
          startTransition(() => {
            router.push(
              `${pathname}?${createQueryString({
                page: Number(page) + 1,
                per_page: per_page || null,
                sort,
              })}`,
            );
          });
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
        disabled={Number(page) === (pageCount || 10) || isPending}
        onClick={() => {
          router.push(
            `${pathname}?${createQueryString({
              page: pageCount || 10,
              per_page: per_page || null,
              sort,
            })}`,
          );
        }}
        size="icon"
        variant="outline"
      >
        <DoubleArrowRightIcon aria-hidden="true" className="size-4" />
      </Button>
    </div>
  );
}
