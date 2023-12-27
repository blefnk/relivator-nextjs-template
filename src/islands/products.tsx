"use client";

import * as React from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import type { Option } from "~/types";
import { cn, truncate } from "~/utils";
import { getCookie } from "cookies-next";
import { titleCase } from "string-ts";

import type { Product, Store } from "~/data/db/schema";
import { useDebounce } from "~/hooks/use-debounce";
import { Icons } from "~/islands/icons";
import { ProductCard } from "~/islands/modules/cards/product-card";
import { MultiSelect } from "~/islands/multi-select";
import { PaginationButton } from "~/islands/navigation/pagination/pagination-button";
import { Button } from "~/islands/primitives/button";
import { Checkbox } from "~/islands/primitives/checkbox";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/islands/primitives/dropdown";
import { Input } from "~/islands/primitives/input";
import { Label } from "~/islands/primitives/label";
import { ScrollArea } from "~/islands/primitives/scroll-area";
import { Separator } from "~/islands/primitives/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/islands/primitives/sheet";
import { Slider } from "~/islands/primitives/slider";
import { getSubcategories, sortOptions } from "~/server/config/products";

type ProductsProps = React.HTMLAttributes<HTMLDivElement> & {
  products: Product[];
  pageCount: number;
  category?: Product["category"];
  categories?: Product["category"][];
  stores?: Pick<Store, "id" | "name">[];
  storePageCount?: number;
  session?: any;
  tAddToCart: string;
};

export async function Products({
  tAddToCart = "Add to cart",
  products,
  pageCount,
  category,
  categories,
  stores,
  storePageCount,
  session,
  ...props
}: ProductsProps) {
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = React.useTransition();

  // Search params
  const page = searchParams?.get("page") ?? "1";
  const per_page = searchParams?.get("per_page") ?? "8";
  const sort = searchParams?.get("sort") ?? "createdAt.desc";
  const store_ids = searchParams?.get("store_ids");
  const store_page = searchParams?.get("store_page") ?? "1";

  // Create query string
  const createQueryString = React.useCallback(
    (params: Record<string, string | number | null>) => {
      const newSearchParams = new URLSearchParams(searchParams?.toString());

      for (const [key, value] of Object.entries(params)) {
        if (value === null) newSearchParams.delete(key);
        else newSearchParams.set(key, String(value));
      }

      return newSearchParams.toString();
    },
    [searchParams],
  );

  // Price filter
  const [priceRange, setPriceRange] = React.useState<[number, number]>([
    0, 500,
  ]);
  const debouncedPrice = useDebounce(priceRange, 500);

  React.useEffect(() => {
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
  const [selectedCategories, setSelectedCategories] = React.useState<
    Option[] | null
  >(null);

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          categories:
            selectedCategories?.length ?
              // Join categories with a dot to make search params prettier
              selectedCategories.map((c) => c.value).join(".")
            : null,
        })}`,
        {
          scroll: false,
        },
      );
    });
  }, [selectedCategories]);

  // Subcategory filter
  const [selectedSubcategories, setSelectedSubcategories] = React.useState<
    Option[] | null
  >(null);
  const subcategories = getSubcategories(category);

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          subcategories:
            selectedSubcategories?.length ?
              selectedSubcategories.map((s) => s.value).join(".")
            : null,
        })}`,
        {
          scroll: false,
        },
      );
    });
  }, [selectedSubcategories]);

  // Store filter
  const [storeIds, setStoreIds] = React.useState<number[] | null>(
    store_ids?.split(".").map(Number) ?? null,
  );

  React.useEffect(() => {
    startTransition(() => {
      router.push(
        `${pathname}?${createQueryString({
          store_ids: storeIds?.length ? storeIds.join(".") : null,
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
            <Button aria-label="Filter products" size="sm" disabled={isPending}>
              Filter
            </Button>
          </SheetTrigger>
          <SheetContent className="flex flex-col">
            <SheetHeader className="px-1">
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div className="flex flex-1 flex-col gap-5 overflow-hidden px-1">
              <div className="space-y-4">
                <h3 className="text-sm font-medium tracking-wide text-foreground">
                  Price range ($)
                </h3>
                <Slider
                  variant="range"
                  thickness="thin"
                  defaultValue={[0, 500]}
                  max={500}
                  step={1}
                  value={priceRange}
                  onValueChange={(value: typeof priceRange) =>
                    setPriceRange(value)
                  }
                />
                <div className="flex items-center space-x-4">
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={0}
                    max={priceRange[1]}
                    className="h-9"
                    value={priceRange[0]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setPriceRange([value, priceRange[1]]);
                    }}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    type="number"
                    inputMode="numeric"
                    min={priceRange[0]}
                    max={500}
                    className="h-9"
                    value={priceRange[1]}
                    onChange={(e) => {
                      const value = Number(e.target.value);
                      setPriceRange([priceRange[0], value]);
                    }}
                  />
                </div>
              </div>
              {categories?.length ?
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    Categories
                  </h3>
                  <MultiSelect
                    placeholder="Select categories"
                    selected={selectedCategories}
                    setSelected={setSelectedCategories}
                    options={categories.map((c) => ({
                      label: titleCase(c),
                      value: c,
                    }))}
                  />
                </div>
              : null}
              {category ?
                <div className="space-y-4">
                  <h3 className="text-sm font-medium tracking-wide text-foreground">
                    Subcategories
                  </h3>
                  <MultiSelect
                    placeholder="Select subcategories"
                    selected={selectedSubcategories}
                    setSelected={setSelectedSubcategories}
                    options={subcategories}
                  />
                </div>
              : null}
              {stores?.length ?
                <div className="space-y-3">
                  <div className="flex gap-2">
                    <h3 className="flex-1 text-sm font-medium tracking-wide text-foreground">
                      Stores
                    </h3>
                    <div className="flex items-center space-x-2">
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          startTransition(() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) - 1,
                              })}`,
                            );
                          });
                        }}
                        disabled={Number(store_page) === 1 || isPending}
                      >
                        <Icons.chevronLeft
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Previous store page</span>
                      </Button>
                      <Button
                        variant="ghost"
                        size="icon"
                        onClick={() => {
                          startTransition(() => {
                            router.push(
                              `${pathname}?${createQueryString({
                                store_page: Number(store_page) + 1,
                              })}`,
                            );
                          });
                        }}
                        disabled={
                          Number(store_page) === storePageCount || isPending
                        }
                      >
                        <Icons.chevronRight
                          className="h-4 w-4"
                          aria-hidden="true"
                        />
                        <span className="sr-only">Next store page</span>
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
                            checked={storeIds?.includes(store.id) ?? false}
                            onCheckedChange={(value) => {
                              if (value) {
                                setStoreIds([...(storeIds ?? []), store.id]);
                              } else {
                                setStoreIds(
                                  storeIds?.filter((id) => id !== store.id) ??
                                    null,
                                );
                              }
                            }}
                          />
                          <Label
                            htmlFor={`store-${store.id}`}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                          >
                            {truncate(store.name, 20)}
                          </Label>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              : null}
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  aria-label="Clear filters"
                  size="sm"
                  className="w-full"
                  onClick={() => {
                    startTransition(() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          price_range: 0 - 100,
                          store_ids: null,
                          categories: null,
                          subcategories: null,
                        })}`,
                      );

                      setPriceRange([0, 100]);
                      setSelectedCategories(null);
                      setSelectedSubcategories(null);
                      setStoreIds(null);
                    });
                  }}
                  disabled={isPending}
                >
                  Clear Filters
                </Button>
              </SheetFooter>
            </div>
          </SheetContent>
        </Sheet>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button aria-label="Sort products" size="sm" disabled={isPending}>
              Sort
              <Icons.chevronDown className="ml-2 h-4 w-4" aria-hidden="true" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
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
      {!isPending && !products.length ?
        <div className="mx-auto flex max-w-xs flex-col space-y-1.5">
          <h1 className="text-center text-2xl font-bold">No products found</h1>
          <p className="text-center text-muted-foreground">
            Try changing your filters, or check back later for new products
          </p>
        </div>
      : null}

      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
        {guestEmail || session ?
          <>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                storeId={Number(product.storeId)}
                variant="default"
                tAddToCart={tAddToCart}
              />
            ))}
          </>
        : <>
            {products.map((product) => (
              <ProductCard
                key={product.id}
                product={product}
                storeId={Number(product.storeId)}
                variant="guest"
                tAddToCart={tAddToCart}
              />
            ))}
          </>
        }
      </div>

      {products.length ?
        <PaginationButton
          pageCount={pageCount}
          page={page}
          per_page={per_page}
          sort={sort}
          createQueryString={createQueryString}
          router={router}
          pathname={pathname}
          isPending={isPending}
          startTransition={startTransition}
        />
      : null}
    </section>
  );
}
