import type { ReactNode } from "react";

type MainLayoutProps = {
  children: ReactNode;
};

export default function MiscLayout({ children }: MainLayoutProps) {
  return <>{children}</>;
}
