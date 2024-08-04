import { getCurrentDirname } from "@/browser/shared/utils";
import { checkMissingEnvVariables } from "@/terminal/reliverse/relimter/core/env/check-missing-variables";
import { checkUnexpectedEnvVariables } from "@/terminal/reliverse/relimter/core/env/check-unexpected-variables";
import { fileExists, getRootDirname } from "@/terminal/shared/utils";
import consola from "consola";
import { join } from "pathe";
import { hideEnvInfo } from "reliverse.config";

const main = async () => {
  try {
    const currentDirname = getCurrentDirname(import.meta.url);
    const rootDirectory = getRootDirname(currentDirname, 6);
    const envFilePath = join(rootDirectory, ".env");
    const envExampleFilePath = join(rootDirectory, ".env.example");

    if (!(await fileExists(envFilePath))) {
      // No .env file found, so we just skip the checks
      // Because .env file is optional in the Relivator
      // consola.warn(envFilePath);
      return;
    }

    if (!hideEnvInfo) {
      await checkMissingEnvVariables();
    }

    await checkUnexpectedEnvVariables(envFilePath, envExampleFilePath);
  } catch (error) {
    consola.error("Error occurred:", error);
    process.exit(1);
  }
};

main();
