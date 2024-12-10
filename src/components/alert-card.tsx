import { RocketIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

import { Icons } from "~/components/icons";
import { Alert, AlertDescription, AlertTitle } from "~/components/ui/alert";
import { siteConfig } from "~/config/site";
import { cn } from "~/server/utils";

type AlertCardProps = {
  title?: string;
  description?: string;
  icon?: keyof typeof Icons;
} & React.ComponentPropsWithoutRef<typeof Alert>;

export function AlertCard({
  title,
  description,
  icon,
  children,
  className,
  ...props
}: AlertCardProps) {
  const Icon = icon ? Icons[icon] : RocketIcon;

  return (
    <Alert
      className={cn(
        "flex flex-col items-center justify-center space-y-8 p-16",
        className,
      )}
      {...props}
    >
      <div className="flex aspect-square size-fit items-center justify-center rounded-full border border-dashed p-4">
        <Icon className="size-5" />
      </div>
      {children ?? (
        <div className="flex flex-col items-center space-y-2 text-center">
          <AlertTitle className="text-lg">
            {title ??
              "Rewriting with the latest Next.js 15 and React 19 features"}
          </AlertTitle>
          {description ? (
            <AlertDescription className="text-muted-foreground">
              {description}
            </AlertDescription>
          ) : (
            <div className="flex items-center space-x-1 text-sm text-muted-foreground">
              <AlertDescription>Follow along on</AlertDescription>
              <Link
                href={siteConfig.links.discord}
                className="transition-colors hover:text-foreground"
              >
                Discord
              </Link>
            </div>
          )}
        </div>
      )}
    </Alert>
  );
}
