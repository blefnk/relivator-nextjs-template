import consola from "consola";

import type { QueryResult, Stargazer } from "./cache";

import { fetchViaGraphQl } from "./via-graphql";
import { fetchPageViaRest, REST_PER_PAGE } from "./via-rest";

export async function fetchStargazers({
  abortSignal,
  repoName,
  repoOrg,
  starCount,
}: {
  abortSignal: AbortSignal;
  repoName: string;
  repoOrg: string;
  starCount: number;
}) {
  let allStargazers: Stargazer[] = [];

  consola.info("Fetching stars...");

  // eslint-disable-next-line no-restricted-properties
  if (!process.env.REMOTION_GITHUB_TOKEN) {
    consola.error(
      // eslint-disable-next-line @stylistic/max-len
      "No REMOTION_GITHUB_TOKEN environment variable found. Using the GitHub REST API instead of GraphQL, which has a lower rate-limit and does not have GitHub display names.",
    );

    let page = 0;

    for (let index = 0; index < Math.ceil(starCount / REST_PER_PAGE); index++) {
      const stars = await fetchPageViaRest({
        abortSignal,
        page,
        repoName,
        repoOrg,
      });

      if (stars.length === 0) {
        break;
      }

      allStargazers = [...allStargazers, ...stars];
      consola.info(`Fetched ${allStargazers.length} stars`);

      if (allStargazers.length >= starCount) {
        allStargazers = allStargazers.slice(0, starCount);
        break;
      }

      page++;
    }

    return allStargazers;
  }

  let starsLeft = starCount;
  let cursor = null;

  while (starsLeft > 0) {
    const count = Math.min(starsLeft, 100);

    const { cursor: newCursor, res } = (await fetchViaGraphQl({
      abortSignal,
      count,
      cursor,
      repoName,
      repoOrg,
    })) as QueryResult;

    allStargazers = [...allStargazers, ...res];
    consola.info(`Fetched ${allStargazers.length} stars`);
    cursor = newCursor;

    if (res.length < count) {
      starsLeft = 0;
    } else {
      starsLeft -= res.length;
    }
  }

  return allStargazers;
}
