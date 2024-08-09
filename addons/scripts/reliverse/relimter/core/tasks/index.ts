import { patchGitignore } from "@/scripts/reliverse/relimter/core/tasks/patch-gitignore-file";
import { sortArgs } from "@/scripts/utils";
import { defineCommand, runMain } from "citty";
import consola from "consola";
import pc from "picocolors";
import task from "tasuku";

("tasuku");

const scriptStatus = "unstable" as "stable" | "unstable";
const isSymbol = (a: unknown): a is symbol => typeof a === "symbol";

// ? @reliverse/addons-relimter v0.0.0-canary.0
// ! This script is still under development and may not work as expected.
// Codemods are transformations that run on your codebase programmatically.
// This allows a large number of changes to be programmatically
// applied without having to manually go through every file.
// Reliverse and Next.js provide Codemod transformations to help upgrade your Next.js codebase when an API is updated
// or deprecated. To use @next/codemod @see https://nextjs.org/docs/app/building-your-application/upgrading/codemods
// To use @reliverse/addons-relimter just run `pnpm fix:codemod-next-community` and make your choice.
// But we're recommending to commit your changes before running any of the codemod.
// ! USE AT OWN RISK ! IT IS NOT FINISHED YET AND NOT TESTED TOO MUCH !
consola.info(
  "@reliverse/addons-relimter is still under dev, may not work as expected",
);
consola.info(
  "Make sure to commit your changes before running any of the codemod",
);

const main = defineCommand({
  args: sortArgs({
    all: {
      description: "Make all optimizations without prompting",
      type: "boolean",
    },
  }),
  meta: {
    name: "codemod",
    description: "Apply @reliverse/addons-relimter transformations",
  },
  async run({ args }) {
    const ops = {
      gitignore: args.gitignore || args.all || null,
    };

    if (Object.values(ops).every((op) => op === null)) {
      // @ts-expect-error TODO: fix
      const answers: any[] = await consola.prompt({
        name: "optimizations",
        choices: [
          {
            title: "Update .gitignore",
            value: "gitignore",
          },
        ],
        // eslint-disable-next-line @stylistic/max-len
        message: `Choose optimizations to apply (press ${pc.cyan("<space>")} to select | ${pc.cyan("<enter>")} to apply\n`,
        type: "multiselect",
      });

      if (isSymbol(answers)) {
        process.exit(0);
      }

      for (const answer of answers) {
        ops[answer as keyof typeof ops] = true;
      }
    }

    if (ops.gitignore) {
      await task("Add new values to .gitignore", async ({ setTitle }) => {
        await patchGitignore();
        setTitle("New values have been added to .gitignore");
      });
    }
  },
});

if (scriptStatus === "unstable") {
  consola.success(
    // eslint-disable-next-line @stylistic/max-len
    "Canceled. This script is still under development and may not work as expected. Please wait for the stable version.",
  );
  process.exit(0);
} else {
  runMain(main).then(() => {
    consola.success("All @reliverse optimizations have been applied");
    process.exit(0);
  });
}
