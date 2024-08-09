"use client";

import type { ComponentPropsWithoutRef } from "react";
import { useTransition } from "react";
import { useForm } from "react-hook-form";

import { useRouter } from "next/navigation";

import type { z } from "zod";

import { verifyOrderSchema } from "@/actions/reliverse/validations/order";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { cn } from "@/utils";
import { zodResolver } from "@hookform/resolvers/zod";

import { Icons } from "~/components/Common/Icons";

type VerifyOderFormProps = {} & ComponentPropsWithoutRef<"form">;

type Inputs = z.infer<typeof verifyOrderSchema>;

export function VerifyOderForm({ className, ...props }: VerifyOderFormProps) {
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
      const [baseDeliversePostalCodeUrl] = window.location.href.split(
        "&delivery_postal_code=",
      );
      const formattedPostalCode = data.deliveryPostalCode.split(" ").join("");

      const location = `${baseDeliversePostalCodeUrl}&delivery_postal_code=${formattedPostalCode}`;

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
          control={form.control}
          name="deliveryPostalCode"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Delivery postal code</FormLabel>
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
            <Icons.spinner
              aria-hidden="true"
              className="mr-2 size-4 animate-spin"
            />
          )}
          Verify order
          <span className="sr-only">Verify order</span>
        </Button>
      </form>
    </Form>
  );
}
