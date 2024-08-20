import { getErrorMessage } from "@/server/reliverse/error-message";
import { getCurrentDirname } from "@reliverse/fs";
import { destr } from "destr";
import fs from "fs-extra";
import { join } from "pathe";

const currentDirname = getCurrentDirname(import.meta.url);

const getFilePath = (filename: string): string =>
  join(currentDirname, filename);

const readFile = async (filePath: string): Promise<string> => {
  try {
    return await fs.readFile(filePath, "utf8");
  } catch (error) {
    throw new Error(`Failed to read file: ${getErrorMessage(error)}`);
  }
};

const writeFile = async (filePath: string, data: string): Promise<void> => {
  try {
    await fs.writeFile(filePath, data, "utf8");
  } catch (error) {
    throw new Error(`Failed to write file: ${getErrorMessage(error)}`);
  }
};

export const readJsonFile = async <T>(filename: string): Promise<T> => {
  const filePath = getFilePath(filename);
  const data = await readFile(filePath);

  return destr(data) as T;
};

export const writeJsonFile = async (
  filename: string,
  data: any,
): Promise<void> => {
  const filePath = getFilePath(filename);

  await writeFile(filePath, JSON.stringify(data, null, 2));
};
