"use client";

import type { ComponentPropsWithoutRef, ComponentRef, Ref } from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/reliverse/cn";
import * as AvatarPrimitive from "@radix-ui/react-avatar";

type AvatarProps = {
  className?: string;
  ref?: Ref<ComponentRef<typeof AvatarPrimitive.Root>>;
} & ComponentPropsWithoutRef<typeof AvatarPrimitive.Root>;

const Avatar = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Root>,
  AvatarProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Root
    className={cn(
      "relative flex size-10 shrink-0 overflow-hidden rounded-full",
      className,
    )}
    ref={ref}
    {...props}
  />
));

Avatar.displayName = AvatarPrimitive.Root.displayName;

type AvatarImageProps = {
  className?: string;
  ref?: Ref<ComponentRef<typeof AvatarPrimitive.Image>>;
} & ComponentPropsWithoutRef<typeof AvatarPrimitive.Image>;

const AvatarImage = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Image>,
  AvatarImageProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Image
    className={cn("aspect-square size-full", className)}
    ref={ref}
    {...props}
  />
));

AvatarImage.displayName = AvatarPrimitive.Image.displayName;

type AvatarFallbackProps = {
  className?: string;
  ref?: Ref<ComponentRef<typeof AvatarPrimitive.Fallback>>;
} & ComponentPropsWithoutRef<typeof AvatarPrimitive.Fallback>;

const AvatarFallback = forwardRef<
  ComponentRef<typeof AvatarPrimitive.Fallback>,
  AvatarFallbackProps
>(({ className, ...props }, ref) => (
  <AvatarPrimitive.Fallback
    className={cn(
      "flex size-full items-center justify-center rounded-full bg-muted",
      className,
    )}
    ref={ref}
    {...props}
  />
));

AvatarFallback.displayName = AvatarPrimitive.Fallback.displayName;

export { Avatar, AvatarFallback, AvatarImage };
