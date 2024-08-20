import { redirect } from "next/navigation";

import type Stripe from "stripe";

import axios from "axios";
import { eq } from "drizzle-orm";

import { siteConfig } from "~/app";
import { authjs } from "~/auth/authjs";
import { db } from "~/db";
import { users } from "~/db/schema/provider";
import { env } from "~/env";

export const getOrCreateStripeCustomerIdForUser = async ({
  stripe,
  userId,
}: {
  stripe: Stripe;
  userId: string;
}) => {
  const user = await authjs();

  if (!user) {
    return redirect("/auth/sign-in");
  }

  // if (user.stripeCustomerId) {
  //   return user.stripeCustomerId;
  // }
  // create a new customer
  const customer = await stripe.customers.create({
    name: user.name || undefined,
    email: user.email || undefined,

    // payment_method: "card",
    metadata: {
      userId,
    },
    preferred_locales: ["en"],
  });

  // create a new free subscription for this user
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
    payment_settings: {
      payment_method_types: ["card"],
    },
  });

  if (subscription.status !== "active") {
    throw new Error(`Subscription is not activated for user ${userId},\
      and has status ${subscription.status}`);
  }

  const updatedUser = await db
    .update(users)
    .set({
      stripeSubscriptionId: subscription.id,

      // stripeCustomerId: customer.id,

      // stripePriceId: env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID,

      // stripeSubscriptionCurrentPeriodStart: new Date(

      //   subscription.current_period_start * 1000,

      // ),

      // stripeProductId: env.STRIPE_FREE_PRODUCT_PRICE_ID,

      // stripeSubscriptionCurrentPeriodEnd: new Date(

      //   subscription.current_period_end * 1000,

      // ),
    })
    .where(eq(users.id, userId))
    .returning()
    .then((res) => res[0] || null);

  if (updatedUser && updatedUser.stripeCustomerId) {
    return updatedUser.stripeCustomerId;
  }
};

export const handleInvoicePaid = async ({
  event,
  stripe,
}: {
  event: Stripe.Event;
  stripe: Stripe;
}) => {
  const invoice = event.data.object as Stripe.Invoice;
  const subscriptionId = invoice.subscription;
  const subscription = await stripe.subscriptions.retrieve(
    subscriptionId as string,
  );

  const { userId } = subscription.metadata;

  await db
    .update(users)
    .set({
      // ),
      stripeCurrentPeriodEnd:
        String(subscription.current_period_end * 1000) || null, // stripeSubscriptionStatus: subscription.status,
      // stripeProductId: subscription.items.data[0]?.price.product as string,
      stripePriceId: subscription.items.data[0]?.price.id, // stripeSubscriptionCurrentPeriodStart: new Date(
      // subscription.current_period_start * 1000,
      stripeSubscriptionId: subscription.id,
    })
    .where(eq(users.id, userId as string));

  if (invoice && invoice.amount_paid > 0) {
    await axios.post(String(env.DISCORD_WEBHOOK_URL), {
      avatar_url: `${env.NEXT_PUBLIC_APP_URL}/logo.png`,
      embeds: [
        {
          color: 7419530,
          description: `New payment from ${invoice.customer_name} (${invoice.customer_email})`,
          fields: [
            {
              name: "Name",
              value: invoice.customer_name,
            },
            {
              name: "Email",
              value: invoice.customer_email,
            },
          ],
          title: `🚀 New Stripe Payment: ${String(invoice.amount_paid / 100)}`,
        },
      ],
      username: String(siteConfig.name),
    });
  }
};

export const handleSubscriptionCreatedOrUpdated = async ({
  event,
}: {
  event: Stripe.Event;
}) => {
  const subscription = event.data.object as Stripe.Subscription;
  const { userId } = subscription.metadata;

  await db
    .update(users)
    .set({
      // ),
      stripeCurrentPeriodEnd:
        String(subscription.current_period_end * 1000) || "", // stripeSubscriptionStatus: subscription.status,
      // eslint-disable-next-line @stylistic/max-len
      stripePriceId: subscription.items.data[0]?.price.id, // stripeProductId: subscription.items.data[0]?.price.product as string,
      // stripeSubscriptionCurrentPeriodStart: new Date(
      //   subscription.current_period_start * 1000,
      // ),
      // stripeSubscriptionCurrentPeriodEnd: new Date(
      // subscription.current_period_end * 1000,
      stripeSubscriptionId: subscription.id,
    })
    .where(eq(users.id, userId as string));
};

export const handleSubscriptionCanceled = async ({
  event,
}: {
  event: Stripe.Event;
}) => {
  const subscription = event.data.object as Stripe.Subscription;
  const { userId } = subscription.metadata;

  await db
    .update(users)
    .set({
      // stripeSubscriptionCurrentPeriodEnd: null,
      stripeCurrentPeriodEnd: null,

      // stripeSubscriptionStatus: null,
      stripePriceId: null, // stripeProductId: null,
      // stripeSubscriptionCurrentPeriodStart: null,
      stripeSubscriptionId: null,
    })
    .where(eq(users.id, userId as string));
};
