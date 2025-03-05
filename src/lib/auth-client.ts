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

// Export commonly used methods for convenience
export const {
  signIn,
  signUp,
  signOut,
  useSession,
  getSession,
  linkSocial,
  unlinkAccount,
} = authClient;

// Export two-factor methods for convenience
export const twoFactor = authClient.twoFactor;
