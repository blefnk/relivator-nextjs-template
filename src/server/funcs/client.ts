import type { ApiResponse, ApiResponseError } from "~/types";

function isApiResponseError(
  response: Response,
  json: unknown,
): json is ApiResponseError {
  /**
   * If the fetch command returned 'ok', this is a success (status 200-299)
   */
  if (response.ok) {
    return false;
  }

  if (typeof json !== "object" || json === null) {
    return false;
  }

  return "error" in json && typeof json.error !== "string";
}

export async function apiFetch<T>(url: string, options?: RequestInit) {
  const response = await fetch(url, {
    ...options,
    headers: {
      ...options?.headers,
      "Content-Type": "application/json",
    },
  });

  const json = (await response.json()) as ApiResponse<T>;

  if (isApiResponseError(response, json)) {
    throw new Error(json.error);
  }

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return json.data;
}
