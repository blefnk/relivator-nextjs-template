import type { ConfigOptions } from "mathjs";

import { all, create } from "mathjs";

const mathjsConfig: ConfigOptions = {
  absTol: 1e-15,
  matrix: "Matrix",
  number: "number",
  precision: 64,
  predictable: false,
  randomSeed: null,
  relTol: 1e-12,
};

export const math = create(all || {}, mathjsConfig);
