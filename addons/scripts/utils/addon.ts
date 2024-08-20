import type {
  InstallCommand,
  PackageManagerRunner,
  PackageManagerType,
} from "@/types/reliverse/pm";
import type { Resolvable } from "citty";

import {
  findInstallCommand,
  findPackageManagerRunner,
  findPackageManagerType,
  readPackageJson,
} from "@/scripts/utils/pm";
import { log } from "@clack/prompts";
import { getRootDirname } from "@reliverse/fs";
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
  return `${emoji} ${pc.dim(title)} Choose ${pc.cyan(action)} by pressing ${pc.cyan(`${keys} (or press <Cmd/Ctrl+C> to exit)`)}\n`;
};

export const defineTask = (emoji: string, title: string, action: string) => {
  return `${emoji} ${pc.dim(title)} Please wait until ${action}.\n`;
};

export function sortArgs<T extends Resolvable<any>>(arguments_: T): T {
  return Object.fromEntries(
    Object.entries(arguments_ as any).sort(([a], [b]) => a.localeCompare(b)),
  ) as T;
}

export const formatError = (error: any) =>
  error ? `\n${prettyjson.render(error)}` : "";

export function wait(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
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

  const directory = getRootDirname(import.meta.url, 2);

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

  let packageJson: {
    dependencies?: Record<string, string>;
    devDependencies?: Record<string, string>;
  } = {};

  const dependencies = packageJson.dependencies || {};

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
