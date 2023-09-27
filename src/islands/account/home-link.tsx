"use client";

import { FC, type ComponentPropsWithoutRef } from "react";

// import { useTranslations } from "next-intl";

import { TextLink } from "./text-link";

export const HomeLink: FC<
  Omit<ComponentPropsWithoutRef<typeof TextLink>, "href">
> = ({ className, children, ...props }) => {
  // const t = useTranslations("common.home");

  return (
    <TextLink href="/" {...props}>
      {children}
      {/* {children ?? t("linkText")} */}
    </TextLink>
  );
};
