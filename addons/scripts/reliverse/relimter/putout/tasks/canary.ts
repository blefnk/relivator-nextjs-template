import consola from "consola";
import destr from "destr";
import { readFile, writeFile } from "fs/promises";
import pc from "picocolors";

type ProcessorOption = Record<string, "off" | "on">;

type PutoutConfig = {
  processors: [string, "off" | "on"][];
};

// TODO: Make a fork of @coderaiser/putout and publish it as @reliverse/putout
async function togglePutoutTS(
  tsFlag: boolean,
  finishFlag: boolean,
  startFlag: boolean,
) {
  const filePath = ".putout.json";

  try {
    // Read the contents of .putout.json
    const content = await readFile(filePath, "utf8");
    const config: PutoutConfig = destr(content);

    // Create a map for processor status
    const processorOptions: ProcessorOption = {};

    for (const [processor, status] of config.processors) {
      processorOptions[processor] = status;
    }

    // Toggle the "typescript" option
    processorOptions.typescript = tsFlag ? "on" : "off";

    // Update the processors array in the config
    config.processors = Object.entries(processorOptions);

    // Write dim the modified content to .putout.json
    await writeFile(filePath, JSON.stringify(config, null, 2));

    // Log messages based on flags
    if (!tsFlag) {
      consola.info(
        // eslint-disable-next-line @stylistic/max-len
        `${pc.cyan("@reliverse/addons-relimter/putout")} ⌛ Please wait, Putout is processing ALL your files (TypeScript processor disabled)...`,
      );

      if (finishFlag) {
        consola.info(
          `${pc.cyan("@reliverse/addons-relimter/putout")} 💡 If you get a lot of issues, try running 'pnpm appts' or 'pnpm lint:putout --disable-all' (or fix them, or disable rules manually); for more information run 'pnpm putout --help' (https://github.com/coderaiser/putout)\n`,
        );
      }
    } else {
      consola.info(
        // eslint-disable-next-line @stylistic/max-len
        `${pc.cyan("@reliverse/addons-relimter/putout")} Please wait, Putout is processing ONLY files in the src directory (TypeScript processor enabled)`,
      );

      if (finishFlag) {
        consola.info(
          `${pc.cyan("@reliverse/addons-relimter/putout")} 💡 If you get a lot of issues, try running 'pnpm appts' or 'pnpm cross-env NO_ESLINT=1 putout src --disable-all' (or fix them, or disable rules manually); for more information run 'pnpm putout --help' (https://github.com/coderaiser/putout)\n`,
        );
      }
    }

    if (startFlag) {
      consola.info(
        `Current TypeScript processor status: ${processorOptions.typescript}`,
      );
    }
  } catch (error) {
    consola.error("Error toggling .putout.json:", error);
  }
}

// Check if --ts-on, --ts-off, and --finish flags are provided
const tsOnFlag = process.argv.includes("--ts-on");
const tsOffFlag = process.argv.includes("--ts-off");
const finishFlag = process.argv.includes("--finish");
const startFlag = process.argv.includes("--start");

if (tsOnFlag || tsOffFlag) {
  const tsFlag = tsOnFlag;

  // Call the function to toggle the .putout.json file
  togglePutoutTS(tsFlag, finishFlag, startFlag);
} else {
  consola.info(
    "No --ts-on or --ts-off flag provided. Script will not execute.",
  );
}
