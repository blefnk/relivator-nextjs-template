import type { NextJsConfig } from "@/terminal/reliverse/relicon/setup/types";

import { fileExists, removeFile } from "@/terminal/shared/utils";
import { select } from "@clack/prompts";
import consola from "consola";
import { readFile, writeFile } from "fs/promises";
import fs from "fs-extra";
import pc from "picocolors";

export async function configureNext({
  nextConfig,
  nextMinimalConfig,
  nextRecommendedConfig,
}: NextJsConfig) {
  const nextConfigExists = await fileExists(nextConfig);
  const nextMinimalConfigExists = await fileExists(nextMinimalConfig);
  const nextRecommendedConfigExists = await fileExists(nextRecommendedConfig);

  const next: string | symbol = await select({
    maxItems: 5,
    message: pc.cyan(
      "Please select which type of Next.js configuration you want to use.",
    ),
    options: [
      {
        hint: "Skip Next.js configuration",
        label: "Skip",
        value: "Skip",
      },
      {
        hint: "[✅ Default] Minimal configuration: faster builds",
        label: "next.config.minimal.ts",
        value: "Minimal",
      },
      {
        hint: "[⛔ Unstable] Recommended configuration: faster runtime, Million.js, and more",
        label: "next.config.recommended.ts",
        value: "Recommended",
      },
    ],
  });

  if (typeof next !== "string") {
    process.exit(0);
  }

  if (next === "Skip") {
    consola.success("Next.js configuration was skipped.");

    return;
  }

  if (nextConfigExists) {
    await removeFile(nextConfig);
  }

  if (next === "Minimal" && nextMinimalConfigExists) {
    await fs.copy(nextMinimalConfig, nextConfig);
  } else if (next === "Recommended" && nextRecommendedConfigExists) {
    await fs.copy(nextRecommendedConfig, nextConfig);
  }

  if (await fileExists(nextConfig)) {
    consola.success(`Next.js configuration has been set to ${next}`);
    await updateFileToJs(nextConfig);
    await replaceEnvImport(nextConfig);
  } else {
    consola.error(
      "Something went wrong! Newly created `next.config.js` file was not found!",
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

    await writeFile(filePath, fileContent, "utf8");
  } catch (error) {
    consola.error("Error updating file content:", error);
  }
}

async function replaceEnvImport(filePath: string) {
  try {
    let fileContent = await readFile(filePath, "utf8");

    const oldImportStatement = `await import("~/env.js");`;
    const newImportStatement = `await import("./src/env.js");`;

    if (fileContent.includes(oldImportStatement)) {
      fileContent = fileContent.replace(oldImportStatement, newImportStatement);
      await writeFile(filePath, fileContent, "utf8");
      consola.success(`Replaced import statement in ${filePath}`);
    } else {
      consola.info(`Import statement not found in ${filePath}`);
    }
  } catch (error) {
    consola.error("Error replacing import statement:", error);
  }
}
