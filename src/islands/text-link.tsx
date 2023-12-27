import React from "react";
import Link, { type LinkProps } from "next/link";
import { ExternalLinkIcon } from "lucide-react";
import Balancer from "react-wrap-balancer";

type TextLinkProps = LinkProps & {
  isExternal?: boolean;
  noOfLines?: number;
  children?: React.ReactNode;
};

export const TextLink = ({
  children,
  href,
  shallow,
  replace,
  scroll,
  prefetch,
  isExternal,
  noOfLines,
  ...textProps
}: TextLinkProps) => (
  <Link
    href={href}
    shallow={shallow}
    replace={replace}
    scroll={scroll}
    prefetch={prefetch}
    target={isExternal ? "_blank" : undefined}
  >
    <span className="inline-block underline" {...textProps}>
      {isExternal ?
        <Balancer as="span">
          <span className="max-w-[100%] leading-relaxed">{children}</span>
          <ExternalLinkIcon />
        </Balancer>
      : children}
    </span>
  </Link>
);
