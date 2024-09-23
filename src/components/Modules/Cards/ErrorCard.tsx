import type { ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import { AlertTriangle, CheckCircle, Info, XCircle } from "lucide-react";

import { ClientButton } from "~/components/Common/client-button";
import { buttonVariants } from "~/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/components/ui/card";
import { cn } from "~/utils/cn";

type IconName = "error" | "info" | "success" | "warning";

type ErrorCardProps = {
  description: string;
  icon?: IconName;
  reset?: () => void;
  retryLink?: string;
  retryLinkText?: string;
  title: string;
} & ComponentPropsWithoutRef<typeof Card>;

export function ErrorCard({
  className,
  description,
  icon = "warning",
  reset,
  retryLink,
  retryLinkText = "Go back",
  title,
  ...props
}: ErrorCardProps) {
  const iconMap = {
    error: XCircle,
    info: Info,
    success: CheckCircle,
    warning: AlertTriangle,
  };

  const Icon = iconMap[icon];

  return (
    <Card
      className={cn("grid w-full place-items-center", className)}
      aria-atomic="true"
      aria-live="assertive"
      role="alert"
      {...props}
    >
      <CardHeader>
        <div className="grid size-20 place-items-center rounded-full bg-muted">
          <Icon className="size-10" aria-hidden="true" />
        </div>
      </CardHeader>
      <CardContent
        className={`
          flex min-h-[176px] flex-col items-center justify-center space-y-2.5
          text-center
        `}
      >
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardContent>
      {retryLink ? (
        <CardFooter>
          <Link
            className={cn(
              buttonVariants({
                variant: "ghost",
              }),
            )}
            href={retryLink}
          >
            {retryLinkText}
            <span className="sr-only">{retryLinkText}</span>
          </Link>
        </CardFooter>
      ) : null}
      {reset ? (
        <CardFooter>
          <ClientButton aria-label="Retry" variant="ghost" onClick={reset}>
            Retry
          </ClientButton>
        </CardFooter>
      ) : null}
    </Card>
  );
}
