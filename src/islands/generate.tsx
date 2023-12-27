"use client";

import * as React from "react";
import { catchError } from "~/utils";
import { toast } from "react-hot-toast";

import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";
import { generateProducts } from "~/server/actions/generate";

interface GenerateButtonProps {
  storeId: number;
}

export function GenerateButton({ storeId }: GenerateButtonProps) {
  const [isPending, startTransition] = React.useTransition();

  return (
    <Button
      className="h-8 px-2 lg:px-3"
      variant="secondary"
      onClick={() => {
        startTransition(async () => {
          try {
            await generateProducts({ storeId, count: 5 });
            toast.success("Products generated successfully.");
          } catch (err) {
            toast.error(
              "Something wrong. If you're developer, check console if there is an error.",
            );
            catchError(err);
          }
        });
      }}
    >
      {isPending && (
        <Icons.spinner
          className="mr-2 h-4 w-4 animate-spin"
          aria-hidden="true"
        />
      )}
      Generate products
    </Button>
  );
}
