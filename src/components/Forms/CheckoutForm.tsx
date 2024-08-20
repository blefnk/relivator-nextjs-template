"use client";

import type { ComponentPropsWithoutRef, FormEvent, ReactElement } from "react";
import { useEffect, useId, useState } from "react";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";
import {
  AddressElement,
  LinkAuthenticationElement,
  PaymentElement,
  useElements,
  useStripe,
} from "@stripe/react-stripe-js";
import consola from "consola";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import { env } from "~/env";

type CheckoutFormProps = {
  storeId: string;
} & ComponentPropsWithoutRef<"form">;

const absoluteUrl = (path: string) => {
  return `${env.NEXT_PUBLIC_APP_URL}${path}`;
};

// @see https://stripe.com/docs/payments/quickstart
export function CheckoutForm({
  className,
  storeId,
  ...props
}: CheckoutFormProps): ReactElement {
  const id = useId();
  const stripe = useStripe();
  const elements = useElements();
  const [receipt_email, setEmail] = useState("");
  const [, setMessage] = useState<null | string>(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!stripe) {
      return;
    }

    const clientSecret = new URLSearchParams(window.location.search).get(
      "payment_intent_client_secret",
    );

    if (!clientSecret) {
      return;
    }

    void stripe
      .retrievePaymentIntent(clientSecret)
      .then(({ paymentIntent }) => {
        switch (paymentIntent?.status) {
          case "succeeded":
            setMessage("Payment succeeded!");
            break;

          case "processing":
            setMessage("The payment is processing.");
            break;

          case "requires_payment_method":
            setMessage("The payment was not successful, please try again.");
            break;

          default:
            setMessage("Something went wrong.");
            break;
        }
      });
  }, [stripe]);

  async function onSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!stripe || !elements) {
      consola.error(
        "Stripe.js hasn't yet loaded. Make sure to always disable form submission until Stripe.js has loaded.",
      );

      return;
    }

    setIsLoading(true);
    setMessage(null);

    const { error } = await stripe.confirmPayment({
      confirmParams: {
        receipt_email,
        return_url: absoluteUrl(`/checkout/${storeId}/success`),
      },

      // `Elements` instance that was used to create the Payment Element
      elements,
    });

    // This point will only be reached if there is an immediate error when
    // confirming the payment. Otherwise, the customer will be redirected to
    // the `return_url`. For some payment methods like iDEAL, the customer will
    // be redirected to an intermediate site first to authorize the payment, then
    // redirected to the `return_url`.
    if (error.type === "card_error" || error.type === "validation_error") {
      setMessage(error.message || "Something went wrong, please try again.");
    } else {
      setMessage("Something went wrong, please try again.");
    }

    consola.error(
      "Error confirming payment:",
      error.message || "Unknown error.",
    );
    setIsLoading(false);
  }

  return (
    <form
      aria-labelledby={`${id}-checkout-form-heading`}
      className={cn("grid gap-4", className)}
      id={`${id}-checkout-form`}
      onSubmit={async (...arguments_) => {
        await onSubmit(...arguments_);
      }}
      {...props}
    >
      <LinkAuthenticationElement
        id={`${id}-link-authentication-element`}
        onChange={(event_) => {
          setEmail(event_.value.email);
        }}
      />
      <AddressElement
        id={`${id}-address-element`}
        options={{
          mode: "shipping",
        }}
      />
      <PaymentElement
        id={`${id}-payment-element`}
        options={{
          layout: "tabs",
        }}
      />
      <Button
        aria-label="Pay"
        className={`
          w-full bg-blue-600

          hover:bg-blue-500 hover:shadow-md
        `}
        disabled={!stripe || !elements || isLoading}
        id={`${id}-checkout-form-submit`}
        type="submit"
        variant="secondary"
      >
        {isLoading && (
          <SpinnerSVG aria-hidden="true" className="mr-2 size-4 animate-spin" />
        )}
        Pay
      </Button>
    </form>
  );
}
