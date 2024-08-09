import type { ReactNode } from "react";

type BlogLayoutProps = {
  children: ReactNode;
};

export default function BlogLayout({ children }: BlogLayoutProps) {
  return (
    <>
      <main className="relative flex min-h-screen flex-1 flex-col">
        {children}
      </main>
    </>
  );
}
