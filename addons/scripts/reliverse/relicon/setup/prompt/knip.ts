import type { KnipConfig } from "@/scripts/reliverse/relicon/setup/types";

import { select } from "@clack/prompts";
import { fileExists, removeFile } from "@reliverse/fs";
import consola from "consola";
import fs from "fs-extra";
import pc from "picocolors";

export async function configureKnip({
  knipConfig,
  knipRecommendedConfig,
  knipRulesDisabledConfig,
}: KnipConfig) {
  const knipConfigExists = await fileExists(knipConfig);
  const knipRecommendedConfigExists = await fileExists(knipRecommendedConfig);
  const knipRulesDisabledConfigExists = await fileExists(
    knipRulesDisabledConfig,
  );

  const knip: string | symbol = await select({
    maxItems: 5,
    message: pc.cyan(
      "Please select which type of Knip configuration you want to use.",
    ),
    options: [
      {
        hint: "Skip Knip configuration",
        label: "Skip",
        value: "Skip",
      },
      {
        hint: "[✅ Default] Recommended configuration",
        label: "knip.recommended.json",
        value: "Recommended",
      },
      {
        hint: "Disables almost all rules",
        label: "knip.rules-disabled.json",
        value: "RulesDisabled",
      },
    ],
  });

  if (typeof knip !== "string") {
    process.exit(0);
  }

  if (knip === "Skip") {
    consola.success("Knip configuration was skipped.");

    return;
  }

  if (knipConfigExists) {
    await removeFile(knipConfig);
  }

  if (knip === "Recommended" && knipRecommendedConfigExists) {
    await fs.copy(knipRecommendedConfig, knipConfig);
  } else if (knip === "RulesDisabled" && knipRulesDisabledConfigExists) {
    await fs.copy(knipRulesDisabledConfig, knipConfig);
  }

  if (await fileExists(knipConfig)) {
    consola.success(`Knip configuration has been set to ${knip}`);
  } else {
    consola.error(
      "Something went wrong! Newly created `knip.json` file was not found!",
    );
  }
}
