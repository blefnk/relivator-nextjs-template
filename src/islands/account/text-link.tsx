"use client";

import { forwardRef, type ComponentPropsWithoutRef } from "react";
import { Link } from "~/navigation";
import clsx from "clsx";

export const TextLink = forwardRef<
  HTMLAnchorElement,
  ComponentPropsWithoutRef<typeof Link>
>(function TextLink({ className, children, ...props }, ref) {
  return (
    <Link
      ref={ref}
      className={clsx("text-blue-600 hover:underline", className)}
      {...props}
    >
      {children}
    </Link>
  );
});
