import { getRootDirname } from "@reliverse/fs";
import consola from "consola";
import fs from "fs-extra";
import { join } from "pathe";
import pc from "picocolors";
import task from "tasuku";

// Please visit the Scripts section in README.md file to learn more about script
// Just run `pnpm reli:relicon` from the root folder to run the switcher script
// TODO: Implement Backup Logic
const projectRoot = getRootDirname(import.meta.url, 5);
const vscodeDirectory = join(projectRoot, ".vscode");

const presetsDirectory = join(
  vscodeDirectory,
  "../addons/scripts/reliverse/presets/vscode",
);

// Preset types (using `as const` to enable autocompletion)
const presets = ["nothing", "minimal", "default", "ultimate"] as const;

// Create a type from the array elements
type Preset = (typeof presets)[number];

// Main function to switch presets
export async function activateVSCodePreset(preset: Preset) {
  const addon = pc.dim("[@reliverse/addons-presets/vscode]");
  const startMessage = `Switching to '${preset}' VSCode preset...`;
  const contentMessage =
    "🙏 Please consider giving a star or contributing to Relivator on GitHub and donating on Patreon!\n🤝 Thank you! (https://patreon.com/blefnk | https://github.com/blefnk/relivator-nextjs-template)";

  const finishMessage = `${addon} VSCode switched to use ${pc.cyan(preset)} preset!`;

  if (!presets.includes(preset)) {
    consola.fail(`Invalid preset: ${preset}`);
    consola.info(`Available presets: ${presets.join(", ")}`);

    return;
  }

  const presetDirectory = join(presetsDirectory, preset.replace("-", "/"));

  await task(startMessage, async ({ setTitle }) => {
    await copyFiles(presetDirectory, vscodeDirectory);
    consola.info(contentMessage);
    setTitle(finishMessage);
  });
}

// Function to copy files
async function copyFiles(sourceDirectory: string, targetDirectory: string) {
  if (
    !fs.existsSync(sourceDirectory)

    // consola.warn(
    //   `Copying files from <${sourceDirectory}> to <${targetDirectory}>`,
    // );
  ) {
    throw new Error(`Source directory does not exist <${sourceDirectory}>`);
  }

  for (const file of fs.readdirSync(sourceDirectory)) {
    const sourceFile = join(sourceDirectory, file);
    const targetFile = join(targetDirectory, file);

    fs.copyFileSync(sourceFile, targetFile);
  }
}
