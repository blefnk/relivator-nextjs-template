import * as z from "zod";

// export const ERR = {
// unauthenticated: "Unauthenticated",
// unauthorized: "Unauthorized",
// db: "Failed to find in database",
// undefined: "Undefined variable",
// fetch: "Failed to fetch data",
// not_allowed: "User should not be allowed to do this action",
// };
export function catchError(error: unknown) {
  if (error instanceof z.ZodError) {
    const errors = error.issues.map((issue) => issue.message);

    // return toast(errors.join("\n"));
    return errors.join("\n");
  }

  if (error instanceof Error) {
    // return toast(error.message);
    return error.message;
  }

  // return toast("Something went wrong, please try again later.");
  return null;
}
