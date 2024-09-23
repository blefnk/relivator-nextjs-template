"use server";

import type { getStripeAccountSchema } from "~/core/stripe/zod";
import type { z } from "zod";

import { eq } from "drizzle-orm";

import { stripe } from "~/core/stripe/connect";
import { db } from "~/db";
import { payments, stores } from "~/db/schema";

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
      // @ts-expect-error disable ts error during migration
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
            // @ts-expect-error disable ts error during migration
            stripeAccountCreatedAt: account.created,
          })
          // @ts-expect-error disable ts error during migration
          .where(eq(payments.storeId, input.storeId));

        await tx
          .update(stores)
          .set({
            // @ts-expect-error disable ts error during migration
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
