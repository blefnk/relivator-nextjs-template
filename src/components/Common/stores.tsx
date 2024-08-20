"use client";

import type { HTMLAttributes } from "react";
import { useCallback, useEffect, useState, useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { CuratedStore } from "@/types/reliverse/store";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { cn } from "@/utils/reliverse/cn";
import { Cross2Icon } from "@radix-ui/react-icons";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import { FacetedFilter } from "~/components/Common/faceted-filter";
import { StoreCard } from "~/components/Modules/Cards/StoreCardDashboard";
import { PaginationButton } from "~/components/Navigation/Pagination/PaginationButton";
import { storeSortOptions, storeStatusOptions } from "~/constants/stores";

type StoresProps = {
  pageCount: number;
  stores: CuratedStore[];
} & HTMLAttributes<HTMLDivElement>;

export function Stores({ pageCount, stores, ...props }: StoresProps) {
  const t = useTranslations();

  const router = useRouter();
  const pathname = usePathname();
  const searchParameters = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // Search params
  const page = (searchParameters && searchParameters.get("page")) || "1";

  const per_page =
    (searchParameters && searchParameters.get("per_page")) || "8";

  const sort =
    (searchParameters && searchParameters.get("sort")) || "productCount.desc";

  const statuses = searchParameters && searchParameters.get("statuses");

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

  // Store status filter
  const [filterValues, setFilterValues] = useState<string[]>(
    (statuses && statuses.split(".")) || [],
  );

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          statuses:
            filterValues && filterValues.length > 0
              ? filterValues.join(".")
              : null,
        })}`,
        {
          scroll: false,
        },
      );
    });
  }, [filterValues]);

  return (
    <section className="flex flex-col space-y-6" {...props}>
      <div className="flex items-center space-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort stores" disabled={isPending} size="sm">
              Sort
              <ChevronDown aria-hidden="true" className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>{t("stores.sortBy")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {storeSortOptions.map((option) => (
              <DropdownMenuItem
                className={cn(option.value === sort && "font-bold")}
                key={option.label}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sort: option.value,
                      })}`,
                      {
                        scroll: false,
                      },
                    );
                  });
                }}
              >
                {option.label}
              </DropdownMenuItem>
            ))}
          </DropdownMenuContent>
        </DropdownMenu>
        <div className="flex flex-1 items-center space-x-2">
          <FacetedFilter
            filterValues={filterValues}
            options={storeStatusOptions}
            setFilterValues={setFilterValues}
            title="Status"
          />
          {filterValues.length > 0 && (
            <Button
              aria-label="Reset filters"
              className={`
                h-8 px-2

                lg:px-3
              `}
              onClick={() => {
                setFilterValues([]);
              }}
              variant="ghost"
            >
              Reset
              <Cross2Icon aria-hidden="true" className="ml-2 size-4" />
            </Button>
          )}
        </div>
      </div>
      {!isPending && stores.length === 0 ? (
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">
            {t("stores.noStoresFound")}
          </h1>
          <p className="text-center text-muted-foreground">
            Try changing the filters, or check back later for new stores
          </p>
        </div>
      ) : null}
      <div
        className={`
          grid grid-cols-1 gap-6

          lg:grid-cols-3

          sm:grid-cols-2

          xl:grid-cols-4
        `}
      >
        {stores.map((store) => (
          <StoreCard
            href={`/products?store_ids=${store.id}`}
            key={store.id}
            store={store}
          />
        ))}
      </div>
      {stores.length > 0 ? (
        <PaginationButton
          createQueryString={createQueryString}
          isPending={isPending}
          page={page}
          pageCount={pageCount}
          pathname={pathname}
          per_page={per_page}
          router={router}
          sort={sort}
          startTransition={startTransition}
        />
      ) : null}
    </section>
  );
}
