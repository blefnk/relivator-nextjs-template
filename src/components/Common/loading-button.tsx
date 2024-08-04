"use client";

import { forwardRef } from "react";
import { useFormStatus } from "react-dom";

import type { ButtonProps } from "@/browser/reliverse/ui/Button";

import { Button, buttonVariants } from "@/browser/reliverse/ui/Button";
import { Skeleton } from "@/browser/reliverse/ui/Skeleton";
import { useIsClient } from "@uidotdev/usehooks";

import { Icons } from "~/components/Common/Icons";
import { cn } from "~/utils";

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
          <Icons.spinner
            aria-hidden="true"
            className="mr-2 size-4 animate-spin"
          />
        )}
        {props.children}
      </Button>
    );
  },
);

LoadingButton.displayName = "LoadingButton";

export { LoadingButton };
