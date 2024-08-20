/* eslint-disable max-lines-per-function */
import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";

import { getCartAction } from "@/actions/reliverse//cart";
import { Button, buttonVariants } from "@/components/ui/button";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { ScrollArea } from "@/components/ui/scroll-area";
import { cn } from "@/utils/reliverse/cn";
import { formatPrice } from "@/utils/reliverse/number";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";

import { siteConfig } from "~/app";
import { CartLineItems } from "~/components/Checkout/CartLineItems";
import { CheckoutShell } from "~/components/Checkout/CheckoutShell";
import { CheckoutForm } from "~/components/Forms/CheckoutForm";
import { Shell } from "~/components/Wrappers/ShellVariants";
import {
  createPaymentIntentAction,
  getStripeAccountAction,
} from "~/core/stripe/actions";
import { db } from "~/db";
import { stores } from "~/db/schema/provider";
import { env } from "~/env";

export const metadata: Metadata = {
  description: "Checkout with store items",
  title: "Checkout",
};

type CheckoutPageProps = {
  params: {
    storeId: string;
  };
};

export default async function CheckoutPage({ params }: CheckoutPageProps) {
  const t = await getTranslations();

  const appName = siteConfig.name;

  const { storeId } = params;

  const store = await db
    .select({
      id: stores.id,
      name: stores.name,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .where(eq(stores.id, storeId))
    .execute()
    .then((rows) => rows[0]);

  if (!store) {
    notFound();
  }

  const { isConnected } = await getStripeAccountAction({
    // @ts-expect-error TODO: fix id type
    storeId,
  });

  // @ts-expect-error TODO: fix id type
  const cartLineItems = await getCartAction(storeId);

  const paymentIntent = createPaymentIntentAction({
    items: cartLineItems,
    // @ts-expect-error TODO: fix id type
    storeId: store.id,
  });

  let total = 0;
  let totalQuantity = 0;

  try {
    // Calculation of total price
    total = cartLineItems.reduce(
      (total, item) =>
        total + Number(item.quantity || 0) * Number(item.price || 0),
      0,
    );
  } catch (error) {
    if (error instanceof Error) {
      total = 0;
    }

    // Set default variable value in case of an error
  }

  // Component for displaying total quantity
  // eslint-disable-next-line @eslint-react/no-nested-components
  const TotalQuantity = () => {
    try {
      totalQuantity = cartLineItems.reduce(
        (accumulator, item) => accumulator + (Number(item.quantity) || 0),
        0,
      );
    } catch (error) {
      if (error instanceof Error) {
        totalQuantity = 0;
      }

      // Set default value in case of an error
    }

    return <div className="flex-1">Total ({totalQuantity})</div>;
  };

  if (!(isConnected && store.stripeAccountId)) {
    return (
      <Shell
        aria-labelledby="checkout-not-connected-heading"
        id="checkout-not-connected"
        variant="centered"
      >
        <div className="flex flex-col items-center justify-center gap-2 pt-20">
          <div className="text-center text-2xl font-bold">
            {t("checkout.notConnectedHeading")}
          </div>
          <div className="text-center text-muted-foreground">
            {t("checkout.notConnectedDescription")}
          </div>
          <Link
            aria-label={t("checkout.backToCart")}
            className={cn(
              buttonVariants({
                size: "sm",
              }),
            )}
            href="/cart"
          >
            {t("checkout.backToCart")}
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <section
      className={`
        relative flex h-full min-h-dvh flex-col items-start justify-center

        lg:h-dvh lg:flex-row lg:overflow-hidden
      `}
    >
      <div
        className={`
          -mt-4 w-full space-y-12 pb-8

          lg:mt-0 lg:pb-0 lg:pt-16
        `}
      >
        <div
          className={`
            fixed top-0 z-40 h-16 w-full bg-[#09090b] py-4

            lg:static lg:top-auto lg:z-0 lg:h-0 lg:py-0
          `}
        >
          <div
            className={`
              container flex max-w-xl items-center justify-between space-x-2

              lg:ml-auto lg:mr-0 lg:pr-[4.5rem]
            `}
          >
            <Link
              aria-label={t("checkout.backToCart")}
              className={`
                group flex w-28 items-center space-x-2

                lg:flex-auto
              `}
              href="/cart"
            >
              <ArrowLeftIcon
                aria-hidden="true"
                className={`
                  size-5 text-muted-foreground transition-colors

                  group-hover:text-primary
                `}
              />
              <div
                className={`
                  block font-medium transition

                  group-hover:hidden
                `}
              >
                {appName}
              </div>
              <div
                className={`
                  hidden font-medium transition

                  group-hover:block
                `}
              >
                {t("checkout.backToCartSingle")}
              </div>
            </Link>
            <Drawer>
              <DrawerTrigger asChild>
                <Button size="sm" variant="outline">
                  {t("checkout.CartDetails")}
                </Button>
              </DrawerTrigger>
              <DrawerContent
                className={`
                  flex h-4/5 flex-col space-y-5 bg-zinc-50 py-8 text-zinc-950
                `}
              >
                <CartLineItems
                  className="container max-w-6xl"
                  isEditable={false}
                  items={cartLineItems}
                  variant="minimal"
                />
                <div className="container flex max-w-6xl pr-6 font-medium">
                  <TotalQuantity />
                  <div>{formatPrice(total)}</div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div
          className={`
            container flex max-w-xl flex-col items-center space-y-1

            lg:ml-auto lg:mr-0 lg:items-start lg:pr-[4.5rem]
          `}
        >
          <div className="mb-4 text-sm font-semibold">
            {env.DEMO_NOTES_ENABLED === "true" && t("checkout.Demo")}
          </div>
          <div className="line-clamp-1 font-semibold text-muted-foreground">
            {t("checkout.Pay")}
            {store.name}
          </div>
          <div className="text-3xl font-bold">{formatPrice(total)}</div>
        </div>
        <CartLineItems
          className={`
            container hidden w-full max-w-xl

            lg:ml-auto lg:mr-0 lg:flex lg:max-h-[580px] lg:pr-[4.5rem]
          `}
          isEditable={false}
          items={cartLineItems}
        />
      </div>
      <CheckoutShell
        className={`
          size-full flex-1 bg-slate-50 pb-12 pt-10

          lg:flex-initial lg:pl-12 lg:pt-16
        `}
        paymentIntent={paymentIntent}
        storeStripeAccountId={store.stripeAccountId}
      >
        <ScrollArea className="h-full">
          <CheckoutForm
            className={`
              container max-w-xl pr-6

              lg:ml-0 lg:mr-auto
            `}
            storeId={store.id}
          />
        </ScrollArea>
      </CheckoutShell>
    </section>
  );
}
