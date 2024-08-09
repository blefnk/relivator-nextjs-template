import { Suspense } from "react";

import type { FlagValuesType } from "@vercel/flags";

import { encrypt } from "@vercel/flags";
import { FlagValues } from "@vercel/flags/react";
import { VercelToolbar } from "@vercel/toolbar/next";

import { env } from "~/env";

async function EncryptedFlagValues({
  flagValues,
}: {
  flagValues: FlagValuesType;
}) {
  const encryptedFlagValues = await encrypt(flagValues);

  return <FlagValues values={encryptedFlagValues} />;
}

// TODO: move react-query-devtools and other runtime devtools to this component
// TODO: disable @vercel/toolbar on vercel.app preview environment deployments
export function Reliverse() {
  const {
    ENABLE_FEATURE_FLAGS,
    ENABLE_VERCEL_TOOLBAR,
    ENABLE_VT_ON_PRODUCTION,
    FLAGS_SECRET,
    NODE_ENV,
  } = env;

  // Parse environment variables
  const isProductionEnvironment = NODE_ENV === "production";
  const isDevelopmentEnvironment = NODE_ENV === "development";
  const isVercelToolbarEnabled = ENABLE_VERCEL_TOOLBAR === "true";
  const isVercelToolbarAllowedOnProduction = ENABLE_VT_ON_PRODUCTION === "true";
  const isFeatureFlagsEnabled = ENABLE_FEATURE_FLAGS === "true";

  // Determine if the Vercel Toolbar should be injected
  const shouldInjectToolbar =
    isVercelToolbarEnabled &&
    (isDevelopmentEnvironment ||
      (isVercelToolbarAllowedOnProduction && isProductionEnvironment));

  return (
    <>
      {shouldInjectToolbar && (
        <>
          <VercelToolbar />
          {isFeatureFlagsEnabled && FLAGS_SECRET && (
            <Suspense fallback={null}>
              <EncryptedFlagValues
                flagValues={{
                  instructions: true,
                }}
              />
            </Suspense>
          )}
        </>
      )}
    </>
  );
}
