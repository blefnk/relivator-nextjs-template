"use server";

/**
 * @see https://github.com/Apestein/nextflix/blob/main/src/actions/index.ts
 */
import { revalidatePath } from "next/cache";
import { cookies, headers } from "next/headers";
import { redirect } from "next/navigation";
import { CommentTuple, type CheckoutItem } from "~/types";
import { eq } from "drizzle-orm";
import { getServerSession } from "next-auth";
import type { Stripe } from "stripe";
import { z } from "zod";

import { authOptions } from "~/server/auth";
import { authAction } from "~/server/clients/zod-action-safe";
import { planTuple } from "~/server/config/subscriptions2";
import { absoluteUrl, calculateOrderAmount, ERR } from "~/server/utils";
import { db } from "~/data/db/client";
import {
  accounts,
  carts,
  comments,
  payments,
  stores,
  users,
} from "~/data/db/schema";
import {
  findUserById,
  getAccount,
  getUser,
  getUserAccounts,
  getUserWithAccounts,
  getUserWithActiveAccount,
} from "~/data/routers/handlers/users";
import { stripe } from "~/data/routers/stripe";
import type {
  createPaymentIntentSchema,
  getPaymentIntentSchema,
  getPaymentIntentsSchema,
  getStripeAccountSchema,
  manageSubscriptionSchema,
} from "~/data/validations/stripe";

// todo: not finished (merge with: src/data/routers/handlers/user.ts)
export const createAccount = authAction(
  z.object({
    name: z.string().min(2).max(20),
  }),
  async (input, { userId }) => {
    // @ts-expect-error
    const account = await getUserWithAccounts();

    if (account.accounts.length === 4) throw new Error(ERR.not_allowed);
    // @ts-expect-error
    await db.insert(accounts).values({
      // eslint-disable-next-line @typescript-eslint/no-base-to-string
      id: `${userId}`,
      accountId: userId,
      name: input.name,
      // todo: implement if user has no image then use this one
      image: `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${input.name}`,
    });

    revalidatePath("/dashboard/account");
    return { message: "Account Created" };
  },
);

// todo: not finished (merge with: src/data/routers/handlers/user.ts)
export const deleteAccount = authAction(
  z.object({
    accountId: z.string(),
  }),
  async (input) => {
    // @ts-expect-error
    const account = await getUserWithAccounts();

    if (account.activeAccountId === input.accountId)
      return { message: "Cannot delete active account" };
    if (!account.accounts.find((account) => account.id === input.accountId))
      throw new Error(ERR.unauthorized);

    await db.delete(accounts).where(eq(accounts.id, input.accountId));

    revalidatePath("/dashboard/account");
    return { message: "Account Deleted" };
  },
);

// todo: not finished (merge with: src/data/routers/handlers/user.ts)
export const updateAccount = authAction(
  z.object({
    accountId: z.string(),
    name: z.string().min(2).max(20),
  }),
  async (input, { userId }) => {
    const account = await getAccount(input.accountId);

    // @ts-expect-error
    if (userId !== account.accountId) throw new Error(ERR.unauthorized);

    await db
      .update(accounts)
      .set({
        name: input.name,
        // todo: implement if user has no image then use this one
        image: `https://api.dicebear.com/6.x/bottts-neutral/svg?seed=${input.name}`,
      })
      .where(eq(accounts.id, input.accountId));

    revalidatePath("/dashboard/account");
    return { message: "Account Updated" };
  },
);

// todo: not finished (merge with: src/data/routers/handlers/user.ts)
export const switchAccount = authAction(
  z.object({
    accountId: z.string(),
  }),
  async (input, { userId }) => {
    const account = await getAccount(input.accountId);
    // @ts-expect-error
    if (account.accountId !== userId) throw new Error(ERR.unauthorized);
    await db
      .update(users)
      .set({
        activeAccountId: input.accountId,
      })
      // @ts-expect-error
      .where(eq(users.id, userId));
    revalidatePath("/");
    return { message: "You have switched active account" };
  },
);

// todo: urgently need to be finished/improved
export const createCheckoutSession = authAction(
  z.object({
    stripeProductId: z.string(),
    planName: z.enum(planTuple),
  }),
  async (input, { userId }) => {
    // @ts-expect-error
    const user = await getUser();
    const siteUrl = headers().get("origin")!;
    let checkoutSession: Stripe.Checkout.Session | Stripe.BillingPortal.Session;
    if (input.planName !== "Starter" && user.subscriptionPlan === "Starter")
      checkoutSession = await stripe.checkout.sessions.create({
        mode: "subscription",
        billing_address_collection: "auto",
        customer_email: user?.email ?? undefined,
        line_items: [
          {
            price: input.stripeProductId,
            quantity: 1,
          },
        ],
        success_url: `${siteUrl}/dashboard/billing/result?session_id={CHECKOUT_SESSION_ID}`,
        cancel_url: `${siteUrl}/dashboard/billing`,
        metadata: {
          // @ts-expect-error
          userId,
          planName: input.planName,
        },
      });
    else
      checkoutSession = await stripe.billingPortal.sessions.create({
        customer: user.stripeCustomerId!,
        return_url: `${siteUrl}/dashboard/billing`,
      });
    redirect(checkoutSession.url!);
  },
);

// todo: not finished
/* export const toggleCommentType = authAction(
  z.object({
    id: z.number(),
    isSaved: z.boolean(),
    questionOrReview: z.enum(CommentTuple),
  }),
  async (input) => {
    const userId = await getServerSession(authOptions());
    const account = await getUser();
    if (!input.isSaved) {
      await db.insert(comments).values({
        id: input.id,
        commentType: input.questionOrReview,
        accountId: users.activeAccountId,
      });
      return { isSaved: true };
    } else {
      await db.delete(comments).where(eq(comments.id, input.id));
      return { isSaved: false };
    }
  },
); */
