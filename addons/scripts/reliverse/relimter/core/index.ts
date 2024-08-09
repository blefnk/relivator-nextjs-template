import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import pc from "picocolors";

const main = defineCommand({
  meta: {
    name: "core",
    description: "@reliverse/addons-relimter/core",
    version: "0.0.0-canary.0",
  },
  async run() {
    const message = defineAddon(
      "📦",
      "@reliverse/addons-relimter/core",
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
      pc.dim("@reliverse/addons-relimter/core finished successfully"),
    );
  },
});

runMain(main);

export default main;
