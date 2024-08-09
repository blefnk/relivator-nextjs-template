import type { ReactNode } from "react";

type SignOutLayoutProps = {
  children: ReactNode;
};

export default function SignOutLayout({ children }: SignOutLayoutProps) {
  return <>{children}</>;
}
