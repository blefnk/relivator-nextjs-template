import { confirm } from "@inquirer/prompts";
import { getRootDirname } from "@reliverse/fs";
import { consola } from "consola";
import fs from "fs-extra";
import { join, relative } from "pathe";
import pc from "picocolors";
import { createInterface } from "readline";

// ⛔ UNSTABLE 👉 pnpm tsx addons/scripts/reliverse/relimter/core/tasks/scripts/comments-transformer.ts
// ✅ (More stable version: `py addons/scripts/reliverse/relimter/python/tasks/block-to-line-comments.py`)
const rootDirectory = getRootDirname(import.meta.url, 6);
const COMMENT_FILE = join(rootDirectory, "addons/.output/fix-comments.log");

const excludedDirectories = [
  ".next",
  ".vercel",
  "addons/.output",
  "node_modules",
];

const supportedExtensions = [".js", ".ts", ".mjs"];

const excludedRelativeFiles = new Set([
  "addons/scripts/reliverse/relimter/core/tasks/scripts/comments-transformer.ts",
  "addons/scripts/reliverse/disabler/index.ts",
  "next-env.d.ts",
]);

type ChangeRecord = {
  filePath: string;
  line: number;
  original: string;
  transformed: string;
};

// Async generator to yield file paths
async function* getFiles(directory: string): AsyncGenerator<string> {
  try {
    const files = await fs.readdir(directory);

    for (const file of files) {
      const filePath = join(directory, file);
      const stat = await fs.stat(filePath);
      const relativePath = relative(rootDirectory, filePath);

      if (stat.isDirectory()) {
        if (
          !excludedDirectories.some((excludedDirectory) =>
            relativePath.includes(excludedDirectory),
          )
        ) {
          yield* await getFiles(filePath);
        }
      } else if (
        supportedExtensions.some((extension) => filePath.endsWith(extension)) &&
        !excludedRelativeFiles.has(relativePath)
      ) {
        yield filePath;
      }
    }
  } catch (error) {
    new Error(
      `Error reading directory: ${directory}. Details: ${String(error)}`,
    );
  }
}

// Read lines from a file
async function readLines(filePath: string): Promise<string[]> {
  const input = fs.createReadStream(filePath);
  const rl = createInterface({
    crlfDelay: Infinity,
    input,
  });

  const lines: string[] = [];

  for await (const line of rl) {
    lines.push(line);
  }

  return lines;
}

// Write lines to a file
async function writeLines(filePath: string, lines: string[]): Promise<void> {
  if (lines.at(-1)?.trim() !== "") {
    lines.push(""); // Ensure one blank line at the end of the file
  }

  await fs.writeFile(filePath, lines.join("\n"), "utf8");
}

// Transform comments in a file
async function transformComments(filePath: string): Promise<ChangeRecord[]> {
  const lines = await readLines(filePath);
  const changes: ChangeRecord[] = [];
  let insideBlockComment = false;

  const regexPatterns = [
    /\/\*\s*eslint-disable/,
    /\*\*\/*\.\*/,
    /\.\*$/,
    /\*$/,
    /\*\.json$/,
  ];

  const patternKeywords = ["**", "*.", ".cjs", ".d.ts", ".env", ".gif", "./"];

  const isPatternLine = (line: string) =>
    patternKeywords.some((keyword) => line.includes(keyword));

  for (let index = 0; index < lines.length; index++) {
    let line = lines[index];

    if (!line) {
      // Skip undefined or empty lines
      continue;
    }

    if (
      regexPatterns.some((pattern) => line && pattern.test(line)) ||
      isPatternLine(line)
    ) {
      continue;
    }

    if (insideBlockComment) {
      if (line.includes("*/")) {
        insideBlockComment = false;
        const endIndex = line.indexOf("*/") + 2;
        const original = line.slice(0, endIndex);

        const transformed = `//${line
          .slice(2, endIndex - 2)
          .replaceAll("*/", "")} */`;

        changes.push({
          filePath,
          line: index + 1,
          original,
          transformed,
        });
        line = `//${line
          .slice(0, endIndex)
          .replaceAll("*/", "")}*/${line.slice(endIndex)}`;
      } else {
        const original = line;

        line = `//${line.replace(/^\s*/, "")}`;
        changes.push({
          filePath,
          line: index + 1,
          original,
          transformed: line,
        });
      }
    } else if (line.includes("/*")) {
      insideBlockComment = true;
      const startIndex = line.indexOf("/*");
      const endIndex = line.indexOf("*/", startIndex);

      if (endIndex !== -1) {
        insideBlockComment = false;
        const original = line.slice(startIndex, endIndex + 2);
        const transformed = `//${line
          .slice(startIndex + 2, endIndex)
          .replaceAll("*/", "")} */`;

        changes.push({
          filePath,
          line: index + 1,
          original,
          transformed,
        });

        line = `${line.slice(0, startIndex)}//${line
          .slice(startIndex + 2, endIndex)
          .replaceAll("*/", "")}*/${line.slice(endIndex + 2)}`;
      } else {
        const original = line.slice(startIndex);

        line = `${line.slice(0, startIndex)}//${line.slice(startIndex + 2)}`;
        changes.push({
          filePath,
          line: index + 1,
          original,
          transformed: line,
        });
      }
    }

    lines[index] = line;
  }

  await writeLines(filePath, lines);

  return changes;
}

// Save changes to a file
async function saveChanges(changes: ChangeRecord[]): Promise<void> {
  const data = changes
    .map((c) => `${c.filePath}:${c.line}:${c.original}:${c.transformed}`)
    .join("\n");

  await fs.writeFile(COMMENT_FILE, data, "utf8");
}

// Remove all comments in a file
async function removeComments(filePath: string): Promise<void> {
  const lines = await readLines(filePath);
  const newLines = lines.filter((line) => {
    const trimmedLine = line.trim();

    // Specific comments to keep
    const keepPatterns = [
      /^\/\/ eslint-disable\b/,
      /^\/\/ eslint-disable-next-line\b/,
      /^\/\/ @ts-expect-error\b/,
      /^\/\/ biome-ignore\b/,
    ];

    // Check if the line matches any of the keep patterns
    const shouldKeep = keepPatterns.some((pattern) =>
      pattern.test(trimmedLine),
    );

    if (shouldKeep) {
      return true; // Keep this line
    }

    // General comment patterns to remove
    const removePatterns = [
      /^\/\//, // Single line comments
      // /^\/\*/, // Start of block comments
      // /^\*$/, // Continuation of block comments
      // /^\*\//, // End of block comments
    ];

    return !removePatterns.some((pattern) => pattern.test(trimmedLine));
  });

  await writeLines(filePath, newLines);
}

// Process all files and remove comments if needed
async function processRemoveComments(): Promise<void> {
  for await (const file of await getFiles(rootDirectory)) {
    await removeComments(file);
  }
}

// Process all files and apply changes if needed
async function processFiles(): Promise<{
  allChanges: ChangeRecord[];
  fileCount: number;
  totalChanges: number;
}> {
  let totalChanges = 0;
  let fileCount = 0;
  const allChanges: ChangeRecord[] = [];

  for await (const file of await getFiles(rootDirectory)) {
    const changes = await transformComments(file);

    if (changes.length > 0) {
      allChanges.push(...changes);
      totalChanges += changes.length;
      fileCount++;
    }
  }

  return {
    allChanges,
    fileCount,
    totalChanges,
  };
}

// Main function to execute the processing and prompt for confirmation
async function main(): Promise<void> {
  const shouldFixComments = await confirm({
    default: false,
    message: // eslint-disable-next-line @stylistic/max-len
      "🔥 This comments transformer script is still in development, so please make a git commit, because the script may break your codebase unintentionally.\nAre you sure you want to run it?",
  });

  if (!shouldFixComments) {
    process.exit(0);
  }

  let result;

  try {
    result = await processFiles();
  } catch (error) {
    consola.error(pc.red(`❌ An error occurred: ${String(error)}`));

    return;
  }

  const { allChanges, fileCount, totalChanges } = result;

  if (fileCount === 0) {
    consola.info(pc.green("✔️  No inline comments found to fix."));

    const shouldRemoveComments = await confirm({
      default: false,
      message:
        "[⚙️  Additional] Do you want to remove all comments in the codebase?",
    });

    if (shouldRemoveComments) {
      await processRemoveComments();
      consola.success(pc.green("🎉 All comments removed successfully!"));
    }

    return;
  }

  consola.info(
    pc.yellow(`🔍 Detected ${totalChanges} changes in ${fileCount} files.`),
  );

  await saveChanges(allChanges);
  consola.success(pc.green("🎉 Comments fixed successfully!"));

  const shouldRemoveComments = await confirm({
    default: false,
    message:
      "[⚙️  Additional] Do you want to remove all comments in the codebase?",
  });

  if (shouldRemoveComments) {
    await processRemoveComments();
    consola.success(pc.green("🎉 All comments removed successfully!"));
  }
}

main().catch((error: unknown) => {
  consola.error("Error:", error);
  process.exit(1);
});
