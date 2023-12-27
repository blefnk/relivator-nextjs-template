import { numberToMoney } from "~/utils";
import axios from "axios";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

import { siteConfig } from "~/app";
import { db } from "~/data/db";
import { users } from "~/data/db/schema";
import { env } from "~/env.mjs";
import { getUserById } from "~/utils/auth/users";

export const getOrCreateStripeCustomerIdForUser = async ({
  stripe,
  userId,
}: {
  stripe: Stripe;
  userId: string;
}) => {
  const user = await getUserById(userId);
  if (!user) throw new Error("User not found");

  if (user.stripeCustomerId) {
    return user.stripeCustomerId;
  }

  // create a new customer
  const customer = await stripe.customers.create({
    email: user.email ?? undefined,
    name: user.name ?? undefined,
    preferred_locales: ["en"],
    // payment_method: "card",
    metadata: {
      userId,
    },
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
    payment_settings: {
      payment_method_types: ["card"],
    },
    metadata: {
      userId,
    },
  });

  const updatedUser = await db
    .update(users)
    .set({
      stripeCustomerId: customer.id,
      stripePriceId: env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID,
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
    .then((res) => res[0] ?? null);

  if (updatedUser?.stripeCustomerId) {
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
  const userId = subscription.metadata.userId;

  await db
    .update(users)
    .set({
      stripeSubscriptionId: subscription.id,
      // stripeSubscriptionStatus: subscription.status,
      stripePriceId: subscription.items.data[0]?.price.id,
      // stripeProductId: subscription.items.data[0]?.price.product as string,
      stripeSubscriptionCurrentPeriodStart: new Date(
        subscription.current_period_start * 1000,
      ),
      stripeSubscriptionCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000,
      ),
    })
    .where(eq(users.id, userId as string));

  if (invoice?.amount_paid > 0) {
    await axios.post(`${process.env.DISCORD_WEBHOOK_URL}`, {
      username: `${siteConfig.name}`,
      avatar_url: `${env.NEXT_PUBLIC_APP_URL}/logo.png`,
      embeds: [
        {
          title: `🚀 New Stripe Payment: ${numberToMoney(
            invoice.amount_paid / 100,
          )}`,
          description: `New payment from ${invoice.customer_name} (${invoice.customer_email})`,
          color: 7419530,
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
        },
      ],
    });
  }
};

export const handleSubscriptionCreatedOrUpdated = async ({
  event,
}: {
  event: Stripe.Event;
}) => {
  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata.userId;

  await db
    .update(users)
    .set({
      stripeSubscriptionId: subscription.id,
      // stripeSubscriptionStatus: subscription.status,
      stripePriceId: subscription.items.data[0]?.price.id,
      // stripeProductId: subscription.items.data[0]?.price.product as string,
      stripeSubscriptionCurrentPeriodStart: new Date(
        subscription.current_period_start * 1000,
      ),
      stripeSubscriptionCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000,
      ),
    })
    .where(eq(users.id, userId as string));
};

export const handleSubscriptionCanceled = async ({
  event,
}: {
  event: Stripe.Event;
}) => {
  const subscription = event.data.object as Stripe.Subscription;
  const userId = subscription.metadata.userId;

  await db
    .update(users)
    .set({
      stripeSubscriptionId: null,
      // stripeSubscriptionStatus: null,
      stripePriceId: null,
      // stripeProductId: null,
      stripeSubscriptionCurrentPeriodStart: null,
      stripeSubscriptionCurrentPeriodEnd: null,
    })
    .where(eq(users.id, userId as string));
};
