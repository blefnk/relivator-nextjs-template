import { siteConfig } from "~/app";
import { Link } from "~/navigation";
import { cn } from "~/utils";
import { Github, Twitter } from "lucide-react";

import { SubscribeToNewsletterForm } from "~/forms/newsletter-subscribe";
import { buttonVariants } from "~/islands/primitives/button";
import { Shell } from "~/islands/wrappers/shell-variants";

export async function SiteFooter() {
  return (
    <footer className="w-full border-t bg-background">
      <Shell as="div">
        <section
          id="footer-content"
          aria-labelledby="footer-content-heading"
          className="flex flex-col items-center gap-10 lg:flex-row lg:gap-20 lg:items-center lg:justify-center"
        >
          <section
            id="footer-links"
            aria-labelledby="footer-links-heading"
            className="grid grid-cols-4 gap-4"
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
            className="space-y-3 flex flex-col items-center lg:items-start"
          >
            <h4 className="text-base font-medium">
              Subscribe to our newsletter
            </h4>
            <SubscribeToNewsletterForm />
            <div className="flex items-center space-x-1">
              <Link
                href={siteConfig.links.github}
                target="_blank"
                rel="noreferrer"
                className={cn(
                  buttonVariants({
                    size: "icon",
                    variant: "ghost",
                  }),
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
                    variant: "ghost",
                  }),
                )}
              >
                <Twitter className="h-4 w-4" aria-hidden="true" />
                <span className="sr-only">X (known as Twitter)</span>
              </Link>
            </div>
            <div
              id="footer-copyright"
              aria-labelledby="footer-copyright-text"
              className="flex items-center space-x-4 justify-center lg:justify-start"
            >
              <div className="block text-sm text-muted-foreground sm:text-center">
                © {new Date().getFullYear()}{" "}
                <Link
                  target="_blank"
                  href="https://bleverse.com/"
                  className="hover:underline"
                >
                  {siteConfig.company.name}
                </Link>
                . All Rights Reserved.
              </div>
            </div>
          </section>
        </section>
      </Shell>
    </footer>
  );
}
