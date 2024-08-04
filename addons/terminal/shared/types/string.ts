// export type PackageManager = "bun" | "npm" | "pnpm" | "yarn";
// export type SemanticVersionFramework = "1.2.6";
// export type SemanticVersionEngine = "0.4.0";
export type CamelCase<T extends string> = T extends `${infer U}${infer V}`
  ? `${Uppercase<U>}${V}`
  : T;

export type HyphenatedStringToCamelCase<S extends string> =
  S extends `${infer T}-${infer U}`
    ? `${T}${HyphenatedStringToCamelCase<CamelCase<U>>}`
    : CamelCase<S>;

export type HyphenatedDataStringToCamelCase<S extends string> =
  S extends `data-${infer U}` ? HyphenatedStringToCamelCase<U> : S;
