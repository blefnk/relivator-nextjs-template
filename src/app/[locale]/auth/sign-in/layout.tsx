import type { ReactNode } from "react";

type SignInLayoutProps = {
  children: ReactNode;
};

export default function SignInLayout({ children }: SignInLayoutProps) {
  return <>{children}</>;
}
