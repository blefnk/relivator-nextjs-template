"use client";

import type { FormEvent } from "react";
import { useTransition } from "react";

import { redirect } from "next/navigation";

import type { z } from "zod";

import { Button } from "@/components/ui/button";
import { catchError } from "@/server/reliverse/auth-error";
import consola from "consola";

import type { manageSubscriptionSchema } from "~/core/stripe/zod";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import {
  manageDowngradeToStarterAction,
  manageSubscriptionAction,
} from "~/core/stripe/actions";

type PlanManageFormProps = z.infer<typeof manageSubscriptionSchema>;

export function PlanManageForm({
  isCurrentPlan,
  isSubscribed,
  mapPlanId,
  stripeCustomerId,
  stripePriceId,
  stripeSubscriptionId,
}: PlanManageFormProps) {
  const [isPending, startTransition] = useTransition();

  function onSubmit(event_: FormEvent<HTMLFormElement>) {
    event_.preventDefault();
    startTransition(async () => {
      try {
        const session = await manageSubscriptionAction({
          isCurrentPlan,
          isSubscribed,
          stripeCustomerId,
          stripePriceId,
          stripeSubscriptionId,
        });

        if (session) {
          // window.location.href = session.url || "/dashboard/billing";
          redirect(session.url || "/dashboard/billing");
        }
      } catch (error) {
        consola.warn(
          "Please check `manage-subscription-form.tsx` file... Something went wrong...",
        );
        catchError(error);
      }
    });
  }

  function onSubmitDowngradeToStarter(event_: FormEvent<HTMLFormElement>) {
    event_.preventDefault();
    startTransition(async () => {
      // TODO: This is a hacky and wrong way to clear the subscription,
      // TODO: we need also clear the subscription on the Stripe side.
      try {
        const session = await manageDowngradeToStarterAction();

        if (session !== undefined) {
          // window.location.href = "/dashboard/billing";
          redirect("/dashboard/billing");
        }
      } catch (error) {
        consola.warn(
          "Please check `manage-subscription-form.tsx` file... Something went wrong...",
        );
        catchError(error);
      }
    });
  }

  return (
    <>
      {stripePriceId !== "none" &&
      stripePriceId !== undefined &&
      stripePriceId !== null ? (
        <form
          className="w-full"
          onSubmit={(event_) => {
            onSubmit(event_);
          }}
        >
          <ManageSubscriptionButton
            isCurrentPlan={isCurrentPlan}
            isPending={isPending}
            mapPlanId={mapPlanId}
          />
        </form>
      ) : (
        <form
          className="w-full"
          onSubmit={(event_) => {
            onSubmitDowngradeToStarter(event_);
          }}
        >
          <ManageSubscriptionButton
            isCurrentPlan={isCurrentPlan}
            isPending={isPending}
            mapPlanId={mapPlanId}
          />
        </form>
      )}
    </>
  );
}

type ManageSubscriptionButtonProps = {
  isCurrentPlan: boolean | undefined;
  isPending: boolean;
  mapPlanId: string | undefined;
};

function ManageSubscriptionButton({
  isCurrentPlan,
  isPending,
  mapPlanId,
}: ManageSubscriptionButtonProps) {
  function determineButtonText() {
    if (mapPlanId !== "starter" && !isCurrentPlan) {
      return "Subscribe";
    }

    if (mapPlanId !== "starter" && isCurrentPlan) {
      return "Manage Subscription";
    }

    if (mapPlanId === "starter" && isCurrentPlan) {
      return "Current Plan";
    }

    if (mapPlanId === "starter" && !isCurrentPlan) {
      return `Downgrade to ${
        mapPlanId.charAt(0).toUpperCase() + mapPlanId.slice(1)
      }`;
    }
  }

  return (
    <Button
      className={`
        w-full rounded px-4 py-2

        ${isPending ? "cursor-not-allowed opacity-50" : ""}
        ${
          (mapPlanId === "starter" && !isCurrentPlan) ||
          (mapPlanId !== "starter" && isCurrentPlan)
            ? `
              border border-slate-100 bg-transparent text-zinc-900

              dark:border-zinc-600 dark:text-zinc-300 dark:hover:bg-white/80
              dark:hover:text-zinc-900

              hover:bg-white/80 hover:text-zinc-900
            `
            : ""
        }
      `}
      disabled={isPending || (mapPlanId === "starter" && isCurrentPlan)}
      variant="default"
    >
      {isPending && (
        <SpinnerSVG aria-hidden="true" className="mr-2 size-4 animate-spin" />
      )}
      {determineButtonText()}
    </Button>
  );
}
