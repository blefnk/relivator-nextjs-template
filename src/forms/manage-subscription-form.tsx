"use client";

import * as React from "react";
import { catchError } from "~/utils";
import type { z } from "zod";

import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";
import { manageSubscriptionAction } from "~/utils/stripe/actions";
import type { manageSubscriptionSchema } from "~/utils/stripe/zod";

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

  return (
    <>
      <form className="w-full" onSubmit={(e) => onSubmit(e)}>
        <Button
          disabled={isPending || (mapPlanId === "starter" && isCurrentPlan)}
          className={`w-full py-2 px-4 rounded ${
            isPending ? "cursor-not-allowed opacity-50" : ""
          } ${
            isCurrentPlan &&
            "bg-transparent border bord-slate-100 dark:border-zinc-600 text-zinc-900 dark:text-zinc-300 hover:bg-white/80 hover:text-zinc-900 dark:hover:bg-white/80 dark:hover:text-zinc-900"
          }`}
        >
          {isPending && (
            <Icons.spinner
              className="mr-2 h-4 w-4 animate-spin"
              aria-hidden="true"
            />
          )}
          {isCurrentPlan
            ? mapPlanId === "starter"
              ? "Current"
              : "Manage"
            : "Subscribe"}
        </Button>
      </form>
    </>
  );
}
