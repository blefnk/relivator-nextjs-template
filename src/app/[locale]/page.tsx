import { Suspense } from "react";

import { Lobby } from "~/components/lobby";
import { LobbySkeleton } from "~/components/lobby-skeleton";
import { getGithubStars } from "~/server/queries/github";
import { getCategories, getFeaturedProducts } from "~/server/queries/product";
import { getFeaturedStores } from "~/server/queries/store";

export default function HomePage() {
  /**
   * To avoid sequential waterfall requests, multiple promises are passed to fetch data parallelly.
   * These promises are also passed to the `Lobby` component, making them hot promises.
   * This means they can execute without being awaited, further preventing sequential requests.
   * @see https://www.youtube.com/shorts/A7GGjutZxrs
   * @see https://nextjs.org/docs/app/building-your-application/data-fetching/patterns#parallel-data-fetching
   */
  const githubStarsPromise = getGithubStars();
  const productsPromise = getFeaturedProducts();
  const categoriesPromise = getCategories();
  const storesPromise = getFeaturedStores();

  return (
    <Suspense fallback={<LobbySkeleton />}>
      <Lobby
        githubStarsPromise={githubStarsPromise}
        productsPromise={productsPromise}
        categoriesPromise={categoriesPromise}
        storesPromise={storesPromise}
      />
    </Suspense>
  );
}
