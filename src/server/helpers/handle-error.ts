import { isClerkAPIResponseError } from "@clerk/nextjs/errors";
import { toast } from "sonner";
import * as z from "zod";

import { unknownError } from "~/server/helpers/constants";

export function getErrorMessage(error: unknown) {
  if (error instanceof z.ZodError) {
    return error.errors[0]?.message ?? unknownError;
  } else if (isClerkAPIResponseError(error)) {
    return error.errors[0]?.longMessage ?? unknownError;
  } else if (error instanceof Error) {
    return error.message;
  } else {
    return unknownError;
  }
}

export function showErrorToast(error: unknown) {
  const errorMessage = getErrorMessage(error);

  console.log({ errorMessage });

  return toast.error(errorMessage);
}
