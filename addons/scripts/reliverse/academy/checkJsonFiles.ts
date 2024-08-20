import type { AcademyQuestion } from "@/scripts/reliverse/academy/types";
import type { JSONSchemaType } from "ajv";

import { getCurrentDirname } from "@reliverse/fs";
import { debugEnabled } from "~/../reliverse.config";
import Ajv from "ajv";
import addFormats from "ajv-formats";
import { loadConfig } from "c12";
import consola from "consola";
import { destr } from "destr";
import fs from "fs-extra";
import path from "pathe";

const currentDirname = getCurrentDirname(import.meta.url);

const playerJsonFile = "data/players.json";
const playerJsonPath = path.join(currentDirname, playerJsonFile);

const progressJsonFile = "data/progress.json";
const progressJsonPath = path.join(currentDirname, progressJsonFile);

const readJsonFile = async <T>(filePath: string): Promise<T> => {
  try {
    const data = await fs.readFile(filePath, {
      encoding: "utf8",
    });

    return destr(data) as T;
  } catch (error) {
    consola.error(`Error reading or parsing file at ${filePath}:`, error);

    throw error;
  }
};

const checkUniqueIds = (
  data: {
    id: string;
  }[],
): boolean => {
  if (!Array.isArray(data)) {
    throw new TypeError("Data is not an array");
  }

  const ids = data.map((item) => item.id);
  const uniqueIds = new Set(ids);

  return ids.length === uniqueIds.size;
};

const checkUniqueUsernames = (
  data: {
    name: string;
  }[],
): boolean => {
  if (!Array.isArray(data)) {
    throw new TypeError("Data is not an array");
  }

  const usernames = data.map((item) => item.name);
  const uniqueUsernames = new Set(usernames);

  return usernames.length === uniqueUsernames.size;
};

const checkUniqueKeys = (data: Record<string, any>): boolean => {
  const keys = Object.keys(data);
  const uniqueKeys = new Set(keys);

  return keys.length === uniqueKeys.size;
};

const ensurePlayersProperty = async (filePath: string): Promise<void> => {
  try {
    const data = await readJsonFile<Record<string, any>>(filePath);

    if (!data.players) {
      data.players = [];
      await fs.writeFile(filePath, JSON.stringify(data, null, 2), {
        encoding: "utf8",
      });

      if (debugEnabled) {
        consola.info(`Added missing 'players' property to ${filePath}`);
      }
    }
  } catch (error) {
    consola.error(`Error ensuring 'players' property in ${filePath}:`, error);

    throw error;
  }
};

export const validateJsonSchema = async (): Promise<void> => {
  const { config } = await loadConfig({
    name: "config",
    cwd: currentDirname,
  });

  const schemaPath = path.join(currentDirname, config.schemaFile);

  let academySchema: JSONSchemaType<AcademyQuestion[]>;

  try {
    academySchema =
      await readJsonFile<JSONSchemaType<AcademyQuestion[]>>(schemaPath);
  } catch (error) {
    consola.error("Failed to load academy schema:", error);

    throw new Error("Academy schema validation failed");
  }

  const ajv = new Ajv({
    allErrors: true,
    strict: true,
  });

  addFormats(ajv);

  const validateAcademy = ajv.compile(academySchema);

  const questionsDirectory = path.join(currentDirname, "questions");
  const files = await fs.readdir(questionsDirectory);

  const jsonFiles = files.filter(
    (file) => file.endsWith(".json") && file !== "schema.json",
  );

  for (const file of jsonFiles) {
    const dataPath = path.join(questionsDirectory, file);
    const relativePath = path.relative(currentDirname, dataPath);
    const jsonFilePath = path.join(
      "addons/scripts/reliverse/academy",
      relativePath,
    );

    try {
      const data: AcademyQuestion[] =
        await readJsonFile<AcademyQuestion[]>(dataPath);

      if (!checkUniqueIds(data)) {
        throw new Error(`Duplicate IDs found in ${jsonFilePath}`);
      }

      const valid = validateAcademy(data);

      if (valid) {
        if (debugEnabled) {
          consola.success(`🟢 [valid] ${jsonFilePath}`);
        }
      } else {
        consola.error(`🔴 [invalid] ${jsonFilePath}:`, validateAcademy.errors);

        throw new Error(`Validation failed for ${jsonFilePath}`);
      }
    } catch (error) {
      consola.error(`🔴 Failed to validate ${jsonFilePath}:`, error);

      throw new Error(`Validation failed for ${jsonFilePath}`);
    }
  }

  // Validate players.json
  try {
    await ensurePlayersProperty(playerJsonPath);

    const playerSchemaPath = path.join(
      currentDirname,
      "data/schema-players.json",
    );

    const playerSchema =
      await readJsonFile<JSONSchemaType<any>>(playerSchemaPath);

    const validatePlayer = ajv.compile(playerSchema);

    const playersData = await readJsonFile<{
      players: {
        id: string;
        name: string;
      }[];
    }>(playerJsonPath);

    if (!validatePlayer(playersData)) {
      consola.error(`🔴 [invalid] ${playerJsonFile}:`, validatePlayer.errors);

      throw new Error(`Validation failed for ${playerJsonPath}`);
    }

    if (!checkUniqueIds(playersData.players)) {
      throw new Error(`Duplicate IDs found in ${playerJsonFile}`);
    }

    if (!checkUniqueUsernames(playersData.players)) {
      throw new Error(`Duplicate usernames found in ${playerJsonFile}`);
    }

    if (debugEnabled) {
      consola.success(`🟢 [valid] ${playerJsonFile}`);
    }
  } catch (error) {
    consola.error(`🔴 [invalid] ${playerJsonFile}:`, error);

    throw new Error(`Validation failed for ${playerJsonPath}`);
  }

  // Validate progress.json
  try {
    const progressSchemaPath = path.join(
      currentDirname,
      "data/schema-progress.json",
    );

    const progressSchema =
      await readJsonFile<JSONSchemaType<any>>(progressSchemaPath);

    const validateProgress = ajv.compile(progressSchema);

    const progressData =
      await readJsonFile<Record<string, Record<string, string[]>>>(
        progressJsonPath,
      );

    if (!validateProgress(progressData)) {
      consola.error(
        `🔴 [invalid] ${progressJsonFile}:`,
        validateProgress.errors,
      );

      throw new Error(`Validation failed for ${progressJsonPath}`);
    }

    if (!checkUniqueKeys(progressData)) {
      throw new Error(`Duplicate player IDs found in ${progressJsonFile}`);
    }

    if (debugEnabled) {
      consola.success(`🟢 [valid] ${progressJsonFile}`);
    }
  } catch (error) {
    consola.error(`🔴 [invalid] ${progressJsonFile}:`, error);

    throw new Error(`Validation failed for ${progressJsonPath}`);
  }
};

// Run the validation
validateJsonSchema();
