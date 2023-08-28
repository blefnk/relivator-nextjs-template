import Image from "next/image";
import Link from "next/link";
import {
  heroHeader,
  REPOSITORY_NAME,
  REPOSITORY_OWNER,
  REPOSITORY_URL,
  siteConfig
} from "~/app";
import { desc, eq, sql } from "drizzle-orm";
import {
  Clock,
  Code,
  DollarSign,
  Download,
  Files,
  Github,
  QrCode,
  Store,
  Text
} from "lucide-react";
import { Balancer } from "react-wrap-balancer";
import { cnBase } from "tailwind-variants";

import { productCategories } from "~/server/config/products";
import { typography } from "~/server/text";
import { cn } from "~/server/utils";
import { db } from "~/data/db/client";
import { products, stores } from "~/data/db/schema";
import { getI18n, getScopedI18n } from "~/data/i18n/server";
import { Icons } from "~/islands/icons";
import { ProductCard } from "~/islands/modules/cards/product-card";
import { StoreCard } from "~/islands/modules/cards/store-card";
import { AspectRatio } from "~/islands/primitives/aspect-ratio";
import { Badge } from "~/islands/primitives/badge";
import { Button, buttonVariants } from "~/islands/primitives/button";
import { Separator } from "~/islands/primitives/separator";
import { Shell } from "~/islands/wrappers/shell";

export const dynamic = "force-dynamic";

export default async function IndexPage() {
  const t = await getI18n();
  const scopedT = await getScopedI18n("pages.home");

  const someProducts = await db
    .select({
      id: products.id,
      name: products.name,
      images: products.images,
      category: products.category,
      price: products.price,
      stripeAccountId: stores.stripeAccountId
    })
    .from(products)
    .limit(8)
    .orderBy(desc(products.createdAt))
    .leftJoin(stores, eq(products.storeId, stores.id))
    .groupBy(products.id)
    .orderBy(desc(stores.stripeAccountId), desc(products.createdAt));

  const someStores = await db
    .select({
      id: stores.id,
      name: stores.name,
      description: stores.description,
      stripeAccountId: stores.stripeAccountId
    })
    .from(stores)
    .limit(4)
    .leftJoin(products, eq(products.storeId, stores.id))
    .groupBy(stores.id)
    .orderBy(desc(stores.stripeAccountId), desc(sql<number>`count(*)`));

  async function getGithubStars(): Promise<number | null> {
    try {
      const response = await fetch(
        `https://api.github.com/repos/${REPOSITORY_OWNER}/${REPOSITORY_NAME}`,
        {
          headers: {
            Accept: "application/vnd.github+json"
          },
          next: {
            revalidate: 60
          }
        }
      );

      if (!response.ok) {
        return null;
      }

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
    { name: "Lucide Icons", link: "https://lucide.dev/" }
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

  return (
    <Shell className="gap-12">
      <section
        id="hero"
        aria-labelledby="hero-heading"
        className="mx-auto flex w-full max-w-[64rem] flex-col items-center justify-center gap-4 pb-8 pt-6 text-center md:pb-12 md:pt-10 lg:py-14"
      >
        {githubStars ? (
          <Link href={siteConfig.links.github} target="_blank" rel="noreferrer">
            <Badge
              className="rounded-md px-3.5 font-medium py-1.5"
              variant="secondary"
            >
              <Icons.gitHub className="mr-2 h-3.5 w-3.5" aria-label="GitHub" />
              Please! Star <span className="font-semibold mx-1">
                Relivator
              </span>{" "}
              On GitHub! ⭐ Current{" "}
              <span className="font-semibold mx-1">Goal</span> Progress:{" "}
              {githubStars}
              <span className="font-semibold mr-1">/30</span>
            </Badge>
          </Link>
        ) : null}
        <h1 className="text-3xl font-heading leading-tight tracking-tighter md:text-4xl lg:text-5xl lg:leading-[1.1]">
          <Balancer>
            <span className="block">{heroHeader.header1}</span>
            {heroHeader.header2}
          </Balancer>
        </h1>

        <Balancer className="max-w-[46rem] text-2xl text-muted-foreground">
          {technologyLinks}
        </Balancer>

        <div className="flex flex-wrap items-center justify-center gap-4">
          {/* <Link href="/products" className={cn(buttonVariants())}> */}
          <Link
            href={REPOSITORY_URL}
            target="_blank"
            rel="noreferrer"
            className={cn(buttonVariants())}
          >
            <Download className="h-4 w-4 mr-2" />
            Download Starter
          </Link>
          <Link
            href="/dashboard/stores"
            className={cn(
              buttonVariants({
                variant: "outline"
              })
            )}
          >
            <Store className="h-4 w-4 mr-2" />
            Sell Products Now
          </Link>
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
                  <div className="absolute inset-0 z-10 bg-black/60 transition-colors group-hover:bg-black/70" />
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

      <section
        id="create-a-store-banner"
        aria-labelledby="create-a-store-banner-heading"
        className="grid place-items-center gap-6 rounded-lg border bg-card px-6 py-16 text-center text-card-foreground shadow-sm"
      >
        <div className="text-2xl font-medium sm:text-3xl">
          Do you want to sell your products on our website?
        </div>
        <Link href="/dashboard/stores">
          <div className={cn(buttonVariants())}>
            Create a store
            <span className="sr-only">Create a store</span>
          </div>
        </Link>
      </section>

      <section
        id="features"
        className="space-y-6 py-8 text-center md:py-12 lg:py-24"
      >
        <h2
          className={cnBase(
            typography.h2,
            "text-3xl font-heading leading-[1.1] sm:text-3xl md:text-6xl"
          )}
        >
          {scopedT("features.title")}
        </h2>
        <p className="mx-auto max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {scopedT("features.subtitle")}
        </p>
        <div className="mx-auto grid justify-center gap-4 sm:grid-cols-2 md:max-w-[64rem] md:grid-cols-3">
          <FeatureCard
            title={scopedT("features.cryptography.title")}
            description={scopedT("features.cryptography.description")}
            icon={QrCode}
          />
          <FeatureCard
            title={scopedT("features.text.title")}
            description={scopedT("features.text.description")}
            icon={Text}
          />
          <FeatureCard
            title={scopedT("features.clock.title")}
            description={scopedT("features.clock.description")}
            icon={Clock}
          />
          <FeatureCard
            title={scopedT("features.currency.title")}
            description={scopedT("features.currency.description")}
            icon={Code}
          />
          <FeatureCard
            title={scopedT("features.files.title")}
            description={scopedT("features.files.description")}
            icon={Files}
          />
          <FeatureCard
            title={scopedT("features.devtools.title")}
            description={scopedT("features.devtools.description")}
            icon={DollarSign}
          />
        </div>
      </section>

      <Separator />

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
                  size: "sm"
                })
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
        id="open-source"
        className="grid place-items-center gap-6 rounded-lg border bg-card px-6 py-16 text-center text-card-foreground shadow-sm"
      >
        <h2
          className={cnBase(
            typography.h2,
            "text-4xl leading-[1.1] font-heading"
          )}
        >
          {scopedT("open-source.title")}
        </h2>
        <p className="mx-auto max-w-[85%] leading-normal text-muted-foreground sm:text-lg sm:leading-7">
          {scopedT("open-source.subtitle.first")}
          <br />
          {scopedT("open-source.subtitle.second")}{" "}
          <Link
            target="_blank"
            rel="noreferrer"
            className="underline underline-offset-4"
            href={REPOSITORY_URL}
          >
            GitHub
          </Link>
          .
        </p>
        <Link
          target="_blank"
          rel="noreferrer"
          href={REPOSITORY_URL}
          className="mx-auto flex w-fit transition-opacity hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center space-x-2 rounded-md border border-muted bg-muted">
            <Github />
          </div>
          {githubStars && (
            <div className="flex items-center">
              <div className="h-4 w-4 border-y-8 border-l-0 border-r-8 border-solid border-muted border-y-transparent" />
              <div className="flex h-10 items-center rounded-md border border-muted bg-muted px-4 font-medium">
                {scopedT("open-source.stars", { count: githubStars })}
              </div>
            </div>
          )}
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
                  size: "sm"
                })
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

      <Separator />

      <section className="pt-14 pb-20 text-center">
        <Balancer
          as="h1"
          className={cnBase(
            typography.h1,
            "text-3xl font-heading sm:text-5xl md:text-6xl lg:text-7xl"
          )}
        >
          {scopedT("title", {
            tools: (
              <span className="bg-gradient-to-r from-primary to-pink-600 bg-clip-text text-transparent">
                {t("general.tools")}
              </span>
            )
          })}
        </Balancer>
        <div
          id="random-subcategories"
          aria-labelledby="random-subcategories-heading"
          className="flex flex-wrap mt-8 mb-2 items-center justify-center gap-4 pb-4"
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
        <div>
          <Balancer
            as="h2"
            className="mx-auto !block max-w-xl text-lg font-semibold tracking-tight text-muted-foreground sm:text-xl"
          >
            {scopedT("subtitle")}
          </Balancer>
          <div className="mt-4 flex w-full items-center justify-center gap-4">
            <Button className="h-11 px-8" asChild>
              <Link href={REPOSITORY_URL} target="_blank" rel="noreferrer">
                <Github className="h-4 w-4 mr-2" />
                <span>Check Project Github</span>
              </Link>
            </Button>
          </div>
        </div>
      </section>
    </Shell>
  );
}

type FeatureCardProps = {
  title: string;
  description: string;
  icon: React.ElementType;
};

function FeatureCard({ title, description, icon: Icon }: FeatureCardProps) {
  return (
    <div className="relative overflow-hidden rounded-lg border bg-background p-2 text-left">
      <div className="flex h-[180px] flex-col justify-between rounded-md p-6">
        <Icon className="h-12 w-12" />
        <div className="space-y-2">
          <h3 className="font-bold">{title}</h3>
          <p className="text-sm text-muted-foreground">{description}</p>
        </div>
      </div>
    </div>
  );
}
