import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { eq } from "drizzle-orm";

import { getCartAction } from "~/server/actions/cart";
import {
  createPaymentIntentAction,
  getStripeAccountAction
} from "~/server/actions/stripe";
import { cn } from "~/server/utils";
import { db } from "~/data/db";
import { stores } from "~/data/db/schema";
import CheckoutForm from "~/forms/checkout-form";
import { CartLineItems } from "~/islands/checkout/cart-line-items";
import { CheckoutShell } from "~/islands/checkout/checkout-shell";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading
} from "~/islands/page-header";
import { buttonVariants } from "~/islands/primitives/button";
import { Shell } from "~/islands/shells/shell";
import { env } from "~/env.mjs";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL),
  title: "Checkout",
  description: "Checkout with store items"
};

interface StoreCheckoutPageProps {
  params: {
    storeId: string;
  };
}

export default async function StoreCheckoutPage({
  params
}: StoreCheckoutPageProps) {
  const storeId = Number(params.storeId);

  const store = await db
    .select({
      id: stores.id,
      stripeAccountId: stores.stripeAccountId
    })
    .from(stores)
    .where(eq(stores.id, storeId))
    .execute()
    .then((rows) => rows[0]);

  if (!store) {
    notFound();
  }

  const { isConnected } = await getStripeAccountAction({
    storeId
  });

  const cartLineItems = await getCartAction(storeId);

  const paymentIntent = createPaymentIntentAction({
    storeId: store.id,
    items: cartLineItems
  });

  return (
    <Shell>
      <PageHeader>
        <PageHeaderHeading size="sm">Store Checkout</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Checkout with store items
        </PageHeaderDescription>
      </PageHeader>
      {isConnected && store.stripeAccountId ? (
        <CheckoutShell
          paymentIntent={paymentIntent}
          storeStripeAccountId={store.stripeAccountId}
        >
          <CheckoutForm storeId={store.id} />
          <CartLineItems cartLineItems={cartLineItems} />
        </CheckoutShell>
      ) : (
        <div className="flex flex-col items-center justify-center gap-2 pt-20">
          <div className="text-center text-2xl font-bold">
            Store is not connected to Stripe
          </div>
          <div className="text-center text-muted-foreground">
            Store owner needs to connect their store to Stripe to accept
            payments
          </div>
          <Link
            aria-label="Back to checkout"
            href="/checkout"
            className={cn(
              buttonVariants({
                size: "sm"
              })
            )}
          >
            Back to checkout
          </Link>
        </div>
      )}
    </Shell>
  );
}
