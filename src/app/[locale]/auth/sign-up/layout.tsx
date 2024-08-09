import type { ReactNode } from "react";

type SignUpLayoutProps = {
  children: ReactNode;
};

export default function SignUpLayout({ children }: SignUpLayoutProps) {
  return <>{children}</>;
}
