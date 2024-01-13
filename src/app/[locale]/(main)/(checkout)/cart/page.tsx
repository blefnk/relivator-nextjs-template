import type { Metadata } from "next";
import { cn } from "~/utils";
import { getTranslations } from "next-intl/server";

import { env } from "~/env.mjs";
import { Icons } from "~/islands/icons";
import { CheckoutCard } from "~/islands/modules/cards/checkout-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { buttonVariants } from "~/islands/primitives/button";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link, redirect } from "~/navigation";
import { getCartAction, getUniqueStoreIds } from "~/server/actions/cart";
import { getCartId } from "~/server/cart";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  description: "Checkout with your cart items",
  title: "Cart",
};

export default async function CartPage() {
  const t = await getTranslations();

  // getUniqueStoreIds returns an array of store IDs
  const uniqueStoreIds = await getUniqueStoreIds();

  // Check for a valid cartId
  const cartId = await getCartId();
  if (!cartId || Number.isNaN(Number(cartId))) {
    console.error("cartId is invalid or missed");
    return redirect("/");
  }

  // Map over uniqueStoreIds and fetch
  // the cart line items for each store
  const storeCarts = await Promise.all(
    uniqueStoreIds.map(async (storeId) => {
      const cartLineItems = await getCartAction(storeId);

      // Calculations for totalQuantity and
      // totalPrice for each store's cart
      let totalQuantity = 0;

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

      // Return an object that contains
      // the storeId and its cart data
      return {
        storeId,
        totalQuantity,
      };
    }),
  );

  // Filter out stores with no items in cart
  const nonEmptyStoreCarts = storeCarts.filter(
    (storeCart) => storeCart.totalQuantity > 0,
  );

  return (
    <Shell>
      <PageHeader
        aria-labelledby="cart-page-header-heading"
        id="cart-page-header"
      >
        <PageHeaderHeading size="sm">{t("checkout.Title")}</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          {t("checkout.Description")}
        </PageHeaderDescription>
      </PageHeader>
      {nonEmptyStoreCarts.length > 0 ?
        nonEmptyStoreCarts.map(({ storeId }) => (
          <CheckoutCard storeId={storeId} key={storeId} />
        ))
      : <section
          className="flex h-full flex-col items-center justify-center space-y-1 pt-16"
          aria-labelledby="cart-page-empty-cart-heading"
          id="cart-page-empty-cart"
        >
          <Icons.cart
            className="mb-4 h-16 w-16 text-muted-foreground"
            aria-hidden="true"
          />
          <div className="text-xl font-medium text-muted-foreground">
            {t("checkout.EmptyCartHeading")}
          </div>
          <Link
            className={cn(
              buttonVariants({
                className: "text-sm text-muted-foreground",
                variant: "link",
                size: "sm",
              }),
            )}
            aria-label={t("checkout.EmptyCartDescription")}
            href="/products"
          >
            {t("checkout.EmptyCartDescription")}
          </Link>
        </section>
      }
    </Shell>
  );
}
