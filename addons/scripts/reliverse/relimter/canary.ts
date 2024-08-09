import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import pc from "picocolors";

// Relivator v1.3.0-canary.x Edition
// pnpm tsx addons/scripts/reliverse/relimter/canary.ts
// TODO: Fix "Cannot convert a Symbol value to a string" when using Cmd/Ctrl+C
const flagsList = [
  {
    name: "astx",
    description: "@reliverse/relimter-astx",
  },
  {
    name: "core",
    description: "@reliverse/relimter-core",
  },
  {
    name: "eslint",
    description: "@reliverse/relimter-eslint",
  },
  {
    name: "magicast",
    description: "@reliverse/relimter-magicast",
  },
  {
    name: "putout",
    description: "@reliverse/relimter-putout",
  },
  {
    name: "ruff",
    description: "@reliverse/relimter-ruff",
  },
];

const main = defineCommand({
  // TODO: Map
  args: {
    astx: {
      description: "@reliverse/relimter-astx",
      type: "boolean",
    },
    core: {
      description: "@reliverse/relimter-core",
      type: "boolean",
    },
    eslint: {
      description: "@reliverse/relimter-eslint",
      type: "boolean",
    },
    magicast: {
      description: "@reliverse/relimter-magicast",
      type: "boolean",
    },
    putout: {
      description: "@reliverse/relimter-putout",
      type: "boolean",
    },
    ruff: {
      description: "@reliverse/relimter-ruff",
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
      options: flagsList.map((flag) => flag.name),
      type: "select",
    });

    await import(`./${selected}`);

    consola.success(pc.dim("@reliverse/addons-relimter process completed"));
  },
});

async function mainFlags() {
  const flag = flagsList.find((flag) =>
    process.argv.includes(`--${flag.name}`),
  );

  if (flag) {
    await import(`./${flag.name}`);
  }
}

const flags = flagsList.map((flag) => `--${flag.name}`);
const withFlag = flags.some((flag) => process.argv.includes(flag));

if (withFlag) {
  await mainFlags();
} else {
  runMain(main);
}

export default main;
