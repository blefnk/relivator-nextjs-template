"use client";

import * as React from "react";
import { catchError } from "~/utils";
import { eq } from "drizzle-orm";
import toast from "react-hot-toast";
import type { z } from "zod";

import {
  manageDowngradeToStarterAction,
  manageSubscriptionAction,
} from "~/core/stripe/actions";
import type { manageSubscriptionSchema } from "~/core/stripe/zod";
import { db } from "~/data/db";
import { users, type User } from "~/data/db/schema";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";
import { getServerAuthSession } from "~/utils/auth/users";

type ManageSubscriptionFormProps = z.infer<typeof manageSubscriptionSchema>;

export function ButtonManageSubscription({
  mapPlanId,
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripePriceId,
  stripeSubscriptionId,
}: ManageSubscriptionFormProps) {
  const [isPending, startTransition] = React.useTransition();

  function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      try {
        const session = await manageSubscriptionAction({
          isSubscribed,
          isCurrentPlan,
          stripeCustomerId,
          stripeSubscriptionId,
          stripePriceId,
        });
        if (session) {
          window.location.href = session.url ?? "/dashboard/billing";
        }
      } catch (err) {
        catchError(err);
      }
    });
  }

  function onSubmitDowngradeToStarter(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    startTransition(async () => {
      // TODO: This is a hacky and wrong way to clear the subscription,
      // TODO: we need also clear the subscription on the Stripe side.
      try {
        const session = await manageDowngradeToStarterAction({
          isSubscribed,
          isCurrentPlan,
          stripeCustomerId,
          stripeSubscriptionId,
          stripePriceId,
        });
        if (session !== undefined) {
          toast.success(session.success ?? "Something wrong...");
          window.location.href = "/dashboard/billing";
        }
      } catch (err) {
        catchError(err);
      }
    });
  }

  return (
    <>
      {(
        stripePriceId !== "none" &&
        stripePriceId !== undefined &&
        stripePriceId !== null
      ) ?
        <form className="w-full" onSubmit={(e) => onSubmit(e)}>
          <ManageSubscriptionButton
            isPending={isPending}
            mapPlanId={mapPlanId}
            isCurrentPlan={isCurrentPlan}
          />
        </form>
      : <form
          className="w-full"
          onSubmit={(e) => onSubmitDowngradeToStarter(e)}
        >
          <ManageSubscriptionButton
            isPending={isPending}
            mapPlanId={mapPlanId}
            isCurrentPlan={isCurrentPlan}
          />
        </form>
      }
    </>
  );
}

type ManageSubscriptionButtonProps = {
  isPending: boolean;
  mapPlanId: string | undefined;
  isCurrentPlan: boolean | undefined;
};

function ManageSubscriptionButton({
  isPending,
  mapPlanId,
  isCurrentPlan,
}: ManageSubscriptionButtonProps) {
  function determineButtonText() {
    if (mapPlanId !== "starter" && !isCurrentPlan) {
      return "Subscribe";
    } else if (mapPlanId !== "starter" && isCurrentPlan) {
      return "Manage Subscription";
    } else if (mapPlanId === "starter" && isCurrentPlan) {
      return "Current Plan";
    } else if (mapPlanId === "starter" && !isCurrentPlan) {
      return `Downgrade to ${
        mapPlanId.charAt(0).toUpperCase() + mapPlanId.slice(1)
      }`;
    }
  }

  return (
    <Button
      disabled={isPending || (mapPlanId === "starter" && isCurrentPlan)}
      variant="default"
      className={`w-full rounded px-4 py-2 ${
        isPending ? "cursor-not-allowed opacity-50" : ""
      } ${
        (
          (mapPlanId === "starter" && !isCurrentPlan) ||
          (mapPlanId !== "starter" && isCurrentPlan)
        ) ?
          "border border-slate-100 bg-transparent text-zinc-900 hover:bg-white/80 hover:text-zinc-900 dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-white/80 dark:hover:text-zinc-900"
        : ""
      }`}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      {determineButtonText()}
    </Button>
  );
}
