# Bleverse Relivator: Next.js 13 Store Starter 2023

**Crafting the world's most iconic Next.js starter.**

🔥 Next.js 13 Store Starter. App Router, TypeScript, shadcn/ui, i18n, T3, Stripe, Clerk, Tailwind, Drizzle, Zod, RSC, SWC, tRPC, NextAuth, Server Actions, Lucide Icons, & More. Download it and enjoy!

_You can also check [our another free Next.js 13 starter](https://github.com/blefnk/reliverse). This one starter offers you tech used in the current starter plus also: Prisma, Lucia, Auth.js, and more. It means there we're very experimentally trying to implement all of the important and most used tech together._

## 🚀 About the Project

**The Bleverse Framework for the Next.js!**

Step into the future with the ultimate Next.js starter. Everything has been set up for you. It's more than just code; it's a journey. You're not on this journey alone. Move faster than ever. It can be proudly called a website builder, although it certainly isn't, at least for now 😏. We've laid the groundwork; now, grab it, dive in and accelerate your development.

This is our experimental space where we tinkered with the new Next.js app directory. So, while it's all fun and exploration, there might be a few quirks here and there. Stumbled upon something odd or just feeling generous? DM us on Twitter, sorry, on X [@bleverse_com](https://x.com/bleverse_com) or raise an issue right here. If you've got some coding magic up your sleeve, contributions are always celebrated! 🎉

> **Warning**
> This project is still in development and is not ready for production use.
> It uses new technologies (server actions, drizzle ORM) which are subject to change and may break your application.
> The README.md is not yet finished and may or may not represent features that have not been implemented yet.
> Please check back soon for more features, which are currently in production.

## 🔥 Project Features Roadmap

This roadmap outlines the key features and improvements to be implemented in this Next.js starter.

- [ ] ✨ Admin dashboard with stores, products, orders, subscriptions, and payments.
- [ ] ⬆️ File uploads with **uploadthing**.
- [ ] 🌍 Authentication with **Clerk**.
- [ ] 🌐 Blog using **MDX**.
- [ ] 🎨 Centralized Database magic at [**PlanetScale**](https://planetscale.com).
- [ ] 🏬 Storefront with products, categories, and subcategories.
- [ ] 🐧 The most beginner-friendly starter (will be in the feature, maybe, how its possible 😁).
- [ ] 💲 Comprehensive offerings of the Next.js App Router with the RSCs and everything all new.
- [ ] 📊 Data-fetching streamlined with [**tRPC**](https://github.com/trpc/trpc).
- [ ] 📖 Share insights with Blogs powered by **MDX**.
- [ ] 📝 Database on **PlanetScale**.
- [ ] 📡 Dive deep into SQL with TypeScript ORM via [**Drizzle ORM**](https://github.com/drizzle-team/drizzle-orm).
- [ ] 📧 Email verification and a lot more features to enhance the application.
- [ ] 📰 Newsletter subscription with **React Email** and **Resend**.
- [ ] 🔐 Keep it tight with Authentication using [**NextAuth.js**](https://authjs.dev).
- [ ] 🕶️ Stunning UI components, all thanks to [**shadcn/ui**](https://github.com/shadcn/ui).
- [ ] 🤖 Ultimate type-safety using TypeScript, Zod, Valibot, typedRoutes, etc.
- [ ] 🤝 Seller and customer workflows.
- [ ] 🤩 Styled to impress with **Tailwind CSS**.
- [ ] 🦫 ORM using **Drizzle ORM**.
- [ ] 🧧 User checkout and seamless subscriptions via **Stripe**.
- [ ] 🅰️ Validation with **Valibot** and **Zod**.

## 🌍 i18n: Internationalization

At Bleverse, the approach to multilingualism is a separate holy grail. We love talking about this topic. In the future, we'll be writing a lot of interesting things about internationalization with Next.js 13 App Router. Stay tuned!

## 👋 Project Configuration

The `src/app.ts` file contains essential configuration used to modify the contents and settings of the website.

- Manage the content displayed on the website.
- Customize various settings, such as disabling theme toggle.
- Manage general site-wide information.

## 🔐 Authentication

Setting up auth is a breeze:

1. Visit: `https://dashboard.clerk.com/apps`
2. Create a New Application there.
3. Fill out the `.api` file (just duplicate and rename `.env.example`).

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

Let the server magic begin!

```sh
pnpm dev
```

Finally start the Stripe webhook listener for Stripe to work.

```bash
pnpm stripe:listen
```

## 🐧 How do I deploy this?

Follow the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify) and [Docker](https://create.t3.gg/en/deployment/docker) for more information.

<!-- ## 💌 Email (...soon)

Want a sneak peek of your email in dev mode without sending it out? Run:

```bash
npx mailing
```

For the real deal in production, you'll be working with [Resend](resend.com). Grab your API key and verify your domain there. -->

<!-- ## 💲 Payments (...soon)

Stripe and LemonSqueezy powers payments, with subscription syncs via webhooks (`stripe/route.ts`) and (`lemonsqueezy/route.ts`). Fancy a local test? Expose the webhook with:

```bash
npx ngrok http 3000
```

Then, register the webhook for Stripe (see `.env.example`) and for lemonsqueezy URL, like `https://abc.eu.ngrok.io/api/lemonsqueezy`, in [LemonSqueezy's webhook settings](https://app.lemonsqueezy.com/settings/webhooks). -->

## 🅰️ Notes

Because the project is still in active development, sometimes we need to deviate from our own principles. This means that, yeah, there are times when we disable certain TypeScript features, use `any`, `// @ts-expect-error`, and so on. That's the way we love to live on the cutting edge, embracing the newest technologies in web development. So if you come across something like `// !?!`, it indicates that this issue will be resolved in future versions of Relivator. Thank you for your understanding.

<!-- ## ⚠️ Possible Issues

A quick snapshot of the roadblocks or nuances as of now:

1. There is a possibility that `.d.ts` files do not work correctly in VS Code. Temporarily renamed to `.ts`.
2. Occasionally, MySQL throws a tantrum about excessive connections. A quick restart of your Next.js app should soothe it.
3. Pricing plans are playing hard-to-get with the database sync.
4. The RBAC feature is still on probation; thorough testing pending.
5. Jury's out on tRPC's performance in RSCs.
6. An [issue with MJML](https://github.com/vercel/next.js/issues/50042) compelled us to house the email functions within the /pages directory. -->

## 🔃 Migration From Similiar Starter

Know how to migrate your project to the current starter. Migration guides are both for app and pages directories. Your old starter may use Prisma, Zod, and other things.

### Original Next.js 13

The content of this section is not yet ready. Check back in a few days.

### Original T3 Stack

The content of this section is not yet ready. Check back in a few days.

### Shadcn Taxonomy

The content of this section is not yet ready. Check back in a few days.

## 📫 Contributing to Bleverse Relivator

Contributions are welcome! Please open an issue if you have any questions or suggestions. Your contributions will be acknowledged. See the [contributing guide](./CONTRIBUTING.md) for more information.

**To contribute to Bleverse Relivator, follow these steps:**

1. Fork this repository.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make your changes and commit them: `git commit -m '<commit_message>'`
4. Push to original branch: `git push origin <project_name> / <local>`
5. Create the pull request.

Or, see the GitHub docs on [how to create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## 🙌 Kudos to Collaborators

We thank everyone for their contributions to this repository. Please visit [the releases](/releases) page to see the full list of contributors and their authors.

## 📄 License

Licensed under the MIT License. Check the [LICENSE](./LICENSE) file for details.

---

Happy coding! Embark on this coding adventure, learn, iterate, and most importantly – enjoy the process! And remember – this is a space of learning and experimentation. Dive in and enjoy the journey! 🚀🌌
