/**
 * todo: currently unfinished and not used anywhere
 *
 * @see https://github.com/saas-js/saas-ui/blob/main/packages/saas-ui-clerk/src/clerk-auth-provider.tsx
 * @see https://github.com/saas-js/saas-ui/tree/main/apps/website/src/pages/docs/pro/authentication
 * @see https://saas-ui.dev/docs/core/integrations/clerk
 */

import * as React from "react";
import type { IsomorphicClerkOptions, WithClerkProp } from "@clerk/clerk-react";
import {
  AuthenticateWithRedirectCallback,
  ClerkProvider,
  WithClerk,
} from "@clerk/clerk-react";
import type { PublishableKeyOrFrontendApi } from "@clerk/types";

import type { ClerkAuthService } from "./clerk-auth-service";
import { createAuthService } from "./clerk-auth-service";

export type ClerkAuthProviderProps = {
  children(
    props: WithClerkProp<{
      authService: ClerkAuthService;
    }>,
  ): React.ReactNode;
} & Omit<IsomorphicClerkOptions, keyof PublishableKeyOrFrontendApi> &
  Partial<PublishableKeyOrFrontendApi>;

export const ClerkAuthProvider = (props: ClerkAuthProviderProps) => {
  const {
    // eslint-disable-next-line ts/unbound-method
    children,
    frontendApi,
    publishableKey,
    proxyUrl,
    domain,
    isSatellite,
    clerkJSUrl,
    ...rest
  } = props;
  const isSSOCallback =
    typeof window !== "undefined" && window.location.hash === "#sso_callback";
  return (
    /* @ts-expect-error */
    <ClerkProvider
      frontendApi={frontendApi}
      publishableKey={publishableKey}
      clerkJSUrl={clerkJSUrl}
      proxyUrl={proxyUrl}
      domain={domain}
      isSatellite={isSatellite}
      {...rest}
    >
      {isSSOCallback && <AuthenticateWithRedirectCallback />}
      <WithClerk>
        {(clerk) => {
          return children({ authService: createAuthService(clerk), clerk });
        }}
      </WithClerk>
    </ClerkProvider>
  );
};
