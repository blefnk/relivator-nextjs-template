import "server-only";
import { unstable_cache as cache } from "next/cache";
import { ofetch } from "ofetch";

import { SYSTEM_CONFIG } from "~/app";

export async function getGithubStars() {
  if (!SYSTEM_CONFIG.repoStars) {
    return null;
  }

  return await cache(
    async () => {
      try {
        const data = await ofetch<{ repo: { stargazers_count: number } }>(
          `https://regh.reliverse.org/repos/${SYSTEM_CONFIG.repoOwner}/${SYSTEM_CONFIG.repoName}`,
          {
            headers: {
              Accept: "application/vnd.github+json",
            },
          },
        );

        if (
          data?.repo?.stargazers_count !== undefined &&
          typeof data.repo.stargazers_count === "number"
        ) {
          return data.repo.stargazers_count;
        }
        console.warn("github api response format unexpected:", data);
        return null;
      } catch (error) {
        console.error("failed to fetch github stars:", error);
        return null;
      }
    },
    ["github-stars", SYSTEM_CONFIG.repoOwner, SYSTEM_CONFIG.repoName],
    {
      revalidate: 3600,
      tags: ["github-stars"],
    },
  )();
}
