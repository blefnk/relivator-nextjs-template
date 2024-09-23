"use client";

import { useTransition } from "react";

import consola from "consola";
import tryToCatch from "try-to-catch";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import { Button } from "~/components/ui/button";
import { generateProducts } from "~/server/actions/deprecated/generate";
import { catchError } from "~/server/helpers/auth-error";

type GenerateButtonProps = {
  storeId: string;
};

export function GenerateButton({ storeId }: GenerateButtonProps) {
  const [isPending, startTransition] = useTransition();

  return (
    <Button
      className={`
        h-8 px-2

        lg:px-3
      `}
      variant="secondary"
      onClick={() => {
        startTransition(async () => {
          const [error] = await tryToCatch(generateProducts, {
            count: 5,
            storeId,
          });

          if (error) {
            consola.error(
              "Something wrong. If you're developer, check console if there is an error.",
            );

            // toast({
            //   description:
            //     "Something wrong. If you're developer, check console if there is an error.",
            //   title: "Products Generation",
            //   variant: "destructive",
            // });
            catchError(error);
          }
        });
      }}
    >
      {isPending && (
        <SpinnerSVG className="mr-2 size-4 animate-spin" aria-hidden="true" />
      )}
      Generate products
    </Button>
  );
}
