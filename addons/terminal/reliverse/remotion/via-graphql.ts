import consola from "consola";
import { ofetch } from "ofetch";
import superjson from "superjson";

import type { QueryResult, Stargazer } from "./cache";

import { getFromCache, saveRes } from "./cache";

type Edge = {
  node: {
    avatarUrl: string;
    login: string;
    name: string;
  };
  cursor: string;
  starredAt: string;
};

type ApiError =
  | {
      message: string;
      type: "RATE_LIMITED";
    }
  | {
      message: string;
      type: string;
    };

type GitHubApiResponse =
  | {
      data: {
        repository: {
          stargazers: {
            edges: Edge[];
          };
        };
      };
    }
  | {
      errors: ApiError[];
    };

export const fetchViaGraphQl = async ({
  abortSignal,
  count,
  cursor,
  repoName,
  repoOrg,
}: {
  abortSignal: AbortSignal;
  count: number;
  cursor: null | string;
  repoName: string;
  repoOrg: string;
}): Promise<QueryResult> => {
  const cache = getFromCache({
    count,
    cursor,
    repoName,
    repoOrg,
  });

  if (cache) {
    return cache;
  }

  const query = `{
		repository(owner: "${repoOrg}", name: "${repoName}") {
			stargazers(first: ${count}${cursor ? `, after: "${cursor}"` : ""}) {
				edges {
					starredAt
					node {
						avatarUrl
						name
						login
					}
					cursor
				}
			}
		}
	}`;

  const response = await ofetch("https://api.github.com/graphql", {
    body: superjson.stringify({
      query,
    }),
    headers: {
      // eslint-disable-next-line no-restricted-properties
      authorization: `token ${process.env.REMOTION_GITHUB_TOKEN}`,
      "Content-Type": "application/json",
    },
    method: "POST",
    signal: abortSignal,
  });

  if (!response.ok) {
    const textResponse = await response.text();

    throw new Error(
      `HTTP ${response.status} ${response.statusText}: ${textResponse}`,
    );
  }

  const json = (await response.json()) as GitHubApiResponse;

  if ("errors" in json) {
    // @ts-expect-error TODO: fix
    if (json.errors[0].type === "RATE_LIMITED") {
      consola.error("Rate limit exceeded, waiting 1 minute...");
      await new Promise((resolve) => {
        setTimeout(resolve, 60 * 1000);
      });

      return fetchViaGraphQl({
        abortSignal,
        count,
        cursor,
        repoName,
        repoOrg,
      });
    }

    throw new Error(superjson.stringify(json.errors));
  }

  const { edges } = json.data.repository.stargazers;

  // @ts-expect-error TODO: fix
  const lastCursor = edges.at(-1).cursor;

  const result: Stargazer[] = edges.map((edge) => ({
    name: edge.node.name || edge.node.login,
    avatarUrl: edge.node.avatarUrl,
    date: edge.starredAt,
    login: edge.node.login,
  }));

  saveRes({
    count,
    cursor,
    repoName,
    repoOrg,
    res: {
      cursor: lastCursor,
      res: result,
    },
  });

  return {
    cursor: lastCursor,
    res: result,
  };
};
