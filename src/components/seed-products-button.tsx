"use client";

import * as React from "react";
import { toast } from "sonner";

import { Icons } from "~/components/icons";
import { Button, type ButtonProps } from "~/components/ui/button";
import { seedProducts } from "~/server/actions/seed";
import { cn } from "~/server/utils";

type SeedProductsProps = {
  storeId: string;
  count?: number;
} & ButtonProps;

export function SeedProducts({
  storeId,
  count,
  className,
  ...props
}: SeedProductsProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Button
      className={cn(className)}
      size="sm"
      onClick={() => {
        startTransition(async () => {
          await seedProducts({
            storeId,
            count,
          });
          toast.success("Products seeded successfully.");
        });
      }}
      {...props}
      disabled={isPending}
    >
      {isPending && <Icons.spinner className="mr-2 size-4 animate-spin" />}
      Seed products
    </Button>
  );
}
