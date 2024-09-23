import Link from "next/link";

import { ofetch } from "ofetch";

import { siteConfig } from "~/app";
import { GithubSVG } from "~/components/Common/Icons/SVG";
import { Badge } from "~/components/ui/badge";

type Repo = {
  description: string;
  id: number;
  name: string;
  repo: string;
  stars: number;
};

export async function getRepoStarsNumber() {
  const { repo } = await ofetch<{
    repo: Repo;
  }>("https://ungh.cc/repos/blefnk/relivator-nextjs-template");

  return repo.stars;
}

export async function GithubStarsBadge() {
  const repoGithubStarsNumber = await getRepoStarsNumber();

  return (
    <Link
      className="flex items-center justify-center"
      href={siteConfig.links.github}
      rel="noreferrer noopener"
      target="_blank"
    >
      <Badge
        className={`
          mt-12 flex items-center
          justify-center rounded-lg border-2 border-zinc-900/10 px-3.5 py-1.5 text-sm
          font-medium
          dark:border-zinc-800
          lg:text-base
        `}
        variant="outline"
      >
        <GithubSVG className="mr-2 size-3.5" aria-label="GitHub" />
        Star Relivator v1.3.0
        <span
          className={`
            mr-1 hidden
            md:flex
          `}
        >
          -canary.5
        </span>
        <span
          className={`
            ml-1
            md:ml-0
          `}
        >
          on GitHub ⭐{" "}
          {repoGithubStarsNumber && `${repoGithubStarsNumber}/1,000`}
        </span>
      </Badge>
    </Link>
  );
}
