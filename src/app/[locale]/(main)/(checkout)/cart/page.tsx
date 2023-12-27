import type { Metadata } from "next";
import { cn } from "~/utils";
import { and, eq } from "drizzle-orm";

import { db } from "~/data/db";
import { products } from "~/data/db/schema";
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
import { Link } from "~/navigation";
import { getUniqueStoreIds } from "~/server/actions/cart";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  description: "Checkout with your cart items",
  title: "Cart",
};

export default async function CartPage() {
  // console.log("⏳ awaiting getUniqueStoreIds for uniqueStoreIds...");
  const uniqueStoreIds = await getUniqueStoreIds();
  // console.log("...uniqueStoreIds:", uniqueStoreIds);

  return (
    <Shell>
      <PageHeader
        aria-labelledby="cart-page-header-heading"
        id="cart-page-header"
      >
        <PageHeaderHeading size="sm">Checkout</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Checkout with your cart items
        </PageHeaderDescription>
      </PageHeader>

      {uniqueStoreIds.length > 0 ?
        uniqueStoreIds.map((storeId) => (
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
            Your cart is empty
          </div>
          <Link
            className={cn(
              buttonVariants({
                className: "text-sm text-muted-foreground",
                variant: "link",
                size: "sm",
              }),
            )}
            aria-label="Add items to your cart to checkout"
            href="/products"
          >
            Add items to your cart to checkout
          </Link>
        </section>
      }
    </Shell>
  );
}
