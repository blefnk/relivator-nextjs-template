import type { BiomeConfig } from "@/scripts/reliverse/relicon/setup/types";

import { select } from "@clack/prompts";
import { fileExists, removeFile } from "@reliverse/fs";
import consola from "consola";
import fs from "fs-extra";
import pc from "picocolors";

export async function configureBiome({
  biomeConfig,
  biomeRecommendedConfig,
  biomeRulesDisabledConfig,
}: BiomeConfig) {
  const biomeConfigExists = await fileExists(biomeConfig);
  const biomeRecommendedConfigExists = await fileExists(biomeRecommendedConfig);
  const biomeRulesDisabledConfigExists = await fileExists(
    biomeRulesDisabledConfig,
  );

  const biome: string | symbol = await select({
    maxItems: 5,
    message: pc.cyan(
      "Please select which type of Biome configuration you want to use.",
    ),
    options: [
      {
        hint: "Skip Biome configuration",
        label: "Skip",
        value: "Skip",
      },
      {
        hint: "[✅ Default] Disables almost all rules",
        label: "biome.rules-disabled.json",
        value: "RulesDisabled",
      },
      {
        hint: "[⛔ Unstable] Recommended configuration (🐞 You'll encounter many issues on Relivator 1.3.0@canary)",
        label: "biome.recommended.json",
        value: "Recommended",
      },
    ],
  });

  if (typeof biome !== "string") {
    process.exit(0);
  }

  if (biome === "Skip") {
    consola.success("Biome configuration was skipped.");

    return;
  }

  if (biomeConfigExists) {
    await removeFile(biomeConfig);
  }

  if (biome === "Recommended" && biomeRecommendedConfigExists) {
    await fs.copy(biomeRecommendedConfig, biomeConfig);
  } else if (biome === "RulesDisabled" && biomeRulesDisabledConfigExists) {
    await fs.copy(biomeRulesDisabledConfig, biomeConfig);
  }

  if (await fileExists(biomeConfig)) {
    consola.success(`Biome configuration has been set to ${biome}`);
  } else {
    consola.error(
      "Something went wrong! Newly created `biome.json` file was not found!",
    );
  }
}
