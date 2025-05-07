import { twoFactorClient } from "better-auth/client/plugins";
import { createAuthClient } from "better-auth/react";
import { useRouter } from "next/navigation";
import { useEffect } from "react";

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
export const { signIn, signOut, signUp, useSession } = authClient;

// Two-factor methods
export const twoFactor = authClient.twoFactor;

// Hook to get current user data and loading state
// !! Returns only raw (static) data, use getCurrentUserOrRedirect for data from db
export const useCurrentUser = () => {
  const { data, isPending } = useSession();
  return {
    isPending,
    session: data?.session,
    user: data?.user,
  };
};

// Hook similar to getCurrentUserOrRedirect for client-side use
// !! Returns only raw (static) data, use getCurrentUserOrRedirect for data from db
export const useCurrentUserOrRedirect = (
  forbiddenUrl = "/auth/sign-in",
  okUrl = "",
  ignoreForbidden = false,
) => {
  const { data, isPending } = useSession();
  const router = useRouter();

  useEffect(() => {
    // only perform redirects after loading is complete and router is ready
    if (!isPending && router) {
      // if no user is found
      if (!data?.user) {
        // redirect to forbidden url unless explicitly ignored
        if (!ignoreForbidden) {
          router.push(forbiddenUrl);
        }
        // if ignoreforbidden is true, we do nothing and let the hook return the null user
      } else if (okUrl) {
        // if user is found and an okurl is provided, redirect there
        router.push(okUrl);
      }
    }
    // depend on loading state, user data, router instance, and redirect urls
  }, [isPending, data?.user, router, forbiddenUrl, okUrl, ignoreForbidden]);

  return {
    isPending,
    session: data?.session,
    user: data?.user,
  };
};

// !! currently not used in the app
/**
 * returns the raw session object from better-auth client.
 * this is a direct wrapper around authclient.getsession and returns the same shape.
 *
 * use this when you require advanced session access patterns, e.g.:
 * - you need to fetch the session manually (e.g., with swr, react query, or custom logic).
 * - you need to access the session data directly without using the usesession hook.
 * - you want more control than the usesession hook provides.
 *
 * @example
 * const { data, error } = await useRawSession();
 */
// export const useRawSession = authClient.getSession;
