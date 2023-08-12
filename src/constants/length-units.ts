export const lengthUnits = [
  "kilometer",
  "meter",
  "centimeter",
  "millimeter",
  "micrometers",
  "nanometers",
  "mile",
  "yard",
  "foot",
  "inch",
  "nautical mile",
] as const;

export type LengthUnits = (typeof lengthUnits)[number];
