"use client";

import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
} from "react";
import { forwardRef } from "react";

import { cn } from "@/utils/reliverse/cn";
import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Cross2Icon } from "@radix-ui/react-icons";

export type DialogPosition = {
  position?: "default" | "top";
};

const Dialog = DialogPrimitive.Root;

const DialogTrigger = DialogPrimitive.Trigger;

const DialogPortal = ({ ...props }: DialogPrimitive.DialogPortalProps) => (
  <DialogPrimitive.Portal {...props} />
);

DialogPortal.displayName = DialogPrimitive.Portal.displayName;

const DialogOverlay = forwardRef<
  ComponentRef<typeof DialogPrimitive.Overlay>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Overlay>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Overlay
    className={cn(
      `
        fixed inset-0 z-50 bg-background/80 backdrop-blur-sm

        data-[state=closed]:animate-out data-[state=closed]:fade-out-0

        data-[state=open]:animate-in data-[state=open]:fade-in-0
      `,
      className,
    )}
    ref={ref}
    {...props}
  />
));

DialogOverlay.displayName = DialogPrimitive.Overlay.displayName;

const DialogContent = forwardRef<
  ComponentRef<typeof DialogPrimitive.Content>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Content> & DialogPosition
>(({ children, className, position, ...props }, ref) => (
  <DialogPortal>
    <DialogOverlay />
    <DialogPrimitive.Content
      className={cn(
        `
          fixed left-1/2 top-1/2 z-50 grid w-full max-w-lg -translate-x-1/2
          -translate-y-2/4 gap-4 border bg-background p-6 shadow-lg duration-200

          data-[state=closed]:fade-out-0 data-[state=closed]:zoom-out-95
          data-[state=closed]:slide-out-to-left-1/2
          data-[state=closed]:slide-out-to-top-[48%]

          data-[state=open]:animate-in data-[state=open]:fade-in-0
          data-[state=open]:zoom-in-95 data-[state=open]:slide-in-from-left-1/2
          data-[state=open]:slide-in-from-top-[48%]

          md:w-full

          sm:rounded-lg
        `,
        position === "default" && "data-[state=closed]:animate-out",
        position === "top" && "top-44 translate-y-0",
        className,
      )}
      ref={ref}
      {...props}
    >
      {children}
      <DialogPrimitive.Close
        className={`
          absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background
          transition-opacity

          data-[state=open]:bg-accent data-[state=open]:text-muted-foreground

          disabled:pointer-events-none

          focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2

          hover:opacity-100
        `}
      >
        <Cross2Icon className="size-4" />
        <span className="sr-only">Close</span>
      </DialogPrimitive.Close>
    </DialogPrimitive.Content>
  </DialogPortal>
));

DialogContent.displayName = DialogPrimitive.Content.displayName;

const DialogHeader = ({
  className,
  ...props
}: HTMLAttributes<HTMLDivElement>) => (
  <div
    className={cn(
      `
        flex flex-col space-y-1.5 text-center

        sm:text-left
      `,
      className,
    )}
    {...props}
  />
);

DialogHeader.displayName = "DialogHeader";

const DialogFooter = ({
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

DialogFooter.displayName = "DialogFooter";

const DialogTitle = forwardRef<
  ComponentRef<typeof DialogPrimitive.Title>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Title>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Title
    className={cn(
      "text-lg font-semibold leading-none tracking-tight",
      className,
    )}
    ref={ref}
    {...props}
  />
));

DialogTitle.displayName = DialogPrimitive.Title.displayName;

const DialogDescription = forwardRef<
  ComponentRef<typeof DialogPrimitive.Description>,
  ComponentPropsWithoutRef<typeof DialogPrimitive.Description>
>(({ className, ...props }, ref) => (
  <DialogPrimitive.Description
    className={cn("text-sm text-muted-foreground", className)}
    ref={ref}
    {...props}
  />
));

DialogDescription.displayName = DialogPrimitive.Description.displayName;

export {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
};
