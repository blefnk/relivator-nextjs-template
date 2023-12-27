import { type PropsWithChildren } from "react";
import { type WithChildren } from "~/types";

import { FakeLoadingVariantOne } from "~/islands/fake-loading";

type AuthLayoutProperties = PropsWithChildren;

export default function AuthLayout({
  children,
}: WithChildren<AuthLayoutProperties>) {
  return (
    <>
      <FakeLoadingVariantOne />
      {children}
    </>
  );
}
