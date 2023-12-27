/** @see https://swc.rs/playground */

const test = require("ava");

const sum = (a, b) => a + b;
const subtract = (a, b) => a - b;

test("sum", (t) => {
  t.is(sum(0, 0), 0);
  t.is(sum(2, 2), 4);
});

test("subtract", (t) => {
  t.is(subtract(0, 0), 0);
  t.is(subtract(4, 2), 2);
});
