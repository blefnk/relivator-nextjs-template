import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import consola from "consola";
import * as z from "zod";

const unknownError = "⛔ An unknown error occurred!";

export const getErrorMessage = (error: unknown): string => {
  if (error instanceof z.ZodError) {
    return error.errors[0]?.message || unknownError;
  }

  if (isClerkAPIResponseError(error)) {
    return error.errors[0]?.longMessage || unknownError;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error) || unknownError;
};

export function showErrorMessage(error: unknown) {
  const getErrorMessageString = getErrorMessage(error);

  consola.error({ getErrorMessageString });
}
