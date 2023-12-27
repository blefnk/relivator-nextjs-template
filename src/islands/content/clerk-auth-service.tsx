/**
 * CLERK AUTH SERVICE
 * ==================
 *
 * todo: currently unfinished and not used anywhere
 *
 * import "@clerk/clerk-react" here is a side-effect import from the @clerk/clerk-react package.
 * This type of import is used when we want to run the module's code for its side effects (like
 * polyfills or global setups) without importing any specific values. This import is necessary,
 * because @clerk/clerk-react package contains initialization code that needs to be executed.
 *
 * @see https://github.com/saas-js/saas-ui/blob/main/packages/saas-ui-clerk/src/auth-service.tsx
 */

/**
 * CLERK AUTH SERVICE
 * ==================
 *
 * todo: currently unfinished and not used anywhere
 *
 * import "@clerk/clerk-react" here is a side-effect import from the @clerk/clerk-react package.
 * This type of import is used when we want to run the module's code for its side effects (like
 * polyfills or global setups) without importing any specific values. This import is necessary,
 * because @clerk/clerk-react package contains initialization code that needs to be executed.
 *
 * @see https://github.com/saas-js/saas-ui/blob/main/packages/saas-ui-clerk/src/auth-service.tsx
 */
import type { LoadedClerk, SignInCreateParams } from "@clerk/types";

import "@clerk/clerk-react";

import type {
  AuthOptions,
  AuthParams,
  AuthProviderProps,
  AuthStateChangeCallback,
  User,
} from "./components";

type Providers =
  | "facebook"
  | "github"
  | "google"
  | "hubspot"
  | "tiktok"
  | "gitlab"
  | "discord"
  | "twitter"
  | "twitch"
  | "linkedin"
  | "dropbox"
  | "bitbucket"
  | "microsoft"
  | "notion";

/**
 * Clerk auth service
 * @param clerk Client instance
 * @returns {AuthProviderProps} Auth provider props
 */
export const createAuthService = (clerk: LoadedClerk): AuthProviderProps => {
  if (!clerk?.client) throw new Error("Clerk client not available.");

  const client = clerk.client;

  let authCallback: AuthStateChangeCallback | null;

  const onLogin = async (
    params: AuthParams,
    options?: AuthOptions,
  ): Promise<User | null | undefined> => {
    if (params.provider) {
      await client.signIn.authenticateWithRedirect({
        strategy: `oauth_${params.provider}` as `oauth_${Providers}`,
        redirectUrl: "/sign-sso",
        redirectUrlComplete: options?.redirectTo || "/auth",
      });
      return;
    }

    let clerkParams: SignInCreateParams;

    if (!params.email) {
      return;
    } else if (params.password) {
      clerkParams = {
        identifier: params.email,
        password: params.password,
      };
    } else {
      clerkParams = {
        identifier: params.email,
      };
    }

    const signIn = await client.signIn.create(clerkParams);

    if (signIn.status === "complete" && signIn.createdSessionId) {
      await clerk.setActive({
        session: signIn.createdSessionId,
      });

      return onLoadUser();
    }

    // @ts-expect-error ...
    const { emailAddressId } = signIn.supportedFirstFactors.find(
      (ff) =>
        ff.strategy === "email_link" && ff.safeIdentifier === params.email,
    );

    const { startMagicLinkFlow } = client.signIn.createMagicLinkFlow();

    startMagicLinkFlow({
      emailAddressId: emailAddressId,
      redirectUrl: `${window.location.href}/#ml_callback`,
    }).then(async (result) => {
      if (result.status === "complete") {
        await clerk.setActive({
          session: result.createdSessionId,
        });

        authCallback?.(await onLoadUser());
      }
    });
  };

  const onAuthStateChange = (callback: AuthStateChangeCallback) => {
    authCallback = callback; // we set a reference to the callback here, so the magiclink flow can call it when finished.
    // biome-ignore lint/suspicious/noAssignInExpressions: <explanation>
    return () => (authCallback = null);
  };

  const onSignup = async (
    params: AuthParams,
    options?: AuthOptions,
  ): Promise<any> => {
    try {
      const clerkParams: any = {};

      if (params.email) {
        clerkParams.emailAddress = params.email;
      }

      if (params.password) {
        clerkParams.password = params.password;
      }

      const signUpAttempt = await client.signUp.create(clerkParams);

      const result = await signUpAttempt.prepareEmailAddressVerification({
        strategy: "email_link",
        redirectUrl: options?.redirectTo || window.location.href,
      });

      return result;
    } catch (e) {
      console.error(e);

      throw e;
    }
  };

  const onLogout = async () => {
    return await clerk.signOut();
  };

  const onLoadUser = async () => {
    return clerk.user ?
        ({
          email: clerk.user.primaryEmailAddress?.emailAddress,
          ...clerk.user,
        } as User)
      : null;
  };

  const onGetToken = async () => {
    return clerk.session?.id || null;
  };

  return {
    onLogin,
    onAuthStateChange,
    onSignup,
    onLogout,
    onLoadUser,
    onGetToken,
  };
};

export type ClerkAuthService = ReturnType<typeof createAuthService>;
