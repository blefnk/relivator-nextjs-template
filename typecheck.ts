import { execa } from "execa";
import { readFile, writeFile } from "fs-extra";
import { join } from "pathe";

const verbose = false;

async function readTSConfig(path: string) {
  try {
    const content = await readFile(path, "utf-8");
    return JSON.parse(content);
  } catch (error: any) {
    throw new Error(`Failed to read tsconfig.json: ${error.message}`);
  }
}

async function writeTSConfig(path: string, config: Record<string, unknown>) {
  try {
    await writeFile(path, JSON.stringify(config, null, 2));
  } catch (error: any) {
    throw new Error(`Failed to write tsconfig.json: ${error.message}`);
  }
}

async function getPackageManager(): Promise<string> {
  try {
    const configPath = join(process.cwd(), ".reliverse");
    const content = await readFile(configPath, "utf-8");
    const config = JSON.parse(content);
    const configuredManager = config.experimental?.projectPackageManager;

    // If the configured manager is one of the standard ones, use it
    if (["npm", "pnpm", "yarn", "bun"].includes(configuredManager)) {
      return configuredManager;
    }

    // Otherwise try bun -> pnpm -> npm in order
    for (const manager of ["bun", "pnpm", "npm"]) {
      try {
        await execa(manager, ["--version"]);
        if (verbose) {
          console.log(`Using ${manager} as package manager`);
        }
        return manager;
      } catch {
        continue;
      }
    }

    // If nothing else works, fall back to bun
    return "bun";
  } catch (error: any) {
    if (verbose) {
      console.warn(
        "Failed to read .reliverse config, falling back to bun:",
        error.message,
      );
    }
    return "bun";
  }
}

async function checkAndRemoveNextTypes() {
  const tsconfigPath = join(process.cwd(), "tsconfig.json");
  const packageManager = await getPackageManager();

  // Read tsconfig.json
  const tsconfig = await readTSConfig(tsconfigPath);
  if (!tsconfig || !Array.isArray(tsconfig.include)) {
    if (verbose) {
      console.log(
        'No "include" array found in tsconfig.json. Nothing to remove.',
      );
    }
    return;
  }

  // Check if .next/types/**/*.ts is in the include array
  const nextTypesIndex = tsconfig.include.indexOf(".next/types/**/*.ts");

  if (nextTypesIndex === -1) {
    if (verbose) {
      console.log(
        'No ".next/types/**/*.ts" entry found in the "include". Skipping.',
      );
    }
    return;
  }

  // Remove the entry and write changes
  tsconfig.include.splice(nextTypesIndex, 1);
  await writeTSConfig(tsconfigPath, tsconfig);

  try {
    // Use the configured package manager instead of hardcoded "bun"
    await execa(packageManager, ["tsc", "--noEmit"], { stdio: "inherit" });
  } finally {
    // Revert changes
    tsconfig.include.splice(nextTypesIndex, 0, ".next/types/**/*.ts");
    await writeTSConfig(tsconfigPath, tsconfig);
  }
}

async function main() {
  try {
    await checkAndRemoveNextTypes();
  } catch (error: any) {
    console.error("Error:", error);
    process.exit(1);
  }
}

await main();
