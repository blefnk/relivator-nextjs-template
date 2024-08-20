import type { Metadata } from "next";
import Link from "next/link";

import { deleteCartAction } from "@/actions/reliverse//cart";
import { buttonVariants } from "@/components/ui/button";
import { getCartId } from "@/server/reliverse/cart";
import { cn } from "@/utils/reliverse/cn";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";

import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/Navigation/PageNavMenu";
import { db } from "~/db";
import { stores } from "~/db/schema/provider";

export const metadata: Metadata = {
  description: "Order summary for the purchase",
  title: "Order Success",
};

type OrderSuccessPageProps = {
  params: {
    storeId: string;
  };
  searchParams?: Record<string, string | string[] | undefined>;
};

// export default async function OrderSuccessPage({ params, searchParams }: OrderSuccessPageProps) {
export default async function OrderSuccessPage({
  params,
}: OrderSuccessPageProps) {
  const t = await getTranslations();

  const { storeId } = params;

  // const { delivery_postal_code, payment_intent, payment_intent_client_secret, redirect_status } =
  // searchParams ??
  // {
  //
  // };
  const store = await db.query.stores.findFirst({
    columns: {
      name: true,
    },
    where: eq(stores.id, storeId),
  });

  // const { isVerified, paymentIntent } = await getPaymentIntentAction({
  // storeId,
  // paymentIntentId: typeof payment_intent === "string" ? payment_intent : "",
  // deliveryPostalCode:
  // typeof delivery_postal_code === "string" ? delivery_postal_code : "",
  // }); */
  // const lineItems =
  // isVerified && paymentIntent
  // ? await getOrderLineItemsAction({
  // storeId,
  // items: paymentIntent?.metadata?.items,
  // paymentIntent,
  // })
  // : []; */
  // TODO: REMOVE !! TEMPORARY SOLUTION
  const cartId = await getCartId();

  if (cartId) {
    await deleteCartAction();
  }

  // TODO: REMOVE !! TEMPORARY SOLUTION
  return (
    <div
      className={`
        flex size-full max-h-dvh flex-col gap-10 overflow-hidden pb-8 pt-6

        md:py-8
      `}
    >
      {/* {isVerified ? ( */}
      <div className="grid gap-10 overflow-auto">
        <PageHeader
          aria-labelledby="order-success-page-header-heading"
          className="container flex max-w-7xl flex-col"
          id="order-success-page-header"
        >
          <PageHeaderHeading>{t("page.thankYouForTheOrder")}</PageHeaderHeading>
          <PageHeaderDescription>
            {store?.name || "Store"} will be in touch with you shortly
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
            <PageHeaderHeading>{t("page.thankYouForTheOrder")}</PageHeaderHeading>
            <PageHeaderDescription>
              {store?.name || "Store"} will be in touch with you shortly
            </PageHeaderDescription>
            <PageHeaderDescription>
              Please enter the delivery postal code to verify the order
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
      aria-labelledby="order-success-actions-heading"
      className={`
        container flex max-w-7xl items-center justify-start space-x-2.5
      `}
      id="order-success-actions"
    >
      <Link
        aria-label="Continue shopping"
        className={cn(
          buttonVariants({
            className: "text-center",
            size: "default",
            variant: "secondary",
          }),
        )}
        href="/products"
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
        className={cn(
          buttonVariants({
            className: "text-center",
            size: "default",
            variant: "outline",
          }),
        )}
        href="/"
      >
        Back to home
      </Link>
    </section>
  );
}
