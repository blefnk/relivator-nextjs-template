// value: null | string | undefined,
export const convertEmptyStringToUndefined = (
  value: string | undefined,
): string | undefined => {
  // TODO: ensure an absence of env var in .env file is handled correctly
  // return value === undefined || value === null || value.trim() === ""
  //   ? undefined
  //   : value;
  return value === "" ? undefined : value;
};
