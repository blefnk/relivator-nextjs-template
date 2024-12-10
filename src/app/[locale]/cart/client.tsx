"use client";

import Link from "next/link";
import * as React from "react";

import { CheckoutCard } from "~/components/checkout/checkout-card";
import { Icons } from "~/components/icons";
import { Button } from "~/components/ui/button";
import { buttonVariants } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Separator } from "~/components/ui/separator";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { cn } from "~/server/utils";

type CartSheetProps = {
  uniqueStoreIds: string[];
};

export function CartSheet({ uniqueStoreIds }: CartSheetProps) {
  return (
    <Sheet>
      {/* Sheet Trigger Button */}
      <SheetTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="w-10 h-10 relative"
          aria-label="Open Cart"
        >
          <Icons.cart className="h-6 w-6" aria-hidden="true" />
          {/* Optional: Display the number of items in the cart */}
          {uniqueStoreIds.length > 0 && (
            <span className="absolute top-0 right-0 inline-flex items-center justify-center px-2 py-1 text-xs font-bold leading-none text-red-100 bg-red-600 rounded-full">
              {uniqueStoreIds.length}
            </span>
          )}
        </Button>
      </SheetTrigger>

      {/* Sheet Content */}
      <SheetContent side="right" className="w-full sm:w-[400px]">
        <SheetHeader>
          <SheetTitle>Cart</SheetTitle>
          <SheetClose className="absolute top-4 right-4">
            <kbd className="inline-flex select-none items-center gap-1 rounded border bg-background px-2 py-1 font-mono font-medium opacity-100">
              <span className="text-xs">ESC</span>
              <span className="sr-only">Close</span>
            </kbd>
          </SheetClose>
        </SheetHeader>

        <ScrollArea className="h-[calc(100vh-10rem)] pb-10">
          <div className="flex flex-col gap-6 p-6">
            {uniqueStoreIds.length > 0 ? (
              uniqueStoreIds.map(
                (storeId) =>
                  storeId && <CheckoutCard key={storeId} storeId={storeId} />,
              )
            ) : (
              <section
                id="cart-page-empty-cart"
                aria-labelledby="cart-page-empty-cart-heading"
                className="flex flex-col items-center justify-center space-y-1 pt-16"
              >
                <Icons.cart
                  className="mb-4 size-16 text-muted-foreground"
                  aria-hidden="true"
                />
                <div className="text-xl font-medium text-muted-foreground">
                  Your cart is empty
                </div>
                <Link
                  aria-label="Add items to your cart to checkout"
                  href="/products"
                  className={cn(
                    buttonVariants({
                      variant: "link",
                      size: "sm",
                      className: "text-sm text-muted-foreground",
                    }),
                  )}
                >
                  Add items to your cart to checkout
                </Link>
              </section>
            )}
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
