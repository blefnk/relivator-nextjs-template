import Link from "next/link";

import { heroHeader, REPOSITORY_URL } from "~/app";
import { Github } from "lucide-react";

import { getScopedI18n } from "~/utils/server/i18n";

import { Button } from "~/islands/primitives/button";

export default async function HeroHeader() {
  // @ts-expect-error unstable implementation
  const scopedT = await getScopedI18n("pages.home");

  return (
    <section className="container flex flex-col gap-4 pb-12 pt-4 text-center lg:items-center lg:gap-8 lg:py-14">
      <div className="flex flex-1 flex-col items-center gap-4 text-center lg:gap-8">
        <div className="space-y-4">
          <h1 className="text-4xl font-bold lg:text-6xl">
            {heroHeader.header}
          </h1>
          <h2 className="text-lg font-light text-muted-foreground lg:text-3xl">
            {heroHeader.subheader}
          </h2>
        </div>
        <div className="mt-4 flex w-full items-center justify-center gap-4">
          <div className="mt-4 flex w-full items-center justify-center gap-4">
            <Button className="h-11 px-8" asChild>
              {/* @ts-expect-error unstable implementation */}
              <Link href="/features">{scopedT("get-started")}</Link>
            </Button>
            <Button className="h-11 px-8" variant="outline" asChild>
              <Link href={REPOSITORY_URL} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4" />
                <span>Download Starter</span>
              </Link>
            </Button>
          </div>
        </div>
      </div>
      {/* {heroHeader.image !== "" ? (
        <div className="flex flex-1 justify-center lg:justify-end">
          <Image
            src={heroHeader.image}
            width={500}
            height={500}
            alt="Header image"
          />
        </div>
      ) : (
        <></>
      )} */}
    </section>
  );
}
