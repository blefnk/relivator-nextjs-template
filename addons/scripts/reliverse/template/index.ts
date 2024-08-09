import { defineAddon } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";

const flags = ["--first", "--second"] as const;

const main = defineCommand({
  args: {
    first: {
      description: "@author/title-first",
      type: "boolean",
    },
    second: {
      description: "@author/title-second",
      type: "boolean",
    },
  },
  meta: {
    name: "title",
    description: "@author/title",
    version: "0.0.0-canary.0",
  },
  async run() {
    const message = defineAddon("📦", "@author/title", "what to do", "<enter>");
    const selected = await consola.prompt(message, {
      options: ["first", "second", "third"] as const,
      type: "select",
    });

    switch (selected) {
      case "first":
        consola.info("First option selected");
        break;

      case "second":
        consola.info("Second option selected");
        break;

      default:
        break;
    }

    consola.info(
      "👋 You've just tested @reliverse/addons-template. Use it to create your own addons. Enjoy!",
    );
  },
});

function withArgument() {
  const flagged = process.argv[2] as (typeof flags)[number];

  switch (flagged) {
    case "--first":
      consola.info("Addon executed with --first flag");
      break;

    case "--second":
      consola.info("Addon executed with --second flag");
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
