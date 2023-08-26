# Bleverse Relivator: Next.js 13 Store & Dashboard Template 2023

**Crafting the world's most iconic Next.js starter.**

**Next.js 13 starter** beautifully created with ❤️ by [**@blefnk Nazarii Korniienko**](https://github.com/blefnk), [**Bleverse**](https://github.com/blefnk), and its entire OSS community. The starter has i18n, means internationalization, and built with `app router` and `server actions` using `TypeScript` programming language. Takes some inspirations from T3 and similar stacks. Our own stack beside other includes also: `Stripe`, `NextAuth.js`, `TailwindCSS`, `Drizzle`, `Zod`, `RSC`, `SWC`, `tRPC`, `Lucide Icons`, and many more other things. Just get it and enjoy! And remember, we love your feedback!

_You can also check [our another free Next.js 13 starter](https://github.com/blefnk/reliverse). This one starter offers you tech used in the current starter plus also: Prisma, Valibot, Lucia, Clerk, and more. It means there we're very experimentally trying to implement all the important and most used tech together._

## 🚀 About the Project

**The Bleverse Framework for the Next.js!**

Step into the future with the ultimate Next.js starter. Everything has been set up for you. It's more than just code; it's a journey. You're not on this journey alone. Move faster than ever. We've laid the groundwork; now, grab it, dive in and accelerate your development.

This is the space where we're playing with everything new in Next.js 13. Stumbled upon something? DM us on Twitter, sorry, on X [@bleverse_com](https://x.com/bleverse_com) or raise an issue right here. If you've got some coding magic up your sleeve, contributions are always celebrated! 🎉

## 🔥 Project Features Roadmap

This roadmap outlines the key features and improvements to be implemented in this Next.js starter.

- [x] 🌀 Comprehensive offerings of the [**Next.js 13**](https://nextjs.org) App Router, API routes handled by Route Handlers, with the RSCs and everything all new.
- [ ] ✨ Admin dashboard with stores, products, orders, subscriptions, and payments.
- [x] ⬆️ File uploads with **uploadthing**.
- [x] 🔐 Keep it tight with Authentication using **Clerk**.
- [x] 🏬 Storefront with products, categories, and subcategories.
- [ ] 🐧 The most beginner-friendly starter (will be in the feature, maybe, how its possible 😁).
- [ ] 📊 Client and server data/query fetching with [**tRPC**](https://github.com/trpc/trpc) & [**TanStack Query**](https://tanstack.com/query).
- [ ] 🌅 Using every usable [**TanStack**](https://tanstack.com) libraries.
- [ ] 📖 Sharing insights with blogs powered by **MDX**.
- [x] 🦫 [**Drizzle**](https://orm.drizzle.team) database ORM, configured for [**PlanetScale**](https://planetscale.com) and [**DrizzeKit**](https://orm.drizzle.team/kit-docs/overview).
- [ ] 📧 Email verification and a lot more features to enhance the application.
- [ ] 📰 Newsletter subscription with **React Email** and **Resend**.
- [ ] 🤖 Ultimate type-safety using [**TypeScript**](https://www.typescriptlang.org/), typedRoutes, etc.
- [x] 🤝 Seller and customer workflows.
- [x] 🤩 [**TailwindCSS**](https://tailwindcss.com/) for utility-first CSS.
- [x] ✨ Gorgeous UI built with [**Radix**](https://www.radix-ui.com/) and stunning UI components, all thanks to [**shadcn/ui**](https://ui.shadcn.com/).
- [x] 🧧 User subscriptions via **Stripe**.
- [ ] 💎 Seamless checkout with **Stripe Checkout**.
- [x] 🅰️ Validation with **Zod**.
- [ ] 🦦 [**EsLint**](https://eslint.org/) with [**Prettier**](https://prettier.io/) for readable, safe code.
- [ ] 🌿 Authentication via [**Next Auth**](https://next-auth.js.org/).
- [ ] 📧 Email via [**Resend**](https://resend.com) and [**react email**](https://react.email/).
- [ ] 🅱️ The beautiful [**Inter**](https://rsms.me/inter/) typeface.
- [x] 💮 [**Next Metadata API**](https://nextjs.org/docs/api-reference/metadata) for SEO handling, with file-system handlers.
- [ ] 🐳 [**Jest**](https://jestjs.io/) testing, optimized for Next.js
- [x] 🍭 Dark Mode support (without bypassing Server Components).
- [x] ✳️ Perfectly crafted VSCode settings and recommended extensions

## 🌍 i18n: Internationalization

At Bleverse, the approach to multilingualism is a separate holy grail. We love talking about this topic. In the future, we'll be writing a lot of interesting things about internationalization with Next.js 13 App Router. Stay tuned!

## 👋 Project Configuration

The `src/app.ts` file contains essential configuration used to modify the contents and settings of the website.

- Manage the content displayed on the website.
- Customize various settings, such as disabling the theme toggle.
- Manage general site-wide information.

## 🔐 Authentication

Setting up auth is a breeze:

1. Visit: `https://dashboard.clerk.com/apps`
2. Create a New Application there.
3. Fill out the `.api` file (just duplicate and rename `.env.example`).

## Environment variables

Environment variables are stored in `.env` files. By default the `.env.example` file is included in source control and contains
settings and defaults to get the app running. Any secrets or local overrides of these values should be placed in a
`.env` file, which is ignored from source control.

Remember, never commit and store `.env` in the source control, just only `.env.example` without any data specified.

You can [read more about environment variables here](https://nextjs.org/docs/basic-features/environment-variables).

## 🏃‍♂️ Getting Started Locally

Install Git.

```bash
https://git-scm.com
```

Install Node.js.

_Windows:_

```bash
https://github.com/coreybutler/nvm-windows/releases/download/latest/nvm-setup.exe
```

_Linux:_

```bash
https://github.com/nvm-sh/nvm#installing-and-updating
```

Install PNPM.

```bash
corepack enable
```

Clone the repository.

```bash
git clone https://github.com/blefnk/relivator.git
```

Get your environment variables in check and update the variables.

```sh
cp .env.example .env
```

Get all dependencies sorted.

```sh
pnpm install
```

Bring your database to life with pushing the database schema.

```bash
pnpm db:push
```

Let the server magic begin! The app will be running at [http://localhost:3000](http://localhost:3000).

```sh
pnpm dev
```

Finally, start the Stripe webhook listener for Stripe to work.

```bash
pnpm stripe:listen
```

You can lint the project using

**🔥 Experimental, still in dev, use with caution:**

When you first check out this project, you can run the following command to get your environment all set up:

```sh
pnpm setup
```

Or just only run:

```sh
./src/scripts/rename
```

This will rename `relivator` to your project name throughout the app,
update your git remote to be named `relivator`, install the `.env` file, and
install all of your dependencies.

In the future, you'll be able to pull in the latest `relivator` changes without
missing a beat by running:

```sh
git fetch relivator
git merge relivator/main
```

_And, ladies and gentlemen, it's perfectly ready!_

## 🦫 Database

Drizzle ORM is set up to use PlanetScale MySQL by default, but any database will work, like Vercel PostgreSQL. Simply set `DATABASE_URL` in your `.env` file to work.

### `pnpm db`

This project exposes a package.json script for accessing drizzle-kit via `pnpm db:<command>`. This script handles all environment variable mapping automatically via `dotenv-cli`, so you don't have to think about it. You should always try to use this script when interacting with drizzle-kit locally.

### Making changes to the database schema

Make changes to your database by modifying `src/data/db/schema.ts` ([learn more](https://orm.drizzle.team/docs/sql-schema-declaration)).

When prototyping changes, you can use [`db push`](https://orm.drizzle.team/kit-docs/overview):

```sh
pnpm db:push
```

When you feel comfortable with the changes, you can make a migration file by running:

```sh
pnpm db:generate
```

## 🐧 How to Deploy the Project

Follow the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

## 🔃 Migration From Similar Starter

Know how to migrate your project to the current starter. Migration guides are both for app and pages directories. Your old starter may use Prisma, Zod, and other things.

The content of this section is not yet ready. Check back in a few days. Possible will be moved to [the project wiki](/blefnk/relivator/wiki). Possible stacks: Original Next.js 13, Original T3 Stack, Shadcn Taxonomy.

## UI components

By default, this project already includes some components from [shadcn/ui](https://ui.shadcn.com).

To add new UI components from [shadcn/ui](https://ui.shadcn.com/), run:

```sh
pnpx shadcn-ui@latest add button
```

Where `button` can be any UI element from the project.

## Linting / Checking the codebase

To run a full check of the codebase (type-check, lint, prettier check, test), run:

```sh
pnpm check
```

### Linting

```sh
pnpm lint
```

### Type Checking

```sh
pnpm type-check
```

### Formatting with Prettier

```sh
pnpm format
```

to check for format errors, run:

```sh
pnpm format:check
```

### Testing via Jest

```sh
pnpm test
```

## 🙌 Contributing & Credits

Contributions are welcome! We thank everyone for their contributions to this repository. Your contributions will be acknowledged. Please open an issue if you have any questions or suggestions. See the [contributing guide](./CONTRIBUTING.md) for more information.

Please visit [this special wiki page](/blefnk/relivator/wiki/Credits-&-Collaborators) to see the full list of credits and contributors.

**To contribute to Bleverse Relivator, follow these steps:**

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to original branch: `git push origin <project_name> / <local>`
5. Create the pull request.

Or, see the GitHub docs on [how to create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 📄 License

This project is MIT-licensed and is free to use and modify for your own projects. Check the [LICENSE](./LICENSE) file for details.

It was created by [@blefnk Nazarii Korniienko](https://github.com/blefnk), [Bleverse](https://bleverse.com), and its OSS community.

---

Happy coding! Embark on this coding adventure, learn, iterate, and most importantly – enjoy the process! And remember – this is a space of learning and experimentation. Dive in and enjoy the journey! 🚀🌌
