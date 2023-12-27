"use client";

import type { ComponentPropsWithoutRef, FC } from "react";

import { TextLink } from "./text-link";

export const HomeLink: FC<
  Omit<ComponentPropsWithoutRef<typeof TextLink>, "href">
> = ({ className, children, ...props }) => {
  return (
    <TextLink href="/" {...props}>
      {children}
    </TextLink>
  );
};
