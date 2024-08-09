import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import pc from "picocolors";

const main = defineCommand({
  meta: {
    name: "relimter",
    description: "@reliverse/addons-relimter/eslint",
    version: "0.0.0-canary.0",
  },
  async run() {
    const message = defineAddon(
      "📦",
      "@reliverse/addons-relimter/eslint",
      "codemod tasks to apply",
      "<enter>",
    );

    const selected = await consola.prompt(message, {
      options: ["eslint-setup-ts", "exit"] as const,
      type: "select",
    });

    switch (selected) {
      case "eslint-setup-ts":
        await import("../../../../../eslint.setup");
        break;

      case "exit":
        break;

      default:
        break;
    }

    consola.success(
      pc.dim("@reliverse/addons-relimter/eslint finished successfully"),
    );
  },
});

runMain(main);

export default main;
