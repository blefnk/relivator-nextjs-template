import { Github, Twitter } from "lucide-react";

import { REPOSITORY_URL } from "~/constants/repository-info";
import { getScopedI18n } from "~/utils/server/i18n";
import { typography } from "~/utils/server/text";

import { Button } from "../ui/button";

export async function Footer() {
  const t = await getScopedI18n("islands");

  return (
    <footer className="container flex flex-col items-center justify-between gap-4 py-6 animate-in fade-in duration-medium md:h-24 md:flex-row">
      <p className="text-center text-sm leading-loose text-muted-foreground md:text-left">
        {t("footer", {
          author: (
            <a
              className={typography.link}
              href="https://github.com/blefnk"
              target="_blank"
              rel="noreferrer"
            >
              Bleverse
            </a>
          ),
          github: (
            <a
              className={typography.link}
              href={REPOSITORY_URL}
              target="_blank"
              rel="noreferrer"
            >
              GitHub
            </a>
          ),
        })}
      </p>
      <div className="flex gap-2">
        <Button asChild variant="ghost" size="icon">
          <a
            href="https://github.com/blefnk"
            target="_blank"
            rel="noreferrer"
            aria-label={t("navbar.links.github")}
          >
            <Github size={20} />
          </a>
        </Button>
        <Button asChild variant="ghost" size="icon">
          <a
            href="https://x.com/bleverse_com"
            target="_blank"
            rel="noreferrer"
            aria-label={t("navbar.links.twitter")}
          >
            <Twitter size={20} />
          </a>
        </Button>
      </div>
    </footer>
  );
}
