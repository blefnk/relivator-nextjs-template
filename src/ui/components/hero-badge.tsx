import Link from "next/link";

import { SEO_CONFIG, SYSTEM_CONFIG } from "~/app";
import { getGithubStars } from "~/lib/queries/github";

import { GitHubIcon } from "./icons/github";

export async function HeroBadge() {
  const githubStars = await getGithubStars();

  return (
    <Link
      className={`
        inline-flex items-center rounded-lg bg-primary/10 px-3 py-1 text-sm
        font-semibold text-primary
      `}
      href={
        SYSTEM_CONFIG.repoStars
          ? `https://github.com/${SYSTEM_CONFIG.repoOwner}/${SYSTEM_CONFIG.repoName}`
          : "/products"
      }
      rel={SYSTEM_CONFIG.repoStars ? "noopener noreferrer" : undefined}
      target={SYSTEM_CONFIG.repoStars ? "_blank" : undefined}
    >
      {SYSTEM_CONFIG.repoStars ? (
        <div className="flex items-center gap-1">
          <span>{SEO_CONFIG.fullName}</span>
          <span className="text-muted-foreground">|</span>
          <GitHubIcon className="h-3.5 w-3.5" />
          {githubStars && (
            <span>⭐ {githubStars.toLocaleString()} stars on GitHub</span>
          )}
        </div>
      ) : (
        SEO_CONFIG.fullName
      )}
    </Link>
  );
}
