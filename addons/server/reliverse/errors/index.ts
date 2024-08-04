import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import * as z from "zod";

const unknownError = "⛔ An unknown error occurred!";

export const errorMessage = (error: unknown): string => {
  if (error instanceof z.ZodError) {
    return error.errors[0]?.message ?? unknownError;
  }

  if (isClerkAPIResponseError(error)) {
    return error.errors[0]?.longMessage ?? unknownError;
  }

  if (error instanceof Error) {
    return error.message;
  }

  return String(error) ?? unknownError;
};
