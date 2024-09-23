export const unknownError =
  "An unknown error occurred. Please try again later.";

export const redirects = {
  afterLogin: "/dashboard/stores",
  afterLogout: "/",
  afterVerify: "/dashboard/stores",
  toLogin: "/signin",
  toSignup: "/signup",
  toVerify: "/verify-email",
} as const;
