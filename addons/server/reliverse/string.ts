export type DeepStringify<T> = {
  [K in keyof T]: T[K] extends (infer U)[]
    ? DeepStringify<U>[]
    : T[K] extends object
      ? DeepStringify<T[K]>
      : string;
};
