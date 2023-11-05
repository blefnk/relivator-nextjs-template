import { type PropsWithChildren } from "react";
import { type WithChildren } from "~/types";

import { FakeLoadingVariantOne } from "~/islands/fake-loading";

type AuthLayoutProps = PropsWithChildren;

export default function AuthLayout({
  children,
}: WithChildren<AuthLayoutProps>) {
  return (
    <>
      <FakeLoadingVariantOne />
      {children}
    </>
  );
}
