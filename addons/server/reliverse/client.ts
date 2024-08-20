import type { ApiResponse, ApiResponseError } from "@/types/reliverse/api";

import { ofetch } from "ofetch";

const isString = (a: unknown): a is string => typeof a === "string";

function isApiResponseError(
  res: Response,
  json: unknown,
): json is ApiResponseError {
  //
  // If the fetch command returned 'ok', this is a success (status 200-299)
  //
  if (res.ok) {
    return false;
  }

  if (typeof json !== "object" || json === null) {
    return false;
  }

  return "error" in json && !isString(json.error);
}

export async function apiFetch<T>(url: string, options?: RequestInit) {
  const res = await ofetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });

  const json = (await res.json()) as ApiResponse<T>;

  if (isApiResponseError(res, json)) {
    throw new Error(json.error);
  }

  if (!res.ok) {
    throw new Error(res.statusText);
  }

  return json.data;
}
