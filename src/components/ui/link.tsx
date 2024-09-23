import type { ReactNode } from "react";

import NextLink from "next/link";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/cn";

// TODO: implement
// import { Link as NextLink } from "~/navigation";

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
  children,
  className = "",
  href,
  sameTab = false,
  size = "default",
  target = "_self",
  variant = "secondary",
}: LinkProps) {
  // Determine if the link is external
  const isExternal = /^https?:\/\//.test(href);

  // Set target and rel based on whether the link is external and sameTab is false
  const linkTarget = isExternal && !sameTab ? "_blank" : target;

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
      rel={linkRel}
      target={linkTarget}
    >
      {children}
    </NextLink>
  );
}

// =======================================================================

/* import type { AnchorHTMLAttributes, FC } from "react";

import Link from "next/link";

import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "~/components/ui/button";
import { cn } from "~/utils/reliverse/cn";

// Extending the types of the Link component to include variant
type ExtendedLinkProps = AnchorHTMLAttributes<HTMLAnchorElement> &
  VariantProps<typeof buttonVariants>;

const ExtendedLink: FC<ExtendedLinkProps> = ({
  className,
  href,
  size,
  variant,
  ...props
}) => {
  // Get the classes for the variant
  const variantClasses = buttonVariants({
    size,
    variant,
  });

  // Provide a default href if undefined
  const linkHref = href || "/";

  // Return the customized Link component
  // with the additional classes applied
  return (
    <Link
      {...props}
      className={cn(variantClasses, className)}
      href={linkHref}
    />
  );
};

export { ExtendedLink as Link };
*/
// TODO: If it possible, implement a feature to parse the user's current
// TODO: URL. Then, we can redirect them to this URL after they log in.
