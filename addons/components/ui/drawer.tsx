"use client";

import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
} from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/reliverse/cn";
import { Drawer as DrawerPrimitive } from "vaul";

const Drawer = DrawerPrimitive.Root;

const DrawerTrigger = DrawerPrimitive.Trigger;

const DrawerClose = DrawerPrimitive.Close;

const DrawerContent = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Content>
>(({ children, className, ...props }, ref) => (
  <DrawerPrimitive.Portal>
    <DrawerPrimitive.Overlay className="fixed inset-0 z-50 bg-zinc-950/60" />
    <DrawerPrimitive.Content
      className={cn(
        `
          fixed inset-x-0 bottom-0 z-50 mt-24 h-[96%] rounded-t-[10px]
          bg-background
        `,
        className,
      )}
      ref={ref}
      {...props}
    >
      <div
        className={`
          absolute left-1/2 top-3 h-2 w-[100px] -translate-x-1/2 rounded-full
          bg-muted
        `}
      />
      {children}
    </DrawerPrimitive.Content>
  </DrawerPrimitive.Portal>
));

DrawerContent.displayName = "DrawerContent";

const DrawerHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex flex-col space-y-2 text-center

        sm:text-left
      `,
      className,
    )}
    {...props}
  />
);

DrawerHeader.displayName = "DrawerHeader";

const DrawerFooter = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex flex-col-reverse

        sm:flex-row sm:justify-end sm:space-x-2
      `,
      className,
    )}
    {...props}
  />
);

DrawerFooter.displayName = "DrawerFooter";

const DrawerTitle = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Title
    className={cn("text-lg font-semibold text-foreground", className)}
    ref={ref}
    {...props}
  />
));

DrawerTitle.displayName = DrawerPrimitive.Title.displayName;

const DrawerDescription = forwardRef<
  ComponentRef<typeof DrawerPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DrawerPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DrawerPrimitive.Description
    className={cn("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));

DrawerDescription.displayName = DrawerPrimitive.Description.displayName;

export {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
}; /// / @see https://github.com/shadcn-ui/ui/blob/main/apps/www/components/drawer.tsx//
