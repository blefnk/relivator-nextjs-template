import Link from "next/link";

import { getCartAction } from "@/actions/reliverse//cart";
import { Badge } from "@/components/ui/badge";
import { Button, buttonVariants } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import {
  Sheet,
  SheetContent,
  SheetFooter,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet";
import { cn } from "@/utils/reliverse/cn";
import { formatPrice } from "@/utils/reliverse/number";
import consola from "consola";
import { ShoppingCart } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CartLineItems } from "~/components/Checkout/CartLineItems";

export async function CartDialog() {
  const t = await getTranslations();
  const cartLineItems = await getCartAction();

  let itemCount = 0;
  let cartTotal = 0;

  try {
    itemCount = cartLineItems.reduce(
      (total, item) => total + (Number(item.quantity) || 0),
      0,
    );
    cartTotal = cartLineItems.reduce(
      (total, item) => total + (item.quantity || 0) * Number(item.price) || 0,
      0,
    );
  } catch (error) {
    consola.error("Error calculating cart total", error);
    itemCount = 0;
    cartTotal = 0;
  }

  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          aria-label="Open cart"
          className={cn("relative border", {
            "border-primary/40": itemCount > 0,
            "border-primary/20": itemCount <= 0,
          })}
          size="icon"
          variant="outline"
        >
          {itemCount > 0 && (
            <Badge
              className={cn(`
                absolute -right-2 -top-2 size-6 justify-center rounded-full
                border-4 border-primary/20 p-2.5 text-sm text-primary/70
              `)}
              variant="secondary"
            >
              {itemCount}
            </Badge>
          )}
          <ShoppingCart aria-hidden="true" className="size-4" />
        </Button>
      </SheetTrigger>
      <SheetContent
        className={`
          flex w-full flex-col pr-0

          sm:max-w-lg
        `}
      >
        <SheetHeader className="space-y-2.5 pr-6">
          <SheetTitle>
            {t("checkout.cart")}
            {itemCount > 0 && `(${itemCount})`}
          </SheetTitle>
          <Separator />
        </SheetHeader>
        {itemCount > 0 ? (
          <>
            <CartLineItems className="flex-1" items={cartLineItems} />
            <div className="space-y-4 pr-6">
              <Separator />
              <div className="space-y-1.5 text-sm">
                <div className="flex">
                  <span className="flex-1">{t("checkout.shipping")}</span>
                  <span>{t("checkout.free")}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">{t("checkout.taxes")}</span>
                  <span>{t("checkout.calculated")}</span>
                </div>
                <div className="flex">
                  <span className="flex-1">{t("checkout.total")}</span>
                  <span>{formatPrice(cartTotal.toFixed(2))}</span>
                </div>
              </div>
              <SheetFooter>
                <SheetTrigger asChild>
                  <Link
                    aria-label={t("checkout.viewTheCart")}
                    className={buttonVariants({
                      className: "w-full",
                      size: "sm",
                    })}
                    href="/cart"
                  >
                    {t("checkout.viewTheCart")}
                  </Link>
                </SheetTrigger>
              </SheetFooter>
            </div>
          </>
        ) : (
          <div
            className={`
              flex h-full flex-col items-center justify-center space-y-1
            `}
          >
            <ShoppingCart
              aria-hidden="true"
              className="mb-4 size-16 text-muted-foreground"
            />
            <div className="text-xl font-medium text-muted-foreground">
              {t("checkout.cartIsEmpty")}
            </div>
            <SheetTrigger asChild>
              <Link
                aria-label={t("checkout.continueShopping")}
                className={cn(
                  buttonVariants({
                    className: "text-sm text-muted-foreground",
                    size: "sm",
                    variant: "link",
                  }),
                )}
                href="/products"
              >
                {t("checkout.continueShopping")}
              </Link>
            </SheetTrigger>
          </div>
        )}
      </SheetContent>
    </Sheet>
  );
}
