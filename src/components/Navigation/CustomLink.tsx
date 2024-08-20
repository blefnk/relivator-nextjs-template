import type { LinkHTMLAttributes } from "react";

import Link from "next/link";

import { cn } from "@/utils/reliverse/cn";
import { ExternalLink } from "lucide-react";

type CustomLinkProps = {
  href: string;
} & LinkHTMLAttributes<HTMLAnchorElement>;

const CustomLink = ({
  children,
  className,
  href,
  ...rest
}: CustomLinkProps) => {
  const isInternalLink = href.startsWith("/");
  const isAnchorLink = href.startsWith("#");

  if (isInternalLink || isAnchorLink) {
    return (
      <Link className={className} href={href} {...rest}>
        {children}
      </Link>
    );
  }

  return (
    <Link
      className={cn(
        `
          inline-flex items-center gap-1 align-baseline underline
          underline-offset-4
        `,
        className,
      )}
      href={href}
      rel="noopener noreferrer"
      target="_blank"
      {...rest}
    >
      <span>{children}</span>
      <ExternalLink className="ml-0.5 inline-block size-4" />
    </Link>
  );
};

export default CustomLink;
