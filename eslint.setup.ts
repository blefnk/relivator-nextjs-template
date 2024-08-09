import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";

// ▶️ pnpm tsx eslint.setup.ts
// TODO: Move this code to a separate package
// Utils for setting up ESLint configuration file
const main = defineCommand({
  args: {
    deprecated: {
      description: "@blefnk/eslint-reliverse-addons/deprecated",
      type: "boolean",
    },
    toggler: {
      description: "@blefnk/eslint-reliverse-addons/toggler",
      type: "boolean",
    },
  },
  meta: {
    name: "eslint-reliverse-addons",
    description: "@blefnk/eslint-reliverse-addons",
    version: "0.0.0-canary.0",
  },
  async run() {
    consola.info("More ESLint utilities coming soon! 🚀");

    const message = defineAddon(
      "📦",
      "@blefnk/eslint-reliverse-addons",
      "ESLint utility to apply",
      "<enter>",
    );

    const selected = await consola.prompt(message, {
      options: [
        "Test how well I know ESLint",
        "Switch between default and recommended config",
        "Find deprecated rules",
        "Toggle all ESLint rules",
      ] as const,
      type: "select",
    });

    if (typeof selected !== "string") {
      // eslint-disable-next-line unicorn/no-process-exit
      process.exit(0);
    }

    switch (selected) {
      case "Find deprecated rules":
        consola.info(
          "💡 py addons/scripts/reliverse/relimter/python/tasks/find-eslint-dep-rules.py",
        );
        consola.info(
          "Ensure you've Python installed, learn more in the Scripts and Python sections of README.md file",
        );
        break;

      case "Switch between default and recommended config":
        consola.info(
          // eslint-disable-next-line @stylistic/max-len
          "💡 Run `pnpm reli:setup` to switch between `default` (almost every rules disabled) and `recommended` ESLint configs",
        );
        break;

      case "Test how well I know ESLint":
        consola.info("💡 pnpm reli:academy");
        break;

      case "Toggle all ESLint rules":
        consola.info(
          "py addons/scripts/reliverse/relimter/python/tasks/toggle-all-eslint-rules.py",
        );
        consola.info(
          "Ensure you've Python installed, learn more in the Scripts and Python sections of README.md file",
        );
        break;

      default:
        break;
    }
  },
});

const flags = ["--academy", "--preset", "--deprecated", "--toggler"] as const;

function withArgument() {
  const flagged = process.argv[2] as (typeof flags)[number];

  consola.info("More ESLint utilities coming soon! 🚀\n");

  switch (flagged) {
    case "--academy":
      consola.info("💡 pnpm reli:academy");
      break;

    case "--deprecated":
      consola.info(
        "💡 py addons/scripts/reliverse/relimter/python/tasks/find-eslint-dep-rules.py",
      );
      consola.info(
        "Ensure you've Python installed, learn more in the Scripts and Python sections of README.md file",
      );
      break;

    case "--preset":
      consola.info(
        // eslint-disable-next-line @stylistic/max-len
        "💡 Run `pnpm reli:setup` to switch between `default` (almost every rules disabled) and `recommended` ESLint configs",
      );
      break;

    case "--toggler":
      consola.info(
        "💡 py addons/scripts/reliverse/relimter/python/tasks/toggle-all-eslint-rules.py",
      );
      consola.info(
        "Ensure you've Python installed, learn more in the Scripts and Python sections of README.md file",
      );
      break;

    default:
      break;
  }
}

const withFlag = flags.some((flag) => process.argv.includes(flag));

if (withFlag) {
  withArgument();
} else {
  runMain(main);
}

export default main;
