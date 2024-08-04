import { dirname } from "pathe";
import { fileURLToPath } from "url";

// __dirname for ES module context
// const getCurrentDirname = (metaUrl: string) =>
//   dirname(new URL(metaUrl).pathname);
export function getCurrentDirname(metaUrl: string): string {
  return dirname(fileURLToPath(metaUrl));
}
