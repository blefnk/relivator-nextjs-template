import type { ReactNode } from "react";

export default function ProductsLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <>
      <main className="relative flex min-h-screen flex-col">{children}</main>
    </>
  );
}
