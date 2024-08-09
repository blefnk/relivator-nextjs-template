import consola from "consola";
import destr from "destr";
import superjson from "superjson";

export type Stargazer = {
  avatarUrl: string;
  date: string;
  login: string;
  name: string;
};

export type QueryResult = {
  cursor: string;
  res: Stargazer[];
};

const makeKey = ({
  count,
  cursor,
  repoName,
  repoOrg,
}: {
  count: number;
  cursor: null | string;
  repoName: string;
  repoOrg: string;
}) => {
  return ["__stargazer", repoOrg, repoName, count, cursor].join("-");
};

export const saveRes = ({
  count,
  cursor,
  repoName,
  repoOrg,
  res,
}: {
  count: number;
  cursor: null | string;
  repoName: string;
  repoOrg: string;
  res: QueryResult;
}) => {
  try {
    const key = makeKey({
      count,
      cursor,
      repoName,
      repoOrg,
    });

    window.localStorage.setItem(key, superjson.stringify(res));
  } catch (error) {
    if (error instanceof DOMException && error.name === "QuotaExceededError") {
      // If quota is exceeded, don't cache
      consola.warn("LocalStorage quota exceeded, not caching the res");
    } else {
      throw error;
    }
  }
};

export const getFromCache = ({
  count,
  cursor,
  repoName,
  repoOrg,
}: {
  count: number;
  cursor: null | string;
  repoName: string;
  repoOrg: string;
}): null | QueryResult => {
  const key = makeKey({
    count,
    cursor,
    repoName,
    repoOrg,
  });

  const value = window.localStorage.getItem(key);

  if (!value) {
    return null;
  }

  return destr(value) as QueryResult;
};
