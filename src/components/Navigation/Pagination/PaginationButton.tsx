import type { AppRouterInstance } from "next/dist/shared/lib/app-router-context.shared-runtime";

import type {
  DetailedHTMLProps,
  HTMLAttributes,
  TransitionStartFunction,
} from "react";
import { useMemo } from "react";

import {
  ChevronLeftIcon,
  ChevronRightIcon,
  DoubleArrowLeftIcon,
  DoubleArrowRightIcon,
} from "@radix-ui/react-icons";

import { Button } from "~/components/ui/button";
import { cn } from "~/utils/cn";

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
        className={`
          hidden size-8

          lg:flex
        `}
        aria-label="Go to first page"
        disabled={Number(page) === 1 || isPending}
        size="icon"
        variant="outline"
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
      >
        <DoubleArrowLeftIcon className="size-4" aria-hidden="true" />
      </Button>
      <Button
        className="size-8"
        aria-label="Go to previous page"
        disabled={Number(page) === 1 || isPending}
        size="icon"
        variant="outline"
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
      >
        <ChevronLeftIcon className="size-4" aria-hidden="true" />
      </Button>
      {paginationRange.map((pageNumber, index) =>
        pageNumber === "..." ? (
          <Button
            key={index}
            className="size-8"
            aria-label="Page separator"
            size="icon"
            variant="outline"
            disabled
          >
            ...
          </Button>
        ) : (
          <Button
            key={index}
            className="size-8"
            aria-label={`Page ${pageNumber}`}
            disabled={isPending}
            size="icon"
            variant={Number(page) === pageNumber ? "default" : "outline"}
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
          >
            {pageNumber}
          </Button>
        ),
      )}
      <Button
        className="size-8"
        aria-label="Go to next page"
        disabled={Number(page) === (pageCount || 10) || isPending}
        size="icon"
        variant="outline"
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
      >
        <ChevronRightIcon className="size-4" aria-hidden="true" />
      </Button>
      <Button
        className={`
          hidden size-8

          lg:flex
        `}
        aria-label="Go to last page"
        disabled={Number(page) === (pageCount || 10) || isPending}
        size="icon"
        variant="outline"
        onClick={() => {
          router.push(
            `${pathname}?${createQueryString({
              page: pageCount || 10,
              per_page: per_page || null,
              sort,
            })}`,
          );
        }}
      >
        <DoubleArrowRightIcon className="size-4" aria-hidden="true" />
      </Button>
    </div>
  );
}
