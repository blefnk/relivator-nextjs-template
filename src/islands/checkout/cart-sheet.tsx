import { cn, formatPrice } from "~/utils";

import { CartLineItems } from "~/islands/checkout/cart-line-items";
import { Icons } from "~/islands/icons";
import { Badge } from "~/islands/primitives/badge";
import { Button, buttonVariants } from "~/islands/primitives/button";
import { Separator } from "~/islands/primitives/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/islands/primitives/sheet";
import { Link } from "~/navigation";
import { getCartAction } from "~/server/actions/cart";

export async function CartSheet() {
  // console.log("CartSheet's await getCartAction");
  const cartLineItems = await getCartAction();

  let itemCount = 0;
  let cartTotal = 0;

  try {
    itemCount = cartLineItems.reduce(
      (total, item) => total + (Number(item.quantity) ?? 0),
      0,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error calculating item count:", error.message);
      itemCount = 0; // Set default variable value in case of an error
    } else {
      // If for any reason something else was
      // thrown that wasn't an Error, handle it
      console.error("❌ An unexpected error occurred:", error);
    }
  }

  try {
    cartTotal = cartLineItems.reduce(
      (total, item) => total + (item.quantity ?? 0) * (Number(item.price) ?? 0),
      0,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error calculating cart total:", error.message);
      cartTotal = 0; // Set default variable value in case of an error
    } else {
      // If for any reason something else was
      // thrown that wasn't an Error, handle it
      console.error("❌ An unexpected error occurred:", error);
    }
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          variant="outline"
          size="icon"
          className={`relative ${
            itemCount > 0 ? "border border-primary/40" : ""
          }`}
        >
          {itemCount > 0 && (
            <Badge
              variant="secondary"
              className="absolute -right-2 -top-2 h-6 w-6 justify-center rounded-full border-4 border-primary/20 p-2.5 text-sm text-primary/70"
            >
              {itemCount}
            </Badge>
          )}
          <Icons.cart className="h-4 w-4" aria-hidden="true" />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex w-full flex-col pr-0 sm:max-w-lg">
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>Cart {itemCount > 0 && `(${itemCount})`}</SheetTitle>
          <Separator />
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <CartLineItems items={cartLineItems} className="flex-1" />
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">Shipping</span>
                  <span>Free</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Taxes</span>
                  <span>Calculated at checkout</span>
                </div>
                <div className="flex">
                  <span className="flex-1">Total</span>
                  <span>{formatPrice(cartTotal.toFixed(2))}</span>
                </div>
              </div>

              <SheetFooter>
                <SheetTrigger>
                  <Link
                    aria-label="View your cart"
                    href="/cart"
                    className={buttonVariants({
                      size: "sm",
                      className: "w-full",
                    })}
                  >
                    Continue to checkout
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div className="flex h-full flex-col items-center justify-center space-y-1">
            <Icons.cart
              className="mb-4 h-16 w-16 text-muted-foreground"
              aria-hidden="true"
            />
            <div className="text-xl font-medium text-muted-foreground">
              Your cart is empty
            </div>

            <SheetTrigger>
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
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
