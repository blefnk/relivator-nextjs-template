import type { ReactNode } from "react";
import Balancer from "react-wrap-balancer";

import { Shell } from "~/components/Wrappers/ShellVariants";
import { cn } from "~/utils/cn";

type Props = {
  children?: ReactNode;
  title?: string;
  variant?: "centered" | "default" | "markdown" | "sidebar";
};

export default function PageLayout({ children, title, variant }: Props) {
  return (
    <Shell
      className="bg-background text-foreground antialiased"
      variant={variant || "default"}
    >
      <div
        className={`
          container grid min-h-screen place-content-center text-center
          duration-1000 animate-in fade-in
        `}
      >
        {title && (
          <Balancer
            className={cn(
              "leading-snug",

              // `
              //   ${typography.h1}
              // `,
            )}
            as="h1"
          >
            {title}
          </Balancer>
        )}
        {children}
      </div>
    </Shell>
  );
}
