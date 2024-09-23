"use client";

import type { CartLineItem } from "~/types/store";

import { useId, useTransition } from "react";

import { MinusIcon, PlusIcon, TrashIcon } from "lucide-react";
import { useTranslations } from "next-intl";

import { Button } from "~/components/ui/button";
import { Input } from "~/components/ui/input";
import {
  deleteCartItemAction,
  updateCartItemAction,
} from "~/server/actions/deprecated/cart";
import { catchError } from "~/server/helpers/auth-error";

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
          id={`${id}-decrement`}
          className="size-8 rounded-r-none"
          disabled={isPending}
          size="icon"
          variant="outline"
          onClick={() => {
            startTransition(async () => {
              try {
                await updateCartItemAction({
                  productId: Number(cartLineItem.id),
                  quantity: Number(cartLineItem.quantity) - 1,
                  storeId: Number(cartLineItem.storeId),
                });
              } catch (error) {
                catchError(error);
              }
            });
          }}
        >
          <MinusIcon className="size-3" aria-hidden="true" />
          <span className="sr-only">{t("UpdateCart.removeOneItem")}</span>
        </Button>
        <Input
          id={`${id}-quantity`}
          className="h-8 w-14 rounded-none border-x-0"
          disabled={isPending}
          min="0"
          type="number"
          value={String(cartLineItem.quantity)}
          style={{
            MozAppearance: "textfield",
            WebkitAppearance: "none",
          }}
          onChange={(event_) => {
            startTransition(async () => {
              try {
                const newQuantity = Number(event_.target.value);

                if (!Number.isNaN(newQuantity)) {
                  await updateCartItemAction({
                    productId: Number(cartLineItem.id),
                    quantity: newQuantity,
                    storeId: Number(cartLineItem.storeId),
                  });
                }
              } catch (error) {
                catchError(error);
              }
            });
          }}
        />
        <Button
          id={`${id}-increment`}
          className="size-8 rounded-l-none"
          disabled={isPending}
          size="icon"
          variant="outline"
          onClick={() => {
            startTransition(async () => {
              try {
                await updateCartItemAction({
                  productId: Number(cartLineItem.id),
                  quantity: Number(cartLineItem.quantity) + 1,
                  storeId: Number(cartLineItem.storeId),
                });
              } catch (error) {
                catchError(error);
              }
            });
          }}
        >
          <PlusIcon className="size-3" aria-hidden="true" />
          <span className="sr-only">{t("UpdateCart.addOneItem")}</span>
        </Button>
      </div>
      <Button
        id={`${id}-delete`}
        className="size-8"
        disabled={isPending}
        size="icon"
        variant="outline"
        onClick={() => {
          startTransition(async () => {
            try {
              await deleteCartItemAction({
                productId: Number(cartLineItem.id),
              });
            } catch (error) {
              catchError(error);
            }
          });
        }}
      >
        <TrashIcon className="size-3" aria-hidden="true" />
        <span className="sr-only">{t("UpdateCart.deleteItem")}</span>
      </Button>
    </div>
  );
}
