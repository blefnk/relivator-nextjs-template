import axios from "axios";
import { eq } from "drizzle-orm";
import type Stripe from "stripe";

import { numberToMoney } from "~/server/utils";
import { db } from "~/data/db/client";
import { users } from "~/data/db/schema";
import { getUserById } from "~/hooks/queries/getUserById";

/**
 * todo: this stipe stuff currently is not finished
 * todo: merge things below with other stripe solutions in project
 * todo: we can also try implement serverlessClient connect/clean
 *
 * @see https://github.com/Alissonsleal/brapi/blob/main/services/stripe/webhookHandlers.ts
 * @see https://bobbyhadz.com/blog/typescript-no-overload-matches-this-call
 */

// retrieves a Stripe customer id for a given user if it exists or creates a new one
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
    preferred_locales: ["pt-BR"],
    metadata: {
      userId,
    },
  });

  // create a new free subscription for this user
  const subscription = await stripe.subscriptions.create({
    customer: customer.id,
    items: [
      {
        price: process.env.STRIPE_FREE_PRICE_ID,
        quantity: 1,
      },
    ],
    metadata: {
      userId,
    },
  });

  const updatedUser = await db
    .update(users)
    .set({
      stripeCustomerId: customer.id,
      stripePriceId: process.env.STRIPE_FREE_PRICE_ID,
      stripeSubscriptionCurrentPeriodStart: new Date(
        subscription.current_period_start * 1000,
      ),
      stripeSubscriptionCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000,
      ),
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
      stripeSubscriptionStatus: subscription.status,
      stripePriceId: subscription.items.data[0]?.price.id,
      stripeSubscriptionCurrentPeriodStart: new Date(
        subscription.current_period_start * 1000,
      ),
      stripeSubscriptionCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000,
      ),
    })
    // @ts-expect-error
    .where(eq(users.id, userId));

  if (invoice?.amount_paid > 0) {
    await axios.post(`${process.env.DISCORD_WEBHOOK_URL}`, {
      username: "bleverse",
      avatar_url: "https://relivator.bleverse.com/logo.png",
      embeds: [
        {
          title: `🚀 New stripe payment - ${numberToMoney(
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
      stripeSubscriptionStatus: subscription.status,
      stripePriceId: subscription.items.data[0]?.price.id,
      stripeSubscriptionCurrentPeriodStart: new Date(
        subscription.current_period_start * 1000,
      ),
      stripeSubscriptionCurrentPeriodEnd: new Date(
        subscription.current_period_end * 1000,
      ),
    })
    // @ts-expect-error
    .where(eq(users.id, userId));
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
      stripeSubscriptionStatus: null,
      stripePriceId: null,
      stripeSubscriptionCurrentPeriodStart: null,
      stripeSubscriptionCurrentPeriodEnd: null,
    })
    // @ts-expect-error
    .where(eq(users.id, userId));
};
