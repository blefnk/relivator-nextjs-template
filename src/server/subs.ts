import Link from "next/link";
import { redirect } from "next/navigation";
import appts from "~/app";
import { env } from "~/env.mjs";
import { UserSubscriptionPlan, type SubscriptionPlanTypes } from "~/types";
import { absoluteUrl } from "~/utils";
import dayjs from "dayjs";
import Stripe from "stripe";

import { storeSubscriptionPlans } from "~/server/config/subscriptions";
import { userPrivateMetadataSchema } from "~/data/validations/auth";
import { stripe } from "~/utils/stripe/connect";
import { getOrCreateCustomerId } from "~/utils/stripe/stripe";
import {
  findAccount,
  findUserById,
  getUserAccounts,
} from "~/utils/trpc/others/handlers/users";
import {
  getCurrentUser,
  getServerAuthSession,
  getUserById,
} from "~/utils/users";

export const PROFESSIONAL = env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID ?? "";
export const ENTERPRISE = env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID ?? "";

// export async function getUserSubscriptionPlan(): Promise<UserSubscriptionPlan | null> {
export async function getUserSubscriptionPlan() {
  try {
    // const session = await getServerSession(authOptions);
    // if (!session?.userId) throw new Error("User not found.");

    const session = await getServerAuthSession();
    if (!session) return redirect("/auth");
    // const user = await getUserById(session.id);
    // if (!user) throw new Error("❌ [getOrCreateCustomerId] something wrong");
    const billingUrl = absoluteUrl("/dashboard/billing");
    // await getOrCreateCustomerId({ stripe: stripe });

    // const user = await findUserById(session.userId);
    const userPrivateMetadata = userPrivateMetadataSchema.parse(
      // session?.user?.name ?? "none",
      {},
    );

    // Check if user subscribed
    // const isSubscribed = user.stripeSubscriptionId;

    // Stripe Subscription
    let subscription;

    return {
      // isSubscribed,
      subscription,
    };
  } catch (error) {
    return null;
  }
}

export function getPlanFeatures(planId?: SubscriptionPlanTypes["id"]) {
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
    starter: 2,
    professional: 3,
    enterprise: 4,
  }[subscriptionPlan?.id ?? "starter"];

  const isActive = subscriptionPlan?.isActive ?? false;
  const hasEnoughStores = storeCount >= minStoresWithProductCount;

  return isActive && hasEnoughStores
    ? "/dashboard/billing"
    : "/dashboard/stores/new";
}
