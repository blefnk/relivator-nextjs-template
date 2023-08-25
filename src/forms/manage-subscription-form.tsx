"use client";

import * as React from "react";
import { type z } from "zod";

import { manageSubscriptionAction } from "~/server/actions/stripe";
import { catchError } from "~/server/utils";
import { type manageSubscriptionSchema } from "~/data/zod/stripe";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";

type ManageSubscriptionFormProps = z.infer<typeof manageSubscriptionSchema>;

export function ManageSubscriptionForm({
  isCurrentPlan,
  isSubscribed,
  stripeCustomerId,
  stripeSubscriptionId,
  stripePriceId
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
          stripePriceId
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
    <form className="w-full" onSubmit={(e) => onSubmit(e)}>
      <Button className="w-full" disabled={isPending}>
        {isPending && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        {isCurrentPlan ? "Manage" : "Subscribe"}
      </Button>
    </form>
  );
}
