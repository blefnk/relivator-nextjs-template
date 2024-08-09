import consola from "consola";
import { readFile, writeFile } from "fs/promises";
import { glob } from "glob";
import { promisify } from "util";

// TODO: Consider using https://npmjs.com/package/crlf-normalize
const globPromise = promisify(glob);

// Function to get all files matching a pattern, ignoring specified files/folders
async function getFiles(pattern: string, ignore: string[]): Promise<string[]> {
  return (await globPromise(pattern, {
    ignore,
  })) as string[];
}

// Function to convert CRLF to LF in a file
async function convertCRLFtoLF(filePath: string) {
  try {
    const data = await readFile(filePath, "utf8");
    const newData = data.replace(/\r\n/g, "\n");

    await writeFile(filePath, newData, "utf8");
    consola.info(`Converted ${filePath}`);
  } catch (error) {
    consola.error(`Error processing file ${filePath}:`, error);
  }
}

// Main function to process all files
async function processFiles(pattern: string, ignore: string[]) {
  try {
    const files = await getFiles(pattern, ignore);

    for (const file of files) {
      await convertCRLFtoLF(file);
    }
  } catch (error) {
    consola.error("Error:", error);
  }
}

// Patterns and ignored files/folders
const pattern = "**/*.*";

// Pattern to match the files you want to process
const ignore = ["node_modules/**", "dist/**"];

// Main function execution
processFiles(pattern, ignore);
