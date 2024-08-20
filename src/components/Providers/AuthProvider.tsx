import type { ReactNode } from "react";

import { getClerkLocale } from "@/server/reliverse/clerk";
import { ClerkProvider } from "@clerk/nextjs";
import { authProvider } from "~/../reliverse.config";

import { env } from "~/env";

export function AuthProvider({
  children,
  locale,
}: { children: ReactNode; locale: string }) {
  // https://clerk.com/docs/components/customization/localization
  const clerkLocale = getClerkLocale(locale);

  // if (
  //   authProvider === "clerk" &&
  //   env.CLERK_SECRET_KEY &&
  //   env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  // ) {
  //   return <AuthjsClerkProvider>{children}</AuthjsClerkProvider>;
  // }

  // if (authProvider === "authjs" && env.AUTH_SECRET) {
  //   return <AuthjsClerkProvider>{children}</AuthjsClerkProvider>;
  // }

  // return <>{children}</>;

  if (
    authProvider !== "clerk" ||
    !env.CLERK_SECRET_KEY ||
    !env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY
  ) {
    return <>{children}</>;
  }

  return (
    <>
      {authProvider !== "clerk" ||
      !env.CLERK_SECRET_KEY ||
      !env.NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY ? (
        <>{children}</>
      ) : (
        <ClerkProvider
          afterSignOutUrl="/"
          appearance={{
            elements: {
              card: "bg-[#fafafa]",
              formButtonPrimary:
                "bg-black border border-black border-solid hover:bg-white hover:text-black",
              formButtonReset:
                // eslint-disable-next-line @stylistic/max-len
                "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
              membersPageInviteButton:
                "bg-black border border-black border-solid hover:bg-white hover:text-black",
              socialButtonsBlockButton:
                "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
              socialButtonsBlockButtonText: "font-semibold",
            },
            variables: { colorPrimary: "#000000" },
          }}
          localization={clerkLocale}
        >
          {children}
        </ClerkProvider>
      )}
    </>
  );
}
