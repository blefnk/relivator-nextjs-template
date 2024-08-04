import { runReliverseSetup } from "@/terminal/reliverse/relicon/setup";
import { config as reliverse } from "@reliverse/core";
import consola from "consola";
import pc from "picocolors";
import {
  authProvider,
  engineVersion,
  frameworkVersion,
} from "reliverse.config";
import semver from "semver";

import { env } from "~/env";

// ===== @reliverse/setup ================================================
// TODO: Move the following code to the separate package
// =======================================================================
//
const details = process.argv.includes("--details");
const help = process.argv.includes("--help");
const setup = process.argv.includes("--setup");
const turbo = process.argv.includes("--turbo");

if (turbo) {
  consola.info(
    pc.bold(
      "\nThe build will now be launched using the pnpm turbo:build command and the turbo.json config (https://turbo.build).\nEnsure that you have the turbo.json file (not turbo.disabled.json).\nHowever, there is a possibility that the VSCode terminal may not exit automatically.\nIf this happens, just press Cmd/Ctrl+C to close the process manually.\n",
    ),
  );
}

if (help || details) {
  consola.info(
    pc.isColorSupported
      ? String(
          pc.underline(
            pc.bold(
              // eslint-disable-next-line @stylistic/max-len
              `▲ Hotline: ${reliverse.social.discord} ▲ Framework: ${reliverse.framework.name} v${frameworkVersion} ▲ Engine: ${reliverse.engine.name} v${engineVersion}`,
            ),
          ),
        )
      : // eslint-disable-next-line @stylistic/max-len
        `▲ Hotline: ${reliverse.social.discord} ▲ Framework: ${reliverse.framework.name} v${frameworkVersion} ▲ Engine: ${reliverse.engine.name} v${engineVersion}`,
  );

  consola.info(
    pc.isColorSupported
      ? ` If you or your company are using ${reliverse.framework.name} or just appreciate what I'm (@blefnk | https://github.com/blefnk) doing, please consider supporting me to speed up the development.\n🙏 I would be very grateful! By using the following platforms, you'll receive many incredible benefits! Thank you so much!\n${pc.green("💚 https://github.com/sponsors/blefnk 💙 https://paypal.me/blefony 💜 https://patreon.com/blefnk 💛 https://buymeacoffee.com/blefnk 🩷  https://ko-fi.com/blefnk")} \n`
      : ` If you or your company are using ${reliverse.framework.name} or just appreciate what I'm (@blefnk | https://github.com/blefnk) doing, please consider supporting me to speed up the development.\n🙏 I would be very grateful! By using the following platforms, you'll receive many incredible benefits! Thank you so much!\n💚 https://github.com/sponsors/blefnk 💙 https://paypal.me/blefony 💜 https://patreon.com/blefnk 💛 https://buymeacoffee.com/blefnk 🩷  https://ko-fi.com/blefnk \n`,
  );

  if (details) {
    consola.info(
      `[${reliverse.framework.name} v1.2.6 Release Blog Post] 👉 https://docs.bleverse.com/en/blog/relivator/v126`,
    );

    consola.info(
      `Help ${reliverse.framework.name} become even better! Please, star the repo – https://github.com/blefnk/relivator`,
    );

    if (env.NODE_ENV === "development") {
      consola.info(
        "For experienced users: run 'pnpm latest' to update all dependencies to the latest versions",
      );

      consola.info(
        "Meet quality standards: run 'pnpm appts' to get linting, formatting, and more.",
      );

      consola.info(
        "Unstable: try 'pnpm dev:i' & faster build with 'pnpm build:i': https://turbo.build/repo",
      );

      // import nextConfig from "next.config.js";
      // if (nextConfig.experimental?.reactCompiler) {
      //   consola.info(
      //     "The reactCompiler is enabled in next.config.js (it uses webpack now, so builds take longer).",
      //   );
      // }

      if (semver.gt(reliverse.framework.version, frameworkVersion)) {
        consola.warn(
          // eslint-disable-next-line @stylistic/max-len
          `🟢 A new ${reliverse.framework.name} ${reliverse.framework.version} version is available! The current version is ${frameworkVersion}. Download: ${reliverse.framework.repo}/releases/tag/${reliverse.framework.version}`,
        );
      }

      if (semver.lt(reliverse.framework.version, frameworkVersion)) {
        consola.warn(
          // eslint-disable-next-line @stylistic/max-len
          `🟡 The ${reliverse.framework.name} version (${reliverse.framework.version}) is older than the bootstrapped version (${frameworkVersion}). This might lead to unexpected behavior.`,
        );
      }
    }

    if (env.NODE_ENV === "production" && authProvider === "clerk") {
      consola.info(
        "Clerk: make sure to connect the domain in the Clerk dashboard so services like PageSpeed will work.",
      );
    }

    consola.info(
      // eslint-disable-next-line @stylistic/max-len
      "Please find Q21 in the FAQ of README.md. Copy the adapted bun scripts and replace the current ones in package.json (scripts for other package managers coming soon).",
    );
  }

  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0);
}

// pnpm tsx reliverse.reliverse.ts --setup
if (setup) {
  await runReliverseSetup();
}
