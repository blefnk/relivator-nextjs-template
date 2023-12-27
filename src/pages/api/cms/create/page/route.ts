/**
 * Reliverse CMS v0.3.0 - Page Creation API
 * ========================================
 * todo: migrate to app's router api system
 * @see https://github.com/blefnk/reliverse
 */

import fs from "fs";
import path from "path";

import log from "~/core/logs";
import { logger } from "~/core/logs/winston";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { title } = req.body;
    const dir = path.join(process.cwd(), `src/app/[locale]/(cms)/${title}`);
    const file = path.join(dir, "page.tsx");

    /**
     * Check if the directory exists, create if not
     * ============================================
     * @see https://stackoverflow.com/a/41970204/2391795
     */
    if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });

    /**
     * Check if the file already exists
     * ================================
     * - If exists, send a response to indicate this in browser console
     * - If not, create the file with the content and the chosen title
     */
    if (fs.existsSync(file)) {
      res.status(409).json({ message: "Page already exists" });
    } else {
      // Convert title to PascalCase for function name
      const functionName = title
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

      const content = `\
import { GeneralShell } from "~/islands/wrappers/general-shell";

export default function ${functionName}() {
  return (
    <GeneralShell>
      This is the "${title.replace(/-/g, " ")}" page.
    </GeneralShell>
  );
};
`;

      // Write the file with the chosen
      // title and its hardcoded content
      fs.writeFileSync(file, content, "utf8");
      // log("info", `Page created on the following path:\n${file}`);
      res.status(200).json({ message: "Page created successfully" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
