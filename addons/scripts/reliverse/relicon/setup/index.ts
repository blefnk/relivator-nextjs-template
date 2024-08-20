import {
  configureBiome,
  configureEnv,
  configureEslint,
  configureKnip,
  configureNext,
  configurePutout,
} from "@/scripts/reliverse/relicon/setup/prompt";
import { configureAppts } from "@/scripts/reliverse/relicon/setup/prompt/appts";
import { confirm } from "@clack/prompts";
import { config } from "@reliverse/core";
import { getCurrentDirname, getRootDirname } from "@reliverse/fs";
import consola from "consola";
import { join } from "pathe";
import pc from "picocolors";

import { siteConfig } from "~/app";

export async function runReliverseSetup() {
  const currentDirname = getCurrentDirname(import.meta.url);
  const rootDirectory = getRootDirname(import.meta.url, 5);
  const srcDirectory = join(rootDirectory, "src");
  const configsFolder = join(currentDirname, "configs");

  // Next.js configurations
  const nextConfig = join(rootDirectory, "next.config.js");
  const nextMinimalConfig = join(configsFolder, "next.config.minimal.ts");

  const nextRecommendedConfig = join(
    configsFolder,
    "next.config.recommended.ts",
  );

  // ESLint configurations
  const eslintConfig = join(rootDirectory, "eslint.config.js");

  const eslintUltimateConfig = join(configsFolder, "eslint.config.ultimate.ts");

  const eslintRulesDisabledConfig = join(
    configsFolder,
    "eslint.config.rules-disabled.ts",
  );

  // Biome configurations
  const biomeConfig = join(rootDirectory, "biome.json");
  const biomeRecommendedConfig = join(configsFolder, "biome.recommended.json");

  const biomeRulesDisabledConfig = join(
    configsFolder,
    "biome.rules-disabled.json",
  );

  // Knip configurations
  const knipConfig = join(rootDirectory, "knip.json");
  const knipRecommendedConfig = join(configsFolder, "knip.recommended.json");

  const knipRulesDisabledConfig = join(
    configsFolder,
    "knip.rules-disabled.json",
  );

  // Putout configurations
  const putoutConfig = join(rootDirectory, ".putout.json");

  const putoutRecommendedConfig = join(
    configsFolder,
    ".putout.recommended.json",
  );

  const putoutRulesDisabledConfig = join(
    configsFolder,
    ".putout.rules-disabled.json",
  );

  // env.js configuration
  const envConfig = join(srcDirectory, "env.js");
  const envRulesDisabledConfig = join(configsFolder, "env.rules-disabled.ts");
  const envRecommendedConfig = join(configsFolder, "env.recommended.ts");

  // todo: consider ./canary/json.ts file which reads appts.json file
  // todo: const apptsConfig = join(srcDirectory, "config/json/app");
  const apptsConfig = join(rootDirectory, "src");
  const { fullName } = siteConfig.author;
  const [firstName] = fullName.split(" ");

  const welcomeCondition = `Hello, ${firstName !== "Nazar" ? firstName : "there"}!`;

  // Reliverse Config Setup
  const accepted = await confirm({
    initialValue: true,
    // eslint-disable-next-line @stylistic/max-len
    message: `${pc.bold(`${welcomeCondition} Welcome to the ${config.framework.name} 1.2.6 setup! This setup wizard will help you configure the main configuration of the app and let you choose the Next.js, ESLint, Biome, and Putout config presets.`)} \n👋 Are you ready to proceed? ${pc.dim("(💡 You can press <Cmd/Ctrl+C> anywhere to close the setup)")}`,
  });

  // Handle Cmd/Ctrl+C pressed by user or if unexpected things happen
  if (typeof accepted !== "boolean") {
    process.exit(0);
  }

  if (accepted) {
    await configureEslint({
      eslintConfig,
      eslintRulesDisabledConfig,
      eslintUltimateConfig,
    });
    await configureNext({
      nextConfig,
      nextMinimalConfig,
      nextRecommendedConfig,
    });
    await configureBiome({
      biomeConfig,
      biomeRecommendedConfig,
      biomeRulesDisabledConfig,
    });
    await configureKnip({
      knipConfig,
      knipRecommendedConfig,
      knipRulesDisabledConfig,
    });
    await configurePutout({
      putoutConfig,
      putoutRecommendedConfig,
      putoutRulesDisabledConfig,
    });
    await configureEnv({
      envConfig,
      envRecommendedConfig,
      envRulesDisabledConfig,
    });
    await configureAppts({
      apptsConfig,
    });

    consola.success(
      pc.green(
        `🎉 ${config.framework.name} setup completed successfully! Have a perfect day!`,
      ),
    );
    consola.info(
      "⚙️  By the way, run `pnpm reli:vscode` to choose VSCode settings preset!",
    );
    consola.info(
      pc.blue(
        // eslint-disable-next-line @stylistic/max-len
        "😉 It is recommended to open the desired configs and customize the specific options to your preferences, because it all belongs to you! Have fun and enjoy!",
      ),
    );
    consola.info(
      pc.magenta("🔥 Please restart your code editor to apply the changes!"),
    );
  } else {
    consola.info("Setup was canceled by the user.");
  }
}
