import { cls } from "~/server/utils";

test("merges class names", () => {
  // eslint-disable-next-line tailwindcss/no-custom-classname
  const result = cls("foo", "bar");
  expect(result).toBe("foo bar");
});

test("removes conflicting tailwind classes", () => {
  // eslint-disable-next-line tailwindcss/no-contradicting-classname
  const result = cls("p-4", "p-6");
  expect(result).toBe("p-6");
});
