import type { utils as codeupUtils } from "codeup/utils";

export type TCodeupUtils = {
  addDevDependency: typeof codeupUtils.addDevDependency;
  existsWithAnyExt: typeof codeupUtils.existsWithAnyExt;
  read: typeof codeupUtils.read;
  readPackageJSON: typeof codeupUtils.readPackageJSON;
  runScript: typeof codeupUtils.runScript;
  updatePackageJSON: typeof codeupUtils.updatePackageJSON;
  write: typeof codeupUtils.write;
};
