import type { ReactNode } from "react";

import Link from "next/link";

import { Button } from "@/components/ui/button";
import { ChevronLeftIcon } from "lucide-react";

type Props = {
  children?: ReactNode;
};

export default function LegalLayout({ children }: Props) {
  return (
    <>
      <div className="flex min-h-screen flex-col">
        <div className="container mx-auto p-6">
          <Button asChild variant="ghost">
            <Link href="/">
              <ChevronLeftIcon className="mr-2 size-4" />
              <span>Back</span>
            </Link>
          </Button>
        </div>
        <main
          className={`
            container mx-auto flex grow flex-col items-center justify-start p-6
          `}
        >
          {children}
        </main>
      </div>
    </>
  );
}
