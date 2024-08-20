import { debugEnabled } from "~/../reliverse.config";
import consola from "consola";
import fs from "fs-extra";
import path from "pathe";

import { env } from "~/env";

export async function patchGitignore(cwd?: string) {
  const gitignorePath = path.resolve(cwd || process.cwd(), ".gitignore");

  if (debugEnabled && env.NODE_ENV === "development") {
    consola.info("[@reliverse/debug]", gitignorePath);
  }

  if (fs.existsSync(gitignorePath)) {
    if (debugEnabled && env.NODE_ENV === "development") {
      consola.info(`[@reliverse/debug] .gitignore found at: ${gitignorePath}`);
    }

    const gitignore = fs.readFileSync(gitignorePath, "utf8").trim().split("\n");

    if (debugEnabled && env.NODE_ENV === "development") {
      consola.info(
        "[@reliverse/debug] Current .gitignore contents:",
        gitignore,
      );
    }

    const newRules = [".eslintcache"].sort((a, b) => a.localeCompare(b));

    if (!gitignore.includes("# Reliverse")) {
      consola.info("New rules to add:", newRules);
    }

    let changed = false;

    if (!gitignore.includes("# Reliverse")) {
      gitignore.push("", "# Reliverse");
      changed = true;
    }

    for (const rule of newRules) {
      if (!gitignore.includes(rule)) {
        gitignore.push(rule);
        changed = true;
      }
    }

    if (changed) {
      gitignore.push("");

      // Add a newline at the end of the file
      fs.writeFileSync(gitignorePath, gitignore.join("\n"), "utf8");
      consola.success("New values have been added to .gitignore");
    } else {
      consola.info("No changes made to .gitignore (already up-to-date)");
    }
  } else {
    consola.error(`.gitignore not found at: ${gitignorePath}`);
  }
}
