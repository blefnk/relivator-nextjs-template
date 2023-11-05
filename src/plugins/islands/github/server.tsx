import { REPOSITORY_NAME, REPOSITORY_OWNER, siteConfig } from "~/app";
import { Link } from "~/navigation";

import { Icons } from "~/islands/icons";
import { Badge } from "~/islands/primitives/badge";

import { OssStarsBadge } from "~/plugins/islands/github/client";

export async function GithubStarsPlugin() {
  const githubStars = await getGithubStars();

  return (
    <>
      {githubStars ? (
        <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
          <Badge
            className="rounded-md px-3.5 font-semibold py-1.5"
            variant="outline"
          >
            <Icons.gitHub className="mr-2 h-3.5 w-3.5" aria-label="GitHub" />
            <OssStarsBadge />
            {githubStars}/250
          </Badge>
        </Link>
      ) : null}
    </>
  );
}

export async function getGithubStars(): Promise<number | null> {
  try {
    const response = await fetch(
      `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`,
      {
        headers: {
          Accept: "application/vnd.github+json",
        },
        next: {
          revalidate: 60,
        },
      },
    );
    if (!response.ok) return null;
    const data = (await response.json()) as { stargazers_count: number };
    return data.stargazers_count;
  } catch (err) {
    console.error(err);
    return null;
  }
}
