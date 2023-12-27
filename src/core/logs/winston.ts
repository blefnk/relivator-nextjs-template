import { createLogger, format, transports } from "winston";

import type { levels } from "./config";

const logger = createLogger({
  level: "info" as ILogLevels,
  format: format.combine(
    format.json(),
    format.splat(),
    format.errors({
      stack: true,
    }),
  ),
  transports: [
    //
    // - Write all logs with importance level of `error` or less to `error.log`
    //
    new transports.File({
      filename: ".logs/error.log",
      level: "error",
      // maxsize: 500,
      // maxFiles: 3,
    }),
    //
    // - Write all logs with importance level of `info` or less to `other.log`
    //
    new transports.File({
      filename: ".logs/other.log",
      // maxsize: 500,
      // maxFiles: 3,
    }),
  ],
});

//
// If we're not in production then log to the `console` with the colorized
// format as: `${info.level}: ${info.message} JSON.stringify({ ...rest })`
//
if (process.env.NODE_ENV !== "production") {
  logger.add(
    new transports.Console({
      format: format.combine(format.colorize({ all: true })),
    }),
  );
}

export { logger };

export type ILogLevels = keyof typeof levels;

// ============================================================================
// LOGGER PLAYGROUND
// ============================================================================

// ***************
// Allows for JSON logging
// ***************

/* logger.log({
  level: "info",
  message: "Pass an object and this works",
  additional: "properties",
  are: "passed along",
});

logger.info({
  message: "Use a helper method if you want",
  additional: "properties",
  are: "passed along",
}); */

// ***************
// Allows for parameter-based logging
// ***************

/* logger.log("info", "Pass a message and this works", {
  additional: "properties",
  are: "passed along",
});

logger.info("Use a helper method if you want", {
  additional: "properties",
  are: "passed along",
}); */

// ***************
// Allows for string interpolation
// ***************

/* // info: test message my string {}
logger.log("info", "test message %s", "my string");

// info: test message 123 {}
logger.log("info", "test message %d", 123);

// info: test message first second {number: 123}
logger.log("info", "test message %s, %s", "first", "second", { number: 123 });

// prints "Found error at %s"
logger.info("Found %s at %s", "error", new Date());
logger.info("Found %s at %s", "error", new Error("chill winston"));
logger.info("Found %s at %s", "error", /WUT/);
logger.info("Found %s at %s", "error", true);
logger.info("Found %s at %s", "error", 100);
logger.info("Found %s at %s", "error", ["1, 2, 3"]); */

// ***************
// Allows for logging Error instances
// ***************

/* logger.warn(new Error("Error passed as info"));
logger.log("error", new Error("Error passed as message"));

logger.warn("Maybe important error: ", new Error("Error passed as meta"));
logger.log("error", "Important error: ", new Error("Error passed as meta"));

logger.error(new Error("Error as info")); */

// ============================================================================
// RESOURCES AND INSPIRATIONS
// ============================================================================

/**
 * @see https://github.com/winstonjs/winston#table-of-contents
 * @see https://github.com/tiddly-gittly/TidGi-Desktop/blob/master/src/services/libs/log/index.ts
 */
