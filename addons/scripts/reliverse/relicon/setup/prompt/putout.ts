import type { PutoutConfig } from "@/scripts/reliverse/relicon/setup/types";

import { select } from "@clack/prompts";
import { fileExists, removeFile } from "@reliverse/fs";
import consola from "consola";
import fs from "fs-extra";
import pc from "picocolors";

export async function configurePutout({
  putoutConfig,
  putoutRecommendedConfig,
  putoutRulesDisabledConfig,
}: PutoutConfig) {
  const putoutConfigExists = await fileExists(putoutConfig);
  const putoutRecommendedConfigExists = await fileExists(
    putoutRecommendedConfig,
  );

  const putoutRulesDisabledConfigExists = await fileExists(
    putoutRulesDisabledConfig,
  );

  const putout: string | symbol = await select({
    maxItems: 5,
    message: pc.cyan(
      "Please select which type of Putout configuration you want to use.",
    ),
    options: [
      {
        hint: "Skip Putout configuration",
        label: "Skip",
        value: "Skip",
      },
      {
        hint: "[✅ Default] Recommended configuration",
        label: ".putout.recommended.json",
        value: "Recommended",
      },
      {
        hint: "Disables almost all rules",
        label: ".putout.rules-disabled.json",
        value: "RulesDisabled",
      },
    ],
  });

  if (typeof putout !== "string") {
    process.exit(0);
  }

  if (putout === "Skip") {
    consola.success("Putout configuration was skipped.");

    return;
  }

  if (putoutConfigExists) {
    await removeFile(putoutConfig);
  }

  if (putout === "Recommended" && putoutRecommendedConfigExists) {
    await fs.copy(putoutRecommendedConfig, putoutConfig);
  } else if (putout === "RulesDisabled" && putoutRulesDisabledConfigExists) {
    await fs.copy(putoutRulesDisabledConfig, putoutConfig);
  }

  if (await fileExists(putoutConfig)) {
    consola.success(`Putout configuration has been set to ${putout}`);
  } else {
    consola.error(
      "Something went wrong! Newly created `.putout.json` file was not found!",
    );
  }
}
