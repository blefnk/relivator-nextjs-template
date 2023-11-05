"use client";

import React, {
  useEffect,
  useMemo,
  useState,
  type HTMLAttributes,
} from "react";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { zodResolver } from "@hookform/resolvers/zod";
import { appts, siteConfig } from "~/app";
import { env } from "~/env.mjs";
import { Link as IntlLink, useRouter } from "~/navigation";
import { cls, cn } from "~/utils";
import { Loader2 } from "lucide-react";
import {
  signIn,
  signOut,
  useSession,
  type ClientSafeProvider,
} from "next-auth/react";
import { useLocale, useTranslations } from "next-intl";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";
import { Balancer } from "react-wrap-balancer";
import { cnBase } from "tailwind-variants";
import type { z } from "zod";

import { typography } from "~/server/text";
import { userAuthSchema } from "~/data/validations/user";
import { Button, buttonVariants } from "~/islands/primitives/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
} from "~/islands/primitives/card";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell-variants";

import { OAuthSignInClerk } from "./clerk-page-oauth";
import ProviderButton from "./provider-button";

type AuthPagesContentProps = HTMLAttributes<HTMLDivElement> & {
  providers: Record<string, ClientSafeProvider> | null;
  isRegPage: boolean;
  user: any;
};

// todo: move what possible to separate server-
// todo: component and include this one there.

export default function ClerkPageContent({
  className,
  user,
  isRegPage,
  providers,
  ...props
}: AuthPagesContentProps) {
  const locale = useLocale();
  const [error, setError] = useState<string>();
  const router = useRouter();

  const t = useTranslations();
  const isAuthenticated = !!user;
  const { data: session } = useSession();
  const [isProviderLoading, setProviderLoading] = useState(false);

  const searchParams = useSearchParams();
  const form = useForm<z.infer<typeof userAuthSchema>>({
    resolver: zodResolver(userAuthSchema),
    defaultValues: {
      email: "",
    },
  });

  const oauthProviders = useMemo(
    () =>
      Object.values(providers ?? {}).filter(
        (provider) => provider.type === "oauth",
      ),
    [providers],
  );

  /**
   * If this page loads with an error query
   * parameter, display the error message.
   */
  useEffect(() => {
    const showError = async () => {
      try {
        const error = searchParams?.get("error");
        if (error) {
          // If you have an asynchronous function to fetch error details
          // await fetchErrorDetails(error);

          // Displaying a generic error message
          toast.error("Something went wrong while searching.");

          // If you have a function to process or log the error
          // handleAuthError(error);
        }
      } catch (err) {
        // Handle or log any errors that occur within showError
        console.error(err);
        toast.error("An unexpected error occurred.");
      }
    };

    showError();
  }, [searchParams, toast]);

  const handleSignIn = (provider: string) => {
    signIn(provider);
  };

  const handleSignOut = async () => {
    if (session) await signOut({ callbackUrl: "/" });
  };

  const userDetails = [
    {
      key: "Sign-in Email",
      value: session?.user?.email,
    },
  ];

  if (appts.debug) {
    console.log("[appts.debug]: Does user visits a sign up page?", isRegPage);
  }

  return (
    <Shell
      className={cls(
        "flex flex-col max-w-xl justify-center container -mt-14 lg:max-w-none lg:grid-cols-2 lg:px-0 sm:max-w-lg self-center min-h-screen items-center",
        className,
      )}
      {...props}
    >
      <Card>
        <CardHeader className="flex flex-row justify-between border-b items-baseline px-4">
          <IntlLink
            className="z-20 flex items-center dark:text-zinc-200 text-zinc-800 font-heading bg-transparent text-lg font-medium transition-colors hover:bg-accent lg:hover:bg-primary-foreground/10 hover:underline"
            href="/"
          >
            {siteConfig.name}
          </IntlLink>

          <CardDescription
            className={cnBase(
              typography.p,
              "mb-2 font-bold flex flex-col text-base space-y-2 text-center",
            )}
          >
            {isAuthenticated
              ? "Manage Your Account"
              : isRegPage
              ? `${t("RegisterForm.title")}`
              : `${t("LoginForm.title")}`}
          </CardDescription>
        </CardHeader>

        <CardContent className="lg:p-8 container top-1/2 col-span-1 flex items-center md:top-0 md:col-span-2 md:flex md:translate-y-0 lg:col-span-1">
          <div className="mx-auto flex flex-col justify-center space-y-6">
            <div className="flex gap-8 flex-col mx-auto mb-4 content-center">
              <div className="mt-12">
                {env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk" && (
                  <OAuthSignInClerk />
                )}
              </div>

              {!isAuthenticated && (
                <>
                  <div>
                    <div className="space-y-8">
                      <Balancer
                        as="p"
                        className="mx-auto px-8 text-center mt-8 lg:mt-0 text-sm !block leading-normal text-muted-foreground sm:text-lg sm:leading-7"
                      >
                        {isRegPage && (
                          <>
                            {t("RegisterForm.have-account")}{" "}
                            <Link
                              href={
                                env.NEXT_PUBLIC_AUTH_PROVIDER === "clerk"
                                  ? "/sign-in"
                                  : "/api/auth/signin"
                              }
                              className="px-0 text-muted-foreground underline underline-offset-4 hover:text-primary"
                            >
                              {t("RegisterForm.signin")}
                            </Link>
                          </>
                        )}
                        {!isRegPage && (
                          <>
                            {/* {t("LoginForm.description")}{" "} */}
                            {t("LoginForm.no-account")}{" "}
                            <IntlLink
                              href="/sign-up"
                              className="px-0 text-muted-foreground underline underline-offset-4 hover:text-primary"
                            >
                              {t("LoginForm.signup")}
                            </IntlLink>
                          </>
                        )}
                      </Balancer>
                    </div>
                  </div>
                </>
              )}

              <div className="flex space-y-2 flex-1 gap-4 flex-col items-center">
                {env.NEXT_PUBLIC_AUTH_PROVIDER === "authjs" && (
                  <>
                    {oauthProviders &&
                      oauthProviders.map((provider) => (
                        <ProviderButton
                          loading={isProviderLoading}
                          provider={provider}
                          key={provider.name}
                          isRegPage={isRegPage}
                          onClick={() => {
                            if (!isProviderLoading) {
                              setProviderLoading(true);
                              handleSignIn(provider.id);
                            } else return null;
                          }}
                        />
                      ))}
                  </>
                )}
              </div>

              {isAuthenticated && (
                <div className="self-center">
                  <Separator className="mt-2 mb-8" />
                  <div className="flex flex-col gap-2 mb-4">
                    {userDetails.map((detail) => (
                      <div key={detail.key} className="grid grid-cols-2">
                        <span className="font-semibold">{detail.key}</span>
                        <span>{detail.value}</span>
                      </div>
                    ))}
                  </div>
                  <Separator className="my-8" />
                  <IntlLink
                    href="/dashboard/stores"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "mr-2 px-3",
                    )}
                  >
                    🪪 Dashboard
                  </IntlLink>
                  <IntlLink
                    href="/"
                    className={cn(
                      buttonVariants({ variant: "default" }),
                      "mr-2 px-3",
                    )}
                  >
                    🏠 Home Page
                  </IntlLink>
                  <Button
                    variant="outline"
                    disabled={isProviderLoading}
                    className="p-4 rounded-md shadow-md font-medium"
                    onClick={handleSignOut}
                  >
                    {isProviderLoading ? (
                      <>
                        <Loader2 className="mr-2 h-4 w-4 animate-spin" />{" "}
                        {t("LoginForm.wait")}
                      </>
                    ) : (
                      <>🔐 {t("auth-pages-content.sign-out")}</>
                    )}
                  </Button>
                </div>
              )}
            </div>
          </div>
        </CardContent>

        <CardFooter className="pl-8 text-sm justify-center items-baseline flex space-x-1 text-muted-foreground border-t">
          <h2 className="mt-8">
            By using the buttons above, you agree with{" "}
            <span>
              <IntlLink
                href="/terms"
                className="text-muted-foreground font-semibold hover:underline underline-offset-4 hover:text-primary"
              >
                Terms of Service
              </IntlLink>
            </span>
            <span className="mx-1">and</span>
            <span>
              <IntlLink
                href="/privacy"
                className="text-muted-foreground font-semibold hover:underline underline-offset-4 hover:text-primary"
              >
                Privacy Policy
              </IntlLink>
              .
            </span>
          </h2>
        </CardFooter>
      </Card>
    </Shell>
  );
}
