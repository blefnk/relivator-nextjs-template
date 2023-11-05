import { type Metadata } from "next";
import { redirect } from "next/navigation";
import { CheckIcon } from "@radix-ui/react-icons";
import { env } from "~/env.mjs";
import type { SubscriptionPlanTypes, UserSubscriptionPlan } from "~/types";
import { cn, formatDate, formatPrice } from "~/utils";

import { storeSubscriptionPlans } from "~/server/config/subscriptions";
import { fullURL } from "~/data/meta/builder";
import { ButtonManageSubscription } from "~/forms/manage-subscription-form";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/islands/navigation/page-header";
import { Card } from "~/islands/primitives/card";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell-variants";
import { getSubscriptionPlanAction } from "~/utils/stripe/actions";
import { getServerAuthSession } from "~/utils/users";

export const metadata: Metadata = {
  metadataBase: fullURL(),
  title: "Billing",
  description: "Manage your billing and subscription",
};

export default async function BillingPage() {
  const user = await getServerAuthSession();
  if (!user) redirect("/auth");

  const userPlanInfo = await getSubscriptionPlanAction(user.id);

  return (
    <Shell variant="sidebar" as="div">
      <PageHeader
        id="billing-header"
        aria-labelledby="billing-header-heading"
        separated
      >
        <PageHeaderHeading size="sm">Billing</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your billing and subscription
        </PageHeaderDescription>
      </PageHeader>
      <section
        id="billing-info"
        aria-labelledby="billing-info-heading"
        className="space-y-5"
      >
        <Card className="grid gap-4 p-6">
          <h3 className="text-lg font-semibold sm:text-xl">
            Current Subscription Is {userPlanInfo?.name ?? "Starter"}
          </h3>
          <p className="text-sm text-muted-foreground">
            {!userPlanInfo?.isSubscribed
              ? "Upgrade to create more stores and products "
              : userPlanInfo.isCanceled
              ? "Your plan will be canceled on "
              : "Your plan renews on "}
            {userPlanInfo?.stripeCurrentPeriodEnd
              ? `${formatDate(userPlanInfo.stripeCurrentPeriodEnd)}.`
              : null}
          </p>
        </Card>
      </section>
      <section
        id="subscription-plans"
        aria-labelledby="subscription-plans-heading"
        className="space-y-5 pb-2.5"
      >
        <h2 className="text-xl font-semibold sm:text-2xl mb-2">
          Subscription Plans
        </h2>
        {env.NODE_ENV === "development" && (
          <span className="text-red-500">
            [localhost-only-message]: Ensure you have the `.env` file correctly
            filled out and `pnpm stripe:listen` running before using the buttons
            below.
          </span>
        )}
        <div className="p-4 pt-2 grid grid-cols-1 md:grid-cols-3 gap-4 md:-ml-4">
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
        "flex flex-col mb-4 p-6 border border-slate-200 bg-slate-50 dark:bg-zinc-950 dark:border-zinc-800 rounded-lg shadow-lg",
        {
          "lg:col-span-2 xl:col-span-1": isLast,
          "border-primary shadow-md": isHighlighted,
        },
      )}
    >
      <h2 className="text-lg font-semibold mb-2 text-zinc-900 dark:text-white line-clamp-1">
        {planInfo.name}
      </h2>
      <p className="text-zinc-800 dark:text-zinc-300 text-lg mb-4 font-semibold">
        {pricing}
        <span className="text-sm font-normal text-muted-foreground">
          /month
        </span>
      </p>
      <div className="text-zinc-800 dark:text-zinc-300 line-clamp-2">
        {planInfo.description}
      </div>
      <Separator className="my-6" />
      <ul className="flex-grow mb-6">
        {planInfo.features.map((feature) => (
          <li
            key={feature}
            className="text-zinc-600 dark:text-zinc-400 flex items-center gap-2"
          >
            <CheckIcon className="h-4 w-4" aria-hidden="true" />
            {feature}
          </li>
        ))}
      </ul>
      <ButtonManageSubscription
        mapPlanId={planInfo.id}
        isCurrentPlan={isCurrentPlan}
        isSubscribed={isSubscribed}
        stripeCustomerId={userPlanInfo?.stripeCustomerId}
        stripePriceId={planInfo.stripePriceId}
        stripeSubscriptionId={userPlanInfo?.stripeSubscriptionId}
      />
    </div>
  );
}
