"use client";

import { useTransition } from "react";

import { useRouter } from "next/navigation";

import {
  getNextProductIdAction,
  getPreviousProductIdAction,
} from "@/actions/reliverse/product-old";
import { Button } from "@/components/ui/button";
import consola from "consola";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useTranslations } from "next-intl";

import type { Product } from "~/db/schema/provider";

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
        <ChevronLeft aria-hidden="true" className="size-4" />
        <span className="sr-only">{t("ProductPager.previousProduct")}</span>
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
        <ChevronRight aria-hidden="true" className="size-4" />
        <span className="sr-only">{t("ProductPager.nextProduct")}</span>
      </Button>
    </div>
  );
}
