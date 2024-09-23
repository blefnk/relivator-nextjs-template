import type { CartLineItemSchema } from "~/server/validations/cart";
import type { StripePaymentStatus } from "~/types/stripe";

import { cn } from "~/server/helpers/utils";

// @see: https://github.com/jackblatch/OneStopShop/blob/main/server-actions/stripe/payment.ts
export function calculateOrderAmount(items: CartLineItemSchema[]) {
  const total = items.reduce((accumulator, item) => {
    return accumulator + Number(item.price) * item.quantity;
  }, 0);
  const fee = total * 0.01;

  return {
    fee: Number((fee * 100).toFixed(0)),
    total: Number((total * 100).toFixed(0)), // converts to cents which stripe charges in
  };
}

export const stripePaymentStatuses: {
  label: string;
  value: StripePaymentStatus;
}[] = [
  { label: "Canceled", value: "canceled" },
  { label: "Processing", value: "processing" },
  { label: "Requires Action", value: "requires_action" },
  { label: "Requires Capture", value: "requires_capture" },
  { label: "Requires Confirmation", value: "requires_confirmation" },
  { label: "Requires Payment Method", value: "requires_payment_method" },
  { label: "Succeeded", value: "succeeded" },
];

export function getStripePaymentStatusColor({
  shade = 600,
  status,
}: {
  shade?: 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900 | 950;
  status: StripePaymentStatus;
}) {
  const bg = `bg-${shade}`;

  return cn({
    [`${bg}-red`]: status === "canceled",
    [`${bg}-yellow`]: [
      "processing",
      "requires_action",
      "requires_capture",
      "requires_confirmation",
      "requires_payment_method",
    ].includes(status),
    [`bg-green-${shade}`]: status === "succeeded",
  });
}
