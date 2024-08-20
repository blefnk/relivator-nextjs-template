import { log } from "@clack/prompts";
import { select } from "@inquirer/prompts";
import consola from "consola";

import { env } from "~/env";

/* eslint-disable unicorn/no-process-exit */
// @reliverse/addons all-in-one manager (v0.0.0-canary.0) 🐞 not fully finished currently
// ▶️ pnpm tsx reliverse.addons.ts

if (env.NODE_ENV !== "development") {
  consola.error("reliverse.addons.ts is only intended for development use");
  process.exit(0);
}

async function main() {
  try {
    const selection = await select({
      choices: [
        {
          name: "Exit",
          value: "exit",
        },
        {
          name: "Open CLI scripts runner",
          value: "runner",
        },
        {
          name: "Disable or enable specific addon",
          value: "disabler-addon",
        },
        {
          name: "Disable something in src/app/[locale]",
          value: "disabler-pages",
        },
      ] as const,
      default: "runner",
      message:
        // eslint-disable-next-line @stylistic/max-len
        "Welcome to @reliverse/addons! It is not fully finished yet, but you can already test the future Addons Manager. Please commit your current code to GitHub or a similar platform. So, what would you like to do?",
    });

    if (selection === "exit") {
      process.exit(0);
    }

    if (selection === "runner") {
      await import("@/scripts/manager");
    }

    if (selection === "disabler-addon") {
      log.warn("This feature is not yet implemented");
    }

    if (selection === "disabler-pages") {
      await import("@/scripts/reliverse/disabler");
    }
  } catch (error) {
    if (!(error as any).message.includes("User force closed")) {
      consola.error("An error occurred:", error);
    }

    process.exit(1);
  }
}

main();
