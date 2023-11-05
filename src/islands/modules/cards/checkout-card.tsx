import { Link } from "~/navigation";
import { cn, formatPrice } from "~/utils";

import { getCartAction } from "~/server/actions/cart";
import { CartLineItems } from "~/islands/checkout/cart-line-items";
import { buttonVariants } from "~/islands/primitives/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/islands/primitives/card";
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
      id={`checkout-store-${storeId}`}
      aria-labelledby={`checkout-store-${storeId}-heading`}
      className={cn(
        cartLineItems[0]?.storeStripeAccountId
          ? "border-green-500"
          : "border-neutral-700",
      )}
    >
      <CardHeader className="flex flex-row items-center space-x-4 py-4">
        <CardTitle className="line-clamp-1 flex-1">
          {cartLineItems[0]?.storeName}
        </CardTitle>
        <Link
          aria-label="Checkout"
          href={`/checkout/${storeId}`}
          className={cn(
            buttonVariants({
              size: "sm",
            }),
          )}
        >
          Checkout
        </Link>
      </CardHeader>
      <Separator className="mb-4" />
      <CardContent className="pb-6 pl-6 pr-0">
        <CartLineItems items={cartLineItems} className="max-h-[280px]" />
      </CardContent>
      <Separator className="mb-4" />
      <CardFooter className="space-x-4">
        <span className="flex-1">
          Total ({cartLineItems.reduce((acc, item) => acc + item.quantity, 0)})
        </span>
        <span>
          {formatPrice(
            cartLineItems.reduce(
              (acc, item) => acc + Number(item.price) * item.quantity,
              0,
            ),
          )}
        </span>
      </CardFooter>
    </Card>
  );
}
