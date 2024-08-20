"use client";

import { useId, useTransition } from "react";

import type { CartLineItem } from "@/types/reliverse/store";

import {
  deleteCartItemAction,
  updateCartItemAction,
} from "@/actions/reliverse//cart";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { catchError } from "@/server/reliverse/auth-error";
import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";
import tryToCatch from "try-to-catch";

type UpdateCartProps = {
  cartLineItem: CartLineItem;
};

export function UpdateCart({ cartLineItem }: UpdateCartProps) {
  const t = useTranslations();

  const id = useId();
  const [isPending, startTransition] = useTransition();

  return (
    <div
      className={`
        flex w-full items-center justify-between space-x-2

        xs:w-auto xs:justify-normal
      `}
    >
      <div className="flex items-center">
        <Button
          className="size-8 rounded-r-none"
          disabled={isPending}
          id={`${id}-decrement`}
          onClick={() => {
            startTransition(async () => {
              const [error] = await tryToCatch(updateCartItemAction, {
                productId: cartLineItem.id,
                quantity: Number(cartLineItem.quantity) - 1,
                storeId: cartLineItem.storeId,
              });

              if (error) {
                catchError(error);
              }
            });
          }}
          size="icon"
          variant="outline"
        >
          <MinusIcon aria-hidden="true" className="size-3" />
          <span className="sr-only">{t("UpdateCart.removeOneItem")}</span>
        </Button>
        <Input
          className="h-8 w-14 rounded-none border-x-0"
          disabled={isPending}
          id={`${id}-quantity`}
          min="0"
          onChange={(event_) => {
            startTransition(async () => {
              const [error] = await tryToCatch(updateCartItemAction, {
                productId: cartLineItem.id,
                quantity: Number(event_.target.value),
                storeId: cartLineItem.storeId,
              });

              if (error) {
                catchError(error);
              }
            });
          }}
          style={{
            MozAppearance: "textfield",
            WebkitAppearance: "none",
          }}
          type="number"
          value={cartLineItem.quantity}
        />
        <Button
          className="size-8 rounded-l-none"
          disabled={isPending}
          id={`${id}-increment`}
          onClick={() => {
            startTransition(async () => {
              const [error] = await tryToCatch(updateCartItemAction, {
                productId: cartLineItem.id,
                quantity: Number(cartLineItem.quantity) + 1,
                storeId: cartLineItem.storeId,
              });

              if (error) {
                catchError(error);
              }
            });
          }}
          size="icon"
          variant="outline"
        >
          <PlusIcon aria-hidden="true" className="size-3" />
          <span className="sr-only">{t("UpdateCart.addOneItem")}</span>
        </Button>
      </div>
      <Button
        className="size-8"
        disabled={isPending}
        id={`${id}-delete`}
        onClick={() => {
          startTransition(async () => {
            const [error] = await tryToCatch(deleteCartItemAction, {
              productId: cartLineItem.id,
            });

            if (error) {
              catchError(error);
            }
          });
        }}
        size="icon"
        variant="outline"
      >
        <TrashIcon aria-hidden="true" className="size-3" />
        <span className="sr-only">{t("UpdateCart.deleteItem")}</span>
      </Button>
    </div>
  );
}
