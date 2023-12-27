import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckIcon } from "@radix-ui/react-icons";
import type { SubscriptionPlanTypes, UserSubscriptionPlan } from "~/types";
import { cn, formatDate, formatPrice } from "~/utils";
import { desc, eq, sql } from "drizzle-orm";

import { getSubscriptionPlanAction } from "~/core/stripe/actions";
import { db } from "~/data/db";
import { products, stores, users } from "~/data/db/schema";
import { fullURL } from "~/data/meta/builder";
import { env } from "~/env.mjs";
import { ButtonManageSubscription } from "~/forms/manage-subscription-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { buttonVariants } from "~/islands/primitives/button";
import { Card } from "~/islands/primitives/card";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link } from "~/navigation";
import { storeSubscriptionPlans } from "~/server/config/subscriptions";
import { getDashboardRedirectPath, getPlanFeatures } from "~/server/subs";
import { getServerAuthSession } from "~/utils/auth/users";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Billing",
  description: "Manage your billing and subscription",
};

export default async function BillingPage() {
  const user = await getServerAuthSession();
  if (!user) redirect("/auth");

  const userPlanInfo = await getSubscriptionPlanAction(user.id);

  const allStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`))
    .where(eq(stores.userId, user.id));

  const subscriptionPlan = await getSubscriptionPlanAction(user.id);

  const { maxStoreCount, maxProductCount } = getPlanFeatures(
    subscriptionPlan?.id,
  );

  return (
    <Shell variant="sidebar" as="div">
      <PageHeader
        id="billing-header"
        aria-labelledby="billing-header-heading"
        separated
      >
        <div className="flex space-x-4">
          <PageHeaderHeading size="sm">Billing</PageHeaderHeading>
          <Link
            aria-label="Create store"
            href={getDashboardRedirectPath({
              storeCount: allStores.length,
              subscriptionPlan: subscriptionPlan,
            })}
            className={cn(
              buttonVariants({
                size: "sm",
              }),
            )}
          >
            Create store
          </Link>
        </div>
        <PageHeaderDescription size="sm">
          Manage your billing and subscription
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="billing-info"
        aria-labelledby="billing-info-heading"
        className="space-y-5"
      >
        <h2 className="mb-2 text-xl font-semibold sm:text-2xl">
          Subscription Plans
        </h2>
        <Card className="grid gap-4 p-6">
          <p className="text-sm text-muted-foreground">
            Your current plan is{" "}
            <span className="font-semibold">
              {subscriptionPlan?.name ?? "Starter"}
            </span>
            .
            {!userPlanInfo?.isSubscribed ?
              " Upgrade to create more stores and products "
            : userPlanInfo.isCanceled ?
              " Your plan will be canceled on "
            : " It renews on "}
            {userPlanInfo?.stripeCurrentPeriodEnd ?
              `${formatDate(userPlanInfo.stripeCurrentPeriodEnd)}. `
            : null}
            This plan allows you to create{" "}
            <span className="font-semibold">up to {maxStoreCount} stores</span>{" "}
            and include{" "}
            <span className="font-semibold">
              up to {maxProductCount} products
            </span>{" "}
            per store.
          </p>
        </Card>
      </section>
      <section
        id="subscription-plans"
        aria-labelledby="subscription-plans-heading"
        className="space-y-5 pb-2.5"
      >
        {env.DEV_DEMO_NOTES === "true" && (
          <p>
            [demo-only-msg] When using buttons below {" -> "} use Stripe Test
            Card data:
            <span className="font-semibold"> 4242424242424242</span>
            <span className="font-light"> | </span>
            <span className="font-semibold">12/34</span>
            <span className="font-light"> | </span>
            <span className="font-semibold">567</span>
          </p>
        )}
        {env.NODE_ENV === "development" && (
          <p className="text-red-700 dark:text-red-500">
            [localhost-notice] Ensure you have correctly filled out the{" "}
            <span className="font-semibold">`.env`</span> file and have{" "}
            <span className="font-semibold">`pnpm stripe:listen`</span> running{" "}
            <span className="font-semibold">before using</span> the buttons
            below.
            <br />
            [localhost-notice]{" "}
            <span className="font-semibold">Buttons are hidden if</span>{" "}
            NEXT_PUBLIC_APP_URL and Stripe environment variable keys are
            missing. Refer to .env.example file.
          </p>
        )}
        <div className="grid grid-cols-1 gap-4 p-4 pt-2 md:-ml-4 md:grid-cols-3">
          {storeSubscriptionPlans.map((planInfo, index) => (
            <SubscriptionPlanCard
              key={planInfo.name}
              planInfo={planInfo}
              userPlanInfo={userPlanInfo}
              isHighlighted={index === 1}
              isLast={index === storeSubscriptionPlans.length - 1}
            />
          ))}
        </div>
      </section>
    </Shell>
  );
}

type SubscriptionPlanCardProps = {
  planInfo: SubscriptionPlanTypes;
  isLast: boolean;
  isHighlighted: boolean;
  userPlanInfo: UserSubscriptionPlan | null;
};

function SubscriptionPlanCard({
  planInfo,
  isLast,
  isHighlighted,
  userPlanInfo,
}: SubscriptionPlanCardProps) {
  const pricing = formatPrice(planInfo.price, { currency: "USD" });
  const isCurrentPlan = userPlanInfo?.name === planInfo.name;
  const isSubscribed = userPlanInfo?.isSubscribed ?? false;

  return (
    <div
      className={cn(
        "mb-4 flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-6 shadow-lg dark:border-zinc-800 dark:bg-zinc-950",
        {
          "lg:col-span-2 xl:col-span-1": isLast,
          "border-primary shadow-md": isHighlighted,
        },
      )}
    >
      <h2 className="mb-2 line-clamp-1 text-lg font-semibold text-zinc-900 dark:text-white">
        {planInfo.name}
      </h2>
      <p className="mb-4 text-lg font-semibold text-zinc-800 dark:text-zinc-300">
        {pricing}
        <span className="text-sm font-normal text-muted-foreground">
          /month
        </span>
      </p>
      <div className="line-clamp-2 text-zinc-800 dark:text-zinc-300">
        {planInfo.description}
      </div>
      <Separator className="my-6" />
      <ul className="mb-6 grow">
        {planInfo.features.map((feature) => (
          <li
            key={feature}
            className="flex items-center gap-2 text-zinc-600 dark:text-zinc-400"
          >
            <CheckIcon className="h-4 w-4" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      {env.NEXT_PUBLIC_APP_URL &&
        env.STRIPE_SECRET_KEY &&
        env.STRIPE_WEBHOOK_SIGNING_SECRET &&
        env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY &&
        (env.STRIPE_PROFESSIONAL_SUBSCRIPTION_PRICE_ID ||
          env.STRIPE_ENTERPRISE_SUBSCRIPTION_PRICE_ID) && (
          <ButtonManageSubscription
            mapPlanId={planInfo.id}
            isCurrentPlan={isCurrentPlan}
            isSubscribed={isSubscribed}
            stripeCustomerId={userPlanInfo?.stripeCustomerId}
            stripePriceId={planInfo.stripePriceId}
            stripeSubscriptionId={userPlanInfo?.stripeSubscriptionId}
          />
        )}
      {/* {process.env.NODE_ENV === "development" && (
        <div className="opacity-50 mt-6 text-sm space-y-2">
          <h2 className="font-semibold">[localhost-debug]:</h2>
          <p>mapPlanId: {planInfo.id}</p>
          <p>isCurrentPlan: {String(isCurrentPlan)}</p>
          <p>isSubscribed: {String(isSubscribed)}</p>
          <p>stripeCustomerId: {userPlanInfo?.stripeCustomerId}</p>
          <p>stripePriceId: {planInfo.stripePriceId}</p>
          <p>stripeSubscriptionId: {userPlanInfo?.stripeSubscriptionId}</p>
        </div>
      )} */}
    </div>
  );
}
