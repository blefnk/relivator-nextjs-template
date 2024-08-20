import { getCurrentWorkingDirectory } from "@/../packageJson";
import destr from "destr";
import fs from "fs-extra";
import { join } from "pathe";

type PackageJson = {
  [key: string]: any;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

export const findPackageManagerType = (
  path = ".",
  defaultPackageManager = "unknown",
) => {
  const bunPath = `${path}/bun.lockb`;
  const pnpmPath = `${path}/pnpm-lock.yaml`;
  const yarnPath = `${path}/yarn.lock`;
  const npmPath = `${path}/package-lock.json`;

  if (fs.existsSync(bunPath)) {
    return "bun";
  }

  if (fs.existsSync(pnpmPath)) {
    return "pnpm";
  }

  if (fs.existsSync(yarnPath)) {
    return "yarn";
  }

  if (fs.existsSync(npmPath)) {
    return "npm";
  }

  return defaultPackageManager;
};

export const findInstallCommand = (
  packageManagerType = findPackageManagerType(),
  prefix = false,
) => {
  switch (packageManagerType) {
    case "bun":
      return prefix ? "bun install" : "install";
    case "npm":
      return prefix ? "npm install" : "install";
    case "pnpm":
      return prefix ? "pnpm install" : "install";
    case "unknown":
      return prefix ? "unknown unknown" : "unknown";
    case "yarn":
      return prefix ? "yarn install" : "install";
    default:
      return prefix ? "npm install" : "install";
  }
};

export const findPackageManagerRunner = (
  path = ".",
  defaultPackageManagerRunner = "npx",
) => {
  const bunPath = `${path}/bun.lockb`;
  const pnpmPath = `${path}/pnpm-lock.yaml`;
  const yarnPath = `${path}/yarn.lock`;
  const npmPath = `${path}/package-lock.json`;

  if (fs.existsSync(bunPath)) {
    return "bunx";
  }

  if (fs.existsSync(pnpmPath)) {
    return "pnpm exec";
  }

  if (fs.existsSync(yarnPath)) {
    return "yarn dlx";
  }

  if (fs.existsSync(npmPath)) {
    return "npx";
  }

  return defaultPackageManagerRunner;
};

export async function readPackageJson(): Promise<PackageJson> {
  const packageJsonPath = join(getCurrentWorkingDirectory(), "package.json");
  const packageJson = fs.readFileSync(packageJsonPath, "utf8");

  return destr(packageJson) as PackageJson;
}
