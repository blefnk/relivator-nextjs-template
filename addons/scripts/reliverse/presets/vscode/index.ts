import { activateVSCodePreset } from "@/scripts/reliverse/presets/utils";
import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";

const main = defineCommand({
  meta: {
    name: "presets",
    description: "@reliverse/addons-presets/vscode",
    version: "0.0.0-canary.0",
  },

  async run() {
    const message = defineAddon(
      "📦",
      "@reliverse/addons-presets/vscode",
      "VSCode preset to apply",
      "<enter>",
    );

    const selected = await consola.prompt(message, {
      options: ["nothing", "minimal", "default", "ultimate"] as const,
      type: "select",
    });

    if (typeof selected !== "string") {
      process.exit(0);
    }

    await activateVSCodePreset(selected);
  },
});

runMain(main);

export default main;
