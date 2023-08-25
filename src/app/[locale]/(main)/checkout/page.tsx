import type { Metadata } from "next";
import Link from "next/link";

import { getCartAction } from "~/utils/server/actions/cart";
import { cn, formatPrice } from "~/utils/server/utils";
import { CartLineItems } from "~/islands/checkout/cart-line-items";
import { Icons } from "~/islands/icons";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/page-header";
import { buttonVariants } from "~/islands/primitives/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle
} from "~/islands/primitives/card";
import { ScrollArea } from "~/islands/primitives/scroll-area";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/shells/shell";
import { env } from "~/env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Checkout",
  description: "Checkout with your cart items"
};

export default async function CheckoutPage() {
  const cartLineItems = await getCartAction();

  const uniqueStoreIds = Array.from(
    new Set(cartLineItems.map((item) => item.storeId))
  );

  return (
    <Shell>
      <PageHeader
        id="checkout-page-header"
        aria-labelledby="checkout-page-header-heading"
      >
        <PageHeaderHeading size="sm">Checkout</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Checkout with your cart items
        </PageHeaderDescription>
      </PageHeader>
      {cartLineItems.length > 0 ? (
        uniqueStoreIds.map((storeId) => (
          <Card
            key={storeId}
            as="section"
            id={`store-${storeId}`}
            aria-labelledby={`store-${storeId}-heading`}
            className={cn(
              cartLineItems.find((item) => item.storeId === storeId)
                ?.storeStripeAccountId
                ? "border-green-500"
                : "border-destructive"
            )}
          >
            <CardHeader className="flex flex-row items-center space-x-4 py-4">
              <CardTitle className="line-clamp-1 flex-1">
                {
                  cartLineItems.find((item) => item.storeId === storeId)
                    ?.storeName
                }
              </CardTitle>
              <Link
                aria-label="Checkout with your cart items"
                href={`/checkout/${storeId}`}
                className={cn(
                  buttonVariants({
                    size: "sm"
                  })
                )}
              >
                Checkout
              </Link>
            </CardHeader>
            <Separator className="mb-4" />
            <CardContent className="pb-6 pl-6 pr-0">
              <ScrollArea className="h-full">
                <CartLineItems
                  className="max-h-[380px] pr-6"
                  cartLineItems={cartLineItems.filter(
                    (item) => item.storeId === storeId
                  )}
                />
              </ScrollArea>
            </CardContent>
            <Separator className="mb-4" />
            <CardFooter className="space-x-4">
              <span className="flex-1">
                {cartLineItems
                  .filter((item) => item.storeId === storeId)
                  .reduce((acc, item) => acc + Number(item.quantity), 0)}{" "}
                items
              </span>
              <span>
                {formatPrice(
                  cartLineItems
                    .filter((item) => item.storeId === storeId)
                    .reduce(
                      (acc, item) =>
                        acc + Number(item.price) * Number(item.quantity),
                      0
                    )
                )}
              </span>
            </CardFooter>
          </Card>
        ))
      ) : (
        <section
          id="checkout-page-empty-cart"
          aria-labelledby="checkout-page-empty-cart-heading"
          className="flex h-full flex-col items-center justify-center space-y-1 pt-16"
        >
          <Icons.cart
            className="mb-4 h-16 w-16 text-muted-foreground"
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
                className: "text-sm text-muted-foreground"
              })
            )}
          >
            Add items to your cart to checkout
          </Link>
        </section>
      )}
    </Shell>
  );
}
