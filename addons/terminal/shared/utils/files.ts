import type { Resolvable } from "citty";

import { getCurrentDirname } from "@/browser/shared/utils";
import { log } from "@clack/prompts";
import destr from "destr";
import fs from "fs-extra";
import { cwd } from "node:process";
import { join } from "pathe";
import pc from "picocolors";
import prettyjson from "prettyjson";

export const defineAddon = (
  emoji: string,
  title: string,
  action: string,
  keys: string,
) => {
  // eslint-disable-next-line @stylistic/max-len
  return `${emoji} ${pc.dim(title)} Choose which ${pc.cyan(action)} by pressing ${pc.cyan(`${keys} (or press <Cmd/Ctrl+C> to exit)`)}\n`;
};

export const defineTask = (emoji: string, title: string, action: string) => {
  return `${emoji} ${pc.dim(title)} Please wait until ${action}.\n`;
};

export function sortArgs<T extends Resolvable<any>>(arguments_: T): T {
  return Object.fromEntries(
    Object.entries(arguments_ as any).sort(([a], [b]) => a.localeCompare(b)),
  ) as T;
}

export function getRootDirname(
  currentDirname: string,
  levelsUp: number,
): string {
  const parentDirectories = "../".repeat(levelsUp);

  return join(currentDirname, parentDirectories);
}

export async function removeFile(filePath: string) {
  try {
    await fs.unlink(filePath);
  } catch (error) {
    throw new Error("⛔ Could not read the file.", {
      cause: error,
    });
  }
}

export async function fileExists(path: string): Promise<boolean> {
  try {
    await fs.access(path);

    return true;
  } catch {
    return false;
  }
}

export function getFoldersInDirectory(directory: string): string[] {
  return fs
    .readdirSync(directory, {
      withFileTypes: true,
    })
    .filter((dirent) => dirent.isDirectory())
    .map((dirent) => dirent.name);
}

export async function removeFolder(folderPath: string) {
  const files = fs.readdirSync(folderPath);

  for (const file of files) {
    const filePath = join(folderPath, file);

    if (fs.lstatSync(filePath).isDirectory()) {
      await removeFolder(filePath);
    } else {
      fs.unlinkSync(filePath);
    }
  }

  fs.rmdirSync(folderPath);
}

type PackageJson = {
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

export type ArrayElement<ArrayType extends readonly unknown[]> =
  ArrayType extends readonly (infer ElementType)[] ? ElementType : never;

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

export type PackageManagerType = "bun" | "npm" | "pnpm" | "unknown" | "yarn";

export type InstallCommand = "add" | "install";

export type PackageManagerRunner = "bunx" | "npx" | "pnpm exec" | "yarn dlx";

// eslint-disable-next-line @stylistic/max-len
// export function findPackageManagerType (path?: string, defaultPackageManager?: PackageManagerType): PackageManagerType;
// export function findInstallCommand (packageManagerType?: PackageManagerType): InstallCommand;
// export function findPackageManagerRunner (path?: string, defaultPackageManagerRunner?: PackageManagerRunner);

export const formatError = (error: any) =>
  error ? `\n${prettyjson.render(error)}` : "";

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function readPackageJson(): Promise<PackageJson> {
  const packageJsonPath = join(cwd(), "package.json");
  const packageJson = fs.readFileSync(packageJsonPath, "utf8");

  return destr(packageJson) as PackageJson;
}

export function getHumanDate(createdAt: null | string) {
  const date = new Date(createdAt || "");

  return date.toLocaleString();
}

let pmFetched = false;
let pm: PackageManagerType = "npm";
let pmCommand: InstallCommand = "install";
let pmRunner: PackageManagerRunner = "npx";

export function getPMAndCommand() {
  if (pmFetched) {
    return {
      command: pmCommand,
      installCommand: `${pm} ${pmCommand}`,
      pm,
      runner: pmRunner,
    };
  }

  const directory = getRootDirname(getCurrentDirname(import.meta.url), 2);

  pm = findPackageManagerType(directory, "npm") as PackageManagerType;
  pmCommand = findInstallCommand(pm) as InstallCommand;
  pmFetched = true;
  pmRunner = findPackageManagerRunner(directory) as PackageManagerRunner;

  return {
    command: pmCommand,
    installCommand: `${pm} ${pmCommand}`,
    pm,
    runner: pmRunner,
  };
}

// function readDirRecursively(dir: string): string[] {
//   const entries = readdirSync(dir, { withFileTypes: true });

//   return entries.flatMap((entry) => {
//     const fullPath = join(dir, entry.name);

//     return entry.isDirectory() ? readDirRecursively(fullPath) : [fullPath];
//   });
// }

export async function getLocalDependencies() {
  const packageJsonPath = join(cwd(), "package.json");

  if (!fs.existsSync(packageJsonPath)) {
    log.error("Missing package.json");

    return [];
  }

  let packageJson: PackageJson = {};

  const dependencies = packageJson.dependencies ?? {};

  try {
    packageJson = await readPackageJson();
  } catch (error) {
    log.error("Invalid package.json, JSON parsing failed");
    console.error("json parse error:", error);

    return [];
  }

  if (Object.keys(dependencies).length === 0) {
    log.error("Missing dependencies section in package.json");

    return [];
  }

  for (const [key, value] of Object.entries(dependencies)) {
    if (typeof value !== "string") {
      log.error(
        `Invalid dependency ${key}: ${value}, expected string, got ${typeof value}`,
      );

      return [];
    }
  }

  const nodeModulesPath = join(cwd(), "node_modules");

  if (!fs.existsSync(nodeModulesPath)) {
    const pm = findPackageManagerType(
      getRootDirname(import.meta.url, 2),
      "npm",
    );
    const installCmd = findInstallCommand(pm);

    log.error(`Missing node_modules folder, please run ${pm} ${installCmd}`);

    return [];
  }

  let anyInvalid = false;
  const dependenciesObject = await Promise.all(
    Object.entries(dependencies).map(async ([key, value]) => {
      const dependencyFolderPath = join(nodeModulesPath, key);

      if (!fs.existsSync(dependencyFolderPath)) {
        anyInvalid = true;
        const pm = findPackageManagerType(
          getRootDirname(import.meta.url, 2),
          "npm",
        );
        const installCmd = findInstallCommand(pm);

        log.error(`Missing dependency ${key}, please run ${pm} ${installCmd}`);

        return { name: key, version: value };
      }

      // try {
      //   const files = readDirRecursively(dependencyFolderPath);
      // } catch (error) {
      //   log.error(`Error reading node_modules files for ${key} package`);
      //   console.error(error);

      //   return null;
      // }

      return {
        name: key,
        version: value,
      };
    }),
  ).catch(() => []);

  if (anyInvalid) {
    console.error("Some dependencies are missing", dependenciesObject || []);

    return [];
  }

  return dependenciesObject as {
    name: string;
    native: boolean;
    version: string;
  }[];
}
