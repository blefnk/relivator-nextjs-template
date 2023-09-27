import { type ReactNode } from "react";
import { ChevronLeftIcon } from "lucide-react";
import Link from "next-intl/link";

import { Button } from "~/islands/primitives/button";

type Props = {
  children?: ReactNode;
};

export default function LegalLayout({ children }: Props) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="container mx-auto p-6">
        <Button variant="ghost" asChild>
          <Link href="/">
            <ChevronLeftIcon className="mr-2 h-4 w-4" />
            <span>Back</span>
          </Link>
        </Button>
      </div>

      <main className="container mx-auto flex grow flex-col items-center justify-start p-6">
        {children}
      </main>
    </div>
  );
}
