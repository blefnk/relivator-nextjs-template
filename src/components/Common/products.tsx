"use client";

import type { Product, Store } from "~/db/schema";
import type { Option } from "~/types/store";

/* eslint-disable max-lines-per-function */
import type { HTMLAttributes } from "react";
import { useCallback, useEffect, useState, useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { getCookie } from "cookies-next";
import { ChevronDown, ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";
import { titleCase } from "string-ts";

import { MultiSelect } from "~/components/Common/multi-select";
import { ProductCard } from "~/components/Modules/Cards/ProductCard";
import { PaginationButton } from "~/components/Navigation/Pagination/PaginationButton";
import { Button } from "~/components/ui/button";
import { Checkbox } from "~/components/ui/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown";
import { Input } from "~/components/ui/input";
import { Label } from "~/components/ui/label";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { Slider } from "~/components/ui/slider";
import { getSubcategories, sortOptions } from "~/constants/products";
import { useDebounce } from "~/hooks/use-debounce";
import { cn } from "~/utils/cn";
import { truncate } from "~/utils/string";

type ProductsProps = {
  // @ts-expect-error TODO: Fix ts
  categories?: Product["category"][];
  // @ts-expect-error TODO: Fix ts
  category?: Product["category"];
  pageCount: number;
  products: Product[];
  session?: unknown;
  storePageCount?: number;
  stores?: Pick<Store, "id" | "name">[];
  tAddToCart: string;
} & HTMLAttributes<HTMLDivElement>;

export function Products({
  categories,
  category,
  pageCount,
  products,
  session,
  storePageCount,
  stores,
  tAddToCart = "Add to cart",
  ...props
}: ProductsProps) {
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
    (searchParameters && searchParameters.get("sort")) || "createdAt.desc";

  const store_ids = searchParameters && searchParameters.get("store_ids");

  const store_page =
    (searchParameters && searchParameters.get("store_page")) || "1";

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

  // Price filter
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 500]);

  const debouncedPrice = useDebounce(priceRange, 500);

  useEffect(() => {
    const [min, max] = debouncedPrice;

    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          price_range: `${min}-${max}`,
        })}`,
        {
          scroll: false,
        },
      );
    });
  }, [debouncedPrice]);

  // Category filter
  const [selectedCategories, setSelectedCategories] = useState<null | Option[]>(
    null,
  );

  // Join categories with a dot to make search params prettier
  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          categories:
            selectedCategories && selectedCategories.length > 0
              ? selectedCategories.map((c) => c.value).join(".")
              : null,
        })}`,
        {
          scroll: false,
        },
      );
    });
  }, [selectedCategories]);

  // Subcategory filter
  const [selectedSubcategories, setSelectedSubcategories] = useState<
    null | Option[]
  >(null);

  const subcategories = getSubcategories(category);

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          subcategories:
            selectedSubcategories && selectedSubcategories.length > 0
              ? selectedSubcategories.map((s) => s.value).join(".")
              : null,
        })}`,
        {
          scroll: false,
        },
      );
    });
  }, [selectedSubcategories]);

  // Store filter
  const [storeIds, setStoreIds] = useState<null | number[]>(
    (store_ids && store_ids.split(".").map(Number)) || null,
  );

  useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          store_ids:
            storeIds && storeIds.length > 0 ? storeIds.join(".") : null,
        })}`,
        {
          scroll: false,
        },
      );
    });
  }, [storeIds]);

  const guestEmail = getCookie("GUEST_EMAIL")?.toString() || null;

  return (
    <section className="flex flex-col space-y-6" {...props}>
      <div className="flex items-center space-x-2">
        <Sheet>
          <SheetTrigger asChild>
            <Button aria-label="Filter products" disabled={isPending} size="sm">
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>{t("products.filters")}</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Price range ($)
                </h3>
                <Slider
                  defaultValue={[0, 500]}
                  max={500}
                  step={1}
                  thickness="thin"
                  value={priceRange}
                  variant="range"
                  onValueChange={(value: typeof priceRange) => {
                    setPriceRange(value);
                  }}
                />
                <div className="flex items-center space-x-4">
                  <Input
                    className="h-9"
                    inputMode="numeric"
                    max={priceRange[1]}
                    min={0}
                    type="number"
                    value={priceRange[0]}
                    onChange={(event_) => {
                      const value = Number(event_.target.value);

                      setPriceRange([value, priceRange[1]]);
                    }}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    className="h-9"
                    inputMode="numeric"
                    max={500}
                    min={priceRange[0]}
                    type="number"
                    value={priceRange[1]}
                    onChange={(event_) => {
                      const value = Number(event_.target.value);

                      setPriceRange([priceRange[0], value]);
                    }}
                  />
                </div>
              </div>
              {categories && categories.length > 0 ? (
                <div className="space-y-4">
                  <h3
                    className={`
                      text-sm font-medium tracking-wide text-foreground
                    `}
                  >
                    Categories
                  </h3>
                  <MultiSelect
                    placeholder="Select categories"
                    selected={selectedCategories}
                    setSelected={setSelectedCategories}
                    options={categories.map((c) => ({
                      label: titleCase(c || ""),
                      value: c || "",
                    }))}
                  />
                </div>
              ) : null}
              {category ? (
                <div className="space-y-4">
                  <h3
                    className={`
                      text-sm font-medium tracking-wide text-foreground
                    `}
                  >
                    Subcategories
                  </h3>
                  <MultiSelect
                    options={subcategories}
                    placeholder="Select subcategories"
                    selected={selectedSubcategories}
                    setSelected={setSelectedSubcategories}
                  />
                </div>
              ) : null}
              {stores && stores.length > 0 ? (
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <h3
                      className={`
                        flex-1 text-sm font-medium tracking-wide text-foreground
                      `}
                    >
                      Stores
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        disabled={Number(store_page) === 1 || isPending}
                        size="icon"
                        variant="ghost"
                        onClick={() => {
                          startTransition(() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) - 1,
                              })}`,
                            );
                          });
                        }}
                      >
                        <ChevronLeft className="size-4" aria-hidden="true" />
                        <span className="sr-only">
                          {t("products.previousStorePage")}
                        </span>
                      </Button>
                      <Button
                        size="icon"
                        variant="ghost"
                        disabled={
                          Number(store_page) === storePageCount || isPending
                        }
                        onClick={() => {
                          startTransition(() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) + 1,
                              })}`,
                            );
                          });
                        }}
                      >
                        <ChevronRight className="size-4" aria-hidden="true" />
                        <span className="sr-only">
                          {t("products.nextStorePage")}
                        </span>
                      </Button>
                    </div>
                  </div>
                  <ScrollArea className="h-[calc(100%-10rem)]">
                    <div className="space-y-4">
                      {stores.map((store) => (
                        <div
                          key={store.id}
                          className="flex items-center space-x-2"
                        >
                          <Checkbox
                            id={`store-${store.id}`}
                            checked={
                              // @ts-expect-error TODO: Fix
                              (storeIds && storeIds.includes(store.id)) || false
                            }
                            onCheckedChange={(value) => {
                              if (value) {
                                // @ts-expect-error TODO: Fix
                                setStoreIds([...(storeIds || []), store.id]);
                              } else {
                                setStoreIds(
                                  (storeIds && // @ts-expect-error TODO: fix
                                    storeIds.filter((id) => id !== store.id)) ||
                                    null,
                                );
                              }
                            }}
                          />
                          <Label
                            className={`
                              text-sm font-medium leading-none

                              peer-disabled:cursor-not-allowed
                              peer-disabled:opacity-70
                            `}
                            htmlFor={`store-${store.id}`}
                          >
                            {truncate(store.name, 20)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              ) : null}
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  className="w-full"
                  aria-label="Clear filters"
                  disabled={isPending}
                  size="sm"
                  onClick={() => {
                    startTransition(() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          categories: null,
                          price_range: 0 - 100,
                          store_ids: null,
                          subcategories: null,
                        })}`,
                      );

                      setPriceRange([0, 100]);
                      setSelectedCategories(null);
                      setSelectedSubcategories(null);
                      setStoreIds(null);
                    });
                  }}
                >
                  Clear Filters
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" disabled={isPending} size="sm">
              Sort
              <ChevronDown className="ml-2 size-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="w-48" align="start">
            <DropdownMenuLabel>{t("products.sortBy")}</DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                key={option.label}
                className={cn(option.value === sort && "font-bold")}
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
      </div>
      {!isPending && products.length === 0 ? (
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">
            {t("products.noProductsFound")}
          </h1>
          <p className="text-center text-muted-foreground">
            Try changing the filters, or check back later for new products
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
        {guestEmail || session ? (
          <>
            {products.map((product) => (
              <ProductCard
                key={product.id} // @ts-expect-error TODO: Fix
                product={product}
                // @ts-expect-error TODO: Fix ts
                storeId={Number(product.storeId)}
                tAddToCart={tAddToCart}
                variant="default"
              />
            ))}
          </>
        ) : (
          <>
            {products.map((product) => (
              <ProductCard
                key={product.id} // @ts-expect-error TODO: Fix
                product={product}
                // @ts-expect-error TODO: Fix ts
                storeId={Number(product.storeId)}
                tAddToCart={tAddToCart}
                variant="guest"
              />
            ))}
          </>
        )}
      </div>
      {products.length > 0 ? (
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
