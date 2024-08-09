import type { ReactNode } from "react";

import NextLink from "next/link";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

type LinkProps = {
  variant?:
    | "default"
    | "destructive"
    | "ghost"
    | "link"
    | "outline"
    | "secondary";
  children: ReactNode;
  className?: string;
  href: string;
  rel?: string;
  sameTab?: boolean;
  size?: "default" | "icon" | "lg" | "sm";
  target?: "_blank" | "_parent" | "_self" | "_top";
};

export function Link({
  href,
  className = "",
  children,
  target = "_self",
  variant = "secondary",
  size = "default",
  sameTab = false,
}: LinkProps) {
  // Determine if the link is external
  const isExternal = /^https?:\/\//.test(href);

  // Set target and rel based on whether the link is external and sameTab is false
  const linkTarget = isExternal && !sameTab ? "_blank" : target;
  // eslint-disable-next-line unicorn/prevent-abbreviations
  const linkRel = isExternal && !sameTab ? "noopener noreferrer" : undefined;

  return (
    <NextLink
      className={cn(
        buttonVariants({
          size,
          variant,
        }),
        className,
        variant === "link" &&
          `
            inline-block underline-offset-4

            after:block after:h-px after:w-0 after:bg-current
            after:transition-all after:content-['']

            hover:after:w-full
          `,
      )}
      href={href}
      target={linkTarget}
      rel={linkRel}
    >
      {children}
    </NextLink>
  );
}
