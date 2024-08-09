import fs from "fs-extra";
import { dirname, join } from "pathe";
import { fileURLToPath } from "url";

export function getCurrentDirname(importMetaUrl: string) {
  return dirname(fileURLToPath(importMetaUrl));
}

export function getRootDirname(
  importMetaUrl: string,
  doubleDotsRepeat: number,
) {
  const currentDirname = getCurrentDirname(importMetaUrl);
  const backPath = "../".repeat(doubleDotsRepeat);

  // @see https://daily.dev/blog/join-method-javascript-best-practices
  return join(currentDirname, backPath);
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
