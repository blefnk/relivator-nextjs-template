"use client";

import type { MainMenuItem, SidebarNavItem } from "~/types/with";

import type { Dispatch, ReactNode, SetStateAction } from "react";
import { useState } from "react";

import Link from "next/link";
import { usePathname } from "next/navigation";

import { Menu } from "lucide-react";
import { useTranslations } from "next-intl";

import { siteConfig } from "~/app";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "~/components/ui/accordion";
import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import { Sheet, SheetContent, SheetTrigger } from "~/components/ui/sheet";
import { cn } from "~/utils/cn";

type MobileMenuProps = {
  MainMenuItems?: MainMenuItem[];
  sidebarNavItems: SidebarNavItem[];
};

export function MobileMenu({
  MainMenuItems,
  sidebarNavItems,
}: MobileMenuProps) {
  const t = useTranslations();

  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(false);

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetTrigger asChild>
        <Button
          className={`
            mr-2 px-0 text-base

            focus-visible:bg-transparent focus-visible:ring-0
            focus-visible:ring-offset-0

            hover:bg-transparent

            lg:hidden
          `}
          variant="ghost"
        >
          <Menu className="size-6" />
          <span className="sr-only">{t("MobileMenu.toggleMenu")}</span>
          <span
            className={`
              ml-2 hidden font-medium tracking-wide

              sm:flex
            `}
          >
            {siteConfig.name}
          </span>
        </Button>
      </SheetTrigger>
      <SheetContent className="pl-1 pr-0" side="left">
        <div className="px-7">
          <Link
            className="flex items-center"
            aria-label="Home"
            href="/"
            onClick={() => {
              setIsOpen(false);
            }}
          >
            <span className="font-medium">{siteConfig.name}</span>
          </Link>
        </div>
        <ScrollArea className="my-4 h-[calc(100vh-8rem)] pb-10 pl-6">
          <div className="pl-1 pr-7">
            <Accordion className="w-full" type="single" collapsible>
              {MainMenuItems?.map((item, index) => (
                <AccordionItem key={index} value={item.title}>
                  <AccordionTrigger className="text-sm capitalize">
                    {item.title}
                  </AccordionTrigger>
                  <AccordionContent>
                    <div className="flex flex-col space-y-2">
                      {item.items?.map((subItem, index) =>
                        subItem.href ? (
                          <MobileLink
                            key={index}
                            disabled={subItem.disabled}
                            href={String(subItem.href)}
                            pathname={pathname}
                            setIsOpen={setIsOpen}
                          >
                            {subItem.title}
                          </MobileLink>
                        ) : (
                          <div
                            key={index}
                            className="text-foreground/70 transition-colors"
                          >
                            {item.title}
                          </div>
                        ),
                      )}
                    </div>
                  </AccordionContent>
                </AccordionItem>
              ))}
              <AccordionItem value="sidebar">
                <AccordionTrigger className="text-sm">
                  Sidebar Menu
                </AccordionTrigger>
                <AccordionContent>
                  <div className="flex flex-col space-y-2">
                    {sidebarNavItems?.map((item, index) =>
                      item.href ? (
                        <MobileLink
                          key={index}
                          disabled={item.disabled}
                          href={String(item.href)}
                          pathname={pathname}
                          setIsOpen={setIsOpen}
                        >
                          {item.title}
                        </MobileLink>
                      ) : (
                        <div
                          key={index}
                          className="text-foreground/70 transition-colors"
                        >
                          {item.title}
                        </div>
                      ),
                    )}
                  </div>
                </AccordionContent>
              </AccordionItem>
            </Accordion>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}

type MobileLinkProps = {
  children?: ReactNode;
  disabled?: boolean;
  href: null | string;
  pathname: null | string;
  setIsOpen: Dispatch<SetStateAction<boolean>>;
};

function MobileLink({
  children,
  disabled,
  href,
  pathname,
  setIsOpen,
}: MobileLinkProps) {
  return (
    <Link
      className={cn(
        `
          text-foreground/70 transition-colors

          hover:text-foreground
        `,
        pathname === href && "text-foreground",
        disabled && "pointer-events-none opacity-60",
      )}
      href={String(href)}
      onClick={() => {
        setIsOpen(false);
      }}
    >
      {children}
    </Link>
  );
}
