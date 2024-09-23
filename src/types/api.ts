import type { ZodIssue } from "zod";

// API Response and Data Handling Types
export type ApiResponseError = {
  error: string;
  issues?: ZodIssue[];
  ok: false;
};

type ApiResponseSuccess<T> = {
  data: T;
  ok: true;
};

export type ApiResponse<T> = ApiResponseError | ApiResponseSuccess<T>;
