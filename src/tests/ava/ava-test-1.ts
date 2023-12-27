/**
 * Ava Testing Library (TODO: W.I.P.)
 * ==================================
 *
 * @see https://github.com/avajs/ava
 * @see https://github.com/xojs/xo
 * @see https://swc.rs/playground
 */

import test from "ava";

const fn = () => "foo";

test("fn() returns foo", (t) => {
  t.is(fn(), "foo");
});
