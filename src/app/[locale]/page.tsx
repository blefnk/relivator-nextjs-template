/**
 * Learn more about the Relivator Next.js starter:
 * @see https://github.com/blefnk/relivator#readme
 */

import { ArrowRight, Download, ShoppingCart, Store } from "lucide-react";
import { useTranslations } from "next-intl";
import { getTranslations } from "next-intl/server";
import { Balancer } from "react-wrap-balancer";

import { REPOSITORY_URL, siteConfig } from "~/app";
import { Link } from "~/core/link";
import { seo } from "~/data/meta";
import { env } from "~/env.mjs";
import { FeaturedStoreItems } from "~/islands/commerce/featured-store-items";
import { HeroSection } from "~/islands/marketing/hero-section";
import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";
import { FrequentlyAskedQuestions } from "~/islands/sections/questions";
import { GeneralShell } from "~/islands/wrappers/general-shell";
import { Link as NavLink } from "~/navigation";
import { Features, GithubStarsPlugin } from "~/plugins/islands/github/stars";
import { productCategories } from "~/server/config/products";

export async function generateMetadata({ params }) {
  const t = await getTranslations();
  const metadata = seo({
    title: `${t("metadata.title.home")} – ${siteConfig.name}`,
  });
  return metadata;
}

export default function HomePage() {
  // useTranslations works both on the server and client
  // we only need the getTranslations on async components
  const t = useTranslations();

  return (
    <>
      <SiteHeader />
      <GeneralShell>
        <section
          aria-labelledby="hero-heading"
          className="mx-auto mb-2 mt-8 flex w-full flex-col items-center justify-center gap-4 pt-10 text-center"
          id="hero"
        >
          <GithubStarsPlugin />

          <HeroSection />

          <Balancer
            as="p"
            className="!max-w-5xl text-base leading-normal text-primary/90 sm:text-lg sm:leading-7"
          >
            {t("landing.about")}
          </Balancer>

          <div className="mt-3 flex flex-wrap items-center justify-center gap-4">
            {env.DEV_DEMO_NOTES === "true" ?
              <Link
                href={REPOSITORY_URL}
                size="lg"
                target="_blank"
                variant="secondary"
              >
                <Download className="mr-2 h-4 w-4" />
                {t("landing.main-cta")}
              </Link>
            : <Link href="/products" size="lg" variant="secondary">
                <ShoppingCart className="mr-2 h-4 w-4" />
                {t("landing.buy-now")}
              </Link>
            }

            <Link
              className="border-2 border-zinc-900 dark:border-zinc-800"
              href="/dashboard/billing"
              size="lg"
              variant="outline"
            >
              <Store className="mr-2 h-4 w-4" />
              {env.DEV_DEMO_NOTES === "true" ?
                `${t("demo.launch")}`
              : `${t("landing.sell-now")}`}
            </Link>
          </div>
        </section>

        <FeaturedStoreItems />

        <section
          aria-labelledby="categories-heading"
          className="py-1"
          id="categories"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {productCategories.map((category) => (
              <NavLink
                aria-label={`${t("demo.aria-label-goto")} ${category.title}`}
                href={`/categories/${category.title}`}
                key={category.title}
              >
                <h3 className="flex h-12 items-center justify-center rounded-lg bg-zinc-100 font-medium capitalize text-zinc-900 transition-colors dark:bg-zinc-900 dark:text-zinc-200">
                  {category.title}
                </h3>
              </NavLink>
            ))}
          </div>
        </section>

        {env.DEV_DEMO_NOTES === "true" && <Features />}

        <FrequentlyAskedQuestions />

        <section
          aria-labelledby="create-a-store-banner-heading"
          className="mb-14 mt-10 grid place-items-center gap-6 bg-card px-6 text-center text-card-foreground"
          id="create-a-store-banner"
        >
          <div className="text-xl font-medium sm:text-2xl">
            {t("landing.footer-cta")}
          </div>
          <Link href="/dashboard/stores" size="lg" variant="secondary">
            {t("landing.get-started-btn")}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Link>
        </section>
      </GeneralShell>
      <SiteFooter />
    </>
  );
}

/**
 * Learning resources:
 * ===================
 * @see https://next-intl-docs.vercel.app/docs/environments/server-client-components
 * @see https://github.com/reactjs/rfcs/blob/main/text/0188-server-components.md#capabilities--constraints-of-server-and-client-components
 */

// [TODO SECTION]
// ==============

// TODO: See #33 and #90 of the Relivator's Roadmap
// @see https://github.com/tokenami/tokenami#readme
// <h2 style={{ "--margin-top": 0, "--margin-bottom": 5 }}>Hello, Tokens!</h2>
// <div style={{ "--medium_padding": 4 }} />

// todo: try to use this for static pages rendering
// unstable_setRequestLocale(locale); // needs for static pages rendering
// const t = useTranslations("landing"); // traditional page translations
// const t = await getTranslator(locale, "landing"); // also static pages
// @see https://github.com/amannn/next-intl/pull/149

// todo: try to add this somewhere to the app
/**
 import {
  getTranslations,
  getFormatter,
  getNow,
  getTimeZone,
  getMessages,
  getLocale
} from 'next-intl/server';

const t = await getTranslations('ProfilePage');
const format = await getFormatter();
const now = await getNow();
const timeZone = await getTimeZone();
const messages = await getMessages();
const locale = await getLocale();
*/

// ===== [INTERESTING THINGS ] ==========================================

// note: information below is not updated constantly and may be outdated

/**
 * The 'await' Keyword:
 *
 * The 'await' keyword is crucial in asynchronous programming in JavaScript.
 * It pauses the execution of an async function until a Promise is fulfilled,
 * ensuring that subsequent lines of code are executed only after the awaited
 * operation completes. This makes handling asynchronous operations more
 * intuitive and allows for a sequential programming style even with
 * asynchronous code.
 *
 * Usage Example:
 * When fetching data from an API, using 'await' ensures that the variable
 * storing the fetched data is assigned only after the data has been
 * successfully retrieved.
 */

/**
 * [Important Next.js Caveat: Dynamic Rendering with cookies()]
 *
 * Understanding cookies() in Next.js:
 * The function cookies(), in the context of Next.js, is dynamic by nature.
 * This means that its output varies and is determined at the time of request.
 *
 * Impact on Static Rendering:
 * Using cookies() within key components like Layout.tsx, which are common
 * across multiple pages, can affect the static rendering capabilities of your
 * application. Specifically, it causes these pages to be rendered dynamically
 * at request time, rather than being pre-rendered as static HTML.
 *
 * Why Caution is Needed:
 * For large applications with numerous static pages, opting into dynamic
 * rendering for all pages by using cookies() in a common layout component can
 * potentially impact performance and loading times. It's advisable to assess
 * the necessity and placement of cookies() within your application, especially
 * if static rendering is a priority.
 *
 * @see https://nextjs.org/docs/app/api-reference/functions/cookies
 * @see https://michaelangelo.io/blog/darkmode-rsc#important-nextjs-caveat
 * @see https://github.com/pacocoursey/next-themes/issues/152#issuecomment-1693979442
 */

/**
 * !📄 "TRPC EXAMPLE 1"
 *
 * import { api } from "~/data/api/package/server";
 * import { CreateTodo } from "~/islands/data-api/create-todo";
 *
 * const hello = await api.todo.hello.query({ text: "from tRPC" });
 *
 * <CrudShowcase />
 *
 */
/*
<section className="flex flex-col items-center gap-2 pb-20">
  <p className="text-2xl text-white">
    {hello ? hello.greeting : "Loading tRPC query..."}
  </p>
  <div className="flex flex-col items-center justify-center gap-4">
    <p className="text-center text-2xl text-white">
      {session && <span>Logged in as {session.user?.name}</span>}
    </p>
  </div>
</section>
*/
/*
async function CrudShowcase() {
  const session = await getServerAuthSession();
  if (!session?.user) return null;
  const latestTodo = await api.todo.getLatest.query();
  return (
    <div className="w-full max-w-xs">
      {latestTodo ? (
        <p className="truncate">Your most recent todo: {latestTodo.name}</p>
      ) : (
        <p>You have no todos yet.</p>
      )}
      <CreateTodo />
    </div>
  );
}
*/

/**
 * !📄 "TRPC EXAMPLE 2"
 *
 * ?1️⃣ Import the component and forse cache:
 * import { serverClient } from "~/islands/wrappers/trpc/server-client";
 * import TodoList from "~/islands/features/todo-list";
 * export const dynamic = "force-dynamic";
 *
 * ?2️⃣ Place this in your component before return:
 * const todos = await serverClient.getTodos();
 *
 * ?3️⃣ Use this inside the component:
 * <TodoList initialTodos={todos} />
 *
 * @see https://youtu.be/qCLV0Iaq9zU?t=996
 */

/**
 * !📄 "HOW TO GENERATE METADATA USING NEXT-INTL (CURRENTLY UNSTABLE)"
 *
 * ?1️⃣ Import the next things:
 * import { type Metadata } from "next";
 * import { LocaleLayoutParams } from "~/types";
 * import { getTranslator } from "next-intl/server";
 *
 * ?2️⃣ Use the next function:
 * export async function generateMetadata({
 *   params,
 * }: LocaleLayoutParams): Promise<Metadata> {
 *   const t = await getTranslator(params.locale, "landing");
 *   return {
 *     description: t(""),
 *   };
 * }
 *
 * @see https://next-intl-docs.vercel.app/docs/environments/metadata-route-handlers
 */

/**
 * !📄 "HOW TO GET AUTH-SESSION IN SERVER-COMPONENT"
 *
 * ?1️⃣ Import:
 * import { getServerSession } from "next-auth";
 * import { authOptions } from "~/server/auth";
 *
 * ?2️⃣ Add variables inside the component:
 * const session = await getServerSession(authOptions);
 *
 * ?2️⃣ Use code example inside the component:
 * <div>
 *   getServerSession Result
 *   {session?.user?.name ? (
 *     <div>{session?.user?.name}</div>
 *   ) : (
 *     <div>Not logged in</div>
 *   )}
 * </div>
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */

/**
 * !📄 "HOW TO GET AUTH-SESSION IN CLIENT-COMPONENT"
 *
 * ?1️⃣ Import:
 * import { getServerSession } from "next-auth";
 *
 * ?2️⃣ Add hook and vars inside the component:
 * const { data: session } = useSession();
 * const name = `${session?.user?.name ?? ""}`;
 *
 * ?2️⃣ Use code example inside the component:
 * <div>
 *   useSession User Name
 *   {name ? (
 *     <div>{name}</div>
 *   ) : (
 *     <div>Not logged in</div>
 *   )}
 * </div>
 *
 * @see https://next-auth.js.org/configuration/nextjs
 */
