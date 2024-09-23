"use client";

import type { Product } from "~/db/schema";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import consola from "consola";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import {
  getNextProductIdAction,
  getPreviousProductIdAction,
} from "~/server/actions/deprecated/product-old";

type ProductPagerProps = {
  product: Product;
};

export function ProductPager({ product }: ProductPagerProps) {
  const t = useTranslations();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  return (
    <div className="flex space-x-0.5">
      <Button
        disabled={isPending}
        size="icon"
        variant="ghost"
        onClick={() => {
          startTransition(async () => {
            try {
              const previousProductId = await getPreviousProductIdAction({
                id: Number(product.id),
                // @ts-expect-error TODO: Fix ts
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
      >
        <ChevronLeft className="size-4" aria-hidden="true" />
        <span className="sr-only">{t("ProductPager.previousProduct")}</span>
      </Button>
      <Button
        disabled={isPending}
        size="icon"
        variant="ghost"
        onClick={() => {
          startTransition(async () => {
            try {
              const nextProductId = await getNextProductIdAction({
                id: Number(product.id),
                // @ts-expect-error TODO: Fix ts
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
      >
        <ChevronRight className="size-4" aria-hidden="true" />
        <span className="sr-only">{t("ProductPager.nextProduct")}</span>
      </Button>
    </div>
  );
}
