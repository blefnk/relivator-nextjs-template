/**
 * Learn more about the Relivator Next.js project:
 * @see https://github.com/blefnk/relivator#readme
 */

import { REPOSITORY_URL, siteConfig } from "~/app";
import { Link, redirect, type Locale } from "~/navigation";
import { cn } from "~/utils";
import { eq } from "drizzle-orm";
import { Download, Store } from "lucide-react";
import { Balancer } from "react-wrap-balancer";

import { productCategories } from "~/server/config/products";
import { db } from "~/data/db";
import { User, users } from "~/data/db/schema";
import { seo } from "~/data/meta";
import { FeaturedStoreItems } from "~/islands/commerce/featured-store-items";
import { HeroSection } from "~/islands/marketing/hero-section";
import { IntlMessage } from "~/islands/message";
import { SiteFooter } from "~/islands/navigation/site-footer";
import { SiteHeader } from "~/islands/navigation/site-header";
import { buttonVariants } from "~/islands/primitives/button";
import ProductsCtx from "~/islands/products-ctx";
import { GeneralShell } from "~/islands/wrappers/general-shell";
import { getServerAuthSession } from "~/utils/users";

import { GithubStarsPlugin } from "~/plugins/islands/github/server";

export const metadata = seo({ title: `Home – ${siteConfig.name}` });

type HomePageProps = { params: { locale: Locale } };

export default async function HomePage({ params: { locale } }: HomePageProps) {
  // Get the user session for NextAuth.js and Clerk
  const session = await getServerAuthSession();

  // Ensure that the user is ready to use the app
  if (session) {
    const user: User = await db
      .select()
      .from(users)
      .where(eq(users.id, session.id))
      .then((res: User[]) => res[0] ?? null);
    if (!user || (user && !user.emailVerified)) {
      return redirect(`/auth`);
    }
  }

  return (
    <>
      <SiteHeader />
      <GeneralShell>
        <section
          id="hero"
          aria-labelledby="hero-heading"
          className="flex w-full flex-col items-center justify-center pt-10 gap-4 mx-auto mt-8 mb-2 text-center"
        >
          <GithubStarsPlugin />
          <HeroSection />
          <Balancer
            as="p"
            className="leading-normal text-base text-primary/90 sm:text-lg sm:leading-7 !max-w-5xl"
          >
            <IntlMessage id="landing.about" />
          </Balancer>
          <div className="flex flex-wrap mt-3 items-center justify-center gap-4">
            <Link
              href={`${REPOSITORY_URL}/#readme`}
              target="_blank"
              className={cn(
                buttonVariants({
                  variant: "secondary",
                  size: "lg",
                }),
                "",
              )}
            >
              <Download className="h-4 w-4 mr-2" />
              Free Download
            </Link>

            <Link
              href="/dashboard/stores"
              className={cn(
                buttonVariants({
                  variant: "outline",
                  size: "lg",
                }),
                "",
              )}
            >
              <Store className="h-4 w-4 mr-2" />
              Check Demo
            </Link>
          </div>
        </section>

        <FeaturedStoreItems />
        {/* <ProductsCtx /> */}

        <section
          id="categories"
          aria-labelledby="categories-heading"
          className="py-1"
        >
          <div className="grid grid-cols-[repeat(auto-fit,minmax(200px,1fr))] gap-4">
            {productCategories.map((category) => (
              <Link
                aria-label={`Go to ${category.title}`}
                key={category.title}
                href={`/categories/${category.title}`}
              >
                <h3 className="font-medium capitalize flex items-center justify-center transition-colors text-zinc-900 dark:text-zinc-200 bg-zinc-100 dark:bg-zinc-900 h-12 rounded-lg">
                  {category.title}
                </h3>
              </Link>
            ))}
          </div>
        </section>

        <section
          id="create-a-store-banner"
          aria-labelledby="create-a-store-banner-heading"
          className="grid place-items-center gap-6 bg-card px-6 mt-10 mb-14 text-center text-card-foreground"
        >
          <div className="text-xl font-medium sm:text-2xl">
            Do you want to sell your products?
          </div>
          <Link href="https://github.com/blefnk/relivator/#readme">
            <div className={cn(buttonVariants({ variant: "outline" }))}>
              Get Started
              <span className="sr-only">Create a store</span>
            </div>
          </Link>
        </section>
      </GeneralShell>
      <SiteFooter />
    </>
  );
}

// ===== [TODO SECTION] =================================================

// todo: fix typescript errors when using next-intl without "use client"
// unstable_setRequestLocale(locale); // needs for static pages rendering
// const t = useTranslations("landing"); // traditional page translations
// const t = await getTranslator(locale, "landing"); // also static pages
/** @see https://github.com/amannn/next-intl/pull/149 */

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
