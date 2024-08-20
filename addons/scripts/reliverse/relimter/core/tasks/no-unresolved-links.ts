// 🐞 Still in the production and may not work as expected! Please use at own risk!
// ▶️ pnpm tsx addons\scripts\reliverse\relimter\core\tasks\no-unresolved-links.ts

import { log } from "@clack/prompts";
import { getRootDirname } from "@reliverse/fs";
import fs from "fs-extra";
import * as readline from "node:readline";
import { fetch } from "node-fetch-native";
import * as path from "pathe";

const rootDirectory = getRootDirname(import.meta.url, 6);

const SRC_FOLDER = path.join(rootDirectory, "src");
const APP_FOLDER = path.join(SRC_FOLDER, "app");
const LINK_REGEX = /<Link\s+href="([^"]+)"\s*>/g;

// Function to read all files in a directory recursively
const readFilesInDirectory = async (
  directory: string,
  fileList: string[] = [],
) => {
  const files = await fs.readdir(directory);

  for (const file of files) {
    const filePath = path.join(directory, file);
    const stat = await fs.stat(filePath);

    if (stat.isDirectory()) {
      await readFilesInDirectory(filePath, fileList);
    } else {
      fileList.push(filePath);
    }
  }

  return fileList;
};

// Function to check if a file exists
const fileExists = (filePath: string) =>
  fs.promises
    .access(filePath, fs.constants.F_OK)
    .then(() => true)
    .catch(() => false);

// Function to check if an external link is live
const checkExternalLink = async (url: string) => {
  try {
    const response = await fetch(url);

    return response.ok;
  } catch (error) {
    log.error(`Error occurred while checking link: ${url}\n\n${String(error)}`);

    return false;
  }
};

// Function to process a single file for Link href
const processFile = async (filePath: string) => {
  const fileStream = fs.createReadStream(filePath);
  const rl = readline.createInterface({
    crlfDelay: Infinity,
    input: fileStream,
  });

  for await (const line of rl) {
    let match;

    while ((match = LINK_REGEX.exec(line)) !== null) {
      const href = match[1];

      if (href?.startsWith("/")) {
        // Relative link
        const locales = await fs.readdir(APP_FOLDER);
        let found = false;

        for (const locale of locales) {
          const pagePath = href
            ? path.join(APP_FOLDER, locale, href, "page.tsx")
            : "";

          if (await fileExists(pagePath)) {
            found = true;
            break;
          }
        }

        if (!found) {
          log.error(`Unresolved relative link found in ${filePath}: ${href}`);
        }
      } else if (!(await checkExternalLink(href || ""))) {
        log.error(`Unresolved external link found in ${filePath}: ${href}`);
      }
    }
  }
};

// Main function to start the process
const main = async () => {
  const files = await readFilesInDirectory(SRC_FOLDER);

  for (const file of files) {
    if (file.endsWith(".tsx")) {
      await processFile(file);
    }
  }
};

main().catch((error: unknown) => {
  log.error(`Error occurred: ${error}`);
  process.exit(1);
});
