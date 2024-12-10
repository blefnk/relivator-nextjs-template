import type { User } from "@clerk/nextjs/server";

import { DashboardIcon, ExitIcon, GearIcon } from "@radix-ui/react-icons";
import { eq } from "drizzle-orm";
import Link from "next/link";
import * as React from "react";

import { Icons } from "~/components/icons";
import { Avatar, AvatarFallback, AvatarImage } from "~/components/ui/avatar";
import { Button, type ButtonProps } from "~/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "~/components/ui/dropdown-menu";
import { Skeleton } from "~/components/ui/skeleton";
import { db } from "~/server/db";
import { usersTable } from "~/server/db/schema";
import { getStoreByUserId } from "~/server/queries/store";
import { cn, getUserEmail } from "~/server/utils";

type AuthDropdownProps = {
  user: User | null;
} & React.ComponentPropsWithRef<typeof DropdownMenuTrigger> &
  ButtonProps;

export async function AuthDropdown({ user, ...props }: AuthDropdownProps) {
  if (!user) {
    return (
      <>
        <div className="flex items-center gap-2 sm:hidden">
          <Button size="sm" variant="default" {...props} asChild>
            <Link href="/signin">
              Sign In<span className="sr-only">Sign In</span>
            </Link>
          </Button>
        </div>

        <div className="hidden items-center gap-2 sm:flex">
          <Button size="sm" variant="outline" {...props} asChild>
            <Link href="/signin">
              Sign In<span className="sr-only">Sign In</span>
            </Link>
          </Button>
          <Button size="sm" variant="default" {...props} asChild>
            <Link href="/signup">Sign Up</Link>
          </Button>
        </div>
      </>
    );
  }

  const initials = `${user.firstName?.charAt(0) ?? ""} ${
    user.lastName?.charAt(0) ?? ""
  }`;
  const email = getUserEmail(user);

  const storePromise = getStoreByUserId({ userId: user.id });

  // Fetch `userRecord` from the database to access `currentStoreId`
  const userRecord = await db
    .select()
    .from(usersTable)
    .where(eq(usersTable.id, user.id))
    .limit(1)
    .then((records) => records[0]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="outline" className="size-8 rounded-full" {...props}>
          <Avatar className="size-8">
            <AvatarImage src={user.imageUrl} alt={user.username ?? ""} />
            <AvatarFallback>{initials}</AvatarFallback>
          </Avatar>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent className="w-56" align="end" forceMount>
        <DropdownMenuLabel className="font-normal">
          <div className="flex flex-col space-y-1">
            <p className="text-sm font-medium leading-none">
              {user.firstName} {user.lastName}
            </p>
            <p className="text-xs leading-none text-muted-foreground">
              {email}
            </p>
          </div>
        </DropdownMenuLabel>
        <DropdownMenuSeparator />
        <React.Suspense
          fallback={
            <div className="flex flex-col space-y-1.5 p-1">
              {Array.from({ length: 3 }).map((_, i) => (
                <Skeleton key={i} className="h-6 w-full rounded-sm" />
              ))}
            </div>
          }
        >
          <AuthDropdownGroup
            storePromise={storePromise}
            currentStoreId={userRecord?.currentStoreId}
          />
        </React.Suspense>
        <DropdownMenuSeparator />
        <DropdownMenuItem asChild>
          <Link href="/signout">
            <ExitIcon className="mr-2 size-4" aria-hidden="true" />
            Log out
            <DropdownMenuShortcut>⇧⌘Q</DropdownMenuShortcut>
          </Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}

type AuthDropdownGroupProps = {
  storePromise: ReturnType<typeof getStoreByUserId>;
  currentStoreId?: string;
};

async function AuthDropdownGroup({
  storePromise,
  currentStoreId,
}: AuthDropdownGroupProps) {
  const store = await storePromise;
  const storeLink =
    currentStoreId || store?.id
      ? `/dashboard/stores/${currentStoreId || store?.id}`
      : "/onboarding";

  return (
    <DropdownMenuGroup>
      <DropdownMenuItem asChild>
        <Link href={storeLink}>
          <DashboardIcon className="mr-2 size-4" aria-hidden="true" />
          Dashboard
          <DropdownMenuShortcut>⌘D</DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard/billing">
          <Icons.credit className="mr-2 size-4" aria-hidden="true" />
          Billing
          <DropdownMenuShortcut>⌘B</DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
      <DropdownMenuItem asChild>
        <Link href="/dashboard/settings">
          <GearIcon className="mr-2 size-4" aria-hidden="true" />
          Settings
          <DropdownMenuShortcut>⌘S</DropdownMenuShortcut>
        </Link>
      </DropdownMenuItem>
    </DropdownMenuGroup>
  );
}
