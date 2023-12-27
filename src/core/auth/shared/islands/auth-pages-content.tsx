"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
} from "react";
import { cls } from "~/utils";
import { signIn, type ClientSafeProvider } from "next-auth/react";
import { useLocale } from "next-intl";
import { useQueryState } from "next-usequerystate";
import toast from "react-hot-toast";
import { Balancer } from "react-wrap-balancer";
import { cnBase } from "tailwind-variants";

import { appts, siteConfig } from "~/app";
import { env } from "~/env.mjs";
import { OAuthSignInClerk } from "~/islands/content/clerk-page-oauth";
import ProviderButton from "~/islands/content/provider-button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/islands/primitives/card";
import { Shell } from "~/islands/wrappers/shell-variants";
import { Link } from "~/navigation";
import { typography } from "~/server/text";

type AuthIntlProps = {
  tSignin: string;
  tOAuthSignin: string;
  tOAuthCallback: string;
  tOAuthCreateAccount: string;
  tEmailCreateAccount: string;
  tCallback: string;
  tOAuthAccountNotLinked: string;
  tDefault: string;
  tUnknownError: string;
  tPrivacy: string;
  tTerms: string;
  tAnd: string;
  tSignUpLink: string;
  tSignInLink: string;
  tAuthLegal: string;
  tSignUpHere: string;
  tNoAccount: string;
  tSignInHere: string;
  tHaveAccount: string;
  tPleaseWait: string;
};

type AuthPagesContentProps = AuthIntlProps &
  HTMLAttributes<HTMLDivElement> & {
    providers: Record<string, ClientSafeProvider> | null;
    isRegPage: boolean;
    user: any;
  };

export function AuthPagesContent({
  className,
  user,
  isRegPage,
  providers,
  tSignin,
  tOAuthSignin,
  tOAuthCallback,
  tOAuthCreateAccount,
  tEmailCreateAccount,
  tCallback,
  tOAuthAccountNotLinked,
  tDefault,
  tUnknownError,
  tPrivacy,
  tTerms,
  tAnd,
  tSignUpLink,
  tSignInLink,
  tAuthLegal,
  tSignUpHere,
  tNoAccount,
  tSignInHere,
  tHaveAccount,
  tPleaseWait,
  ...props
}: AuthPagesContentProps) {
  const [error] = useQueryState("error");

  const [isProviderLoading, setProviderLoading] = useState(false);

  const oauthProvidersAuthjs = useMemo(
    () =>
      Object.values(providers ?? {}).filter(
        (provider) => provider.type === "oauth",
      ),
    [providers],
  );

  const authProvider = env.NEXT_PUBLIC_AUTH_PROVIDER || "authjs";

  const errors: Record<string, string> = {
    Signin: tSignin,
    OAuthSignin: tOAuthSignin,
    OAuthCallback: tOAuthCallback,
    OAuthCreateAccount: tOAuthCreateAccount,
    EmailCreateAccount: tEmailCreateAccount,
    Callback: tCallback,
    OAuthAccountNotLinked: tOAuthAccountNotLinked,
    default: tDefault,
  };

  useEffect(() => {
    // todo: when error occurs, user looses chosen locale and has detected
    // If there's an error query parameter in the url, display the message
    if (error) toast.error(errors[error] ?? tUnknownError);
  }, [toast, error]);

  const locale = useLocale();
  const callbackUrl = `/${locale}/auth`;

  const handleSignIn = (provider: string) => {
    signIn(provider, { callbackUrl });
  };

  if (appts.debug) {
    console.log("[appts.debug]: Does user visits a sign up page?", isRegPage);
  }

  return (
    <Shell
      className={cls(
        "container -mt-14 flex min-h-screen max-w-xl flex-col items-center justify-center self-center sm:max-w-lg lg:max-w-none lg:grid-cols-2 lg:px-0",
        className,
      )}
      {...props}
    >
      <Card>
        <CardHeader className="flex flex-row items-baseline justify-between border-b px-4">
          <Link
            className="z-20 flex items-center bg-transparent font-heading text-lg font-medium text-zinc-800 transition-colors hover:bg-accent hover:underline lg:hover:bg-primary-foreground/10 dark:text-zinc-200"
            href="/"
          >
            {siteConfig.name}
          </Link>

          <CardDescription
            className={cnBase(
              typography.p,
              "mb-2 font-bold flex flex-col text-base space-y-2 text-center",
            )}
          >
            {isRegPage ? `${tSignUpLink}` : `${tSignInLink}`}
          </CardDescription>
        </CardHeader>

        <CardContent className="container top-1/2 col-span-1 flex items-center md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1 lg:p-8">
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
                    className={`${
                      authProvider === "clerk" ? "text-sm" : "text-lg"
                    } mx-auto mt-8 !block px-8 text-center leading-normal text-muted-foreground sm:leading-7 lg:mt-0`}
                  >
                    {isRegPage && (
                      <>
                        <span>{tHaveAccount} </span>
                        <Link
                          href="/sign-in"
                          className="px-0 text-muted-foreground underline underline-offset-4 hover:text-primary"
                        >
                          {tSignInHere}
                        </Link>
                      </>
                    )}
                    {!isRegPage && (
                      <>
                        <span>{tNoAccount} </span>
                        <Link
                          href="/sign-up"
                          className="px-0 text-muted-foreground underline underline-offset-4 hover:text-primary"
                        >
                          {tSignUpHere}
                        </Link>
                      </>
                    )}
                  </Balancer>
                </div>
              </div>

              <div className="flex flex-1 flex-col items-center gap-4 space-y-2">
                {authProvider === "authjs" &&
                  oauthProvidersAuthjs?.map((provider) => (
                    <ProviderButton
                      loading={isProviderLoading}
                      provider={provider}
                      key={provider.name}
                      onClick={() => {
                        if (!isProviderLoading) {
                          setProviderLoading(true);
                          handleSignIn(provider.id);
                        } else return null;
                      }}
                      // INTERNATIONALIZATION
                      tPleaseWait={tPleaseWait}
                    />
                  ))}
              </div>
            </div>
          </div>
        </CardContent>

        <CardFooter className="flex items-baseline justify-center space-x-1 border-t pl-8 text-sm text-muted-foreground">
          <h2 className="mt-8">
            {tAuthLegal}{" "}
            <span>
              <Link
                href="/terms"
                className="font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
              >
                {tTerms}
              </Link>
            </span>
            <span className="mx-1">{tAnd}</span>
            <span>
              <Link
                href="/privacy"
                className="font-semibold text-muted-foreground underline-offset-4 hover:text-primary hover:underline"
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
