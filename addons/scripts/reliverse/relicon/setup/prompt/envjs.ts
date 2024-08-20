import type { EnvJsConfig } from "@/scripts/reliverse/relicon/setup/types";

import { select } from "@clack/prompts";
import { fileExists, removeFile } from "@reliverse/fs";
import consola from "consola";
import { readFile, writeFile } from "fs/promises";
import fs from "fs-extra";
import pc from "picocolors";

export async function configureEnv({
  envConfig,
  envRecommendedConfig,
  envRulesDisabledConfig,
}: EnvJsConfig) {
  const envConfigExists = await fileExists(envConfig);
  const envRulesDisabledConfigExists = await fileExists(envRulesDisabledConfig);
  const envRecommendedConfigExists = await fileExists(envRecommendedConfig);

  const env: string | symbol = await select({
    maxItems: 5,
    message: pc.cyan(
      "Please select which type of env.js configuration you want to use.",
    ),
    options: [
      {
        hint: "Skip src/env.js configuration",
        label: "Skip",
        value: "Skip",
      },
      {
        hint: "[✅ Default] RulesDisabled: builds will NOT fail if env is not set",
        label: "env.rules-disabled.ts",
        value: "RulesDisabled",
      },
      {
        hint: "Recommended: builds WILL FAIL if specific env variables is not set",
        label: "env.recommended.ts",
        value: "Recommended",
      },
    ],
  });

  if (typeof env !== "string") {
    process.exit(0);
  }

  if (env === "Skip") {
    consola.success("src/env.js configuration was skipped.");

    return;
  }

  if (envConfigExists) {
    await removeFile(envConfig);
  }

  if (env === "RulesDisabled" && envRulesDisabledConfigExists) {
    await fs.copy(envRulesDisabledConfig, envConfig);
  } else if (env === "Recommended" && envRecommendedConfigExists) {
    await fs.copy(envRecommendedConfig, envConfig);
  }

  if (await fileExists(envConfig)) {
    consola.success(`env.js configuration has been set to ${env}`);
    await updateFileToJs(envConfig);
  } else {
    consola.error(
      "Something went wrong! Newly created `src/env.js` file was not found!",
    );
  }
}

async function updateFileToJs(filePath: string) {
  try {
    let fileContent = await readFile(filePath, "utf8");

    // Remove lines containing `ts-expect-error`
    const lines = fileContent.split("\n");
    const filteredLines = lines.filter(
      (line) => !line.includes("// @ts-expect-error TODO: fix"),
    );

    fileContent = filteredLines.join("\n");

    // Replace const _knownVariables with export const knownVariables
    fileContent = fileContent.replaceAll(
      "const _knownVariables",
      "export const knownVariables",
    );

    // Replace const _recommendedEnvVariables with export const recommendedEnvVariables
    fileContent = fileContent.replaceAll(
      "const _recommendedEnvVariables",
      "export const recommendedEnvVariables",
    );

    // Replace const _env with export const env
    fileContent = fileContent.replaceAll("const _env", "export const env");

    await writeFile(filePath, fileContent, "utf8");
  } catch (error) {
    consola.error("Error updating file content:", error);
  }
}
