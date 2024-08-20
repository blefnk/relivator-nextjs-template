"use client";

import type { HTMLAttributes } from "react";
import { useCallback, useEffect, useState, useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import type { CartItem } from "@/types/reliverse/store";

import {
  addToCartAction,
  deleteCartItemAction,
} from "@/actions/reliverse/cart";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown";
import { Input } from "@/components/ui/input";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { Slider } from "@/components/ui/slider";
import { useDebounce } from "@/hooks-react/use-debounce";
import { cn } from "@/utils/reliverse/cn";
import consola from "consola";
import { ChevronDown } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Product } from "~/db/schema/provider";

import { ProductCard } from "~/components/Modules/Cards/ProductCard";
import { PaginationButton } from "~/components/Navigation/Pagination/PaginationButton";
import { sortOptions } from "~/constants/products";

/* eslint-disable max-lines-per-function */
type ProductBuilderProps = {
  cartItems: CartItem[];
  pageCount: number;
  products: Product[];
  subcategory: null | string;
  tAddToCart: string;
} & HTMLAttributes<HTMLDivElement>;

export function ProductBuilder({
  cartItems,
  pageCount,
  products,
  subcategory,
  tAddToCart = "Add to cart",
  ...props
}: ProductBuilderProps) {
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
      );
    });
  }, [debouncedPrice, createQueryString, pathname, router]);

  const addToCart = useCallback(
    async (product: Product) => {
      try {
        const productId = Number(product.id);
        const storeId = Number(product.storeId);

        if (!cartItems.map((item) => item.productId).includes(productId)) {
          // Only allow one product per subcategory in cart
          const productIdWithSameSubcategory = cartItems.find(
            (item) => item.subcategory === product.subcategory,
          )?.productId;

          if (productIdWithSameSubcategory) {
            await deleteCartItemAction({
              productId: productIdWithSameSubcategory,
            });
          }

          await addToCartAction({
            productId: productId,
            quantity: 1,
            storeId: storeId,
            subcategory: product.subcategory || subcategory,
          });

          consola.success("Added to cart.");

          return;
        }

        await deleteCartItemAction({
          productId: productId,
        });

        consola.success("Removed from cart.");
      } catch (error) {
        error instanceof Error
          ? consola.error(error.message)
          : consola.error("Something went wrong, please try again.");
      }
    },
    [cartItems, subcategory],
  );

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
              <SheetTitle>{t("product-building.filters")}</SheetTitle>
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
                  onValueChange={(value: typeof priceRange) => {
                    setPriceRange(value);
                  }}
                  step={1}
                  thickness="thin"
                  value={priceRange}
                  variant="range"
                />
                <div className="flex items-center space-x-4">
                  <Input
                    className="h-9"
                    inputMode="numeric"
                    max={priceRange[1]}
                    min={0}
                    onChange={(event_) => {
                      const value = Number(event_.target.value);

                      setPriceRange([value, priceRange[1]]);
                    }}
                    type="number"
                    value={priceRange[0]}
                  />
                  <span className="text-muted-foreground">-</span>
                  <Input
                    className="h-9"
                    inputMode="numeric"
                    max={500}
                    min={priceRange[0]}
                    onChange={(event_) => {
                      const value = Number(event_.target.value);

                      setPriceRange([priceRange[0], value]);
                    }}
                    type="number"
                    value={priceRange[1]}
                  />
                </div>
              </div>
            </div>
            <div>
              <Separator className="my-4" />
              <SheetFooter>
                <Button
                  aria-label="Clear filters"
                  className="w-full"
                  disabled={isPending}
                  onClick={() => {
                    startTransition(() => {
                      router.push(
                        `${pathname}?${createQueryString({
                          price_range: "0-100",
                        })}`,
                      );
                      setPriceRange([0, 100]);
                    });
                  }}
                  size="sm"
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
              <ChevronDown aria-hidden="true" className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>
              {t("product-building.sortBy")}
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            {sortOptions.map((option) => (
              <DropdownMenuItem
                className={cn(option.value === sort && "font-bold")}
                key={option.label}
                onClick={() => {
                  startTransition(() => {
                    router.push(
                      `${pathname}?${createQueryString({
                        sort: option.value,
                      })}`,
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
            {t("product-building.noProductsFound")}
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
        {products.map((product) => (
          <ProductCard
            isAddedToCart={cartItems
              .map((item) => item.productId)
              .includes(Number(product.id))}
            key={product.id}
            onSwitch={() => addToCart(product)}
            product={product}
            storeId={product.storeId.toString()}
            tAddToCart={tAddToCart}
            variant="switchable"
          />
        ))}
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
