import { debugEnabled } from "~/../reliverse.config";
import consola from "consola";
import dotenv from "dotenv";
import { readFile } from "fs/promises";
import pc from "picocolors";

import { knownVariables } from "~/env";

export const checkUnexpectedEnvVariables = async (
  envFilePath: string,
  envExampleFilePath: string,
) => {
  const parseEnvFile = async (filePath: string) => {
    const content = await readFile(filePath, "utf8");

    return dotenv.parse(content);
  };

  // Load and parse environment variables from both files
  const envResult = await parseEnvFile(envFilePath);
  const envExampleResult = await parseEnvFile(envExampleFilePath);

  if (!envResult || !envExampleResult) {
    throw new Error("Failed to parse one of the .env files");
  }

  // Get keys from both parsed results
  const envKeys = Object.keys(envResult);
  const envExampleKeys = Object.keys(envExampleResult);

  // Get all expected environment variables
  const allExpectedVariables = Object.values(knownVariables).flat();

  // Function to check unexpected variables
  const checkUnexpectedVariables = (
    keys: string[],
    expectedVariables: string[],
  ) => {
    return keys.filter((variable) => !expectedVariables.includes(variable));
  };

  const unexpectedEnvVariables = checkUnexpectedVariables(
    envKeys,
    allExpectedVariables,
  );

  const unexpectedEnvExampleVariables = checkUnexpectedVariables(
    envExampleKeys,
    allExpectedVariables,
  );

  const reportUnexpectedVariables = (variables: string[], filePath: string) => {
    if (variables.length > 0) {
      consola.error(
        pc.bold(
          pc.red(
            // eslint-disable-next-line @stylistic/max-len
            `Some environment variables in your ${pc.bgCyan(filePath)} file are either unexpected or not registered in the src/env.js file. Please refer to the .env.example file for guidance.\nIt is highly recommended to restart the terminal after fixing your env variables. You might also see a ⚠ icon in VSCode's terminal; hover over it and click on Relaunch.`,
          ),
        ),
      );

      consola.info(pc.blue(variables.join(", ")), "\n");

      process.exit(1);
    } else if (debugEnabled) {
      consola.success(
        pc.green(`All environment variables in ${filePath} are as expected.`),
      );
    }
  };

  reportUnexpectedVariables(unexpectedEnvVariables, ".env");
  reportUnexpectedVariables(unexpectedEnvExampleVariables, ".env.example");
};
