"use client";

import Link from "next/link";
import { useSelectedLayoutSegment } from "next/navigation";
import * as React from "react";

import type { MainNavItem } from "~/types";

import { Icons } from "~/components/icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  navigationMenuTriggerStyle,
} from "~/components/ui/navigation-menu";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";
import { siteConfig } from "~/config/site";
import { useMediaQuery } from "~/hooks/use-media-query";
import { cn } from "~/server/utils";

// ListItem component for NavigationMenu
const ListItem = React.forwardRef<
  React.ComponentRef<"a">,
  React.ComponentPropsWithoutRef<"a"> & { title: string }
>(({ className, title, children, href, ...props }, ref) => {
  return (
    <li>
      <NavigationMenuLink asChild>
        <Link
          ref={ref}
          href={String(href)}
          className={cn(
            "block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground",
            className,
          )}
          {...props}
        >
          <div className="text-sm font-medium leading-none">{title}</div>
          <p className="line-clamp-2 text-sm leading-snug text-muted-foreground">
            {children}
          </p>
        </Link>
      </NavigationMenuLink>
    </li>
  );
});
ListItem.displayName = "ListItem";

// MobileLink component for Mobile Navigation
type MobileLinkProps = {
  href: string;
  disabled?: boolean;
  segment: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
} & React.AnchorHTMLAttributes<HTMLAnchorElement>;

function MobileLink({
  children,
  href,
  disabled,
  segment,
  setOpen,
  className,
  ...props
}: MobileLinkProps) {
  return (
    <Link
      href={href}
      className={cn(
        "text-foreground/70 transition-colors hover:text-foreground",
        href.includes(segment) && "text-foreground",
        disabled && "pointer-events-none opacity-60",
        className,
      )}
      onClick={() => {
        setOpen(false);
      }}
      {...props}
    >
      {children}
    </Link>
  );
}

// Main Navigation Component
type NavigationProps = {
  items?: MainNavItem[];
};

export function Navigation({ items }: NavigationProps) {
  const isDesktop = useMediaQuery("(min-width: 1024px)");
  const segment = useSelectedLayoutSegment();
  const [open, setOpen] = React.useState(false);

  return (
    <nav className="flex items-center justify-between p-4">
      {/* Desktop Navigation */}
      {isDesktop ? (
        <NavigationMenu>
          <NavigationMenuList>
            {items?.[0]?.items ? (
              <NavigationMenuItem>
                <NavigationMenuTrigger className="h-auto">
                  {items[0].title}
                </NavigationMenuTrigger>
                <NavigationMenuContent>
                  <ul className="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-2 lg:grid-rows-1">
                    {/* Left Column */}
                    <li className="flex flex-col justify-between row-span-full">
                      <NavigationMenuLink asChild>
                        <Link
                          href="/"
                          className="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        >
                          <Icons.logo className="h-6 w-6" aria-hidden="true" />
                          <div className="mb-2 mt-4 text-lg font-medium">
                            {siteConfig.name}
                          </div>
                          <p className="text-sm leading-tight text-muted-foreground">
                            {siteConfig.description}
                          </p>
                          <span className="sr-only">Home</span>
                        </Link>
                      </NavigationMenuLink>
                    </li>

                    {/* Right Column */}
                    <div className="flex flex-col space-y-3">
                      {items[0].items.map((item) => (
                        <ListItem
                          key={item.title}
                          title={item.title}
                          href={item.href}
                        >
                          {item.description}
                        </ListItem>
                      ))}
                    </div>
                  </ul>
                </NavigationMenuContent>
              </NavigationMenuItem>
            ) : null}
            {items
              ?.filter((item) => item.title !== items[0]?.title)
              .map((item) =>
                item.items ? (
                  <NavigationMenuItem key={item.title}>
                    <NavigationMenuTrigger className="h-auto capitalize">
                      {item.title}
                    </NavigationMenuTrigger>
                    <NavigationMenuContent>
                      <ul className="grid w-[400px] gap-3 p-4 md:w-[500px] md:grid-cols-2 lg:w-[600px]">
                        {item.items.map((sub) => (
                          <ListItem
                            key={sub.title}
                            title={sub.title}
                            href={sub.href}
                          >
                            {sub.description}
                          </ListItem>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </NavigationMenuItem>
                ) : (
                  item.href && (
                    <NavigationMenuItem key={item.title}>
                      <Link href={item.href} legacyBehavior passHref>
                        <NavigationMenuLink
                          className={cn(navigationMenuTriggerStyle(), "h-auto")}
                        >
                          {item.title}
                        </NavigationMenuLink>
                      </Link>
                    </NavigationMenuItem>
                  )
                ),
              )}
          </NavigationMenuList>
        </NavigationMenu>
      ) : (
        /* Mobile Navigation */
        <Sheet open={open} onOpenChange={setOpen}>
          <SheetTrigger asChild>
            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 hover:bg-transparent focus-visible:bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
            >
              <Icons.menu aria-hidden="true" />
              <span className="sr-only">Toggle Menu</span>
            </Button>
          </SheetTrigger>
          <SheetContent side="left" className="pl-1 pr-0 pt-9">
            <SheetHeader className="px-1 sr-only">
              <SheetTitle>Menu</SheetTitle>
            </SheetHeader>
            <div className="w-full px-7 mb-4">
              <Link
                href="/"
                className="flex items-center"
                onClick={() => {
                  setOpen(false);
                }}
              >
                <Icons.logo className="mr-2 h-6 w-6" aria-hidden="true" />
                <span className="font-bold text-lg">{siteConfig.name}</span>
                <span className="sr-only">Home</span>
              </Link>
            </div>
            <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
              <div className="pl-1 pr-7">
                <Accordion type="multiple" className="w-full">
                  {items?.map((item, index) => (
                    <AccordionItem value={item.title} key={index}>
                      <AccordionTrigger className="text-sm capitalize">
                        {item.title}
                      </AccordionTrigger>
                      <AccordionContent>
                        <div className="flex flex-col space-y-2">
                          {item.items?.map((subItem, i) =>
                            subItem.href ? (
                              <MobileLink
                                key={i}
                                href={String(subItem.href)}
                                segment={String(segment)}
                                setOpen={setOpen}
                                disabled={subItem.disabled}
                                className="m-1"
                              >
                                {subItem.title}
                              </MobileLink>
                            ) : (
                              <div
                                key={i}
                                className="text-foreground/70 transition-colors"
                              >
                                {subItem.title}
                              </div>
                            ),
                          )}
                        </div>
                      </AccordionContent>
                    </AccordionItem>
                  ))}
                </Accordion>
              </div>
            </ScrollArea>
          </SheetContent>
        </Sheet>
      )}
    </nav>
  );
}
