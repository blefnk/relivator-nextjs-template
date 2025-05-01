"use client";

import Link from "next/link";
import React from "react";

import type { User } from "~/db/schema/users/types";

import { signOut, useSession } from "~/lib/auth-client";
import { Button } from "~/ui/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "~/ui/primitives/card";
import { Skeleton } from "~/ui/primitives/skeleton";

interface DashboardPageClientProps {
  user?: null | User;
}

// Extend the User type with optional properties
type ExtendedUser = User & {
  age?: number;
  firstName?: string;
  lastName?: string;
};

export function DashboardPageClient({ user }: DashboardPageClientProps) {
  const { data, isPending } = useSession();

  // Use the passed user or the session user
  const currentUser = user ?? data?.user;

  const currentUserState = currentUser as ExtendedUser;

  const handleSignOut = () => {
    void signOut();
  };

  // If we're still loading, show a skeleton
  if (isPending) {
    return (
      <div
        className={`
          container grid flex-1 items-start gap-4 p-4
          md:grid-cols-2 md:gap-8
          lg:grid-cols-3
        `}
      >
        <div
          className={`
            grid gap-4
            md:col-span-2
            lg:col-span-1
          `}
        >
          <Card>
            <CardHeader className="space-y-2">
              <Skeleton className="h-6 w-1/3" />
              <Skeleton className="h-4 w-1/2" />
            </CardHeader>
            <CardContent>
              <Skeleton className="h-20 w-full" />
            </CardContent>
            <CardFooter>
              <Skeleton className="h-10 w-28" />
            </CardFooter>
          </Card>
        </div>
      </div>
    );
  }

  return (
    <div
      className={`
        container grid flex-1 items-start gap-4 p-4
        md:grid-cols-2 md:gap-8
        lg:grid-cols-3
      `}
    >
      <div
        className={`
          grid gap-4
          md:col-span-2
          lg:col-span-1
        `}
      >
        <Card>
          <CardHeader>
            <CardTitle>Welcome to your Dashboard</CardTitle>
            <CardDescription>
              Manage your account and view your information
            </CardDescription>
          </CardHeader>
          <CardContent>
            {currentUserState && (
              <div className="space-y-2">
                <div className="space-y-1">
                  <p className="text-sm leading-none font-medium">Name</p>
                  <p className="text-sm text-muted-foreground">
                    {currentUserState.name ?? "Not set"}
                  </p>
                </div>
                <div className="space-y-1">
                  <p className="text-sm leading-none font-medium">Email</p>
                  <p className="text-sm text-muted-foreground">
                    {currentUserState.email ?? "Not set"}
                  </p>
                </div>
                {currentUserState?.firstName && (
                  <div className="space-y-1">
                    <p className="text-sm leading-none font-medium">
                      First Name
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentUserState.firstName}
                    </p>
                  </div>
                )}
                {currentUserState?.lastName && (
                  <div className="space-y-1">
                    <p className="text-sm leading-none font-medium">
                      Last Name
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {currentUserState.lastName}
                    </p>
                  </div>
                )}
                {currentUserState?.age ? (
                  <div className="space-y-1">
                    <p className="text-sm leading-none font-medium">Age</p>
                    <p className="text-sm text-muted-foreground">
                      {currentUserState.age}
                    </p>
                  </div>
                ) : null}
                <div className="space-y-1">
                  <p className="text-sm leading-none font-medium">
                    Two-Factor Authentication
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {currentUserState.twoFactorEnabled ? "Enabled" : "Disabled"}
                  </p>
                </div>
              </div>
            )}
          </CardContent>
          <CardFooter className="flex justify-between">
            <Link
              className={`
                inline-flex items-center justify-center rounded-md bg-primary
                px-4 py-2 text-sm font-medium text-primary-foreground
                ring-offset-background transition-colors
                hover:bg-primary/90
                focus-visible:ring-2 focus-visible:ring-ring
                focus-visible:ring-offset-2 focus-visible:outline-none
                disabled:pointer-events-none disabled:opacity-50
              `}
              href="/dashboard/profile"
            >
              Edit Profile
            </Link>
            <Button onClick={handleSignOut} variant="destructive">
              Sign Out
            </Button>
          </CardFooter>
        </Card>
      </div>
      <div
        className={`
          grid gap-4
          md:col-span-2
          lg:col-span-2
        `}
      >
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
            <CardDescription>
              Common actions you might want to perform
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-6">
            <div className="grid grid-cols-2 gap-4">
              <Link
                className={`
                  inline-flex items-center justify-center rounded-md bg-primary
                  px-4 py-2 text-sm font-medium text-primary-foreground
                  ring-offset-background transition-colors
                  hover:bg-primary/90
                  focus-visible:ring-2 focus-visible:ring-ring
                  focus-visible:ring-offset-2 focus-visible:outline-none
                  disabled:pointer-events-none disabled:opacity-50
                `}
                href="/dashboard/profile"
              >
                Edit Profile
              </Link>
              <Button onClick={handleSignOut} variant="outline">
                Sign Out
              </Button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
