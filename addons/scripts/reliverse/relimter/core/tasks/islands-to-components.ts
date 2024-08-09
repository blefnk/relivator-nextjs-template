import consola from "consola";
import fs from "fs-extra";
import path from "pathe";

// src/tools/unstable/codemods-reliverse/components-to-components.py
// !! 🔴 USE THIS SCRIPT AT YOUR OWN RISK UNTIL WE FINISH WORKING ON IT 🏹🦵
// !! 🐍 PLEASE TRY TO USE PYTHON VERSION FIRST, WHICH IS MORE STABLE
// py addons/scripts/reliverse/relimter/python/tasks/components-to-components.py
// !! 🐞 This UNTESTED TOO MUCH codemod does the following:
// 1. Reads all .ts and .tsx files in the src directory.
// 2. Looks for ES imports and updates paths.
// 3. Saves the original and updated paths to a text file.
// 4. Updates the import paths in the files.
// 5. Executes the main script to move and rename files and folders.
// 6. Files will be renamed from kebab-case to PascalCase.
// 7. Each file will be moved to a new folder with the same name (barrel pattern).
// 8. The new folder will contain an index.tsx file that exports the component.
// 9. Updates index.ts files to export components.
// By the way: using the barrel pattern is totally okay for Next.js thanks to tree-shaking optimization.
// But if external lib uses so much barrel pattern, specify it in next.config.js in optimizePackageImports.
// @see https://vercel.com/blog/how-we-optimized-package-imports-in-next-js
// @see https://github.com/vercel/next.js/pull/56489
function kebabToPascal(name: string): string {
  return name
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join("");
}

async function updateImportPaths(sourceDirectory: string, mappingFile: string) {
  // eslint-disable-next-line unicorn/better-regex, regexp/strict
  const importPathPattern = /import\s+{[^}]+}\s+from\s+['"]([^'"]+)['"];?/g;

  const paths: [string, string][] = [];

  const files = await getAllFiles(sourceDirectory, [".ts", ".tsx"]);

  for (const file of files) {
    const content = await fs.promises.readFile(file, "utf8");
    let updatedContent = content;

    let match: null | RegExpExecArray;

    // @ts-expect-error TODO: Fix
    while ((match = importPathPattern.exec(content) !== null)) {
      const imp = match[1];

      if (imp?.includes("~/components/")) {
        const originalPath = imp;
        let newPath = imp
          .replace("~/", "~/components/")
          .replace("/components/", "/");

        // @ts-expect-error TODO: Fix
        const newPathParts = newPath.split("/components/")[1].split("/");

        const pascalCaseParts = newPathParts.map(kebabToPascal);

        newPath = `~/components/${pascalCaseParts.join("/")}`;
        paths.push([originalPath, newPath]);
        updatedContent = updatedContent.replace(originalPath, newPath);
      } else if (imp?.includes("src/components/")) {
        const originalPath = imp;
        let newPath = imp.replace("src/components/", "~/components/");

        // @ts-expect-error TODO: Fix
        const newPathParts = newPath.split("/components/")[1].split("/");

        const pascalCaseParts = newPathParts.map(kebabToPascal);

        newPath = `~/components/${pascalCaseParts.join("/")}`;
        paths.push([originalPath, newPath]);
        updatedContent = updatedContent.replace(originalPath, newPath);
      }
    }

    await fs.promises.writeFile(file, updatedContent, "utf8");
  }

  const mappingFileStream = fs.createWriteStream(mappingFile, {
    flags: "a",
  });

  for (const [originalPath, newPath] of paths) {
    mappingFileStream.write(`${originalPath} -> ${newPath}\n`);
  }

  mappingFileStream.end();
}

async function renameAndMoveFiles(
  sourceFolder: string,
  destinationFolder: string,
) {
  await fs.promises.mkdir(destinationFolder, {
    recursive: true,
  });

  // Rename files and directories
  const items = await getAllFilesAndDirectories(sourceFolder);

  for (const item of items) {
    const itemName = path.basename(item);

    if (
      itemName === "ui" &&
      path.dirname(item).includes("src/components/primitives")
    ) {
      continue;
    }

    const newName = kebabToPascal(itemName);
    const newPath = path.join(path.dirname(item), newName);

    if (item !== newPath && !(await exists(newPath))) {
      await fs.promises.rename(item, newPath);
      consola.info(`Renamed ${item} to ${newPath}`);
    }
  }

  // Move files and directories
  for (const item of items) {
    const itemName = path.basename(item);
    const relativePath = path.relative(sourceFolder, item);
    const newFolderPath = path.join(
      destinationFolder,
      path.dirname(relativePath),
    );

    await fs.promises.mkdir(newFolderPath, {
      recursive: true,
    });

    if (item.endsWith(".tsx")) {
      const newFilePath = path.join(newFolderPath, itemName);

      if (await exists(newFilePath)) {
        consola.info(`File ${newFilePath} already exists, not moved.`);
        continue;
      }

      await fs.promises.rename(item, newFilePath);
      consola.info(`Moved ${item} to ${newFilePath}`);

      const indexTsxPath = path.join(newFolderPath, "index.tsx");
      const exportStatement = `export * from './${path.basename(item, ".tsx")}';\n`;

      await fs.promises.appendFile(indexTsxPath, exportStatement, "utf8");
      consola.info(
        `Updated ${indexTsxPath} with export statement for ${path.basename(item, ".tsx")}`,
      );
    } else {
      const newFolderPath = path.join(destinationFolder, relativePath);

      if (await exists(newFolderPath)) {
        consola.info(`Folder ${newFolderPath} already exists, not moved.`);
        continue;
      }

      await fs.promises.rename(item, newFolderPath);
      consola.info(`Moved folder ${item} to ${newFolderPath}`);
    }
  }
}

async function getAllFiles(
  directory: string,
  extensions: string[],
): Promise<string[]> {
  const entries = await fs.promises.readdir(directory, {
    withFileTypes: true,
  });

  const files = entries
    .filter(
      (file) =>
        !file.isDirectory() && extensions.includes(path.extname(file.name)),
    )
    .map((file) => path.join(directory, file.name));

  const folders = entries
    .filter((folder) => folder.isDirectory())
    .map((folder) => path.join(directory, folder.name));

  for (const folder of folders) {
    files.push(...(await getAllFiles(folder, extensions)));
  }

  return files;
}

async function getAllFilesAndDirectories(directory: string): Promise<string[]> {
  const entries = await fs.promises.readdir(directory, {
    withFileTypes: true,
  });

  let items = entries.map((entry) => path.join(directory, entry.name));

  for (const folder of entries.filter((folder) => folder.isDirectory())) {
    // eslint-disable-next-line unicorn/prefer-spread
    items = items.concat(
      await getAllFilesAndDirectories(path.join(directory, folder.name)),
    );
  }

  return items;
}

async function exists(path: string): Promise<boolean> {
  try {
    await fs.promises.access(path);

    return true;
  } catch {
    return false;
  }
}

async function main() {
  const sourceFolder = "src/components";
  const componentsFolder = "src/components";
  const mappingFile = "path_mapping.txt";

  await updateImportPaths("src", mappingFile);
  await renameAndMoveFiles(sourceFolder, componentsFolder);
}

main().catch((error: unknown) => {
  consola.error(error);
});
