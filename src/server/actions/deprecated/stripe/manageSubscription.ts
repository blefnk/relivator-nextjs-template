"use server";

import type { z } from "zod";

import { eq } from "drizzle-orm";

import { stripe } from "~/core/stripe/connect";
import { db } from "~/db";
import { env } from "~/env";

const absoluteUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
};

import { redirect } from "next/navigation";

import { authjs } from "~/auth/authjs";
import { clerk } from "~/auth/clerk";
import { authProvider } from "~/auth/provider";
import { manageSubscriptionSchema } from "~/core/stripe/zod";
import { users } from "~/db/schema";

// Managing stripe subscriptions for a user
export async function manageSubscription(
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
