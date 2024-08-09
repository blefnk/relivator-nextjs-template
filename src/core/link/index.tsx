import type { AnchorHTMLAttributes, FC } from "react";

import Link from "next/link";

import type { VariantProps } from "class-variance-authority";

import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/utils";

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
// eslint-disable-next-line @stylistic/max-len
// TODO: If it possible, implement a feature to parse the user's current// TODO: URL. Then, we can redirect them to this URL after they log in.
