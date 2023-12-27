import identity from "~/utils/other/for-test/identity";

it("identity should return what you pass to it", () => {
  expect(identity()).toBeUndefined();
  expect(identity()).toBeUndefined();
  expect(identity(null)).toBeNull();
  expect(identity(2)).toBe(2);
});
