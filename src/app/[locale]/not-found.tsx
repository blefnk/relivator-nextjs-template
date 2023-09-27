import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import { Balancer } from "react-wrap-balancer";

import { typography } from "~/server/text";
import { Button } from "~/islands/primitives/button";

export default function NotFound() {
  return (
    <main className="bg-background text-foreground antialiased">
      <div className="duration-really-slow container grid min-h-screen place-content-center text-center animate-in fade-in">
        <h1 className={typography.h1}>Sadly! Page not found! 🫠</h1>
        <Balancer
          as="p"
          className="mx-auto mt-4 !block leading-normal text-muted-foreground sm:text-lg sm:leading-7"
        >
          The resource you're seeking might have been relocated or is not a part
          of our website. Double-check the URL or explore other pages.
        </Balancer>
        <Button className="mx-auto mt-6 w-fit gap-1" asChild>
          <Link href="/">
            <ChevronLeft size={16} />
            <span>Return to Home Page</span>
          </Link>
        </Button>
      </div>
    </main>
  );
}
