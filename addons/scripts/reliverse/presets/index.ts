import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";

const main = defineCommand({
  meta: {
    name: "presets",
    description: "@reliverse/addons-presets",
    version: "0.0.0-canary.0",
  },

  async run() {
    const message = defineAddon(
      "📦",
      "@reliverse/addons-presets",
      "preset to apply",
      "<enter>",
    );

    const selected = await consola.prompt(message, {
      options: ["vscode"] as const,
      type: "select",
    });

    // eslint-disable-next-line sonarjs/no-small-switch
    switch (selected) {
      case "vscode":
        await import("./vscode");
        break;

      default:
        break;
    }
  },
});

runMain(main);

export default main;
