"use client";

import type { ButtonProps } from "~/components/ui/button";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import { useIsClient } from "@uidotdev/usehooks";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";
import { Button, buttonVariants } from "~/components/ui/button";
import { Skeleton } from "~/components/ui/skeleton";
import { cn } from "~/utils/cn";

type LoadingButtonProps = {
  className?: string;
  size?: string;
  variant?: string;
} & ButtonProps;

const LoadingButton = forwardRef<HTMLButtonElement, LoadingButtonProps>(
  ({ className, size, variant, ...props }, ref) => {
    const { pending } = useFormStatus();
    const isMounted = useIsClient();

    if (!isMounted) {
      return (
        <Skeleton
          className={cn(
            buttonVariants({
              className,
              size,
              variant,
            }),
            "bg-muted text-muted-foreground",
          )}
        >
          {props.children}
        </Skeleton>
      );
    }

    return (
      <Button
        className={cn(
          buttonVariants({
            className,
            size,
            variant,
          }),
        )}
        {...props}
        ref={ref}
      >
        {pending && (
          <SpinnerSVG className="mr-2 size-4 animate-spin" aria-hidden="true" />
        )}
        {props.children}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
