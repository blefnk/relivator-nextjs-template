"use client";

import Link from "next/link";

// import { UserAvatar } from "~/layout/user-avatar";
// import { signOut } from "next-auth/react";

import { cn } from "~/utils/server/fmt";

import { Button, buttonVariants } from "~/islands/primitives/button2";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger
} from "~/islands/primitives/dropdown-menu";
import { Icons } from "~/islands/primitives/icons";

interface UserAccountNavProps extends React.HTMLAttributes<HTMLDivElement> {
  userName?: string;
  userEmail?: string;
  userImage?: string;
  isLoggedIn?: boolean;
}

export function UserAccountNav({
  isLoggedIn,
  userName,
  userEmail,
  userImage
}: UserAccountNavProps) {
  const getSpaceName = userName || null;
  const getSpaceEmail = userEmail || null;
  const getSpaceImage = userImage || `😸`;

  return (
    <>
      {!isLoggedIn && (
        <div className="flex">
          <Link
            href="/sign-in"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "dark:bg-slate-700 dark:text-white mr-2"
            )}
          >
            <Icons.user className="h-4 w-4 md:mr-1" />
            <span className="hidden md:block">{"Log in"}</span>
          </Link>
          <Link
            href="/sign-up"
            className={cn(
              buttonVariants({ variant: "secondary", size: "sm" }),
              "dark:bg-slate-700 dark:text-white"
            )}
          >
            <Icons.user className="h-4 w-4 md:mr-1" />
            <span className="hidden md:block">{"Sign up"}</span>
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <>
          <DropdownMenu>
            <DropdownMenuTrigger>
              {/* <UserAvatar
                user={{ name: getSpaceName, image: getSpaceImage }}
                className="h-6 w-6"
              /> */}
              <div className="w-6 h-6 rounded-full bg-slate-500">NK</div>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <div className="flex items-center justify-start gap-2 p-2">
                <div className="flex flex-col space-y-1 leading-none">
                  {getSpaceName && (
                    <p className="font-medium">{getSpaceName}</p>
                  )}
                  {getSpaceEmail && (
                    <p className="w-[200px] truncate text-sm text-muted-foreground">
                      {getSpaceEmail}
                    </p>
                  )}
                </div>
                <DropdownMenuItem
                  className="cursor-pointer text-slate-700 shadow-sm"
                  /* onSelect={(event) => {
                    event.preventDefault();
                    signOut({
                      callbackUrl: `${window.location.origin}`
                    });
                  }} */
                >
                  {"🔐 Log out ->"}
                </DropdownMenuItem>
              </div>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/space/projects">Bleverse Projects</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="https://mfpiano.org/studio/store">
                  MF Studio Sheets
                </Link>
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem asChild>
                <Link href="/space/settings">Space Settings</Link>
              </DropdownMenuItem>
              <DropdownMenuItem asChild>
                <Link href="/space/billing">Space Billing</Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </>
      )}
    </>
  );
}

// import { useTranslations } from "next-intl";
// import { User } from "next-auth";
// const t = useTranslations();
// return (
//  <DropdownMenu>
//    {!isLoggedIn && (
//      <>
//        <DropdownMenuTrigger>
//          <Icons.user className="h-4 w-4" />
//        </DropdownMenuTrigger>
//        <DropdownMenuContent align="end">
//          <div className="flex items-center justify-start gap-2 p-2">
//            <DropdownMenuItem
//              className="cursor-pointer"
//              onSelect={(event) => {
//                event.preventDefault();
//                signOut({
//                  callbackUrl: `${window.location.origin}/sign-in`
//                });
//              }}
//            >
//              {/* {"🔐 Log in ->"} */}
//              {/* <Link
//                className={cn(
//                  buttonVariants({ variant: "secondary", size: "sm" }),
//                  "ml-2 px-4"
//                )}
//                href="/sign-in"
//              >
//                <> */}
//                  {"🔐 Log in ->"}
//                  {/* {t("Navigation.Auth.SignUp")} */}
//                  {/* <span className="p-2 text-neutral-500"> | </span> */}
//                  {/* {t("Navigation.Auth.Profile")} */}
//                {/* </>
//              </Link> */}
//            </DropdownMenuItem>
//          </div>
//        </DropdownMenuContent>
//    </>
// )}
