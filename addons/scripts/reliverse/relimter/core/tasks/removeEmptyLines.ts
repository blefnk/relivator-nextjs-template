import consola from "consola";
import fs from "fs-extra";
import { minimatch } from "minimatch";
import * as path from "pathe";

// ! USE AT OWN RISK ! NOT TESTED TOO MUCH
// List of patterns to ignore
const ignores = [
  "**/.__.env",
  "**/.env.example",
  "**/.env",
  "**/.eslintcache",
  "**/.git",
  "**/.gitattributes",
  "**/.github",
  "**/.gitignore",
  "**/.idea",
  "**/.million",
  "**/.next",
  "**/.npmrc",
  "**/.nyc_output",
  "**/.putout.json",
  "**/.turbo",
  "**/.venv",
  "**/.vercel",
  "**/.vscode",
  "**/.yarn",
  "**/*.cjs",
  "**/*.d.ts",
  "**/*.env",
  "**/*.gif",
  "**/*.jpeg",
  "**/*.js",
  "**/*.json",
  "**/*.jsx",
  "**/*.md",
  "**/*.mdx",
  "**/*.mjs",
  "**/*.mts",
  "**/*.png",
  "**/*.py",
  "**/*.svg",
  "**/*.ts",
  "**/*.tsbuildinfo",
  "**/*.tsx",
  "**/*.yml",
  "**/build",
  "**/coverage",
  "**/dist-dev",
  "**/dist",
  "**/fixture",
  "**/license",
  "**/node_modules",
  "**/package-lock.json",
  "**/pnpm-lock.yaml",
  "**/public",
  "**/src",
];

function isIgnored(filePath: string, ignores: string[]): boolean {
  return ignores.some((pattern) => minimatch(filePath, pattern));
}

function removeEmptyLinesFromFile(filePath: string): void {
  const data = fs.readFileSync(filePath, "utf8");
  const lines = data.split("\n").filter((line) => line.trim() !== "");

  fs.writeFileSync(filePath, lines.join("\n"), "utf8");
}

function processDirectory(directory: string, ignores: string[]): void {
  const filesAndDirectories = fs.readdirSync(directory);

  for (const fileOrDirectory of filesAndDirectories) {
    const fullPath = path.join(directory, fileOrDirectory);

    if (isIgnored(fullPath, ignores)) {
      continue;
    }

    const stats = fs.lstatSync(fullPath);

    if (stats.isDirectory()) {
      processDirectory(fullPath, ignores);
    } else {
      removeEmptyLinesFromFile(fullPath);
      consola.info(`Processed: ${fullPath}`);
    }
  }
}

// Path to project directory
const projectDirectory = ".";

try {
  processDirectory(projectDirectory, ignores);
  consola.info("Processing complete");
} catch (error) {
  consola.error("Error processing directory:", error);
}
