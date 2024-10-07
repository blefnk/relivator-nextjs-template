"use client";

import { useEffect, useState, useTransition } from "react";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import { Button } from "~/components/ui/button";
import { createAccountLinkAction } from "~/server/actions/deprecated/stripe/createAccountLinkAction";
import { catchError } from "~/server/helpers/auth-error";

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
      globalThis.location.href = connectionUrl;
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
        <SpinnerSVG className="mr-2 size-4 animate-spin" aria-hidden="true" />
      )}
      Connect to Stripe
    </Button>
  );
}
