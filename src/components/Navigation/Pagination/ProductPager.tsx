"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import {
  getNextProductIdAction,
  getPreviousProductIdAction,
} from "@/actions/reliverse/product-old";
import { Button } from "@/components/ui/button";
import consola from "consola";

import type { Product } from "~/db/schema";

import { Icons } from "~/components/Common/Icons";

type ProductPagerProps = {
  product: Product;
};

export function ProductPager({ product }: ProductPagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex space-x-0.5">
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            try {
              const previousProductId = await getPreviousProductIdAction({
                id: Number(product.id),
                storeId: product.storeId,
              });

              router.push(
                `/dashboard/stores/${product.storeId}/products/${previousProductId}`,
              );
            } catch (error) {
              error instanceof Error
                ? consola.error(error.message)
                : consola.error(
                    "Something went wrong, please try again. Please check Pagination/ProductPager.tsx file.",
                  );
            }
          });
        }}
        size="icon"
        variant="ghost"
      >
        <Icons.chevronLeft aria-hidden="true" className="size-4" />
        <span className="sr-only">Previous product</span>
      </Button>
      <Button
        disabled={isPending}
        onClick={() => {
          startTransition(async () => {
            try {
              const nextProductId = await getNextProductIdAction({
                id: Number(product.id),
                storeId: product.storeId,
              });

              router.push(
                `/dashboard/stores/${product.storeId}/products/${nextProductId}`,
              );
            } catch (error) {
              error instanceof Error
                ? consola.error(error.message)
                : consola.error("Something went wrong, please try again.");
            }
          });
        }}
        size="icon"
        variant="ghost"
      >
        <Icons.chevronRight aria-hidden="true" className="size-4" />
        <span className="sr-only">Next product</span>
      </Button>
    </div>
  );
}
