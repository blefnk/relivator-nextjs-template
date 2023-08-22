"use client";

import * as React from "react";
import { experimental_useFormStatus as useFormStatus } from "react-dom";

import { useMounted } from "~/hooks/use-mounted";
import {
  Button,
  buttonVariants,
  type ButtonProps
} from "~/islands/primitives/button";
import { Icons } from "~/islands/primitives/icons";
import { Skeleton } from "~/islands/primitives/skeleton";
import { cn } from "~/utils/server/fmt";

const LoadingButton = React.forwardRef<HTMLButtonElement, ButtonProps>(
  ({ className, variant, size, ...props }, ref) => {
    const { pending } = useFormStatus();
    const mounted = useMounted();

    if (!mounted)
      return (
        <Skeleton
          className={cn(
            buttonVariants({ variant, size, className }),
            "bg-muted text-muted-foreground"
          )}
        >
          {props.children}
        </Skeleton>
      );

    return (
      <Button
        className={cn(buttonVariants({ variant, size, className }))}
        {...props}
        ref={ref}
      >
        {pending && (
          <Icons.spinner
            className="mr-2 h-4 w-4 animate-spin"
            aria-hidden="true"
          />
        )}
        {props.children}
      </Button>
    );
  }
);
LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
