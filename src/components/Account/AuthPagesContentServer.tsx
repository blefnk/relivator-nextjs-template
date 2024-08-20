import type { HTMLAttributes } from "react";
import { Balancer } from "react-wrap-balancer";

import Link from "next/link";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { cn } from "@/utils/reliverse/cn";
import { cnBase } from "tailwind-variants";

import { siteConfig } from "~/app";
import { authProvider } from "~/auth/provider";
import { SignIn } from "~/components/Account/AuthjsButtons";
import { OAuthSignInClerk } from "~/components/Content/ClerkPageOauth";
import { Shell } from "~/components/Wrappers/ShellVariants";

type AuthIntlProps = {
  tAnd: string;
  tAuthLegal: string;
  tCallback: string;
  tDefault: string;
  tEmailCreateAccount: string;
  tHaveAccount: string;
  tNoAccount: string;
  tOAuthAccountNotLinked: string;
  tOAuthCallback: string;
  tOAuthCreateAccount: string;
  tOAuthSignin: string;
  tPleaseWait: string;
  tPrivacy: string;
  tSignin: string;
  tSignInHere: string;
  tSignInLink: string;
  tSignUpHere: string;
  tSignUpLink: string;
  tTerms: string;
  tUnknownError: string;
};

type AuthPagesContentServerProps = {
  isRegPage: boolean;
} & AuthIntlProps &
  HTMLAttributes<HTMLDivElement>;

// @deprecated
// export function AuthPagesContentServer({
//   className,
//   isRegPage,
//   tAnd,
//   tAuthLegal,
//   tCallback,
//   tDefault,
//   tEmailCreateAccount,
//   tHaveAccount,
//   tNoAccount,
//   tOAuthAccountNotLinked,
//   tOAuthCallback,
//   tOAuthCreateAccount,
//   tOAuthSignin,
//   tPleaseWait,
//   tPrivacy,
//   tSignInHere,
//   tSignInLink,
//   tSignUpHere,
//   tSignUpLink,
//   providers,
//   tSignin,
//   tTerms,
//   tUnknownError,
//   ...props
// }: AuthPagesContentServerProps) {
export function AuthPagesContentServer({
  className,
  isRegPage,
  tAnd,
  tAuthLegal,
  tHaveAccount,
  tNoAccount,
  tPrivacy,
  tSignInHere,
  tSignInLink,
  tSignUpHere,
  tSignUpLink,
  tTerms,
  ...props
}: AuthPagesContentServerProps) {
  return (
    <Shell
      className={cn(
        `
          container -mt-14 flex min-h-screen flex-col items-center
          justify-center self-center

          lg:grid-cols-2 lg:px-0
        `,
        className,
      )}
      {...props}
    >
      <Card>
        <CardHeader
          className={`
          flex flex-row items-baseline justify-between
          border-b px-4
        `}
        >
          <Link
            className={`
              z-20 flex items-center bg-transparent text-lg font-medium
              text-zinc-800 transition-colors

              dark:text-zinc-200

              hover:bg-accent hover:underline

              lg:hover:bg-primary-foreground/10
            `}
            href="/"
          >
            {siteConfig.name}
          </Link>
          <CardDescription
            className={cnBase(
              "mb-2 font-bold flex flex-col text-base space-y-2 text-center",

              // typography.p,
            )}
          >
            {isRegPage ? String(tSignUpLink) : String(tSignInLink)}
          </CardDescription>
        </CardHeader>
        <CardContent
          className={`
            container top-1/2 col-span-1 flex items-center

            lg:col-span-1 lg:p-8

            md:top-0 md:col-span-2 md:flex md:translate-y-0
          `}
        >
          <div className="mx-auto flex flex-col justify-center space-y-6">
            <div className="mx-auto mb-4 flex flex-col content-center gap-8">
              {authProvider === "clerk" && (
                <div className="mt-12">
                  <OAuthSignInClerk />
                </div>
              )}
              <div>
                <div className="space-y-8">
                  <Balancer
                    as="p"
                    className={`
                      ${authProvider === "clerk" ? "text-sm" : "text-lg"}

                      mx-auto mt-8 !block px-8 text-center leading-normal
                      text-muted-foreground

                      lg:mt-0

                      sm:leading-7
                    `}
                  >
                    {isRegPage && (
                      <>
                        <span>{tHaveAccount}</span>
                        <Link
                          className={`
                            px-0 text-muted-foreground underline
                            underline-offset-4

                            hover:text-primary
                          `}
                          href="/auth/sign-in"
                        >
                          {tSignInHere}
                        </Link>
                      </>
                    )}
                    {!isRegPage && (
                      <>
                        <span>{tNoAccount}</span>
                        <Link
                          className={`
                            px-0 text-muted-foreground underline
                            underline-offset-4

                            hover:text-primary
                          `}
                          href="/auth/sign-up"
                        >
                          {tSignUpHere}
                        </Link>
                      </>
                    )}
                  </Balancer>
                </div>
              </div>
              {authProvider === "authjs" && (
                <div className="flex flex-col items-center">
                  <SignIn mode={isRegPage ? "sign-up" : "sign-in"} />
                </div>
              )}
            </div>
          </div>
        </CardContent>
        <CardFooter
          className={`
            flex items-baseline justify-center space-x-1 border-t pl-8 text-sm
            text-muted-foreground
          `}
        >
          <h2 className="mt-8">
            {tAuthLegal}{" "}
            <span>
              <Link
                className={`
                  font-semibold text-muted-foreground underline-offset-4

                  hover:text-primary hover:underline
                `}
                href="/terms"
              >
                {tTerms}
              </Link>
            </span>
            <span className="mx-1">{tAnd}</span>
            <span>
              <Link
                className={`
                  font-semibold text-muted-foreground underline-offset-4

                  hover:text-primary hover:underline
                `}
                href="/privacy"
              >
                {tPrivacy}
              </Link>
              .
            </span>
          </h2>
        </CardFooter>
      </Card>
    </Shell>
  );
}
