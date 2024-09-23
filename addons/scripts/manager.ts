import { debugEnabled } from "~/../reliverse.config";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import superjson from "superjson";

import { getRandomQuote } from "@/scripts/reliverse/quotes";
import { defineAddon } from "@/scripts/utils";

// Reliverse Addons: Reliverse CMS Devtools.
// Please find more details about this folder
// in the `Scripts` section of README.md file.

export type Addon =
  | "academy"
  | "disabler"
  | "presets"
  | "relimter"
  | "setup"
  | "template";

export const addonPaths: Record<Addon, string> = {
  academy: "./reliverse/academy",
  disabler: "./reliverse/disabler",
  presets: "./reliverse/presets",
  relimter: "./reliverse/relimter",
  setup: "./reliverse/relicon/setup",
  template: "./reliverse/template",
};

export const addonFlags: Record<Addon, string> = {
  academy: "--academy",
  disabler: "--disabler",
  presets: "--presets",
  relimter: "--relimter",
  setup: "--setup",
  template: "--template",
};

export type AddonFlag = (typeof addonFlags)[Addon];

export const flags: AddonFlag[] = Object.values(addonFlags);

export const getAddonFromFlag = (flag: AddonFlag): Addon | undefined =>
  Object.keys(addonFlags).find(
    (key) => addonFlags[key as Addon] === flag,
  ) as Addon;

export const runAddon = async (name: Addon) => {
  try {
    const path = addonPaths[name];

    if (debugEnabled) {
      consola.info(`Importing addon from path: ${path}`);
    }

    const addonModule = await import(path);

    if (debugEnabled) {
      consola.info(`Addon imported: ${superjson.stringify(addonModule)}`);
    }

    // Check if the imported module has the correct function and call it
    if (
      name === "setup" &&
      addonModule.runReliverseSetup &&
      !process.argv.some((arg) => flags.includes(arg as AddonFlag))
    ) {
      await addonModule.runReliverseSetup();
    }
  } catch (error) {
    consola.error(`Failed to run ${name} addon`, error);
  }
};

const handleAddonSelection = async () => {
  const addon = defineAddon(
    "📦",
    "@reliverse/addons",
    "which addon to run",
    "<enter>",
  );

  await getRandomQuote();

  const selected = await consola.prompt(addon, {
    options: Object.keys(addonPaths) as Addon[],
    type: "select",
  });

  if (typeof selected !== "string") {
    process.exit(0);
  }

  await runAddon(selected as Addon);
};

const handleFlaggedArgument = async () => {
  const flagged = process.argv[2] as AddonFlag;
  const addon = getAddonFromFlag(flagged);

  if (addon) {
    consola.info(`Running ${addon} addon`);
    await runAddon(addon);
  } else {
    consola.error("Provided flag is invalid. Allowed flags:", flags.join(", "));
  }
};

const main = defineCommand({
  args: {
    academy: {
      description: "@reliverse/academy",
      type: "boolean",
    },
    disabler: {
      description: "@reliverse/disabler",
      type: "boolean",
    },
    presets: {
      description: "@reliverse/presets",
      type: "boolean",
    },
    relimter: {
      description: "@reliverse/relimter",
      type: "boolean",
    },
    setup: {
      description: "@reliverse/setup",
      type: "boolean",
    },
    template: {
      description: "@reliverse/template",
      type: "boolean",
    },
  },
  meta: {
    name: "addons",
    description: "@reliverse/addons",
    version: "0.0.0-canary.0",
  },
  async run() {
    if (process.argv.some((arg) => flags.includes(arg as AddonFlag))) {
      await handleFlaggedArgument();
    } else {
      await handleAddonSelection();
    }
  },
});

// @see https://unjs.io/packages/citty
runMain(main);

// @see https://github.com/blefnk/relivator-nextjs-template
// @see https://github.com/blefnk/reliverse-website-builder
export default main;
