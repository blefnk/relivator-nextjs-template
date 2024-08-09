import type { TCodeupUtils } from "@/scripts/reliverse/relimter/codeup/types";
import type { ActionContext } from "codeup";

import { defineAction } from "codeup";
import fs from "fs-extra";
import path from "pathe";

// @see https://github.com/unjs/codeup
export default defineAction({
  async apply({ utils }: ActionContext) {
    // Update package.json to set type as module
    await utils.updatePackageJSON((package_) => {
      package_.type = "module";
    });

    // Convert CommonJS require statements to ESModules import statements
    await convertCjsToEsmInDirectory(utils as TCodeupUtils, "src");

    // Ensure the latest version of necessary dependencies is installed
    await utils.addDevDependency(["esm@^3.2.25"]);

    // Run a format script to ensure code style
    await utils.runScript("format");
  },
  async filter({ utils }: ActionContext) {
    // Only apply if package.json does not have "type": "module"
    const package_ = await utils.readPackageJSON();

    return !package_.type || package_.type !== "module";
  },
  meta: {
    name: "cjs-to-esm",
    date: "2024-07-31",
    description: "Migrate project from CommonJS to ESModules",
  },
});

// Helper function to convert CJS to ESM in a directory
async function convertCjsToEsmInDirectory(
  utils: TCodeupUtils,
  directory: string,
) {
  const files = await getFiles(directory);

  for (const file of files) {
    const filePath = `${directory}/${file}`;

    if (await utils.existsWithAnyExt(filePath)) {
      let content = await utils.read(filePath);

      if (content) {
        // Replace CommonJS require with ESModules import
        content = content.replace(
          /const (.*?) = require\((.*?)\);/g,
          "import $1 from $2;",
        );

        // Replace module.exports with export default
        content = content.replace(
          /module.exports = (.*?);/g,
          "export default $1;",
        );

        await utils.write(filePath, content);
      }
    }
  }
}

// Helper function to get files from a directory
async function getFiles(directory: string): Promise<string[]> {
  const fileList: string[] = [];

  async function readDirectory(directory_: string) {
    const entries = await fs.readdir(directory_, { withFileTypes: true });

    for (const entry of entries) {
      const fullPath = path.join(directory_, entry.name);

      if (entry.isDirectory()) {
        await readDirectory(fullPath);
      } else {
        fileList.push(fullPath);
      }
    }
  }

  await readDirectory(directory);

  return fileList;
}
