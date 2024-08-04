import type { ReactNode } from "react";

type CatalogueLayoutProps = {
  children: ReactNode;
};

export default function CatalogueLayout({ children }: CatalogueLayoutProps) {
  return <>{children}</>;
}
