import { convertEmptyStringToUndefined } from "@/scripts/reliverse/relimter/core/env/helpers";
import { authProvider, debugEnabled } from "~/../reliverse.config";
import consola from "consola";

import { recommendedEnvVariables } from "~/env";

/* eslint-disable no-restricted-properties */
const checkMissingVariables = (
  env: Record<string, string | undefined>,
  variablesList: string[],
) => {
  return variablesList.filter((variable) => {
    const value = convertEmptyStringToUndefined(env[variable]);
    const isMissing = value === undefined;

    if (debugEnabled && isMissing) {
      consola.warn(`Missing environment variable: ${variable}`);
    }

    return isMissing;
  });
};

export const getMissingVariables = () => ({
  missingAuthjsVariables: checkMissingVariables(
    process.env,
    recommendedEnvVariables.authjs,
  ),
  missingClerkVariables: checkMissingVariables(
    process.env,
    recommendedEnvVariables.clerk,
  ),
  missingImportantVariables: checkMissingVariables(
    process.env,
    recommendedEnvVariables.important,
  ),
  missingOtherVariables: checkMissingVariables(
    process.env,
    recommendedEnvVariables.other,
  ),
  missingStripeVariables: checkMissingVariables(
    process.env,
    recommendedEnvVariables.stripe,
  ),
});

export const checkAuthConditions = (
  missingClerkVariables: string[],
  missingAuthjsVariables: string[],
) => {
  const isClerkProviderWithoutKeys =
    authProvider === "clerk" && missingClerkVariables.length > 0;

  const hasAnyAuthClientInfo =
    (convertEmptyStringToUndefined(process.env.AUTH_GITHUB_ID) &&
      convertEmptyStringToUndefined(process.env.AUTH_GITHUB_SECRET)) ||
    Boolean(
      convertEmptyStringToUndefined(process.env.AUTH_GOOGLE_ID) &&
        convertEmptyStringToUndefined(process.env.AUTH_GOOGLE_SECRET),
    ) ||
    Boolean(
      convertEmptyStringToUndefined(process.env.AUTH_DISCORD_ID) &&
        convertEmptyStringToUndefined(process.env.AUTH_DISCORD_SECRET),
    );

  const hasAuthSecret = Boolean(
    convertEmptyStringToUndefined(process.env.AUTH_SECRET),
  );

  const isAuthjsProviderWithoutKeys =
    authProvider === "authjs" && missingAuthjsVariables.length > 0;

  return {
    hasAnyAuthClientInfo,
    hasAuthSecret,
    isAuthjsProviderWithoutKeys,
    isClerkProviderWithoutKeys,
  };
};
