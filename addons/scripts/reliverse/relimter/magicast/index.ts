import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import pc from "picocolors";

const main = defineCommand({
  meta: {
    name: "relimter",
    description: "@reliverse/addons-relimter/magicast",
    version: "0.0.0-canary.0",
  },
  async run() {
    const message = defineAddon(
      "📦",
      "@reliverse/addons-relimter/magicast",
      "codemod tasks to apply",
      "<enter>",
    );

    const selected = await consola.prompt(message, {
      options: ["all", "exit"] as const,
      type: "select",
    });

    switch (selected) {
      case "all":
        await import("./tasks");
        break;

      case "exit":
        break;

      default:
        break;
    }

    consola.success(
      pc.dim("@reliverse/addons-relimter/magicast finished successfully"),
    );
  },
});

runMain(main);

export default main;
