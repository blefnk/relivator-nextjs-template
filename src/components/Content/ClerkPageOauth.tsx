"use client";

import { useState } from "react";

import type { OAuthStrategy } from "@clerk/types";

import { Button } from "@/components/ui/button";
import { useSignIn } from "@clerk/nextjs";
import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { DiscordLogoIcon } from "@radix-ui/react-icons";
import consola from "consola";

import { oauthProvidersClerk } from "~/app";
import {
  GithubSVG,
  GoogleSVG,
  SpinnerSVG,
} from "~/components/Common/Icons/SVG";

// @see https://github.com/clerk/javascript/blob/main/packages/clerk-js/src/ui/components/SignIn/SignInStart.tsx
export function OAuthSignInClerk() {
  const [isLoading, setIsLoading] = useState<null | OAuthStrategy>(null);
  const { isLoaded: signInLoaded, signIn } = useSignIn();

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) {
      return null;
    }

    try {
      setIsLoading(provider);
      await signIn.authenticateWithRedirect({
        redirectUrl: "/auth/sign-sso",
        redirectUrlComplete: "/auth",
        strategy: provider,
      });
    } catch (error) {
      setIsLoading(null);

      const unknownError = "Something went wrong, please try again.";

      isClerkAPIResponseError(error)
        ? consola.error(error)
        : consola.error(unknownError);
    }
  }

  const getColumnClass = (count: number) => {
    return !(count % 3) ? "sm:grid-cols-3" : "sm:grid-cols-2";
  };

  const iconMap = {
    github: GithubSVG,
    google: GoogleSVG,
    discord: DiscordLogoIcon,
  };

  return (
    <div className="flex justify-center">
      <div
        className={`
          grid grid-cols-1 gap-2

          ${getColumnClass(oauthProvidersClerk.length)}

          sm:gap-4
        `}
      >
        {oauthProvidersClerk.map((provider) => {
          const Icon =
            iconMap[provider.icon as keyof typeof iconMap] || SpinnerSVG; // Fallback to SpinnerSVG if icon not found

          return (
            <div className="flex justify-center" key={provider.strategy}>
              <Button
                aria-label={`Sign in with ${provider.name}`}
                className={`
                  w-full bg-background

                  sm:w-auto
                `}
                disabled={isLoading !== null}
                onClick={async () =>
                  void (await oauthSignIn(provider.strategy))
                }
                variant="outline"
              >
                {isLoading === provider.strategy ? (
                  <SpinnerSVG
                    aria-hidden="true"
                    className="mr-2 size-4 animate-spin"
                  />
                ) : (
                  <Icon aria-hidden="true" className="mr-2 size-4" />
                )}
                {provider.name}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
