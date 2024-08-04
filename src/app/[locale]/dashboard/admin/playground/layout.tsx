import type { ReactNode } from "react";

export default function PlaygroundLayout({
  children,
}: Readonly<{
  children: ReactNode;
}>) {
  return <>{children}</>;
}
