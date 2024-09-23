"use client";

import type { z } from "zod";

import { startTransition, useId, useTransition } from "react";
import { useForm } from "react-hook-form";

import { zodResolver } from "@hookform/resolvers/zod";
import { MinusIcon, PlusIcon } from "@radix-ui/react-icons";
import consola from "consola";
import { useTranslations } from "next-intl";
import tryToCatch from "try-to-catch";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import { Button } from "~/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "~/components/ui/form";
import { Input } from "~/components/ui/input";
import { addToCartAction } from "~/server/actions/deprecated/cart";
import { catchError } from "~/server/helpers/auth-error";
import { updateCartItemSchema } from "~/server/validations/deprecated/cart";

type CartAddFormProps = {
  email?: string;
  productId: number;
  session?: unknown;
  storeId: string;
  tAddToCart: "Add to cart" | string;
};

type Inputs = z.infer<typeof updateCartItemSchema>;

export function CartAddForm({
  productId,
  storeId,
  tAddToCart,
}: CartAddFormProps) {
  const t = useTranslations();

  const id = useId();

  // const [isPending, startTransition] = useTransition();
  const [isPending] = useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    defaultValues: {
      quantity: 1,
      storeId: Number(storeId),
    },
    resolver: zodResolver(updateCartItemSchema),
  });

  const onSubmit = (data: Inputs) => {
    startTransition(async () => {
      const [error] = await tryToCatch(addToCartAction, {
        productId,
        quantity: data.quantity,
        storeId: Number(storeId),
      });

      if (error) {
        consola.error(
          "Something went wrong with adding to cart. Please try again later.",
        );
        catchError(error);
      }
    });
  };

  return (
    <Form {...form}>
      <form
        className="flex items-center space-x-2"
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <div className="flex items-center">
          <Button
            id={`${id}-decrement`}
            className="size-8"
            disabled={isPending}
            type="button"
            variant="outline"
            onClick={() => {
              form.setValue(
                "quantity",
                Math.max(0, form.getValues("quantity") - 1),
              );
            }}
          >
            <MinusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">{t("CartAddForm.removeOneItem")}</span>
          </Button>
          <FormField
            name="quantity"
            control={form.control}
            render={({ field }) => (
              <FormItem className="space-y-0">
                <FormLabel className="sr-only">
                  {t("CartAddForm.quantity")}
                </FormLabel>
                <FormControl>
                  <Input
                    className="h-8 w-14 rounded-none border-x-0"
                    inputMode="numeric"
                    min={0}
                    type="number"
                    {...field}
                    onChange={(event) => {
                      const { value } = event.target;
                      const parsedValue = Number.parseInt(value, 10);

                      if (Number.isNaN(parsedValue)) {
                        return;
                      }

                      field.onChange(parsedValue);
                    }}
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            id={`${id}-increment`}
            className="size-8 rounded-l-none"
            disabled={isPending}
            type="button"
            variant="outline"
            onClick={() => {
              form.setValue("quantity", form.getValues("quantity") + 1);
            }}
          >
            <PlusIcon className="size-3" aria-hidden="true" />
            <span className="sr-only">{t("CartAddForm.addOneItem")}</span>
          </Button>
        </div>
        <Button
          disabled={isPending}
          size="default"
          type="submit"
          variant="secondary"
        >
          {isPending ? (
            <SpinnerSVG
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          ) : (
            tAddToCart
          )}
        </Button>
      </form>
    </Form>
  );
}
