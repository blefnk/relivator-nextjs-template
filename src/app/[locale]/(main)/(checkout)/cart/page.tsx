import { type Metadata } from "next";
import { cookies } from "next/headers";
import { env } from "~/env.mjs";
import { Link } from "~/navigation";
import { cn } from "~/utils";

import { getUniqueStoreIds } from "~/server/actions/cart";
import { Icons } from "~/islands/icons";
import { CheckoutCard } from "~/islands/modules/cards/checkout-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { buttonVariants } from "~/islands/primitives/button";
import { Shell } from "~/islands/wrappers/shell-variants";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Cart",
  description: "Checkout with your cart items",
};

export default async function CartPage() {
  const uniqueStoreIds = (await getUniqueStoreIds()) as number[];

  return (
    <Shell>
      <PageHeader
        id="cart-page-header"
        aria-labelledby="cart-page-header-heading"
      >
        <PageHeaderHeading size="sm">Checkout</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Checkout with your cart items
        </PageHeaderDescription>
      </PageHeader>

      {uniqueStoreIds.length > 0 ? (
        uniqueStoreIds.map((storeId) => (
          <CheckoutCard key={storeId} storeId={storeId} />
        ))
      ) : (
        <section
          id="cart-page-empty-cart"
          aria-labelledby="cart-page-empty-cart-heading"
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
                className: "text-sm text-muted-foreground",
              }),
            )}
          >
            Add items to your cart to checkout
          </Link>
        </section>
      )}
    </Shell>
  );
}
