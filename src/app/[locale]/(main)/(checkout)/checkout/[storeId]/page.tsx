import { type Metadata } from "next";
import { notFound } from "next/navigation";
import { ArrowLeftIcon } from "@radix-ui/react-icons";
import { cn, formatPrice } from "~/utils";
import { eq } from "drizzle-orm";
import { getTranslations } from "next-intl/server";

import { siteConfig } from "~/app";
import {
  createPaymentIntentAction,
  getStripeAccountAction,
} from "~/core/stripe/actions";
import { db } from "~/data/db";
import { stores } from "~/data/db/schema";
import { env } from "~/env.mjs";
import { CheckoutForm } from "~/forms/checkout-form";
import { CartLineItems } from "~/islands/checkout/cart-line-items";
import { CheckoutShell } from "~/islands/checkout/checkout-shell";
import { Button, buttonVariants } from "~/islands/primitives/button";
import {
  Drawer,
  DrawerContent,
  DrawerTrigger,
} from "~/islands/primitives/drawer";
import { ScrollArea } from "~/islands/primitives/scroll-area";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link } from "~/navigation";
import { getCartAction } from "~/server/actions/cart";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL ?? "http://localhost:3000"),
  title: "Checkout",
  description: "Checkout with store items",
};

interface CheckoutPageProperties {
  params: {
    storeId: string;
  };
}

export default async function CheckoutPage({ params }: CheckoutPageProperties) {
  const t = await getTranslations();

  const appName = siteConfig.name;

  const storeId = Number(params.storeId);

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
    storeId,
  });

  const cartLineItems = await getCartAction(storeId);

  const paymentIntent = createPaymentIntentAction({
    storeId: store.id,
    items: cartLineItems,
  });

  let total = 0;
  let totalQuantity = 0;

  try {
    // Calculation of total price
    total = cartLineItems.reduce(
      (total, item) => total + (item.quantity ?? 0) * Number(item.price ?? 0),
      0,
    );
  } catch (error) {
    if (error instanceof Error) {
      console.error("❌ Error calculating total:", error.message);
      total = 0; // Set default variable value in case of an error
    } else {
      // If for any reason something else was
      // thrown that wasn't an Error, handle it
      console.error("❌ An unexpected error occurred:", error);
    }
  }

  // Component for displaying total quantity
  const TotalQuantity = () => {
    try {
      totalQuantity = cartLineItems.reduce(
        (acc, item) => acc + (item.quantity ?? 0),
        0,
      );
    } catch (error) {
      if (error instanceof Error) {
        console.error("❌ Error in totalQuantity:", error.message);
        totalQuantity = 0; // Set default value in case of an error
      } else {
        // If for any reason something else was
        // thrown that wasn't an Error, handle it
        console.error("❌ An unexpected error occurred:", error);
      }
    }
    return <div className="flex-1">Total ({totalQuantity})</div>;
  };

  if (!(isConnected && store.stripeAccountId)) {
    return (
      <Shell
        id="checkout-not-connected"
        aria-labelledby="checkout-not-connected-heading"
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
            href="/cart"
            className={cn(
              buttonVariants({
                size: "sm",
              }),
            )}
          >
            {t("checkout.backToCart")}
          </Link>
        </div>
      </Shell>
    );
  }

  return (
    <section className="relative flex h-full min-h-[100dvh] flex-col items-start justify-center lg:h-[100dvh] lg:flex-row lg:overflow-hidden">
      <div className="-mt-4 w-full space-y-12 pb-8 lg:mt-0 lg:pb-0 lg:pt-16">
        <div className="fixed top-0 z-40 h-16 w-full bg-[#09090b] py-4 lg:static lg:top-auto lg:z-0 lg:h-0 lg:py-0">
          <div className="container flex max-w-xl items-center justify-between space-x-2 lg:ml-auto lg:mr-0 lg:pr-[4.5rem]">
            <Link
              aria-label={t("checkout.backToCart")}
              href="/cart"
              className="group flex w-28 items-center space-x-2 lg:flex-auto"
            >
              <ArrowLeftIcon
                className="h-5 w-5 text-muted-foreground transition-colors group-hover:text-primary"
                aria-hidden="true"
              />
              <div className="block font-medium transition group-hover:hidden">
                {appName}
              </div>
              <div className="hidden font-medium transition group-hover:block">
                {t("checkout.backToCartSingle")}
              </div>
            </Link>
            <Drawer>
              <DrawerTrigger asChild>
                <Button variant="outline" size="sm">
                  {t("checkout.CartDetails")}
                </Button>
              </DrawerTrigger>
              <DrawerContent className="flex h-[80%] flex-col space-y-5 bg-zinc-50 py-8 text-zinc-950">
                <CartLineItems
                  items={cartLineItems}
                  variant="minimal"
                  isEditable={false}
                  className="container max-w-6xl"
                />
                <div className="container flex max-w-6xl pr-6 font-medium">
                  <TotalQuantity />
                  <div>{formatPrice(total)}</div>
                </div>
              </DrawerContent>
            </Drawer>
          </div>
        </div>
        <div className="container flex max-w-xl flex-col items-center space-y-1 lg:ml-auto lg:mr-0 lg:items-start lg:pr-[4.5rem]">
          <div className="mb-4 text-sm font-semibold">
            {env.DEV_DEMO_NOTES === "true" && t("checkout.Demo")}
          </div>
          <div className="line-clamp-1 font-semibold text-muted-foreground">
            {t("checkout.Pay")} {store.name}
          </div>
          <div className="text-3xl font-bold">{formatPrice(total)}</div>
        </div>
        <CartLineItems
          items={cartLineItems}
          isEditable={false}
          className="container hidden w-full max-w-xl lg:ml-auto lg:mr-0 lg:flex lg:max-h-[580px] lg:pr-[4.5rem]"
        />
      </div>
      <CheckoutShell
        paymentIntent={paymentIntent}
        storeStripeAccountId={store.stripeAccountId}
        className="h-full w-full flex-1 bg-slate-50 pb-12 pt-10 lg:flex-initial lg:pl-12 lg:pt-16"
      >
        <ScrollArea className="h-full">
          <CheckoutForm
            storeId={store.id}
            className="container max-w-xl pr-6 lg:ml-0 lg:mr-auto"
          />
        </ScrollArea>
      </CheckoutShell>
    </section>
  );
}
