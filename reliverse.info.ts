import { config as reliverse } from "@reliverse/core";
import consola from "consola";
import pc from "picocolors";
import semver from "semver";

import { env } from "~/env";

import {
  authProvider,
  engineVersion,
  frameworkVersion,
} from "./reliverse.config";

// ===== @reliverse/setup ================================================
// TODO: Move the following code to a separate package
// =======================================================================

const turbo = process.argv.includes("--turbo");

const logInfo = (message: string) => {
  consola.info(pc.isColorSupported ? pc.bold(message) : message);
};

const logImportantInfo = (message: string) => {
  consola.info(pc.isColorSupported ? pc.underline(pc.bold(message)) : message);
};

const logSupportMessage = () => {
  const supportLinks = [
    "💚 https://github.com/sponsors/blefnk",
    "💙 https://paypal.me/blefony",
    "💜 https://patreon.com/blefnk",
    "💛 https://buymeacoffee.com/blefnk",
    "🩷  https://ko-fi.com/blefnk",
  ];

  consola.info(
    ` If you or your company are using ${reliverse.framework.name} or appreciate what I'm (@blefnk | https://github.com/blefnk) doing, please consider supporting me to speed up the development.\n🙏 I would be very grateful! Using the following platforms, you'll receive many incredible benefits! Thank you so much!\n${pc.green(supportLinks.join(" "))}\n`,
  );
};

const logUpdateInstructions = () => {
  consola.info(
    `[${reliverse.framework.name} v1.2.6 & v1.3.0@canary Release Post] https://reliverse.org/relivator/v126`,
  );
  consola.info(
    `Help ${reliverse.framework.name} become even better! Please, star the repo – https://github.com/blefnk/relivator`,
  );

  if (env.NODE_ENV === "production" && authProvider === "clerk") {
    consola.info(
      "Clerk: make sure to connect the domain in the Clerk dashboard so services like PageSpeed will work.",
    );
  }

  if (env.NODE_ENV === "development") {
    consola.info(
      "For experienced users: run 'pnpm latest' to update all dependencies to the latest versions.",
    );
    consola.info(
      "Meet quality standards: run 'pnpm appts' to get linting, formatting, and more.\n",
    );

    // consola.info(
    //   "Unstable: try 'pnpm dev:i' & faster build with 'pnpm build:i': https://turbo.build/repo",
    // );

    if (semver.gt(reliverse.framework.version, frameworkVersion)) {
      consola.warn(
        // eslint-disable-next-line @stylistic/max-len
        `🟢 A new ${reliverse.framework.name} ${reliverse.framework.version} version is available! The current version is ${frameworkVersion}.
        Download: ${reliverse.framework.repo}/releases/tag/${reliverse.framework.version}`,
      );
    }

    // if (semver.lt(reliverse.framework.version, frameworkVersion)) {
    //   consola.warn(
    // eslint-disable-next-line @stylistic/max-len
    //     `🟡 The currently used ${frameworkVersion} version (${reliverse.framework.version}) is older than the bootstrapped version (${reliverse.framework.name}).
    //     This might lead to unexpected behavior.`,
    //   );
    // }

    // consola.info(
    // eslint-disable-next-line @stylistic/max-len
    //   "Please find Q21 in the FAQ of README.md. Copy the adapted bun scripts and replace the current ones in package.json (scripts for other package managers coming soon).",
    // );
  }
};

if (turbo) {
  logInfo(
    `\nThe build will now be launched using the pnpm turbo:build command and the turbo.json config (https://turbo.build).
    Ensure that you have the turbo.json file (not turbo.disabled.json).
    However, there is a possibility that the VSCode terminal may not exit automatically.
    If this happens, just press Cmd/Ctrl+C to close the process manually.\n`,
  );
} else {
  const hotline = `▲ Hotline: ${reliverse.social.discord}`;
  const framework = `▲ Framework: ${reliverse.framework.name} v${frameworkVersion}`;
  const engine = `▲ Engine: ${reliverse.engine.name} v${engineVersion}`;

  logImportantInfo(`${hotline} ${framework} ${engine}`);
  logSupportMessage();
  logUpdateInstructions();

  // eslint-disable-next-line unicorn/no-process-exit
  process.exit(0);
}
