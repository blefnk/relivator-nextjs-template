"use client";

import { signOut, useSession } from "next-auth/react";
import { useTranslations } from "next-intl";
import Link from "next-intl/link";

import { cn } from "~/server/utils";
import { Avatar, AvatarFallback, AvatarImage } from "~/islands/account/avatar";
import { Icons } from "~/islands/icons";
import { Button, buttonVariants } from "~/islands/primitives/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "~/islands/primitives/dropdown";

/**
 * You can get it in sync with src/server/config/dashboard.ts
 */
export default function UserMenu() {
  const { data: session } = useSession();
  const t = useTranslations("Navbar");

  const name = `${session?.user?.name ?? ""}`;
  const image = `${session?.user?.image ?? ""}`;
  const email = `${session?.user?.email ?? ""}`;
  const initial = `${session?.user?.name?.charAt(0) ?? ""}`;

  if (session) {
    return (
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="secondary" className="relative h-8 w-8 rounded-full">
            <Avatar className="h-8 w-8">
              <AvatarImage src={image} alt={name} />
              <AvatarFallback>{initial}</AvatarFallback>
            </Avatar>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">{name}</p>
              <p className="text-xs leading-none text-muted-foreground">
                {email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/account">
                <Icons.user className="mr-2 h-4 w-4" aria-hidden="true" />
                Account
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/stores">
                <Icons.store className="mr-2 h-4 w-4" aria-hidden="true" />
                Stores
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/billing">
                <Icons.billing className="mr-2 h-4 w-4" aria-hidden="true" />
                Billing
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/settings">
                <Icons.settings className="mr-2 h-4 w-4" aria-hidden="true" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link href="/dashboard/purchases">
                <Icons.dollarSign className="mr-2 h-4 w-4" aria-hidden="true" />
                Purchases
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem asChild>
            <button
              className={cn(
                buttonVariants({ variant: "outline" }),
                "mr-2 px-3 w-full start",
              )}
              onClick={() => signOut()}
            >
              <Icons.logout className="mr-2 h-4 w-4" aria-hidden="true" />
              {t("sign-out")}
            </button>
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }
  return (
    <>
      <Link
        href="/sign-in"
        className={cn(buttonVariants({ variant: "default" }), "px-3")}
      >
        {t("signin")}
      </Link>
    </>
  );
}

/**
 * todo: We need to implement non-breaking space for log in/out buttons
 * todo: because on some screens and locales the button has line-break.
 * todo: Maybe something like <span>&#160;</span> but inside i18n json.
 * @see https://next-intl-docs.vercel.app/docs/usage/messages#rich-text
 */
