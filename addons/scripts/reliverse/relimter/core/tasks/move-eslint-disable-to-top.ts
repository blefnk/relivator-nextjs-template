import consola from "consola";
import fs from "fs-extra";
import { glob } from "glob";

// ! NOT TESTED TOO MUCH ! USE AT OWN RISK !
const extensions = ["ts", "tsx", "js", "jsx", "mjs", "cjs", "d.ts"];

const isEslintDisableComment = (line: string) =>
  /\/\*\s*eslint-disable\s*(?:\S.*(?:[\n\r\u2028\u2029]\s*)?)?\*\//.test(
    line.trim(),
  );

const processFile = (filePath: string) => {
  const content = fs.readFileSync(filePath, "utf8");
  const lines = content.split("\n");

  const eslintComments: string[] = [];
  const codeLines: string[] = [];
  let foundFirstLineEslint = false;

  for (const [index, line] of lines.entries()) {
    if (!index && isEslintDisableComment(line)) {
      foundFirstLineEslint = true;
      eslintComments.push(line);
    } else if (isEslintDisableComment(line)) {
      eslintComments.push(line);
    } else {
      codeLines.push(line);
    }
  }

  if (!foundFirstLineEslint && eslintComments.length > 0) {
    const newContent = [...eslintComments, "", ...codeLines].join("\n");

    fs.writeFileSync(filePath, newContent, "utf8");
  } else if (eslintComments.length > 0) {
    // Ensure there's a blank line after the last eslint definition if there are eslint definitions
    const lastEslintIndex = lines.findIndex((line) =>
      isEslintDisableComment(line),
    );

    const nextLineIndex = lastEslintIndex + eslintComments.length;

    if (lines[nextLineIndex] && lines[nextLineIndex].trim() !== "") {
      eslintComments.push("");
      const newContent = [...eslintComments, ...codeLines].join("\n");

      fs.writeFileSync(filePath, newContent, "utf8");
    }
  }
};

const processFiles = (pattern: string) => {
  // @ts-expect-error TODO: fix
  glob(pattern, (error, files) => {
    if (error) {
      consola.error("Error finding files:", error);

      return;
    }

    for (const file of files) {
      processFile(file);
    }
  });
};

for (const extension of extensions) {
  processFiles(`./**/*.${extension}`);
}
