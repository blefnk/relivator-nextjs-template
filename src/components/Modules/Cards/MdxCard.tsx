import type { HTMLAttributes } from "react";

import Link from "next/link";

import { cn } from "@/utils/reliverse/cn";
import { useTranslations } from "next-intl";

type CardProps = {
  disabled?: boolean;
  href?: string;
} & HTMLAttributes<HTMLDivElement>;

export function MdxCard({
  children,
  className,
  disabled,
  href,
  ...props
}: CardProps) {
  const t = useTranslations();

  return (
    <div
      className={cn(
        `
          group relative rounded-lg border p-6 shadow-md transition-shadow

          hover:shadow-lg
        `,
        disabled && "cursor-not-allowed opacity-60",
        className,
      )}
      {...props}
    >
      <div className="flex flex-col justify-between space-y-4">
        <div
          className={`
            space-y-2

            [&>h3]:!mt-0

            [&>h4]:!mt-0

            [&>p]:text-muted-foreground
          `}
        >
          {children}
        </div>
      </div>
      {href && (
        <Link className="absolute inset-0" href={disabled ? "#" : href}>
          <span className="sr-only">{t("MdxCard.view")}</span>
        </Link>
      )}
    </div>
  );
}
