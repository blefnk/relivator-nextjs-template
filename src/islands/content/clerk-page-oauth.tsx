"use client";

import * as React from "react";
import { isClerkAPIResponseError, useSignIn } from "@clerk/nextjs";
import { type OAuthStrategy } from "@clerk/types";
import { toast } from "react-hot-toast";

import { oauthProvidersClerk } from "~/app";
import { Icons } from "~/islands/icons";
import { Button } from "~/islands/primitives/button";

/**
 * @see https://github.com/clerk/javascript/blob/main/packages/clerk-js/src/ui/components/SignIn/SignInStart.tsx
 */

export function OAuthSignInClerk() {
  const [isLoading, setIsLoading] = React.useState<OAuthStrategy | null>(null);
  const { signIn, isLoaded: signInLoaded } = useSignIn();

  async function oauthSignIn(provider: OAuthStrategy) {
    if (!signInLoaded) return null;
    try {
      setIsLoading(provider);
      await signIn.authenticateWithRedirect({
        strategy: provider,
        redirectUrl: "/sign-sso",
        redirectUrlComplete: "/auth",
      });
    } catch (error) {
      setIsLoading(null);

      const unknownError = "Something went wrong, please try again.";

      isClerkAPIResponseError(error) ?
        toast.error(error.errors[0]?.longMessage ?? unknownError)
      : toast.error(unknownError);
    }
  }

  const getColumnClass = (count) => {
    // If the number of items is not a multiple of 3, use 2 columns instead.
    return count % 3 === 0 ? "sm:grid-cols-3" : "sm:grid-cols-2";
  };

  return (
    <div className="flex justify-center">
      <div
        className={`grid grid-cols-1 gap-2 ${getColumnClass(
          oauthProvidersClerk.length,
        )} sm:gap-4`}
      >
        {oauthProvidersClerk.map((provider) => {
          const Icon = Icons[provider.icon];

          return (
            <div key={provider.strategy} className="flex justify-center">
              <Button
                aria-label={`Sign in with ${provider.name}`}
                variant="outline"
                className="w-full bg-background sm:w-auto"
                onClick={() => void oauthSignIn(provider.strategy)}
                disabled={isLoading !== null}
              >
                {isLoading === provider.strategy ?
                  <Icons.spinner
                    className="mr-2 h-4 w-4 animate-spin"
                    aria-hidden="true"
                  />
                : <Icon className="mr-2 h-4 w-4" aria-hidden="true" />}
                {provider.name}
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
}
