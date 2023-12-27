/**
 * Reliverse CMS v0.3.0 - Component Creation API
 * =============================================
 * todo: migrate to app's router api system
 * @see https://github.com/blefnk/reliverse
 */

import fs from "fs";
import path from "path";

export default function handler(req, res) {
  if (req.method === "POST") {
    const { title } = req.body;
    const dir = path.join(process.cwd(), "src/islands/(cms)");
    const file = path.join(
      dir,
      `${title.replace(/\s+/g, "-").toLowerCase()}.tsx`,
    );

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
      res.status(409).json({ message: "Component already exists" });
    } else {
      // Convert title to PascalCase for function name
      const functionName = title
        .split("-")
        .map((word: string) => word.charAt(0).toUpperCase() + word.slice(1))
        .join("");

      const content = `\
export default function ${functionName}() {
  return <div>This is the ${functionName} component.</div>;
};
`;

      // Write the file with the chosen title and hardcoded content
      fs.writeFileSync(file, content, "utf8");
      res.status(200).json({ message: "Component created successfully" });
    }
  } else {
    res.status(405).json({ message: "Method not allowed" });
  }
}
