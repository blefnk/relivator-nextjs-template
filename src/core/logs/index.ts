import type { ILogLevels } from "./winston";
import { logger } from "./winston";

export default function log(
  level: ILogLevels,
  message: string,
  meta?: Record<string, unknown> | string[],
): Promise<void> {
  logger.log(level, message, meta);
  return Promise.resolve();
}

// log("error", "Found %s at %s", ["1, 2, 3"]);
// log("info", "Found %s at %s", { hello: "world" });
