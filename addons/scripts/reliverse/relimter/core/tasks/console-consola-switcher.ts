import consola from "consola";
import fs from "fs-extra";
import * as path from "pathe";
import yargs from "yargs";
import { hideBin } from "yargs/helpers";

const consolaImportStatement = `import consola from "consola";`;
const consolaRegex = /consola\.(log|warn|error|info|debug|trace)\(/g;
const consoleRegex = /console\.(log|warn|error|info|debug|trace)\(/g;

// Parse CLI arguments
const argv = yargs(hideBin(process.argv))
  .option("reverse", {
    alias: "r",
    default: false,
    description: "Replace consola with console",
    type: "boolean",
  })
  .option("directory", {
    alias: "d",
    default: "./",
    description: "Directory to process",
    type: "string",
  })
  .help()
  .alias("help", "h")
  .parseSync();

const reverse = argv.reverse as boolean;
const directory = argv.directory as string;

function replaceConsoleWithConsola(filePath: string): void {
  fs.readFile(filePath, "utf8", (error, data) => {
    if (error) {
      consola.error(`Error reading file ${filePath}: ${error}`);

      return;
    }

    const targetRegex = reverse ? consolaRegex : consoleRegex;
    const replacement = "consola.$1(";
    const containsTarget = targetRegex.test(data);

    // Replace console with consola or vice versa
    const replacedData = data.replace(targetRegex, replacement);

    // Check if consola import is already present
    const containsConsolaImport = replacedData.includes(consolaImportStatement);

    let finalData = replacedData;

    if (!reverse && !containsConsolaImport && containsTarget) {
      // Add consola import at the top if it's not present and we replaced console statements
      finalData = `${consolaImportStatement}\n${replacedData}`;
    } else if (reverse && containsConsolaImport) {
      // Remove consola import if we're replacing consola with console
      finalData = replacedData.replace(`${consolaImportStatement}\n`, "");
    }

    // Write the modified content back to the file
    fs.writeFile(filePath, finalData, "utf8", (writeError) => {
      if (writeError) {
        consola.error(`Error writing file ${filePath}: ${writeError}`);

        return;
      }

      consola.info(`File ${filePath} has been processed.`);
    });
  });
}

function processDirectory(directory_: string): void {
  fs.readdir(directory_, (error, files) => {
    if (error) {
      consola.error(`Error reading directory ${directory_}: ${error}`);

      return;
    }

    for (const file of files) {
      const filePath = path.join(directory_, file);

      fs.stat(filePath, (statError, stats) => {
        if (statError) {
          consola.error(
            `Error getting stats of file ${filePath}: ${statError}`,
          );

          return;
        }

        if (stats.isDirectory()) {
          processDirectory(filePath);
        } else if (stats.isFile() && file.endsWith(".ts")) {
          replaceConsoleWithConsola(filePath);
        }
      });
    }
  });
}

// Start processing from the specified directory
processDirectory(directory);
