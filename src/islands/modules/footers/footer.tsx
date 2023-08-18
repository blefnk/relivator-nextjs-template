import Link from "next/link";

import { REPOSITORY_URL } from "~/app";
import { Github, Twitter } from "lucide-react";

import { getScopedI18n } from "~/data/i18n/server";
import { typography } from "~/utils/server/text";

import { Button } from "~/islands/primitives/button";

export async function Footer() {
  const t = await getScopedI18n("islands");

  return (
    <footer className="duration-medium container flex flex-col items-center justify-between gap-4 py-6 animate-in fade-in md:h-24 md:flex-row">
      <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
        {t("footer", {
          author: (
            <Link
              className={typography.link}
              href="https://github.com/blefnk"
              target="_blank"
              rel="noreferrer"
            >
              Bleverse
            </Link>
          ),
          github: (
            <Link
              className={typography.link}
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </Link>
          )
        })}
      </p>
      <div className="flex gap-2">
        <Button asChild variant="ghost" size="icon">
          <Link
            href="https://github.com/blefnk"
            target="_blank"
            rel="noreferrer"
            aria-label={t("navbar.links.github")}
          >
            <Github size={20} />
          </Link>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <Link
            href="https://x.com/bleverse_com"
            target="_blank"
            rel="noreferrer"
            aria-label={t("navbar.links.twitter")}
          >
            <Twitter size={20} />
          </Link>
        </Button>
      </div>
    </footer>
  );
}
