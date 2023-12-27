/**
 * Ava Testing Library Configuration
 * =================================
 *
 * todo: compile ts files before ava running
 *
 * @see https://github.com/avajs/ava#why-ava
 * @see https://typestrong.org/ts-node/docs
 */

import { register } from "node:module";
import { fileURLToPath, pathToFileURL } from "node:url";

const filename = fileURLToPath(import.meta.url);
register("ts-node/esm", pathToFileURL(filename));

const avaConfig = {
  files: ["src/tests/ava/**/*.ts"],
  typescript: {
    rewritePaths: { "src/": "src/tests/ava/swc/" },
    extensions: ["ts", "tsx"],
    compile: false,
  },
};

export default avaConfig;
