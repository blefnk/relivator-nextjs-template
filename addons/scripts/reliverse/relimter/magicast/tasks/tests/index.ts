import { getCurrentDirname } from "@reliverse/fs";
import consola from "consola";
import { loadFile, writeFile } from "magicast";
import { join, relative } from "pathe";

const processedFileDirectory = "./tested.ts";
const currentDirname = getCurrentDirname(import.meta.url);
const pathFileDirectory = join(currentDirname, processedFileDirectory);

const projectRoot = join(currentDirname, ".");
const relativePath = relative(projectRoot, pathFileDirectory);
const module_ = await loadFile(pathFileDirectory);

consola.info(`Processing: ${relativePath}`);
module_.exports.default.foo.push("b");
await writeFile(module_, pathFileDirectory);

export default {
  foo: ["a"],
};
