"use client";

import type { HTMLAttributes } from "react";
import { useCallback, useEffect, useState, useTransition } from "react";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Button } from "@/browser/reliverse/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/browser/reliverse/ui/Dropdown";
import { Input } from "@/browser/reliverse/ui/Input";
import { Separator } from "@/browser/reliverse/ui/Separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/browser/reliverse/ui/Sheet";
import { Slider } from "@/browser/reliverse/ui/Slider";
import {
  addToCartAction,
  deleteCartItemAction,
} from "@/server/reliverse/actions/cart";
import consola from "consola";

/* eslint-disable max-lines-per-function */
import type { Product } from "~/db/schema";
import type { CartItem } from "~/types";

import { Icons } from "~/components/Common/Icons";
import { ProductCard } from "~/components/Modules/Cards/ProductCard";
import { PaginationButton } from "~/components/Navigation/Pagination/PaginationButton";
import { sortOptions } from "~/constants/products";
import { useDebounce } from "~/hooks";
import { cn } from "~/utils";

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
  }, [debouncedPrice]);

  const addToCart = useCallback(
    async (product: Product) => {
      try {
        // @ts-expect-error TODO: fix id type
        if (!cartItems.map((item) => item.productId).includes(product.id)) {
          // Only allow one product per subcategory in cart
          const productIdWithSameSubcategory =
            cartItems.find(
              (item) => item.subcategory === product.subcategory,
            ) && // @ts-expect-error TODO: fix
            cartItems.find((item) => item.subcategory === product.subcategory)
              .productId;

          if (productIdWithSameSubcategory) {
            await deleteCartItemAction({
              productId: productIdWithSameSubcategory,
            });
          }

          // consola.info("ProductBuilder's await addToCartAction");
          await addToCartAction({
            // @ts-expect-error TODO: Fix id type
            productId: product.id,
            quantity: 1,
            storeId: product.storeId,
            subcategory: product.subcategory || subcategory,
          });

          consola.success("Added to cart.");

          return;
        }

        await deleteCartItemAction({
          // @ts-expect-error TODO: Fix id type
          productId: product.id,
        });

        consola.success("Removed from cart.");
      } catch (error) {
        error instanceof Error
          ? consola.error(error.message)
          : consola.error("Something went wrong, please try again.");
      }
    },
    [subcategory, cartItems],
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
              <SheetTitle>Filters</SheetTitle>
            </SheetHeader>
            <Separator />
            <div
              className={`
              flex flex-1 flex-col gap-5 overflow-hidden
              px-1
            `}
            >
              <div className="space-y-4">
                <h3
                  className={`
                  text-sm font-medium tracking-wide
                  text-foreground
                `}
                >
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
                          price_range: 0 - 100,
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
              <Icons.chevronDown aria-hidden="true" className="ml-2 size-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="start" className="w-48">
            <DropdownMenuLabel>Sort by</DropdownMenuLabel>
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
          <h1 className="text-center text-2xl font-bold">No products found</h1>
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
              .map((item) => item.productId) // @ts-expect-error TODO: Fix id type
              .includes(product.id)}
            key={product.id}
            onSwitch={() => addToCart(product)}
            product={product} // @ts-expect-error TODO: Fix id type
            storeId={product.storeId}
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
