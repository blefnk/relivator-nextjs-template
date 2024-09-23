"use server";

import type { getStripeAccountSchema } from "~/core/stripe/zod";
import type { z } from "zod";

import { eq } from "drizzle-orm";

import { stripe } from "~/core/stripe/connect";
import { env } from "~/env";

const absoluteUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
};

import type Stripe from "stripe";

import { db } from "~/db";
import { payments } from "~/db/schema";
import { getStripeAccountAction } from "~/server/actions/deprecated/stripe/getStripeAccount";

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
        // @ts-expect-error disable ts error during migration
        .where(eq(payments.storeId, input.storeId));
    } else {
      await db.insert(payments).values({
        // @ts-expect-error disable ts error during migration
        storeId: input.storeId,
        stripeAccountId: account.id,
      });
    }

    return account.id;
  }
}
