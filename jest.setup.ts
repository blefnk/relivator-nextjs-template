/** @see https://jest-extended.jestcommunity.dev/docs/getting-started/setup */

import "@testing-library/jest-dom";

import * as matchers from "jest-extended";

expect.extend(matchers);
