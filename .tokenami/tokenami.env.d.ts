/**
 * TODO: See #33 and #90 of the Relivator's Roadmap
 * @see https://github.com/tokenami/tokenami#readme
 */

import { TokenamiProperties } from "@tokenami/dev";

import config from "./tokenami.config";

export type Config = typeof config;

declare module "@tokenami/dev" {
  // biome-ignore lint/suspicious/noEmptyInterface: <explanation>
  interface TokenamiConfig extends Config {}
}

declare module "react" {
  // biome-ignore lint/suspicious/noEmptyInterface: <explanation>
  interface CSSProperties extends TokenamiProperties {}
}
