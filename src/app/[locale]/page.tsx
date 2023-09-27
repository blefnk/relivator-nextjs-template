/**
 * `app/[locale]/page.tsx` is the UI (User Interface) for the /{locale} URL. Learn more here:
 * @see https://nextjs.org/docs/app/building-your-application/routing/pages-and-layouts#pages
 */

import Image from "next/image";
import {
  heroHeader,
  REPOSITORY_NAME,
  REPOSITORY_OWNER,
  REPOSITORY_URL,
  siteConfig,
} from "~/app";
import { desc, eq, sql } from "drizzle-orm";
import { Download, Store } from "lucide-react";
import Link from "next-intl/link";
import { FaDiscord } from "react-icons/fa";
import { Balancer } from "react-wrap-balancer";

import { productCategories } from "~/server/config/products";
import { typography } from "~/server/text";
import { cn } from "~/server/utils";
import { db } from "~/data/db/client";
import { products, stores } from "~/data/db/schema";
import { seo } from "~/data/meta";
import { Icons } from "~/islands/icons";
import { ProductCard } from "~/islands/modules/cards/product-card";
import { StoreCard } from "~/islands/modules/cards/store-card";
import { AspectRatio } from "~/islands/primitives/aspect-ratio";
import { Badge } from "~/islands/primitives/badge";
import { buttonVariants } from "~/islands/primitives/button";
import CommonSection from "~/islands/sections/common-section";
import FeaturesSection from "~/islands/sections/features-section";
import OssRepoSection from "~/islands/sections/ossrepo-section";
import GeneralShell from "~/islands/wrappers/general-shell";

export const dynamic = "force-dynamic";

/**
 * Here you can override the metadata
 * from layout for this specific page
 */
export const metadata = seo({
  title: `Home – ${siteConfig.name}`,
});

export default async function HomePage() {
  async function getGithubStars(): Promise<number | null> {
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

  const githubStars = await getGithubStars();

  const technologies = [
    { name: "Next.js 13", link: "https://nextjs.org/" },
    { name: "i18n", link: "https://tailwindcss.com/" },
    { name: "shadcn/ui", link: "https://ui.shadcn.com/" },
    { name: "App Router", link: "https://nextjs.org/docs/app" },
    { name: "TypeScript", link: "https://cutt.ly/CwjVPUNu" },
    { name: "T3 Stack", link: "https://create.t3.gg/" },
    { name: "Stripe", link: "https://stripe.com/" },
    { name: "NextAuth.js", link: "https://authjs.dev/" },
    { name: "Tailwind CSS", link: "https://tailwindcss.com/" },
    { name: "TanStack", link: "https://tanstack.com/" },
    { name: "Drizzle", link: "https://orm.drizzle.team/" },
    { name: "Zod", link: "https://zod.dev/" },
    { name: "RSC", link: "https://cutt.ly/WwjVDQDT" },
    { name: "SWC", link: "https://swc.rs/" },
    { name: "tRPC", link: "https://trpc.io/" },
    { name: "Server Actions", link: "https://cutt.ly/awjVFfJg" },
    { name: "Lucide Icons", link: "https://lucide.dev/" },
  ];

  const technologyLinks = technologies.map((tech, index) => (
    <span key={tech.name}>
      <Link
        href={tech.link}
        target="_blank"
        rel="noopener noreferrer"
        className={typography.link}
      >
        {tech.name}
      </Link>
      {index < technologies.length - 1 ? ", " : ""}
    </span>
  ));

  const someProducts = await db
    .select({
      id: products.id,
      name: products.name,
      images: products.images,
      category: products.category,
      price: products.price,
      stripeAccountId: products.stripeAccountId,
    })
    .from(products)
    .limit(8)
    .orderBy(desc(products.createdAt))
    .leftJoin(stores, eq(products.storeId, stores.id))
    .groupBy(products.id)
    .orderBy(desc(products.stripeAccountId), desc(products.createdAt));

  const someStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId,
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`));

  return (
    <GeneralShell>
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full flex-col items-center justify-center gap-4 pb-8 pt-6 mt-6 text-center md:pb-12 md:pt-10 lg:py-14"
      >
        {githubStars ? (
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Badge
              className="rounded-md px-3.5 font-medium py-1.5"
              variant="secondary"
            >
              <Icons.gitHub className="mr-2 h-3.5 w-3.5" aria-label="GitHub" />
              Please! Star Relivator On GitHub! ⭐ Current Goal: {githubStars}
              /100
            </Badge>
          </Link>
        ) : null}
        <h1 className="text-3xl font-heading leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1]">
          <Balancer>
            <span className="block">{heroHeader.header1}</span>
            {heroHeader.header2}
          </Balancer>
        </h1>
        <div
          id="random-subcategories"
          aria-labelledby="random-subcategories-heading"
          className="flex flex-wrap mt-2 mb-2 items-center justify-center gap-4"
        >
          {productCategories[
            Math.floor(Math.random() * productCategories.length)
          ]?.subcategories.map((subcategory) => (
            <Link
              key={subcategory.slug}
              href={`/categories/${String(productCategories[0]?.title)}/${
                subcategory.slug
              }`}
            >
              <Badge variant="secondary" className="rounded px-3 py-1">
                {subcategory.title}
              </Badge>
              <span className="sr-only">{subcategory.title}</span>
            </Link>
          ))}
        </div>
        <Balancer className="max-w-[46rem] text-2xl text-muted-foreground">
          {technologyLinks}
        </Balancer>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link href="/sign-in" className={cn(buttonVariants())}>
            <Store className="h-4 w-4 mr-2" />
            Sell<div className="hidden md:block ml-1">Products Now</div>
          </Link>
          <Link
            href={REPOSITORY_URL}
            target="_blank"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "p-5",
            )}
          >
            <Download className="h-4 w-4 mr-2" />
            Download <div className="hidden md:block ml-1">Template</div>
          </Link>
          <Link
            href="https://discord.gg/Pb8uKbwpsJ"
            target="_blank"
            className={cn(
              buttonVariants({
                variant: "outline",
              }),
              "p-5",
            )}
          >
            <FaDiscord className="h-4 w-4 mr-2" />
            <div className="hidden md:block mr-1">Our</div>Discord
          </Link>
        </div>
      </section>

      <section
        id="featured-products"
        aria-labelledby="featured-products-heading"
        className="space-y-6 py-12"
      >
        <div className="flex items-center">
          <h2 className="flex-1 text-2xl font-heading sm:text-3xl">
            Featured products
          </h2>
          <Link aria-label="Products" href="/products">
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                }),
              )}
            >
              View all
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
          {someProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      <section
        id="create-a-store-banner"
        aria-labelledby="create-a-store-banner-heading"
        className="grid place-items-center gap-6 rounded-lg border bg-card px-6 py-16 text-center text-card-foreground shadow-sm"
      >
        <div className="text-2xl font-medium sm:text-3xl">
          Do you want to sell your products on our website?
        </div>
        <Link href="/sign-in">
          <div className={cn(buttonVariants())}>
            Create a store
            <span className="sr-only">Create a store</span>
          </div>
        </Link>
      </section>

      <section
        id="featured-stores"
        aria-labelledby="featured-stores-heading"
        className="space-y-6 pt-6 pb-12"
      >
        <div className="flex items-center">
          <h2 className="flex-1 text-2xl font-heading sm:text-3xl">
            Featured stores
          </h2>
          <Link aria-label="Stores" href="/stores">
            <div
              className={cn(
                buttonVariants({
                  size: "sm",
                }),
              )}
            >
              View all
            </div>
          </Link>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {someStores.map((store) => (
            <StoreCard
              key={store.id}
              store={store}
              href={`/products?store_ids=${store.id}`}
            />
          ))}
        </div>
      </section>

      <section
        id="categories"
        aria-labelledby="categories-heading"
        className="space-y-6 py-2"
      >
        <div className="mx-auto flex max-w-[58rem] flex-col items-center space-y-4 text-center">
          <h2 className="text-3xl font-heading leading-[1.1] sm:text-3xl md:text-5xl">
            Categories
          </h2>
          <Balancer className="max-w-[46rem] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
            Explore our categories and find the best products for you
          </Balancer>
        </div>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {productCategories.map((category) => (
            <Link
              aria-label={`Go to ${category.title}`}
              key={category.title}
              href={`/categories/${category.title}`}
            >
              <div className="group relative overflow-hidden rounded-md">
                <AspectRatio ratio={4 / 5}>
                  <div className="absolute inset-0 z-10 bg-slate-500/60 group-hover:bg-slate-400/70 dark:bg-zinc-900/60 transition-colors dark:group-hover:bg-zinc-800/70" />
                  {/* todo: fix strange src fetching error when changing screen size */}
                  <Image
                    src={category.image}
                    alt={category.title}
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    fill
                    className="object-cover transition-transform group-hover:scale-105"
                    priority
                  />
                </AspectRatio>
                <div className="absolute inset-0 z-20 flex items-center justify-center">
                  <h3 className="text-3xl font-medium capitalize text-slate-100 md:text-2xl">
                    {category.title}
                  </h3>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      <OssRepoSection githubStars={githubStars} />
      <FeaturesSection />
      <CommonSection />
    </GeneralShell>
  );
}

// [💡 INTERESTING THINGS SECTION 💡]

/**
 * !📄 "HOW TO USE TRPC-BASED COMPONENTS"
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
 *     description: t("subtitle"),
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
 * const session = await getServerSession(authOptions());
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
