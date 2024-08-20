import type { TarFileItem } from "nanotar";

import { checkbox, confirm, input, select, Separator } from "@inquirer/prompts";
import {
  directoryExists,
  getFoldersInDirectory,
  getRootDirname,
  removeFile,
  removeFolder,
} from "@reliverse/fs";
import { consola } from "consola";
import fs from "fs-extra";
import { createTarGzip, parseTarGzip } from "nanotar";
import { dirname, join } from "pathe";
import pc from "picocolors";

// 👉 pnpm reli:disabler
// ? Hi, and welcome! The @reliverse/disabler addon can zip project folders
// ? you choose, allowing for faster builds when you don't need specific folders during development.
// ? To use this script, Knip and Putout RulesDisabled versions will be activated.
// ? This will overwrite your current configurations! But don't worry, we'll archive your current configs as well.
// ? You can extract these folders and configs when needed. Currently, works only with src/app/[locale]/* folders.
// ! 🔥 PLEASE MAKE A COMMIT BEFORE USING THIS SCRIPT, AS IT IS STILL EXPERIMENTAL !!!
const rootDirectory = getRootDirname(import.meta.url, 4);

// const configsFolder = join(currentDirname, "../relicon/setup/configs");
// const knipConfig = join(rootDirectory, "knip.json");
// const knipRulesDisabledConfig = join(configsFolder, "knip.rules-disabled.json");
// const putoutConfig = join(rootDirectory, ".putout.json");
// const putoutRulesDisabledConfig = join(
//   configsFolder,
//   ".putout.rules-disabled.json",
// );
const srcAppLocaleDirectory = join(rootDirectory, "src/app/[locale]");

type FileInput = {
  data?: Buffer;
  name: string;
};

async function createArchive(output: string, files: FileInput[]) {
  try {
    consola.start("Creating tar archive...");
    const tarData = await createTarGzip(files);

    await fs.outputFile(output, tarData);
    consola.success(`Archive created at ${output}`);
  } catch (error) {
    consola.error("Failed to create archive", error);
  }
}

async function getFileInputsFromDirectory(
  directoryPath: string,
  basePath: string = "",
): Promise<FileInput[]> {
  let fileInputs: FileInput[] = [];
  const entries = await fs.readdir(directoryPath, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const fullPath = join(directoryPath, entry.name);
    const relativePath = join(basePath, entry.name);

    if (entry.isDirectory()) {
      // eslint-disable-next-line unicorn/prefer-spread
      fileInputs = fileInputs.concat(
        await getFileInputsFromDirectory(fullPath, relativePath),
      );
    } else {
      const data = await fs.readFile(fullPath);

      fileInputs.push({
        name: relativePath,
        data,
      });
    }
  }

  return fileInputs;
}

async function extractArchive(
  input: string,
  outputDirectory: string,
  foldersToExtract: string[],
): Promise<null | TarFileItem<Uint8Array>[]> {
  try {
    consola.start("Extracting tar archive...");
    const tarData = await fs.readFile(input);
    const files = await parseTarGzip(tarData);

    const filesToExtract = files.filter((file) =>
      foldersToExtract.some((folder) => file.name.startsWith(folder)),
    );

    for (const file of filesToExtract) {
      const filePath = join(outputDirectory, file.name);
      const directory = dirname(filePath);

      if (!(await fs.pathExists(directory))) {
        await fs.ensureDir(directory);
      }

      if (file.data) {
        await fs.outputFile(filePath, Buffer.from(file.data));
        consola.success(`Extracted ${file.name}`);
      } else {
        consola.warn(`No data found for ${file.name}`);
      }
    }

    consola.success("Extraction complete");

    return files.filter((file) => !filesToExtract.includes(file));
  } catch (error) {
    consola.error("Failed to extract archive", error);

    return null;
  }
}

async function createArchiveFromFiles(
  output: string,
  files: TarFileItem<Uint8Array>[],
) {
  try {
    consola.start("Creating updated tar archive...");
    const updatedFiles: FileInput[] = files.map((file) => ({
      name: file.name,
      data: file.data ? Buffer.from(file.data) : undefined,
    }));

    const tarData = await createTarGzip(updatedFiles);

    await fs.outputFile(output, tarData);
    consola.success(`Updated archive created at ${output}`);
  } catch (error) {
    consola.error("Failed to create updated archive", error);
  }
}

async function generateUniqueFilePath(
  basePath: string,
  extension: string,
): Promise<string> {
  let counter = 0;
  let filePath = `${basePath}.${extension}`;

  while (await fs.pathExists(filePath)) {
    ++counter;
    filePath = `${basePath}_${counter}.${extension}`;
  }

  return filePath;
}

async function generateUniqueDirectoryPath(basePath: string): Promise<string> {
  let counter = 0;
  let directoryPath = basePath;

  while (await fs.pathExists(directoryPath)) {
    ++counter;
    directoryPath = `${basePath}-${counter}`;
  }

  return directoryPath;
}

async function moveFiles(
  sourceDirectory: string,
  targetDirectory: string,
): Promise<void> {
  const entries = await fs.readdir(sourceDirectory, {
    withFileTypes: true,
  });

  for (const entry of entries) {
    const sourcePath = join(sourceDirectory, entry.name);
    const targetPath = join(targetDirectory, entry.name);

    if (entry.isDirectory()) {
      if (!(await fs.pathExists(targetPath))) {
        await fs.ensureDir(targetPath);
      }

      await moveFiles(sourcePath, targetPath);

      if (
        (await directoryExists(sourcePath)) &&
        (await fs.readdir(sourcePath)).length === 0
      ) {
        await removeFolder(sourcePath);
      }
    } else if (await fs.pathExists(sourcePath)) {
      if (!(await fs.pathExists(targetPath))) {
        await fs.rename(sourcePath, targetPath);
      } else {
        consola.warn(`File not moved (already exists): ${targetPath}`);
      }
    }
  }

  if ((await fs.readdir(sourceDirectory)).length === 0) {
    await removeFolder(sourceDirectory);
  }
}

// To use this script, Knip and Putout RulesDisabled versions will be activated.
// This will overwrite your current configurations! But don't worry, we'll archive your current configs as well.
async function main() {
  const acceptanceMessage = pc.reset(`👋 Hi, and welcome! The @reliverse/disabler addon can zip project
    folders you choose, allowing for faster builds when you don't need specific folders during development.
    You can extract these folders when needed. Currently, works only with src/app/[locale]/* folders.
    🔥 Please make a commit before using this script, as it is still experimental!\n
    ${pc.bold("Are you ready?")}\n`);

  const accepted = await confirm({
    default: false,
    message: acceptanceMessage,
  });

  if (!accepted) {
    consola.info("User did not accept the changes. Exiting.");
    process.exit(0);
  }

  // const knipConfigExists = await fileExists(knipConfig);
  // const knipRulesDisabledConfigExists = await fileExists(
  //   knipRulesDisabledConfig,
  // );
  // if (knipConfigExists) {
  //   await removeFile(knipConfig);
  // }
  // if (knipRulesDisabledConfigExists) {
  //   await fs.copy(knipRulesDisabledConfig, knipConfig);
  // }
  // const putoutConfigExists = await fileExists(putoutConfig);
  // const putoutRulesDisabledConfigExists = await fileExists(
  //   putoutRulesDisabledConfig,
  // );
  // if (putoutConfigExists) {
  //   await removeFile(putoutConfig);
  // }
  // if (putoutRulesDisabledConfigExists) {
  //   await fs.copy(putoutRulesDisabledConfig, putoutConfig);
  // }
  const selected = await select({
    choices: [
      {
        name: "create",
        description: "Packing folders from src/app/[locale] to an archive",
        value: "create",
      },
      {
        name: "extract",
        description: "Unpacking the archive in src/app/[locale]/(restored)",
        value: "extract",
      },
      new Separator(),
    ],
    message: "What do you want to do?",
  });

  if (typeof selected !== "string") {
    consola.info(
      "The script was canceled by the user. Or something went wrong.",
    );
    process.exit(0);
  }

  switch (selected) {
    case "create":
      await handleCreateArchive();
      break;

    case "extract":
      await handleExtractArchive();
      break;

    default:
      consola.info(
        "The script was canceled by the user. Or something went wrong.",
      );
      break;
  }
}

async function handleCreateArchive() {
  const outputBase = "src/app/[locale]/disabled";
  const output = await generateUniqueFilePath(outputBase, "tar.gz");

  const folders = await checkbox({
    choices: getFoldersInDirectory(srcAppLocaleDirectory)
      .filter((folder) => !folder.startsWith("(restored")) // Exclude (restored) and (restored_*)
      .map((folder) => ({
        name: folder,
        checked: folder !== "[...rest]", // Exclude [...rest] from being checked
        value: folder,
      })),
    message: "Select folders to archive",
  });

  let fileInputs: FileInput[] = [];

  for (const folder of folders) {
    const folderPath = join(srcAppLocaleDirectory, folder);
    const folderFileInputs = await getFileInputsFromDirectory(
      folderPath,
      folder,
    );

    // eslint-disable-next-line unicorn/prefer-spread
    fileInputs = fileInputs.concat(folderFileInputs);
  }

  // fileInputs.push(
  //   { name: "knip.json", data: await fs.readFile(knipConfig) },
  //   { name: ".putout.json", data: await fs.readFile(putoutConfig) },
  // );
  // if (debugEnabled) {
  //   consola.warn(`Output path: ${join(rootDirectory, output)}`);
  //   consola.warn(
  //     `File inputs: ${fileInputs.map((file) => `${file.name}:${file.data}`).join(", ")}`,
  //   );
  // }
  await createArchive(join(rootDirectory, output), fileInputs);

  const shouldDelete = await confirm({
    default: false,
    message: "Do you want to delete the folders which were archived?",
  });

  if (shouldDelete) {
    for (const folder of folders) {
      await removeFolder(join(srcAppLocaleDirectory, folder));
    }

    consola.success("Folders deleted successfully.");
  } else {
    consola.success("Folders were not deleted.");
  }

  consola.success(
    "The chosen pages were disabled. When you need them, just extract them by running the script again.",
  );
}

async function handleExtractArchive() {
  const inputPath = await input({
    default: "src/app/[locale]/disabled.tar.gz",
    message: "Enter the input tar.gz file path:",
  });

  const restoredBase = join(srcAppLocaleDirectory, "(restored)");
  const restoredDirectory = await generateUniqueDirectoryPath(restoredBase);

  const archiveData = await fs.readFile(join(rootDirectory, inputPath));
  const parsedFiles = await parseTarGzip(archiveData);

  const archiveFolders = parsedFiles
    .map((file) => dirname(file.name))
    .filter((value, index, self) => self.indexOf(value) === index)
    .filter((folder) => folder !== ".");

  // Exclude the "." folder
  const foldersToExtract = await checkbox({
    choices: archiveFolders.map((folder) => ({
      name: folder,
      checked: true,
      value: folder,
    })),
    message: "Select folders to extract",
  });

  const remainingFiles = await extractArchive(
    join(rootDirectory, inputPath),
    restoredDirectory,
    foldersToExtract,
  );

  if (remainingFiles) {
    const shouldRemoveExtracted = await confirm({
      default: false,
      message: "Do you want to remove the extracted folders from the archive?",
    });

    if (shouldRemoveExtracted) {
      await createArchiveFromFiles(
        join(rootDirectory, inputPath),
        remainingFiles,
      );
      consola.success("Extracted folders removed from the archive.");
    }
  }

  // const shouldReplaceConfigs = await confirm({
  // default: false,
  // message:
  // "Do you want to replace your current Knip and Putout configs with the ones in the archive?",
  // });
  // if (shouldReplaceConfigs) {
  // const archivedKnipConfig = join(restoredDirectory, "knip.json");
  // const archivedPutoutConfig = join(restoredDirectory, ".putout.json");
  // if (await fileExists(archivedKnipConfig)) {
  //   await fs.move(archivedKnipConfig, knipConfig, { overwrite: true });
  // }
  // if (await fileExists(archivedPutoutConfig)) {
  //   await fs.move(archivedPutoutConfig, putoutConfig, { overwrite: true });
  // }
  // consola.success("Configs replaced successfully.");
  // }
  const shouldDeleteArchive = await confirm({
    default: false,
    message: "Do you want to delete the archive file?",
  });

  if (shouldDeleteArchive) {
    await removeFile(join(rootDirectory, inputPath));
    consola.success("Archive file deleted successfully.");
  } else {
    consola.success("Archive file was not deleted.");
  }

  const shouldMoveFiles = await confirm({
    default: false,
    message:
      "Do you want to move files from src/app/[locale]/(restored) to src/app/[locale]?",
  });

  if (shouldMoveFiles) {
    await moveFiles(restoredDirectory, srcAppLocaleDirectory);
  }

  consola.success("The chosen pages have been enabled successfully.");
}

main().catch((error: unknown) => {
  consola.error(error);
});
