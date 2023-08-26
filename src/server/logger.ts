/* eslint-disable @typescript-eslint/no-empty-function */

import { env } from "~/data/env";

/**
 * A basic logger, which does not output anything in test mode.
 */
export const logger =
  env.NODE_ENV === "test"
    ? {
        log: () => {},
        info: () => {},
        warn: () => {},
        error: () => {}
      }
    : console;
