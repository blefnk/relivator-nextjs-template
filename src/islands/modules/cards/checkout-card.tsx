import { cn, formatPrice } from "~/utils";

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
import { Link } from "~/navigation";
import { getCartAction } from "~/server/actions/cart";

interface CheckoutCardProperties {
  storeId: number;
}

export async function CheckoutCard({ storeId }: CheckoutCardProperties) {
  // console.log("CheckoutCard's await getCartAction");
  const cartLineItems = await getCartAction(storeId);

  let totalQuantity = 0;
  let totalPrice = 0;

  try {
    totalQuantity = cartLineItems.reduce(
      (acc, item) => acc + (item.quantity ?? 0),
      0,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error calculating total quantity:", error.message);
      totalQuantity = 0; // Set default variable value in case of an error
    } else {
      // If for any reason something else was
      // thrown that wasn't an Error, handle it
      console.error("❌ An unexpected error occurred:", error);
    }
  }

  try {
    totalPrice = cartLineItems.reduce(
      (acc, item) => acc + Number(item.price ?? 0) * (item.quantity ?? 0),
      0,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error calculating total price:", error.message);
      totalPrice = 0; // Set default variable value in case of an error
    } else {
      // If for any reason something else was
      // thrown that wasn't an Error, handle it
      console.error("❌ An unexpected error occurred:", error);
    }
  }

  // console.log("totalQuantity:", totalQuantity);
  // console.log("totalPrice:", totalPrice);

  return (
    <Card
      key={storeId}
      as="section"
      id={`checkout-store-${storeId}`}
      aria-labelledby={`checkout-store-${storeId}-heading`}
      className={cn(
        cartLineItems[0]?.storeStripeAccountId ?
          "border-green-500"
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
        <span className="flex-1">Total ({totalQuantity})</span>
        <span>{formatPrice(totalPrice)}</span>
      </CardFooter>
    </Card>
  );
}
