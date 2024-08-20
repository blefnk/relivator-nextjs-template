import type { ReactNode } from "react";

import { cn } from "@/utils/reliverse/cn";
import { ChevronDownIcon } from "@radix-ui/react-icons";
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu";
import { cva } from "class-variance-authority";

type NavigationMenuProps = {
  children: ReactNode;
  className?: string;
} & NavigationMenuPrimitive.NavigationMenuProps;

const NavigationMenu = ({
  children,
  className,
  ...props
}: NavigationMenuProps) => (
  <NavigationMenuPrimitive.Root
    className={cn(
      "relative z-10 flex max-w-max flex-1 items-center justify-center",
      className,
    )}
    {...props}
  >
    {children}
    <NavigationMenuViewport />
  </NavigationMenuPrimitive.Root>
);

NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName;

type NavigationMenuListProps = {
  className?: string;
} & NavigationMenuPrimitive.NavigationMenuListProps;

const NavigationMenuList = ({
  className,
  ...props
}: NavigationMenuListProps) => (
  <NavigationMenuPrimitive.List
    className={cn(
      "group flex flex-1 list-none items-center justify-center space-x-1",
      className,
    )}
    {...props}
  />
);

NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName;

const NavigationMenuItem = NavigationMenuPrimitive.Item;

const navigationMenuTriggerStyle = cva(`
  group inline-flex h-9 w-max items-center justify-center rounded-lg
  bg-background p-2 text-sm font-medium transition-colors

  data-[active]:bg-accent/50

  data-[state=open]:bg-accent/50

  disabled:pointer-events-none disabled:opacity-50

  focus:bg-accent focus:text-accent-foreground focus:outline-none

  hover:bg-accent hover:text-accent-foreground
`);

type NavigationMenuTriggerProps = {
  children: ReactNode;
  className?: string;
} & NavigationMenuPrimitive.NavigationMenuTriggerProps;

const NavigationMenuTrigger = ({
  children,
  className,
  ...props
}: NavigationMenuTriggerProps) => (
  <NavigationMenuPrimitive.Trigger
    className={cn(navigationMenuTriggerStyle(), "group", className)}
    {...props}
  >
    {children}{" "}
    <ChevronDownIcon
      aria-hidden="true"
      className={`
        relative top-px ml-1 size-3 transition duration-300

        group-data-[state=open]:rotate-180
      `}
    />
  </NavigationMenuPrimitive.Trigger>
);

NavigationMenuTrigger.displayName = NavigationMenuPrimitive.Trigger.displayName;

type NavigationMenuContentProps = {
  className?: string;
} & NavigationMenuPrimitive.NavigationMenuContentProps;

const NavigationMenuContent = ({
  className,
  ...props
}: NavigationMenuContentProps) => (
  <NavigationMenuPrimitive.Content
    className={cn(
      `
        left-0 top-0 w-full

        data-[motion^=from-]:animate-in data-[motion^=from-]:fade-in

        data-[motion^=to-]:animate-out data-[motion^=to-]:fade-out

        data-[motion=from-end]:slide-in-from-right-52

        data-[motion=from-start]:slide-in-from-left-52

        data-[motion=to-end]:slide-out-to-right-52

        data-[motion=to-start]:slide-out-to-left-52

        md:absolute md:w-auto
      `,
      className,
    )}
    {...props}
  />
);

NavigationMenuContent.displayName = NavigationMenuPrimitive.Content.displayName;

const NavigationMenuLink = NavigationMenuPrimitive.Link;

type NavigationMenuViewportProps = {
  className?: string;
} & NavigationMenuPrimitive.NavigationMenuViewportProps;

const NavigationMenuViewport = ({
  className,
  ...props
}: NavigationMenuViewportProps) => (
  <div className={cn("absolute left-0 top-full flex justify-center")}>
    <NavigationMenuPrimitive.Viewport
      className={cn(
        `
          relative mt-1.5 h-[var(--radix-navigation-menu-viewport-height)]
          w-full origin-center overflow-hidden rounded-lg border bg-popover
          text-popover-foreground shadow

          data-[state=closed]:animate-out data-[state=closed]:zoom-out-95

          data-[state=open]:animate-in data-[state=open]:zoom-in-90

          md:w-[var(--radix-navigation-menu-viewport-width)]
        `,
        className,
      )}
      {...props}
    />
  </div>
);

NavigationMenuViewport.displayName =
  NavigationMenuPrimitive.Viewport.displayName;

type NavigationMenuIndicatorProps = {
  className?: string;
} & NavigationMenuPrimitive.NavigationMenuIndicatorProps;

const NavigationMenuIndicator = ({
  className,
  ...props
}: NavigationMenuIndicatorProps) => (
  <NavigationMenuPrimitive.Indicator
    className={cn(
      `
        top-[60%] z-10 flex items-center justify-center transition

        data-[state=hidden]:animate-out data-[state=hidden]:fade-out

        data-[state=visible]:animate-in data-[state=visible]:fade-in
      `,
      className,
    )}
    {...props}
  >
    <div
      className={`
        relative top-[60%] size-2 rotate-45 rounded-tl-sm bg-border shadow-md
      `}
    />
  </NavigationMenuPrimitive.Indicator>
);

NavigationMenuIndicator.displayName =
  NavigationMenuPrimitive.Indicator.displayName;

export {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
  NavigationMenuViewport,
};
