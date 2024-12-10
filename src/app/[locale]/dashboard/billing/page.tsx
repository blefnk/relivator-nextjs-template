import type { Metadata } from "next";

import { RocketIcon } from "@radix-ui/react-icons";
import { redirect } from "next/navigation";
import * as React from "react";

import { AlertCard } from "~/components/alert-card";
import {
  PageHeader,
  PageHeaderDescription,
  PageHeaderHeading,
} from "~/components/page-header";
import { Shell } from "~/components/shell";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { env } from "~/env.js";
import { getPlan, getPlans } from "~/server/actions/stripe";
import { getCachedUser, getUserUsageMetrics } from "~/server/queries/user";

import { Billing } from "./_components/billing";
import { BillingSkeleton } from "./_components/billing-skeleton";

export const metadata: Metadata = {
  metadataBase: new URL(env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: "Billing",
  description: "Manage your billing and subscription plan",
};

export default async function BillingPage() {
  const user = await getCachedUser();

  if (!user) {
    redirect("/signin");
  }

  const planPromise = getPlan({ userId: user.id });
  const plansPromise = getPlans();
  const usageMetricsPromise = getUserUsageMetrics({ userId: user.id });

  return (
    <Shell variant="sidebar">
      <PageHeader>
        <PageHeaderHeading size="sm">Billing</PageHeaderHeading>
        <PageHeaderDescription size="sm">
          Manage your billing and subscription plan
        </PageHeaderDescription>
      </PageHeader>
      <Alert>
        <RocketIcon className="size-4" />
        <AlertTitle>Heads up!</AlertTitle>
        <AlertDescription>
          Relivator is a demo app using a Stripe test environment. You can find
          a list of test card numbers on the{" "}
          <a
            href="https://stripe.com/docs/testing"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium underline underline-offset-4 transition-colors hover:text-foreground/80"
          >
            Stripe docs
          </a>
          .
        </AlertDescription>
      </Alert>
      <React.Suspense fallback={<BillingSkeleton />}>
        <Billing
          planPromise={planPromise}
          plansPromise={plansPromise}
          usageMetricsPromise={usageMetricsPromise}
        />
      </React.Suspense>
    </Shell>
  );
}
