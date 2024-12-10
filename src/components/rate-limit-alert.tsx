import Link from "next/link";

import { buttonVariants } from "~/components/ui/button";
import { type getUserPlanMetrics } from "~/server/queries/user";
import { cn } from "~/server/utils";

import { ManagePlanForm } from "./manage-plan-form";

type RateLimitAlertProps = {
  planMetrics: Awaited<ReturnType<typeof getUserPlanMetrics>>;
} & React.HTMLAttributes<HTMLDivElement>;

export function RateLimitAlert({
  planMetrics,
  className,
  ...props
}: RateLimitAlertProps) {
  const {
    storeLimit,
    productLimit,
    storeLimitExceeded,
    productLimitExceeded,
    subscriptionPlan,
  } = planMetrics;

  return (
    <div className={cn("space-y-4", className)} {...props}>
      {storeLimitExceeded && (
        <div className="text-sm text-muted-foreground">
          You&apos;ve reached the limit of{" "}
          <span className="font-bold">{storeLimit}</span> stores for the{" "}
          <span className="font-bold">{subscriptionPlan?.title}</span> plan.
        </div>
      )}
      {productLimitExceeded && (
        <div className="text-sm text-muted-foreground">
          You&apos;ve reached the limit of{" "}
          <span className="font-bold">{productLimit}</span> products for the{" "}
          <span className="font-bold">{subscriptionPlan?.title}</span> plan.
        </div>
      )}
      {subscriptionPlan ? (
        subscriptionPlan.title === "Pro" ? (
          <Link
            href="https://cal.com/blefnk/15min"
            target="_blank"
            rel="noopener noreferrer"
            className={buttonVariants({ className: "w-full" })}
          >
            Contact us
          </Link>
        ) : (
          <ManagePlanForm
            stripePriceId={subscriptionPlan.stripePriceId}
            stripeCustomerId={subscriptionPlan.stripeCustomerId}
            stripeSubscriptionId={subscriptionPlan.stripeSubscriptionId}
            isSubscribed={subscriptionPlan.isSubscribed}
          />
        )
      ) : null}
    </div>
  );
}
