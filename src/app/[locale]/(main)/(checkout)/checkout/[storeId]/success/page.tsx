import { type Metadata } from "next";
import Link from "next/link";
import { type CheckoutItem } from "~/types";
import { cn, formatPrice } from "~/utils";
import { eq } from "drizzle-orm";

import { getPaymentIntentAction } from "~/core/stripe/actions";
import { db } from "~/data/db";
import { stores } from "~/data/db/schema";
import { env } from "~/env.mjs";
import { CartLineItems } from "~/islands/checkout/cart-line-items";
import { VerifyOderForm } from "~/islands/checkout/verify-order-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { buttonVariants } from "~/islands/primitives/button";
import { Shell } from "~/islands/wrappers/shell-variants";
import { deleteCartAction, deleteCartItemAction } from "~/server/actions/cart";
import { getOrderLineItemsAction } from "~/server/actions/order";
import { getCartId } from "~/server/cart";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "Order Success",
  description: "Order summary for your purchase",
};

interface OrderSuccessPageProperties {
  params: { storeId: string };
  searchParams: { [key: string]: string | string[] | undefined };
}

export default async function OrderSuccessPage({
  params,
  searchParams,
}: OrderSuccessPageProperties) {
  const storeId = Number(params.storeId);
  const {
    payment_intent,
    payment_intent_client_secret,
    redirect_status,
    delivery_postal_code,
  } = searchParams ?? {};

  const store = await db.query.stores.findFirst({
    columns: {
      name: true,
    },
    where: eq(stores.id, storeId),
  });

  /* const { isVerified, paymentIntent } = await getPaymentIntentAction({
    storeId,
    paymentIntentId: typeof payment_intent === "string" ? payment_intent : "",
    deliveryPostalCode:
      typeof delivery_postal_code === "string" ? delivery_postal_code : "",
  }); */

  /* const lineItems =
    isVerified && paymentIntent
      ? await getOrderLineItemsAction({
          storeId,
          items: paymentIntent?.metadata?.items,
          paymentIntent,
        })
      : []; */

  // TODO: REMOVE !! TEMPORARY SOLUTION
  const cartId = await getCartId();
  if (cartId) await deleteCartAction();
  // TODO: REMOVE !! TEMPORARY SOLUTION

  return (
    <div className="flex h-full max-h-[100dvh] w-full flex-col gap-10 overflow-hidden pb-8 pt-6 md:py-8">
      {/* {isVerified ? ( */}
      <div className="grid gap-10 overflow-auto">
        <PageHeader
          id="order-success-page-header"
          aria-labelledby="order-success-page-header-heading"
          className="container flex max-w-7xl flex-col"
        >
          <PageHeaderHeading>Thank you for your order</PageHeaderHeading>
          <PageHeaderDescription>
            {store?.name ?? "Store"} will be in touch with you shortly
          </PageHeaderDescription>
        </PageHeader>
        {/* <section
            id="order-success-cart-line-items"
            aria-labelledby="order-success-cart-line-items-heading"
            className="flex flex-col space-y-6 overflow-auto"
          >
            <CartLineItems
              items={lineItems}
              isEditable={false}
              className="container max-w-7xl"
            />
            <div className="container flex w-full max-w-7xl items-center">
              <span className="flex-1">
                Total (
                {lineItems.reduce(
                  (acc, item) => acc + Number(item.quantity),
                  0,
                )}
                )
              </span>
              <span>
                {formatPrice(
                  lineItems.reduce(
                    (acc, item) =>
                      acc + Number(item.price) * Number(item.quantity),
                    0,
                  ),
                )}
              </span>
            </div>
          </section> */}
        <OrderSuccessActions />
      </div>
      {/* ) : (
        <div className="container grid max-w-7xl gap-10">
          <PageHeader
            id="order-success-page-header"
            aria-labelledby="order-success-page-header-heading"
          >
            <PageHeaderHeading>Thank you for your order</PageHeaderHeading>
            <PageHeaderDescription>
              {store?.name ?? "Store"} will be in touch with you shortly
            </PageHeaderDescription>
            <PageHeaderDescription>
              Please enter your delivery postal code to verify your order
            </PageHeaderDescription>
          </PageHeader>
          <VerifyOderForm
            id="order-success-verify-order-form"
            aria-labelledby="order-success-verify-order-form-heading"
            className="mx-auto w-full max-w-md pt-40"
          />
        </div>
      )} */}
    </div>
  );
}

function OrderSuccessActions() {
  return (
    <section
      id="order-success-actions"
      aria-labelledby="order-success-actions-heading"
      className="container flex max-w-7xl items-center justify-start space-x-2.5"
    >
      <Link
        aria-label="Continue shopping"
        href="/products"
        className={cn(
          buttonVariants({
            size: "default",
            variant: "secondary",
            className: "text-center",
          }),
        )}
      >
        Continue shopping
      </Link>
      {/* <Link
        aria-label="Back to cart"
        href="/cart"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "sm",
            className: "text-center",
          }),
        )}
      >
        Back to cart
      </Link> */}
      <Link
        aria-label="Back to home"
        href="/"
        className={cn(
          buttonVariants({
            variant: "outline",
            size: "default",
            className: "text-center",
          }),
        )}
      >
        Back to home
      </Link>
    </section>
  );
}
