import * as fs from "fs";
import path from "path";

// import { parse } from "@typescript-eslint/typescript-estree";
// import createCsvWriter from "csv-writer";

/**
 * This script sets up the basic structure but leaves the implementation of analyzeTypeScriptFile function open. This function should analyze the AST of each TypeScript file to extract type information. This is a complex task because we need to understand the structure of the TypeScript AST and identify how different types (interfaces, types, classes, etc.) are represented in it.
 */

interface TypeInfo {
  fileName: string;
  typeName: string;
  location: string;
  // Other details as needed
}

const projectPath = "/path/to/the/project";
const csvFilePath = "typescript-types.csv";

// const csvWriter = createCsvWriter.createArrayCsvWriter({
//   header: ["File Name", "Type Name", "Location"],
//   path: csvFilePath,
// });

function findTSFiles(dir: string, files_: string[] = []) {
  // biome-ignore lint/complexity/noForEach: <explanation>
  fs.readdirSync(dir).forEach((file) => {
    const filePath = path.join(dir, file);
    if (fs.statSync(filePath).isDirectory()) {
      findTSFiles(filePath, files_);
    } else if (filePath.endsWith(".ts") || filePath.endsWith(".tsx")) {
      files_.push(filePath);
    }
  });
  return files_;
}

function analyzeTypeScriptFile(file: string): TypeInfo[] {
  const content = fs.readFileSync(file, "utf8");
  // const ast = parse(content, {
  //   loc: true,
  //   // Other relevant options as needed
  // });

  // TODO: Analyze AST and extract type information
  // This part requires in-depth knowledge of TypeScript AST
  return []; // Return array of TypeInfo
}

function main() {
  const tsFiles = findTSFiles(projectPath);
  // eslint-disable-next-line sonarjs/no-unused-collection
  const allTypeInfo: TypeInfo[] = [];

  // biome-ignore lint/complexity/noForEach: <explanation>
  tsFiles.forEach((file) => {
    const typesInFile = analyzeTypeScriptFile(file);
    allTypeInfo.push(...typesInFile);
  });

  // csvWriter
  //   .writeRecords(
  //     allTypeInfo.map((typeInfo) => [
  //       typeInfo.fileName,
  //       typeInfo.typeName,
  //       typeInfo.location,
  //     ]),
  //   )
  //   .then(() => console.log("CSV file was written successfully"));
}

main();
