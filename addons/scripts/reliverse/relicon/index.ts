import { patchGitignore } from "@/scripts/reliverse/relimter/core/tasks/patch-gitignore-file";
import { sortArgs } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import pc from "picocolors";
import task from "tasuku";

const isSymbol = (a: unknown): a is symbol => typeof a === "symbol";

// ? @reliverse/relicon v0.0.0-canary.0
// 🖊️ A headless CLI tool that helps you edit your configs easily!
// TODO: Move the content of `relicon` folder to its own separate package
// TODO: [@reliverse/relicon](https://github.com/reliverse/relicon) repo.
// To use @reliverse/relicon just run `pnpm relicon:unstable` and make your choice.
// But we're recommending to commit your changes before applying any of the actions.
// ! USE AT OWN RISK ! IT IS NOT FINISHED YET AND NOT implemented yet !
// ! This script is still under development and may not work as expected.
consola.info("@reliverse/relicon is still under dev, may not work as expected");
consola.info("Make sure to commit your changes before applying any actions");

const main = defineCommand({
  args: sortArgs({
    all: {
      description: "Make all optimizations without prompting",
      type: "boolean",
    },
  }),
  meta: {
    name: "relicon",
    description:
      "Configure your configs the way a guru would, in a matter of seconds!",
  },
  async run({ args }) {
    const ops = {
      crud: args.crud || args.all || null,
      exit: args.exit || args.all || null,
      vscode: args.vscode || args.all || null,
    };

    if (Object.values(ops).every((op) => op === null)) {
      const answer = await consola.prompt(
        `«Make your choice!» © The Phantom of the Opera \n(press ${pc.cyan("<enter>")} to choose):\n`,
        {
          options: [
            {
              label: "Run `.vscode` folder presets switcher",
              value: "vscode",
            },
            {
              label: "Use CRUD mode (not implemented yet)",
              value: "crud",
            },
            {
              label: "Exit",
              value: "exit",
            },
          ],
          type: "select",
        },
      );

      if (isSymbol(answer)) {
        process.exit(0);
      }
    }

    if (ops.vscode) {
      await task(
        "Run `.vscode` folder presets switcher",
        async ({ setTitle }) => {
          await patchGitignore();

          setTitle(
            "The following files has been overwritten: settings.json, extensions.json, launch.json\n",
          );
        },
      );
    }

    if (ops.crud) {
      consola.info("CRUD mode is not implemented yet");
    }

    if (ops.exit) {
      process.exit(0);
    }
  },
});

runMain(main).then(() => {
  consola.success("All @reliverse/relicon tasks have been completed\n");
  process.exit(0);
});
