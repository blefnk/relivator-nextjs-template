import Link from "next/link";
import { REPOSITORY_URL, settings, siteConfig } from "~/app";
import { Github, Twitter } from "lucide-react";

import { getScopedI18n } from "~/data/i18n/server";
import { SubscribeToNewsletterForm } from "~/forms/newsletter-subscribe";
import { ModeToggle } from "~/islands/modules/mode-toggle";
import { Shell } from "~/islands/modules/shell";
import { buttonVariants } from "~/islands/primitives/button";
import { cn } from "~/utils/server/fmt";
import { typography } from "~/utils/server/text";

export async function SiteFooter() {
  const t = await getScopedI18n("islands");

  return (
    <footer className="w-full border-t bg-background">
      <Shell as="div">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col gap-10 lg:flex-row lg:gap-20"
        >
          <section
            id="footer-branding"
            aria-labelledby="footer-branding-heading"
          >
            <Link
              aria-label="Home"
              href="/"
              className="flex items-center space-x-2"
            >
              <span className="font-bold">{siteConfig.name}</span>
            </Link>
          </section>
          <section
            id="footer-links"
            aria-labelledby="footer-links-heading"
            className="grid flex-1 grid-cols-1 gap-10 xs:grid-cols-2 sm:grid-cols-4"
          >
            {siteConfig.footerNav.map((item) => (
              <div key={item.title} className="space-y-3">
                <h4 className="text-base font-medium">{item.title}</h4>
                <ul className="space-y-3">
                  {item.items.map((link) => (
                    <li key={link.title}>
                      <Link
                        href={link.href}
                        target={link?.external ? "_blank" : undefined}
                        rel={link?.external ? "noreferrer" : undefined}
                        className="text-sm text-muted-foreground transition-colors hover:text-foreground"
                      >
                        {link.title}
                        <span className="sr-only">{link.title}</span>
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </section>
          <section
            id="newsletter"
            aria-labelledby="newsletter-heading"
            className="space-y-3"
          >
            <h4 className="text-base font-medium">
              Subscribe to our newsletter
            </h4>
            <SubscribeToNewsletterForm />
          </section>
        </section>
        <section
          id="footer-bottom"
          aria-labelledby="footer-bottom-heading"
          className="flex items-center space-x-4"
        >
          <div className="flex-1 text-left text-sm leading-loose text-muted-foreground">
            {t("footer", {
              author: (
                <Link
                  href="https://x.com/blefnk"
                  target="_blank"
                  rel="noreferrer"
                  className="font-semibold transition-colors hover:text-foreground"
                >
                  Bleverse
                </Link>
              ),
              github: (
                <Link
                  href={REPOSITORY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className={typography.link}
                >
                  GitHub
                </Link>
              )
            })}
          </div>
          <div className="flex items-center space-x-1">
            <Link
              href={siteConfig.links.github}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost"
                })
              )}
            >
              <Github className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">GitHub</span>
            </Link>
            <Link
              href={siteConfig.links.twitter}
              target="_blank"
              rel="noreferrer"
              className={cn(
                buttonVariants({
                  size: "icon",
                  variant: "ghost"
                })
              )}
            >
              <Twitter className="h-4 w-4" aria-hidden="true" />
              <span className="sr-only">X (known as Twitter)</span>
            </Link>
            {settings.themeToggleEnabled && <ModeToggle />}
          </div>
        </section>
      </Shell>
    </footer>
  );
}
