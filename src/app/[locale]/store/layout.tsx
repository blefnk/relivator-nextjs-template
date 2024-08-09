import type { ReactNode } from "react";

type CatalogueLayoutProps = {
  children: ReactNode;
};

export default function CatalogueLayout({ children }: CatalogueLayoutProps) {
  return (
    <>
      <div className="relative flex min-h-screen flex-col">
        <main className="flex-1">{children}</main>
      </div>
    </>
  );
}
