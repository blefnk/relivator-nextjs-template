// @ts-nocheck

import { Balancer } from "react-wrap-balancer";

import { ChevronLeft } from "lucide-react";
import Link from "next/link";

import { Button } from "~/islands/ui/button";
import { ThemeProvider } from "~/islands/contexts/providers";
import { getScopedI18n } from "~/utils/server/i18n";
import { typography } from "~/utils/server/text";

export default async function NotFound() {
  const t = await getScopedI18n("pages.not-found");

  return (
    <ThemeProvider>
      <div className="bg-background text-foreground antialiased">
        <main className="container grid min-h-screen place-content-center text-center animate-in fade-in duration-really-slow">
          <h3 className={typography.h1}>{t("title")}</h3>
          <Balancer
            as="p"
            className="mx-auto mt-4 !block leading-normal text-muted-foreground sm:text-lg sm:leading-7"
          >
            {t("description")}
          </Balancer>
          <Button className="mx-auto mt-6 w-fit gap-1" asChild>
            <Link href="/">
              <ChevronLeft size={16} />
              <span>{t("go-home")}</span>
            </Link>
          </Button>
        </main>
      </div>
    </ThemeProvider>
  );
}
