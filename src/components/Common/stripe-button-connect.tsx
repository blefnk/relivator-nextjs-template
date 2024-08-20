"use client";

import { useEffect, useState, useTransition } from "react";

import { Button } from "@/components/ui/button";
import { catchError } from "@/server/reliverse/auth-error";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import { createAccountLinkAction } from "~/core/stripe/actions";

type ConnectToStripeButtonProps = {
  storeId: string;
};

export function ConnectStoreToStripeButton({
  storeId,
}: ConnectToStripeButtonProps) {
  const [isPending, startTransaction] = useTransition();
  const [connectionUrl, setConnectionUrl] = useState<null | string>(null);

  useEffect(() => {
    if (connectionUrl) {
      window.location.href = connectionUrl;
    }
  }, [connectionUrl]);

  return (
    <Button
      aria-label="Connect to Stripe"
      disabled={isPending}
      onClick={() => {
        startTransaction(async () => {
          try {
            const connection = await createAccountLinkAction({
              // @ts-expect-error TODO: fix id type
              storeId,
            });

            setConnectionUrl(connection.url);
          } catch (error) {
            catchError(error);
          }
        });
      }}
    >
      {isPending && (
        <SpinnerSVG aria-hidden="true" className="mr-2 size-4 animate-spin" />
      )}
      Connect to Stripe
    </Button>
  );
}
