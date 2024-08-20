"use client";

import type {
  ComponentPropsWithoutRef,
  ComponentRef,
  HTMLAttributes,
} from "react";
import { forwardRef } from "react";

import type { DialogPosition } from "@/components/ui/dialog";
import type { DialogProps } from "@radix-ui/react-dialog";

import { Dialog, DialogContent, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import { cn } from "@/utils/reliverse/cn";
import { MagnifyingGlassIcon } from "@radix-ui/react-icons";
import { Command as CommandPrimitive } from "cmdk";

const Command = forwardRef<
  ComponentRef<typeof CommandPrimitive>,
  ComponentPropsWithoutRef<typeof CommandPrimitive>
>(({ className, ...props }, ref) => (
  <CommandPrimitive
    className={cn(
      `
        flex size-full flex-col overflow-hidden rounded-lg bg-popover
        text-popover-foreground
      `,
      className,
    )}
    ref={ref}
    {...props}
  />
));

Command.displayName = CommandPrimitive.displayName;

type CommandDialogProps = DialogPosition & DialogProps;

const CommandDialog = ({
  children,
  position = "default",
  ...props
}: CommandDialogProps) => (
  <Dialog {...props}>
    <DialogContent className="overflow-hidden p-0" position={position}>
      <DialogTitle className="pl-3 pt-3 text-base font-medium text-muted-foreground">
        ↓↑ Command Menu
      </DialogTitle>
      <Separator />
      <Command
        className={`
          [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:font-medium
          [&_[cmdk-group-heading]]:text-muted-foreground

          [&_[cmdk-group]:not([hidden])_~[cmdk-group]]:pt-0

          [&_[cmdk-group]]:px-2

          [&_[cmdk-input-wrapper]_svg]:size-5

          [&_[cmdk-input]]:h-12

          [&_[cmdk-item]_svg]:size-5

          [&_[cmdk-item]]:p-2
        `}
      >
        {children}
      </Command>
    </DialogContent>
  </Dialog>
);

const CommandInput = forwardRef<
  ComponentRef<typeof CommandPrimitive.Input>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Input>
>(({ className, ...props }, ref) => (
  <div className="flex items-center border-b px-3 pb-3" cmdk-input-wrapper="">
    <MagnifyingGlassIcon className="mr-2 size-4 shrink-0 opacity-50" />
    <CommandPrimitive.Input
      className={cn(
        `
          flex h-10 w-full rounded-lg bg-transparent py-3 text-sm outline-none

          disabled:cursor-not-allowed disabled:opacity-50

          placeholder:text-muted-foreground
        `,
        className,
      )}
      ref={ref}
      {...props}
    />
  </div>
));

CommandInput.displayName = CommandPrimitive.Input.displayName;

const CommandList = forwardRef<
  ComponentRef<typeof CommandPrimitive.List>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.List>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.List
    className={cn("max-h-[300px] overflow-y-auto overflow-x-hidden", className)}
    ref={ref}
    {...props}
  />
));

CommandList.displayName = CommandPrimitive.List.displayName;

const CommandEmpty = forwardRef<
  ComponentRef<typeof CommandPrimitive.Empty>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Empty>
>((props, ref) => (
  <CommandPrimitive.Empty
    className="py-6 text-center text-sm"
    ref={ref}
    {...props}
  />
));

CommandEmpty.displayName = CommandPrimitive.Empty.displayName;

const CommandGroup = forwardRef<
  ComponentRef<typeof CommandPrimitive.Group>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Group>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Group
    className={cn(
      `
        overflow-hidden p-1 text-foreground

        [&_[cmdk-group-heading]]:px-2 [&_[cmdk-group-heading]]:py-1.5
        [&_[cmdk-group-heading]]:text-xs [&_[cmdk-group-heading]]:font-medium
        [&_[cmdk-group-heading]]:text-muted-foreground
      `,
      className,
    )}
    ref={ref}
    {...props}
  />
));

CommandGroup.displayName = CommandPrimitive.Group.displayName;

const CommandSeparator = forwardRef<
  ComponentRef<typeof CommandPrimitive.Separator>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Separator>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Separator
    className={cn("-mx-1 h-px bg-border", className)}
    ref={ref}
    {...props}
  />
));

CommandSeparator.displayName = CommandPrimitive.Separator.displayName;

const CommandItem = forwardRef<
  ComponentRef<typeof CommandPrimitive.Item>,
  ComponentPropsWithoutRef<typeof CommandPrimitive.Item>
>(({ className, ...props }, ref) => (
  <CommandPrimitive.Item
    className={cn(
      `
        relative flex cursor-default select-none items-center rounded-sm px-2
        py-1.5 text-sm outline-none

        aria-selected:bg-accent aria-selected:text-accent-foreground

        data-[disabled]:pointer-events-none data-[disabled]:opacity-50
      `,
      className,
    )}
    ref={ref}
    {...props}
  />
));

CommandItem.displayName = CommandPrimitive.Item.displayName;

const CommandShortcut = ({
  className,
  ...props
}: HTMLAttributes<HTMLSpanElement>) => (
  <span
    className={cn(
      "ml-auto text-xs tracking-widest text-muted-foreground",
      className,
    )}
    {...props}
  />
);

CommandShortcut.displayName = "CommandShortcut";

export {
  Command,
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
  CommandSeparator,
  CommandShortcut,
};
