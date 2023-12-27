/**
 * Jest Setup Configuration
 * ==========================
 *
 * @see https://nextjs.org/docs/architecture/nextjs-compiler#jest
 * @see https://jest-extended.jestcommunity.dev/docs/getting-started/setup
 */

import "@testing-library/jest-dom";

import * as matchers from "jest-extended";

expect.extend(matchers);
