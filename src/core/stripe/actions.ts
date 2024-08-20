"use server";

import { redirect } from "next/navigation";

import type { UserSubscriptionPlan } from "@/types/reliverse/plan";
import type { CheckoutItem } from "@/types/reliverse/store";
import type Stripe from "stripe";
import type { z } from "zod";

import { userPrivateMetadataSchema } from "@/actions/reliverse/validations/auth";
import { getCartId } from "@/server/reliverse/cart";
import { calculateOrderAmount } from "@/utils/reliverse/misc";
import dayjs from "dayjs";
import { eq } from "drizzle-orm";
import superjson from "superjson";

import type {
  createPaymentIntentSchema,
  getPaymentIntentSchema,
  getPaymentIntentsSchema,
  getStripeAccountSchema,
} from "~/core/stripe/zod";

import { authjs } from "~/auth/authjs";
import { stripe } from "~/core/stripe/connect";
import { storeSubscriptionPlans } from "~/core/stripe/subs";
import { manageSubscriptionSchema } from "~/core/stripe/zod";
import { db } from "~/db";
import { carts, payments, stores, users } from "~/db/schema/provider";
import { env } from "~/env";

const absoluteUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
};

// Getting the subscription plan for a user
export async function getSubscriptionPlanAction(
  userId: string,
): Promise<null | UserSubscriptionPlan> {
  try {
    let userPrivateMetadata: z.infer<typeof userPrivateMetadataSchema> = {};
    const session = await authjs();

    if (!session) {
      redirect("/auth");
    }

    const user = await db
      .select()
      .from(users)
      .where(eq(users.id, userId))
      .then((res) => res[0] || null);

    userPrivateMetadata = userPrivateMetadataSchema.parse(user);

    // Check if user is subscribed
    const ONE_DAY_MS = 86_400_000;

    const isSubscribed =
      userPrivateMetadata.stripePriceId &&
      Date.now() <
        dayjs(userPrivateMetadata.stripeCurrentPeriodEnd).valueOf() +
          ONE_DAY_MS;

    // Set default to "Starter" subscription
    const plan = isSubscribed
      ? storeSubscriptionPlans.find(
          (plan) => plan.stripePriceId === userPrivateMetadata.stripePriceId,
        )
      : storeSubscriptionPlans[0];

    // Check if user has canceled subscription
    let isCanceled = false;

    if (isSubscribed && !!userPrivateMetadata.stripeSubscriptionId) {
      const stripePlan = await stripe.subscriptions.retrieve(
        userPrivateMetadata.stripeSubscriptionId,
      );

      isCanceled = stripePlan.cancel_at_period_end;
    }

    if (plan) {
      return {
        ...plan,

        // @ts-expect-error TODO: fix
        isActive: isSubscribed && !isCanceled,
        isCanceled,
        // @ts-expect-error TODO: fix
        isSubscribed,
        stripeCurrentPeriodEnd:
          userPrivateMetadata.stripeCurrentPeriodEnd || "",
        stripeCustomerId: userPrivateMetadata.stripeCustomerId,
        stripeSubscriptionId: userPrivateMetadata.stripeSubscriptionId,
      };
    }

    return null;
  } catch {
    return null;
  }
}

// Managing stripe subscriptions for a user
export async function manageSubscriptionAction(
  rawInput: z.infer<typeof manageSubscriptionSchema>,
) {
  const input = manageSubscriptionSchema.parse(rawInput);

  const billingUrl = absoluteUrl("/dashboard/billing");

  const session = await authjs();

  if (!session) {
    return redirect("/auth");
  }

  // const { email } = await getUserData(session);
  // If the user is already subscribed to a plan, we redirect them to the Stripe billing portal
  if (input.isSubscribed && input.stripeCustomerId && input.isCurrentPlan) {
    // todo: fix stripe creating billing portal issue
    // const stripeSession = await stripe.billingPortal.sessions.create({
    //   customer: input.stripeCustomerId,
    //   return_url: billingUrl,
    // });
    // return { url: stripeSession.url };
    return redirect("/dashboard/stores");
  }

  // If the user is not subscribed to a plan, we create a Stripe Checkout session
  const stripeSession = await stripe.checkout.sessions.create({
    billing_address_collection: "auto",
    cancel_url: billingUrl,
    customer_email: session.email,
    line_items: [
      {
        price: input.stripePriceId || "",
        quantity: 1,
      },
    ],
    metadata: {
      userId: session.id,
    },
    mode: "subscription",
    payment_method_types: ["card"],
    success_url: billingUrl,
  });

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.id))
    .then((res) => res[0] || null);

  if (user) {
    await db
      .update(users)
      .set({
        mode: "seller",
      })
      .where(eq(users.id, user.id));
  }

  return {
    url: stripeSession.url,
  };
}

// TODO: This is a hacky and wrong way to clear the subscription,
// TODO: we need also clear the subscription on the Stripe side.
// rawInput: z.infer<typeof manageSubscriptionSchema>,
export async function manageDowngradeToStarterAction() {
  // const input = manageSubscriptionSchema.parse(rawInput);
  const session = await authjs();

  if (!session) {
    return redirect("/auth");
  }

  const user = await db
    .select()
    .from(users)
    .where(eq(users.id, session.id || ""))
    .then((res) => res[0] || null);

  if (user) {
    await db
      .update(users)
      .set({
        currentCartId: null,
        mode: "buyer",
        stripeCurrentPeriodEnd: null,
        stripeCustomerId: null,
        stripePriceId: null,
        stripeSubscriptionId: null,
      })
      .where(eq(users.id, user.id));

    return {
      success: "The subscription has been downgraded.",
    };
  }
}

// Getting the Stripe account for a store
export async function getStripeAccountAction(
  input: z.infer<typeof getStripeAccountSchema>,
) {
  const retrieveAccount = input.retrieveAccount || true;

  const falsyReturn = {
    account: null,
    isConnected: false,
    payment: null,
  };

  try {
    const store = await db.query.stores.findFirst({
      columns: {
        stripeAccountId: true,
      },
      // @ts-expect-error TODO: Fix id type
      where: eq(stores.id, input.storeId),
    });

    if (!store) {
      return falsyReturn;
    }

    const payment = await db.query.payments.findFirst({
      columns: {
        detailsSubmitted: true,
        stripeAccountId: true,
      },
      where: eq(payments.storeId, input.storeId),
    });

    if (!payment?.stripeAccountId) {
      return falsyReturn;
    }

    if (!retrieveAccount) {
      return {
        account: null,
        isConnected: true,
        payment,
      };
    }

    const account = await stripe.accounts.retrieve(payment.stripeAccountId);

    if (!account) {
      return falsyReturn;
    }

    // If the account details have been submitted, we update the store and payment records
    if (account.details_submitted && !payment.detailsSubmitted) {
      await db.transaction(async (tx) => {
        await tx
          .update(payments)
          .set({
            detailsSubmitted: account.details_submitted,
            stripeAccountCreatedAt: account.created,
          })
          .where(eq(payments.storeId, input.storeId));

        await tx
          .update(stores)
          .set({
            active: true,
            stripeAccountId: account.id,
          }) // @ts-expect-error TODO: Fix id type
          .where(eq(stores.id, input.storeId));
      });
    }

    return {
      account: account.details_submitted ? account : null,
      isConnected: payment.detailsSubmitted,
      payment,
    };
  } catch (error) {
    error instanceof Error;

    return falsyReturn;
  }
}

// Connecting a Stripe account to a store
export async function createAccountLinkAction(
  input: z.infer<typeof getStripeAccountSchema>,
) {
  const { account, isConnected, payment } = await getStripeAccountAction(input);

  if (isConnected) {
    throw new Error("Store already connected to Stripe.");
  }

  // Delete the existing account if details have not been submitted
  if (account && !account.details_submitted) {
    await stripe.accounts.del(account.id);
  }

  const stripeAccountId =
    (payment && payment.stripeAccountId) || (await createStripeAccount());

  const accountLink: Stripe.AccountLink = await stripe.accountLinks.create({
    account: stripeAccountId,
    refresh_url: absoluteUrl(`/dashboard/stores/${input.storeId}`),
    return_url: absoluteUrl(`/dashboard/stores/${input.storeId}`),
    type: "account_onboarding",
  });

  if (!accountLink?.url) {
    throw new Error("Error creating Stripe account link, please try again.");
  }

  return {
    url: accountLink.url,
  };
  async function createStripeAccount(): Promise<string> {
    const account = await stripe.accounts.create({
      type: "standard",
    });

    if (!account) {
      throw new Error("Error creating Stripe account.");
    }

    // If payment record exists, we update it with the new account id
    if (payment) {
      await db
        .update(payments)
        .set({
          stripeAccountId: account.id,
        })
        .where(eq(payments.storeId, input.storeId));
    } else {
      await db.insert(payments).values({
        storeId: input.storeId,
        stripeAccountId: account.id,
      });
    }

    return account.id;
  }
}

// Creating checkout session for a store
export async function createCheckoutSessionAction(
  input: z.infer<typeof createPaymentIntentSchema>,
) {
  try {
    const { isConnected, payment } = await getStripeAccountAction(input);

    if (!isConnected || !payment) {
      return {
        error: "Store not connected to Stripe.",
      };
    }

    if (!payment.stripeAccountId) {
      return {
        error: "Stripe account not found.",
      };
    }

    const cartId = await getCartId();

    const checkoutItems: CheckoutItem[] = input.items.map((item) => ({
      price: Number(item.price),
      productId: item.id,
      quantity: item.quantity,
      storeId: item.storeId,
      subcategory: item.subcategory,
    }));

    // Create a checkout session
    const checkoutSession = await stripe.checkout.sessions.create(
      {
        cancel_url: absoluteUrl("/checkout"),
        line_items: input.items.map((item) => ({
          price_data: {
            currency: "usd",
            product_data: {
              name: item.name,
            },
            unit_amount: Number(item.price) * 100,
          },
          quantity: item.quantity,
        })),
        metadata: {
          cartId: Number(cartId) || null,
          items: superjson.stringify(checkoutItems),
        },
        mode: "payment",
        payment_method_types: ["card"],
        success_url: absoluteUrl(
          `/checkout/success/?store_id=${input.storeId}`,
        ),
      },
      {
        stripeAccount: payment.stripeAccountId,
      },
    );

    // Update the cart with the checkout session id
    await db
      .update(carts)
      .set({
        paymentIntentId: String(checkoutSession.payment_intent),
      }) // @ts-expect-error TODO: Fix id type
      .where(eq(carts.id, cartId));

    return {
      id: checkoutSession.id,
      url: checkoutSession.url || "/checkout",
    };
  } catch {
    return {
      error: "An error occurred while creating the checkout session.",
    };
  }
}

// Creating a payment intent for a store
export async function createPaymentIntentAction(
  input: z.infer<typeof createPaymentIntentSchema>,
): Promise<{
  clientSecret: null | string;
  error?: string;
}> {
  try {
    const { isConnected, payment } = await getStripeAccountAction(input);

    if (!isConnected || !payment) {
      return {
        clientSecret: null,
        error: "Store not connected to Stripe.",
      };
    }

    if (!payment.stripeAccountId) {
      return {
        clientSecret: null,
        error: "Stripe account not found.",
      };
    }

    const cartId = await getCartId();

    const checkoutItems: CheckoutItem[] = input.items.map((item) => ({
      price: Number(item.price),
      productId: item.id,
      quantity: item.quantity,
      storeId: item.storeId,
      subcategory: item.subcategory,
    }));

    const metadata = {
      cartId: Number(cartId) || null,
      items: superjson.stringify(checkoutItems),
    };

    const { fee, total } = calculateOrderAmount(input.items);

    const paymentIntent = await stripe.paymentIntents.create(
      {
        amount: total,
        application_fee_amount: fee,
        automatic_payment_methods: {
          enabled: true,
        },
        currency: "usd",
        metadata,
      },
      {
        stripeAccount: payment.stripeAccountId,
      },
    );

    await db
      .update(carts)
      .set({
        clientSecret: paymentIntent.client_secret,
        paymentIntentId: paymentIntent.id,
      }) // @ts-expect-error TODO: Fix id type
      .where(eq(carts.id, cartId));

    return {
      clientSecret: paymentIntent.client_secret,
    };
  } catch {
    return {
      clientSecret: null,
      error: "An error occurred while creating the payment intent.",
    };
  }
}

// Getting payment intents for a store
export async function getPaymentIntentsAction(
  input: z.infer<typeof getPaymentIntentsSchema>,
) {
  try {
    const { isConnected, payment } = await getStripeAccountAction({
      retrieveAccount: false,
      storeId: input.storeId,
    });

    if (!isConnected || !payment) {
      throw new Error("Store not connected to Stripe.");
    }

    if (!payment.stripeAccountId) {
      throw new Error("Stripe account not found.");
    }

    const paymentIntents = await stripe.paymentIntents.list({
      limit: input.limit || 10,
      ...input,
    });

    return {
      hasMore: paymentIntents.has_more,
      paymentIntents: paymentIntents.data.map((item) => ({
        id: item.id,
        amount: item.amount,
        cartId: Number(item.metadata.cartId),
        created: item.created,
      })),
    };
  } catch {
    return {
      hasMore: false,
      paymentIntents: [],
    };
  }
}

// Getting a payment intent for a store
export async function getPaymentIntentAction(
  input: z.infer<typeof getPaymentIntentSchema>,
) {
  try {
    const cartId = await getCartId();

    const { isConnected, payment } = await getStripeAccountAction({
      retrieveAccount: false,
      storeId: input.storeId,
    });

    if (!isConnected || !payment) {
      throw new Error("Store not connected to Stripe.");
    }

    if (!payment.stripeAccountId) {
      throw new Error("Stripe account not found.");
    }

    const paymentIntent = await stripe.paymentIntents.retrieve(
      input.paymentIntentId,
      {
        stripeAccount: payment.stripeAccountId,
      },
    );

    if (paymentIntent.status !== "succeeded") {
      throw new Error("Payment intent not succeeded.");
    }

    if (
      paymentIntent.metadata.cartId !== cartId

      // && paymentIntent.shipping?.address?.postal_code?.split(" ").join("") !== input.deliveryPostalCode
    ) {
      // throw new Error("CartId or delivery postal code does not match.");
      throw new Error(
        "App's user's CartId does not match with the corresponding Stripe's customer CartId.",
      );
    }

    return {
      isVerified: true,
      paymentIntent,
    };
  } catch {
    return {
      isVerified: false,
      paymentIntent: null,
    };
  }
} /// / Learning Resources and Inspirations:// ------------------------------------// @see https://github.com/steven-tey/dub/blob/main/apps/web/lib/stripe// @see https://github.com/alissonsleal/brapi/blob/main/services/stripe// @see https://github.com/sadmann7/skateshop/blob/main/src/app/_actions/stripe.ts// @see https://github.com/sadmann7/skateshop/blob/main/src/app/api/webhooks/stripe/route.ts// @see https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts//
