import { twoFactorClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";

// Create and export the auth client
export const authClient = createAuthClient({
  baseURL: process.env.NEXT_PUBLIC_APP_URL,
  plugins: [
    twoFactorClient({
      onTwoFactorRedirect: () => {
        // Redirect to the two-factor page
        window.location.href = "/auth/two-factor";
      },
    }),
  ],
});

// Auth methods
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  linkSocial,
  unlinkAccount,
} = authClient;

// Two-factor methods
export const twoFactor = authClient.twoFactor;
