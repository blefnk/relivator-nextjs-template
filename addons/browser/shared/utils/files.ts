import { dirname } from "pathe";
import { fileURLToPath } from "url";

// __dirname for ES module context
export function getCurrentDirname(metaUrl: string): string {
  return dirname(fileURLToPath(metaUrl));
}
