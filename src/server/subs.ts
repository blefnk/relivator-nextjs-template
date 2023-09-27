import appts from "~/app";
import { UserSubscriptionPlan, type SubscriptionPlan } from "~/types";
import dayjs from "dayjs";
import { getServerSession } from "next-auth";
import Stripe from "stripe";

import { authOptions } from "~/server/auth";
import { storeSubscriptionPlans } from "~/server/config/subscriptions";
import {
  findAccount,
  findUserById,
  getUserAccounts,
} from "~/data/routers/handlers/users";
import { stripe } from "~/data/routers/stripe";
import { userPrivateMetadataSchema } from "~/data/validations/auth";

// export async function getUserSubscriptionPlan(): Promise<UserSubscriptionPlan | null> {
export async function getUserSubscriptionPlan() {
  try {
    const session = await getServerSession(authOptions());
    if (!session?.userId) throw new Error("User not found.");

    const user = await findUserById(session.userId);
    const userPrivateMetadata = userPrivateMetadataSchema.parse(
      // session?.user?.name ?? "none",
      {},
    );

    // Check if user is subscribed
    // const isSubscribed =
    //   !!userPrivateMetadata.stripePriceId &&
    //   dayjs(userPrivateMetadata.stripeCurrentPeriodEnd).valueOf() + 86_400_000 >
    //     Date.now();
    // const plan = isSubscribed
    //   ? storeSubscriptionPlans.find(
    //       (plan) => plan.stripePriceId === userPrivateMetadata.stripePriceId,
    //     )
    //   : storeSubscriptionPlans[0];
    // if (!plan) {
    //   throw new Error("Plan not found.");
    // }

    // Check if user has canceled subscription
    // let isCanceled = false;
    // if (isSubscribed && !!userPrivateMetadata.stripeSubscriptionId) {
    //   const stripePlan = await stripe.subscriptions.retrieve(
    //     userPrivateMetadata.stripeSubscriptionId,
    //   );
    //   isCanceled = stripePlan.cancel_at_period_end;
    // }

    if (appts.debug) console.log(user);

    return null;
    // return {
    //   ...plan,
    //   stripeSubscriptionId: userPrivateMetadata.stripeSubscriptionId,
    //   stripeCurrentPeriodEnd: userPrivateMetadata.stripeCurrentPeriodEnd,
    //   stripeCustomerId: userPrivateMetadata.stripeCustomerId,
    //   isSubscribed,
    //   isCanceled,
    //   isActive: isSubscribed && !isCanceled,
    // };
  } catch (error) {
    // console.error(err);
    // const session = await getServerSession(authOptions());
    // if (err instanceof Stripe.errors.StripeError) {
    //   await session?.user?.updateUserMetadata(userId, {
    //     privateMetadata: {
    //       stripePriceId: null,
    //       stripeCustomerId: null,
    //       stripeSubscriptionId: null,
    //       stripeCurrentPeriodEnd: null,
    //     },
    //   });
    // }
    console.log("User not found.");
    return null;
  }
}

export function getPlanFeatures(planId?: SubscriptionPlan["id"]) {
  const plan = storeSubscriptionPlans.find((plan) => plan.id === planId);
  const features = plan?.features.map((feature) => feature.split(",")).flat();

  const maxStoreCount =
    features?.find((feature) => feature.match(/store/i))?.match(/\d+/) ?? 0;

  const maxProductCount =
    features?.find((feature) => feature.match(/product/i))?.match(/\d+/) ?? 0;

  return {
    maxStoreCount,
    maxProductCount,
  };
}

export function getDashboardRedirectPath(input: {
  storeCount: number;
  subscriptionPlan?: UserSubscriptionPlan | null;
}): string {
  const { storeCount, subscriptionPlan } = input;
  // todo: implement `enterprise` custom things
  const minStoresWithProductCount = {
    starter: 1,
    basic: 2,
    advanced: 3,
    enterprise: 4,
  }[subscriptionPlan?.id ?? "starter"];

  const isActive = subscriptionPlan?.isActive ?? false;
  const hasEnoughStores = storeCount >= minStoresWithProductCount;

  return isActive && hasEnoughStores
    ? "/dashboard/billing"
    : "/dashboard/stores/new";
}
