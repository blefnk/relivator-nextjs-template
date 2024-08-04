/* eslint-disable @stylistic/max-len */
"use client";

import { Button } from "@/browser/reliverse/ui/Button";
import { ToastAction } from "@/browser/reliverse/ui/Toast";
import { useToast } from "@/browser/reliverse/ui/use-toast";

import { authProvider } from "~/auth";

// Used as a placeholder when environment variables are not specified
export function ButtonPlaceholder() {
  const { toast } = useToast();

  const handleTryAgainClick = () => {
    window.open(
      "https://github.com/blefnk/relivator-nextjs-template#readme",
      "_blank",
    );
  };

  return (
    <Button
      className="whitespace-nowrap px-3 text-sm"
      variant="secondary"
      onClick={() => {
        toast({
          title: "Environment Variables",
          description:
            authProvider === "authjs"
              ? "Please specify Google, Discord, or GitHub environment variables in your .env file or in Vercel dashboard to unlock NextAuth.js (authjs) features. Or use Clerk instead. Refer to .env.example for more information."
              : "Please specify Clerk environment variables in your .env file or Vercel dashboard. You may also need to specify some NextAuth.js (auth) variables currently. Or just use NextAuth.js (auth) instead. Refer to .env.example for more information.",
          action: (
            <ToastAction
              onClick={handleTryAgainClick}
              altText="Button which opens Relivator's README.md in the browser"
            >
              README.md
            </ToastAction>
          ),
        });
      }}
    >
      Sign In
    </Button>
  );
}
