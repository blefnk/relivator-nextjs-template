import consola from "consola";
import { ofetch } from "ofetch";

import type { Stargazer } from "./cache";

export const REST_PER_PAGE = 100;

type GitHubApiResponse = {
  user: {
    avatar_url: string;
    login: string;
  };
  starred_at: string;
}[];

export const fetchPageViaRest = async ({
  abortSignal,
  page,
  repoName,
  repoOrg,
}: {
  abortSignal: AbortSignal;
  page: number;
  repoName: string;
  repoOrg: string;
}): Promise<Stargazer[]> => {
  const url = `https://api.github.com/repos/${repoOrg}/${repoName}/stargazers?per_page=${REST_PER_PAGE}&page=${page}`;
  const res = await ofetch(url, {
    headers: {
      Accept: "application/vnd.github.v3.star+json",
      // eslint-disable-next-line no-restricted-properties
      ...(process.env.REMOTION_GITHUB_TOKEN && {
        // eslint-disable-next-line no-restricted-properties
        Authorization: `Bearer ${process.env.REMOTION_GITHUB_TOKEN}`,
      }),
    },
    signal: abortSignal,
  });

  const rateLimitHit = res.status === 403 || res.status === 429;

  if (rateLimitHit) {
    consola.error("GitHub REST API rate limit hit. Waiting 1 minute...");
    await new Promise((resolve) => {
      setTimeout(resolve, 60 * 1000);
    });

    return fetchPageViaRest({
      abortSignal,
      page,
      repoName,
      repoOrg,
    });
  }

  const json = (await res.json()) as GitHubApiResponse;

  if (!res.ok) {
    throw new Error(`HTTP ${res.status} ${res.statusText} (${url})`);
  }

  return json.map((item) => ({
    name: item.user.login,
    avatarUrl: item.user.avatar_url,
    date: item.starred_at,
    login: item.user.login,
  }));
};
