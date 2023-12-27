/**
 * TODO: Reliverse CLI v0.0.0 — Database Switcher — WIP
 */

import { readFileSync, writeFile } from "fs";
import path from "path";

import { select } from "@inquirer/prompts";

async function chooseDatabase() {
  const choices = [
    { title: "MySQL", value: "MySQL" },
    { title: "PostgreSQL", value: "PostgreSQL" },
  ];

  return await select({
    message: "Choose your database:",
    choices,
  });
}

function updateIndexFile(dbChoice: string) {
  const filePath = path.join(__dirname, "src/data/db/index.ts");
  const fileContent = readFileSync(filePath, "utf8");

  // Modify the file content based on the database choice
  if (dbChoice === "MySQL") {
    // Implement MySQL specific modifications
    // eslint-disable-next-line sonarjs/no-duplicated-branches
  } else if (dbChoice === "PostgreSQL") {
    // Implement PostgreSQL specific modifications
  }

  writeFile(filePath, fileContent, (err) => {
    if (err) throw err;
    console.log(`Database configuration updated to use ${dbChoice}`);
  });
}

async function main() {
  const dbChoice = await chooseDatabase();
  updateIndexFile(dbChoice);
}

main();
