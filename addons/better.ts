import { execaCommand } from "execa";
import fs from "fs-extra";
import MagicString from "magic-string";
import path from "pathe";

async function main() {
  // Step 1: Generate the schema file
  await execaCommand(
    "bun x --bun @better-auth/cli generate --config ./src/lib/auth.ts --output ./src/db/schema/users.ts",
    { stdio: "inherit" },
  );

  // Step 2: Read the generated file
  const filePath = path.resolve("./src/db/schema/users.ts");
  const originalContent = await fs.readFile(filePath, "utf8");

  // Create a new MagicString instance with the original content
  const s = new MagicString(originalContent);

  // Step 2.5: Add a notice at the top of the file
  const notice = `/**
 * THIS FILE IS AUTO-GENERATED - DO NOT EDIT DIRECTLY
 * 
 * To modify the schema, edit src/lib/auth.ts instead,
 * then run 'bun db:auth' to regenerate this file.
 * 
 * Any direct changes to this file will be overwritten.
 */

`;
  s.prepend(notice);

  // Step 3: Find all table declarations and replace them
  s.replace(
    /export const (\w+) = pgTable/g,
    (_match: string, tableName: string) => {
      return `export const ${tableName}Table = pgTable`;
    },
  );

  // Step 4: Extract all table names from the original content
  const tableNames: string[] = [];
  const tableMatches = originalContent.matchAll(
    /export const (\w+) = pgTable/g,
  );

  for (const match of tableMatches) {
    if (match[1]) {
      tableNames.push(match[1]);
    }
  }

  console.log("√ Corrected table names:", tableNames);

  // Step 5: Replace all references to these tables
  for (const tableName of tableNames) {
    // Replace references in the form: () => tableName.
    s.replace(
      new RegExp(`\\(\\(\\)\\s*=>\\s*${tableName}\\s*\\.`, "g"),
      (match: string) => {
        return match.replace(tableName, `${tableName}Table`);
      },
    );
  }

  // Step 6: Save the modified content back to the file
  await fs.writeFile(filePath, s.toString(), "utf8");

  // Step 7: Make it prettier
  await execaCommand("bun biome check --write .", {
    stdio: "inherit",
  });
}

await main().catch((error: unknown) => {
  console.error("Error:", error);
  process.exit(1);
});
