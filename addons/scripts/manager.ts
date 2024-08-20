import { getRandomQuote } from "@/scripts/reliverse/quotes";
import { defineAddon } from "@/scripts/utils";
import { debugEnabled } from "~/../reliverse.config";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import superjson from "superjson";

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
  presets: "./reliverse/presets",
  setup: "./reliverse/relicon/setup",
  relimter: "./reliverse/relimter",
  disabler: "./reliverse/disabler",
  template: "./reliverse/template",
};

export const addonFlags: Record<Addon, string> = {
  academy: "--academy",
  presets: "--presets",
  setup: "--setup",
  relimter: "--relimter",
  disabler: "--disabler",
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
    type: "select",
    options: Object.keys(addonPaths) as Addon[],
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
  meta: {
    description: "@reliverse/addons",
    name: "addons",
    version: "0.0.0-canary.0",
  },
  args: {
    academy: {
      type: "boolean",
      description: "@reliverse/academy",
    },
    presets: {
      type: "boolean",
      description: "@reliverse/presets",
    },
    setup: {
      type: "boolean",
      description: "@reliverse/setup",
    },
    relimter: {
      type: "boolean",
      description: "@reliverse/relimter",
    },
    disabler: {
      type: "boolean",
      description: "@reliverse/disabler",
    },
    template: {
      type: "boolean",
      description: "@reliverse/template",
    },
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
