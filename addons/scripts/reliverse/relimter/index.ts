import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import pc from "picocolors";

const flags = [
  "--astx",
  "--core",
  "--eslint",
  "--magicast",
  "--putout",
  "--python",
] as const;

// pnpm addons --relimter
const main = defineCommand({
  args: {
    astx: {
      description: "@reliverse/addons-relimter/astx",
      type: "boolean",
    },
    core: {
      description: "@reliverse/addons-relimter/core",
      type: "boolean",
    },
    eslint: {
      description: "@reliverse/addons-relimter/eslint",
      type: "boolean",
    },
    magicast: {
      description: "@reliverse/addons-relimter/magicast",
      type: "boolean",
    },
    putout: {
      description: "@reliverse/addons-relimter/putout",
      type: "boolean",
    },
    python: {
      description: "@reliverse/addons-relimter/python",
      type: "boolean",
    },
  },
  meta: {
    name: "relimter",
    description: "@reliverse/addons-relimter",
    version: "0.0.0-canary.0",
  },
  async run() {
    const message = defineAddon(
      "📦",
      "@reliverse/addons-relimter",
      "codemod provider to activate",
      "<enter>",
    );

    const selected = await consola.prompt(message, {
      options: [
        "astx",
        "core",
        "eslint",
        "magicast",
        "putout",
        "python",
      ] as const,
      type: "select",
    });

    switch (selected) {
      case "astx":
        await import("./astx");
        break;

      case "core":
        await import("./core");
        break;

      case "eslint":
        await import("./eslint");
        break;

      case "magicast":
        await import("./magicast");
        break;

      case "putout":
        await import("./putout");
        break;

      case "python":
        consola.info("🐍 Please use: pnpm reli:manager");
        break;

      default:
        break;
    }

    consola.success(pc.dim("@reliverse/addons-relimter process completed"));
  },
});

async function withArgument() {
  const flagged = process.argv[2] as (typeof flags)[number];

  switch (flagged) {
    case "--astx":
      await import("./astx");
      break;

    case "--core":
      await import("./core");
      break;

    case "--eslint":
      await import("./eslint");
      break;

    case "--magicast":
      await import("./magicast");
      break;

    case "--putout":
      await import("./putout");
      break;

    case "--python":
      consola.info("🐍 Please use: pnpm reli:manager");
      break;

    default:
      break;
  }
}

const withFlag = flags.some((flag) => process.argv.includes(flag));

if (withFlag) {
  await withArgument();
} else {
  runMain(main);
}

export default main;
