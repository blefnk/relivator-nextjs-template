import loadEnv from "@/scripts/reliverse/relimter/core/env/env-loader";
import {
  checkAuthConditions,
  getMissingVariables,
} from "@/scripts/reliverse/relimter/core/env/get-missing";
import { logMessages } from "@/scripts/reliverse/relimter/core/env/log-messages";
import { authProvider, debugEnabled } from "~/../reliverse.config";
import consola from "consola";
import pc from "picocolors";

export const checkMissingEnvVariables = async () => {
  await loadEnv();

  const {
    missingAuthjsVariables,
    missingClerkVariables,
    missingImportantVariables,
    missingOtherVariables,
    missingStripeVariables,
  } = getMissingVariables();

  const {
    hasAnyAuthClientInfo,
    hasAuthSecret,
    isAuthjsProviderWithoutKeys,
    isClerkProviderWithoutKeys,
  } = checkAuthConditions(missingClerkVariables, missingAuthjsVariables);

  if (debugEnabled) {
    // eslint-disable-next-line no-restricted-properties
    consola.warn("Environment Variables:", process.env);
    consola.warn("Missing Important Variables:", missingImportantVariables);
  }

  const authProviderVariablesPresent =
    (authProvider === "authjs" && !isAuthjsProviderWithoutKeys) ||
    (authProvider === "clerk" && !isClerkProviderWithoutKeys);

  // TODO: looks like this const doesn't work as expected
  const allVariablesPresent =
    missingImportantVariables.length === 0 &&
    authProviderVariablesPresent &&
    missingClerkVariables.length === 0 &&
    missingStripeVariables.length === 0 &&
    Boolean(hasAnyAuthClientInfo) &&
    Boolean(hasAuthSecret) &&
    missingOtherVariables.length === 0;

  if (allVariablesPresent) {
    consola.success(
      pc.green("All required environment variables are present."),
    );

    return;
  }

  logMessages(
    missingImportantVariables,
    missingClerkVariables,
    missingAuthjsVariables,
    missingStripeVariables,
    missingOtherVariables,
  );
};
