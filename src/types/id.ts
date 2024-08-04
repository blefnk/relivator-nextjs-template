export type GenerateIdOptions = {
  //
  // The length of the generated ID.
  // @default 16
  // @example 16 => "abc123def456ghi7"
  //
  length?: number;

  //
  // The separator to use between the prefix and the generated ID.
  // @default "_"
  // @example "_" => "str_abc123"
  //
  separator?: string;
};
