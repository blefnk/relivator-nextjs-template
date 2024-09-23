import type { SubscriptionPlanTypes, UserSubscriptionPlan } from "~/types/plan";

import { Check } from "lucide-react";

import { PlanManageForm } from "~/components/Forms/PlanManageForm";
import { Separator } from "~/components/ui/separator";
import { env } from "~/env";
import { cn } from "~/utils/cn";
import { formatPrice } from "~/utils/number";

type PlanCardProps = {
  isHighlighted: boolean;
  isLast: boolean;
  planInfo: SubscriptionPlanTypes;
  userPlanInfo: null | UserSubscriptionPlan;
};

export function PlanCard({
  isHighlighted,
  isLast,
  planInfo,
  userPlanInfo,
}: PlanCardProps) {
  const pricing = formatPrice(planInfo.price, {
    currency: "USD",
  });

  const isCurrentPlan = userPlanInfo && userPlanInfo.name === planInfo.name;
  const isSubscribed = (userPlanInfo && userPlanInfo.isSubscribed) || false;

  return (
    <div
      className={cn(
        `
          mb-4 flex flex-col rounded-lg border border-slate-200 bg-slate-50 p-6
          shadow-lg

          dark:border-zinc-800 dark:bg-zinc-950
        `,
        {
          "border-primary shadow-md": isHighlighted,
          "lg:col-span-2 xl:col-span-1": isLast,
        },
      )}
    >
      <h2
        className={`
          mb-2 line-clamp-1 text-lg font-semibold text-zinc-900

          dark:text-white
        `}
      >
        {planInfo.name}
      </h2>
      <p
        className={`
          mb-4 text-lg font-semibold text-zinc-800

          dark:text-zinc-300
        `}
      >
        {pricing}
        <span className="text-sm font-normal text-muted-foreground">
          /month
        </span>
      </p>
      <div
        className={`
          line-clamp-2 text-zinc-800

          dark:text-zinc-300
        `}
      >
        {planInfo.description}
      </div>
      <Separator className="my-6" />
      <ul className="mb-6 grow">
        {planInfo.features.map((feature) => (
          <li
            key={feature}
            className={`
              flex items-center gap-2 text-zinc-600

              dark:text-zinc-400
            `}
          >
            <Check className="size-4" aria-hidden="true" />
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
          <>
            <PlanManageForm
              isSubscribed={isSubscribed}
              mapPlanId={planInfo.id}
              stripeCustomerId={userPlanInfo && userPlanInfo.stripeCustomerId}
              stripePriceId={planInfo.stripePriceId}
              stripeSubscriptionId={
                userPlanInfo && userPlanInfo.stripeSubscriptionId
              }
            />
          </>
        )}
      {env.NODE_ENV === "development" && (
        <div className="mt-6 space-y-2 text-sm opacity-50">
          <h2 className="font-semibold">[localhost-debug]:</h2>
          <p>mapPlanId: {planInfo.id}</p>
          <p>isCurrentPlan: {String(isCurrentPlan)}</p>
          <p>isSubscribed: {String(isSubscribed)}</p>
          <p>
            stripeCustomerId: {userPlanInfo && userPlanInfo.stripeCustomerId}
          </p>
          <p>stripePriceId: {planInfo.stripePriceId}</p>
          <p>
            stripeSubscriptionId:{" "}
            {userPlanInfo && userPlanInfo.stripeSubscriptionId}
          </p>
        </div>
      )}
    </div>
  );
}
