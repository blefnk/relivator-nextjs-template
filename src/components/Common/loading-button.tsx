"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import type { ButtonProps } from "@/components/ui/button";

import { Button, buttonVariants } from "@/components/ui/button";
import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/utils/reliverse/cn";
import { useIsClient } from "@uidotdev/usehooks";

import { SpinnerSVG } from "~/components/Common/Icons/SVG";

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
          <SpinnerSVG aria-hidden="true" className="mr-2 size-4 animate-spin" />
        )}
        {props.children}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
