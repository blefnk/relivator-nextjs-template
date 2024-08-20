import type { EslintConfig } from "@/scripts/reliverse/relicon/setup/types";

import { select } from "@clack/prompts";
import { config } from "@reliverse/core";
import { fileExists, removeFile } from "@reliverse/fs";
import consola from "consola";
import fs from "fs-extra";
import pc from "picocolors";

export async function configureEslint({
  eslintConfig,
  eslintRulesDisabledConfig,
  eslintUltimateConfig,
}: EslintConfig) {
  const eslintConfigExists = await fileExists(eslintConfig);
  const eslintUltimateConfigExists = await fileExists(eslintUltimateConfig);

  const eslintRulesDisabledConfigExists = await fileExists(
    eslintRulesDisabledConfig,
  );

  const eslint: string | symbol = await select({
    maxItems: 5,
    // eslint-disable-next-line @stylistic/max-len
    message: `${config.framework.name} uses various tools to automate code improvement. One of these tools is ESLint. Let's configure @reliverse/eslint-config to meet your needs.\n${pc.cyan("Please select the type of ESLint configuration you want to use.")} If you are a complete beginner, choose the "eslint.config.rules-disabled.ts" config preset, where almost all rules are disabled.\n${pc.dim("Please note that your current configurations will be replaced with the selected ones. If you do not want to lose anything, choose Skip or commit your changes to Git first.")}`,
    options: [
      {
        hint: "Skip ESLint configuration",
        label: "Skip",
        value: "Skip",
      },
      {
        hint: "[✅ Default] Enables almost all rules",
        label: "eslint.config.ultimate.ts",
        value: "Ultimate",
      },
      {
        hint: "Disables almost all rules",
        label: "eslint.config.rules-disabled.ts",
        value: "RulesDisabled",
      },
    ],
  });

  if (typeof eslint !== "string") {
    process.exit(0);
  }

  if (eslint === "Skip") {
    consola.success("ESLint configuration was skipped.");

    return; // Exit early if the user chose to skip
  }

  if (eslintConfigExists) {
    await removeFile(eslintConfig);
  }

  if (eslint === "Ultimate" && eslintUltimateConfigExists) {
    await fs.copy(eslintUltimateConfig, eslintConfig);
  } else if (eslint === "RulesDisabled" && eslintRulesDisabledConfigExists) {
    await fs.copy(eslintRulesDisabledConfig, eslintConfig);
  }

  if (await fileExists(eslintConfig)) {
    consola.success(`ESLint configuration has been set to ${eslint}`);
    await updateFileToJs(eslintConfig);
  } else {
    consola.error(
      "Something went wrong! Newly created `eslint.config.js` file was not found!",
    );
  }
}

async function updateFileToJs(filePath: string) {
  try {
    let fileContent = await fs.readFile(filePath, "utf8");

    // Replace TypeScript type annotations in function parameters
    const paramPattern = /(\w+): string/g;
    const paramReplacement = "/** @type {string} */ $1";

    fileContent = fileContent.replace(paramPattern, paramReplacement);

    // Remove lines containing `ts-expect-error`
    const lines = fileContent.split("\n");

    const filteredLines = lines.filter(
      (line) => !line.includes("// @ts-expect-error TODO: fix"),
    );

    fileContent = filteredLines.join("\n");

    await fs.writeFile(filePath, fileContent, "utf8");
  } catch (error) {
    consola.error("Error updating file content:", error);
  }
}
