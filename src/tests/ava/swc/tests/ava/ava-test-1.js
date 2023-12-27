/** @see https://swc.rs/playground */

const test = require("ava");

const fn = () => "foo";

test("fn() returns foo", (t) => {
  t.is(fn(), "foo");
});
