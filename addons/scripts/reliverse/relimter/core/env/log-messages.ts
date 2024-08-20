import consola from "consola";
import pc from "picocolors";

import { authProvider } from "~/auth/provider";

export const logMessages = (
  missingImportantVariables: string[],
  missingClerkVariables: string[],
  missingAuthjsVariables: string[],
  missingStripeVariables: string[],
  missingOtherVariables: string[],
): void => {
  logMissingVariables(
    "Important variables are missing:",
    missingImportantVariables,
  );

  if (authProvider === "clerk" && missingClerkVariables.length > 0) {
    consola.info(
      // eslint-disable-next-line @stylistic/max-len
      `${pc.bold("Clerk is specified as the authProvider (in the `reliverse.config.ts` file), but its keys are missing:")} ${pc.blue(missingClerkVariables.join(", "))}\n`,
    );

    showInstructions();
  }

  if (authProvider === "authjs" && missingAuthjsVariables.length > 0) {
    consola.info(
      // eslint-disable-next-line @stylistic/max-len
      `${pc.bold("Auth.js (or nothing) is specified as the authProvider (in the `reliverse.config.ts` file),")} \n${pc.bold("so NextAuth.js library will be used as your auth provider, but its keys are missing:")} \n${pc.blue(missingAuthjsVariables.join(", "))}. \n${pc.italic("It's okay to specify only GitHub, Google, or Discord variables to unlock NextAuth.js features.")}\n`,
    );

    showInstructions();
  }

  if (missingStripeVariables) {
    logMissingVariables("Stripe keys are missing:", missingStripeVariables);

    // showInstructions();
  }

  if (missingOtherVariables) {
    logMissingVariables("Other keys are missing:", missingOtherVariables);

    // showInstructions();
  }
};

const logMissingVariables = (title: string, variables: string[]): void => {
  if (variables.length > 0) {
    consola.info(`${pc.bold(title)} ${pc.blue(variables.join(", "))}\n`);
  }
};

const showInstructions = (): void => {
  consola.info(
    "Verify the presence of these variables in the .env file (or in the deployment service).",
  );
  consola.info(
    "The application will continue to function, but features related to the missing variables will be disabled.",
  );
  consola.info(
    // eslint-disable-next-line @stylistic/max-len
    `${pc.italic("To suppress this warning, set ")}${pc.cyan("hideEnvInfo")}${pc.italic(" to true (in the `reliverse.config.ts` file), but it is not recommended.")}\n`,
  );
  consola.info(
    pc.bold(
      pc.cyan(
        // eslint-disable-next-line @stylistic/max-len
        `If you don't want to specify any of this, you can modify the required provider variables in the src/env.js file > recommendedEnvVariables. \nIt is recommended to restart the terminal after fixing your env vars. You can hover over a ⚠ icon in VSCode's terminal and click on Relaunch.\n${pc.magenta("You have rerun the script, but there are no changes here? Please restart your terminal and then try running the pnpm lint:env script again.")}\n`,
      ),
    ),
  );
};
