"use client";

import * as React from "react";
import { useRouter } from "next/navigation";
import { toast } from "react-hot-toast";

import { type Product } from "~/data/db/schema";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";
import {
  getNextProductIdAction,
  getPreviousProductIdAction,
} from "~/server/actions/product";

type ProductPagerProps = {
  product: Product;
};

export function ProductPager({ product }: ProductPagerProps) {
  const router = useRouter();
  const [isPending, startTransition] = React.useTransition();

  return (
    <div className="flex space-x-0.5">
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          startTransition(async () => {
            try {
              const prevProductId = await getPreviousProductIdAction({
                id: product.id,
                storeId: product.storeId,
              });
              router.push(
                `/dashboard/stores/${product.storeId}/products/${prevProductId}`,
              );
            } catch (error) {
              error instanceof Error ?
                toast.error(error.message)
              : toast.error("Something went wrong, please try again.");
            }
          });
        }}
        disabled={isPending}
      >
        <Icons.chevronLeft className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Previous product</span>
      </Button>
      <Button
        variant="ghost"
        size="icon"
        onClick={() => {
          startTransition(async () => {
            try {
              const nextProductId = await getNextProductIdAction({
                id: product.id,
                storeId: product.storeId,
              });
              router.push(
                `/dashboard/stores/${product.storeId}/products/${nextProductId}`,
              );
            } catch (error) {
              error instanceof Error ?
                toast.error(error.message)
              : toast.error("Something went wrong, please try again.");
            }
          });
        }}
        disabled={isPending}
      >
        <Icons.chevronRight className="h-4 w-4" aria-hidden="true" />
        <span className="sr-only">Next product</span>
      </Button>
    </div>
  );
}
