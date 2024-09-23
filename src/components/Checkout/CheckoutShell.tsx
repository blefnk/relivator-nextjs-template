"use client";

import type { StripeElementsOptions } from "@stripe/stripe-js";

import { use, useMemo } from "react";
import type { HTMLAttributes, ReactNode } from "react";

import { Elements } from "@stripe/react-stripe-js";

import { getStripe } from "~/core/stripe/getting";
import { cn } from "~/utils/cn";

type CheckoutShellProps = {
  paymentIntent: Promise<{
    clientSecret: null | string;
  }>;
  children: ReactNode;
  storeStripeAccountId: string;
} & HTMLAttributes<HTMLDivElement>;

export function CheckoutShell({
  children,
  className,
  paymentIntent,
  storeStripeAccountId,
  ...props
}: CheckoutShellProps) {
  const stripePromise = useMemo(
    () => getStripe(storeStripeAccountId),
    [storeStripeAccountId],
  );

  const { clientSecret } = use(paymentIntent);

  if (!clientSecret) {
    return null;
  }

  const options: StripeElementsOptions = {
    appearance: {
      theme: "stripe",
    },
    clientSecret,
  };

  return (
    <section className={cn("size-full", className)} {...props}>
      <Elements options={options} stripe={stripePromise}>
        {children}
      </Elements>
    </section>
  );
}
