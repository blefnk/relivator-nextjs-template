"use client";

import type { z } from "zod";

import type { ComponentPropsWithoutRef } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import { zodResolver } from "@hookform/resolvers/zod";
import { useTranslations } from "next-intl";

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
import { verifyOrderSchema } from "~/server/validations/deprecated/order";
import { cn } from "~/utils/cn";

type VerifyOderFormProps = {} & ComponentPropsWithoutRef<"form">;

type Inputs = z.infer<typeof verifyOrderSchema>;

export function VerifyOderForm({ className, ...props }: VerifyOderFormProps) {
  const t = useTranslations();

  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  // react-hook-form
  const form = useForm<Inputs>({
    defaultValues: {
      deliveryPostalCode: "",
    },
    resolver: zodResolver(verifyOrderSchema),
  });

  function onSubmit(data: Inputs) {
    startTransition(() => {
      const [deliveryPostalCodeURL] = window.location.href.split(
        "&delivery_postal_code=",
      );
      const formattedPostalCode = data.deliveryPostalCode.split(" ").join("");

      const location = `${deliveryPostalCodeURL}&delivery_postal_code=${formattedPostalCode}`;

      router.push(location);
    });
  }

  return (
    <Form {...form}>
      <form
        className={cn("grid gap-4", className)}
        onSubmit={(...arguments_) =>
          void form.handleSubmit(onSubmit)(...arguments_)
        }
        {...props}
      >
        <FormField
          name="deliveryPostalCode"
          control={form.control}
          render={({ field }) => (
            <FormItem>
              <FormLabel>{t("VerifyOrderForm.deliveryPostalCode")}</FormLabel>
              <FormControl>
                <Input
                  placeholder="Type delivery postal code here."
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button disabled={isPending}>
          {isPending && (
            <SpinnerSVG
              className="mr-2 size-4 animate-spin"
              aria-hidden="true"
            />
          )}
          Verify order
          <span className="sr-only">{t("VerifyOrderForm.verifyOrder")}</span>
        </Button>
      </form>
    </Form>
  );
}
