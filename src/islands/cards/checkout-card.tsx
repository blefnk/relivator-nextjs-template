import Link from "next/link";

import { getCartAction } from "~/server/actions/cart";
import { cn, formatPrice } from "~/server/utils";
import { CartLineItems } from "~/islands/checkout/cart-line-items";
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

interface CheckoutCardProps {
  storeId: number;
}

export async function CheckoutCard({ storeId }: CheckoutCardProps) {
  const cartLineItems = await getCartAction(storeId);

  return (
    <Card
      key={storeId}
      as="section"
      id={`store-${storeId}`}
      aria-labelledby={`store-${storeId}-heading`}
      className={cn(
        cartLineItems[0]?.storeStripeAccountId
          ? "border-green-500"
          : "border-destructive"
      )}
    >
      <CardHeader className="flex flex-row items-center space-x-4 py-4">
        <CardTitle className="line-clamp-1 flex-1">
          {cartLineItems[0]?.storeName}
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
            cartLineItems={cartLineItems}
          />
        </ScrollArea>
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter className="space-x-4">
        <span className="flex-1">
          {cartLineItems.reduce((acc, item) => acc + Number(item.quantity), 0)}{" "}
          items
        </span>
        <span>
          {formatPrice(
            cartLineItems.reduce(
              (acc, item) => acc + Number(item.price) * Number(item.quantity),
              0
            )
          )}
        </span>
      </CardFooter>
    </Card>
  );
}
