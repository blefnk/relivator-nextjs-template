import type { Metadata } from "next";
import Link from "next/link";
import { redirect } from "next/navigation";

import { getCartAction, getUniqueStoreIds } from "@/actions/reliverse//cart";
import { buttonVariants } from "@/components/ui/button";
import { getCartId } from "@/server/reliverse/cart";
import { cn } from "@/utils/reliverse/cn";
import { ShoppingCart } from "lucide-react";
import { getTranslations } from "next-intl/server";

import { CheckoutCard } from "~/components/Modules/Cards/CheckoutCard";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { Shell } from "~/components/Wrappers/ShellVariants";

export const metadata: Metadata = {
  description: "Checkout with the cart items",
  title: "Cart",
};

export default async function CartPage() {
  const t = await getTranslations();

  // getUniqueStoreIds returns an array of store IDs
  const uniqueStoreIds = await getUniqueStoreIds();

  // Check for a valid cartId
  const cartId = await getCartId();

  if (!cartId || Number.isNaN(Number(cartId))) {
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
          (accumulator, item) => accumulator + (item.quantity || 0),
          0,
        );
      } catch (error) {
        if (error instanceof Error) {
          totalQuantity = 0;
        }

        // Set default variable value in case of an error
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
      {nonEmptyStoreCarts.length > 0 ? (
        nonEmptyStoreCarts.map(({ storeId }) => (
          // @ts-expect-error TODO: fix id type
          <CheckoutCard key={storeId} storeId={storeId} />
        ))
      ) : (
        <section
          aria-labelledby="cart-page-empty-cart-heading"
          className={`
            flex h-full flex-col items-center justify-center space-y-1 pt-16
          `}
          id="cart-page-empty-cart"
        >
          <ShoppingCart
            aria-hidden="true"
            className="mb-4 size-16 text-muted-foreground"
          />
          <div className="text-xl font-medium text-muted-foreground">
            {t("checkout.EmptyCartHeading")}
          </div>
          <Link
            aria-label={t("checkout.EmptyCartDescription")}
            className={cn(
              buttonVariants({
                className: "text-sm text-muted-foreground",
                size: "sm",
                variant: "link",
              }),
            )}
            href="/products"
          >
            {t("checkout.EmptyCartDescription")}
          </Link>
        </section>
      )}
    </Shell>
  );
}
