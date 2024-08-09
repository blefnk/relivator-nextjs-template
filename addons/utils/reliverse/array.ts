export function isArrayOfFile(files: unknown): files is File[] {
  const isArray = Array.isArray(files);

  if (!isArray) {
    return false;
  }

  return files.every((file) => file instanceof File);
}
