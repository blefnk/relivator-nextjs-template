import type { ComponentPropsWithoutRef } from "react";

import Link from "next/link";

import { buttonVariants } from "@/browser/reliverse/ui/Button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/browser/reliverse/ui/CardUI";

import { ClientButton } from "~/components/Common/client-button";
import { Icons } from "~/components/Common/Icons";
import { cn } from "~/utils";

type ErrorCardProps = {
  description: string;
  icon?: keyof typeof Icons;
  reset?: () => void;
  retryLink?: string;
  retryLinkText?: string;
  title: string;
} & ComponentPropsWithoutRef<typeof Card>;

export function ErrorCard({
  className,
  description,
  icon,
  reset,
  retryLink,
  retryLinkText = "Go back",
  title,
  ...props
}: ErrorCardProps) {
  const Icon = Icons[icon || "warning"];

  return (
    <Card
      aria-atomic="true"
      aria-live="assertive"
      className={cn("grid w-full place-items-center", className)}
      role="alert"
      {...props}
    >
      <CardHeader>
        <div
          className={`
          grid size-20 place-items-center rounded-full
          bg-muted
        `}
        >
          <Icon aria-hidden="true" className="size-10" />
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
          <ClientButton aria-label="Retry" onClick={reset} variant="ghost">
            Retry
          </ClientButton>
        </CardFooter>
      ) : null}
    </Card>
  );
}
