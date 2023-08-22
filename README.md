# Bleverse Relivator: Next.js 13 Store Starter 2023

**Crafting the world's most iconic Next.js starter.**

🔥 Next.js 13 Starter. App Router, TypeScript, shadcn/ui, i18n, T3, Stripe, Clerk, Tailwind, Drizzle, Zod, RSC, SWC, tRPC, NextAuth, Server Actions, Lucide Icons, & More. Get it now and enjoy!

_You can also check [our another free Next.js 13 starter](https://github.com/blefnk/reliverse). This one starter offers you tech used in the current starter plus also: Prisma, Lucia, Auth.js, and more. It means there we're very experimentally trying to implement all of the important and most used tech together._

## 🚀 About the Project

**The Bleverse Framework for the Next.js!**

Step into the future with the ultimate Next.js starter. Everything has been set up for you. It's more than just code; it's a journey. You're not on this journey alone. Move faster than ever. We've laid the groundwork; now, grab it, dive in and accelerate your development.

This is the space where we playing with everything new in Next.js 13. Stumbled upon something? DM us on Twitter, sorry, on X [@bleverse_com](https://x.com/bleverse_com) or raise an issue right here. If you've got some coding magic up your sleeve, contributions are always celebrated! 🎉

## 🔥 Project Features Roadmap

This roadmap outlines the key features and improvements to be implemented in this Next.js starter.

- [ ] ✨ Admin dashboard with stores, products, orders, subscriptions, and payments.
- [x] ⬆️ File uploads with **uploadthing**.
- [x] 🔐 Keep it tight with Authentication using **Clerk**.
- [x] 🎨 Centralized Database magic at [**PlanetScale**](https://planetscale.com).
- [x] 🏬 Storefront with products, categories, and subcategories.
- [ ] 🐧 The most beginner-friendly starter (will be in the feature, maybe, how its possible 😁).
- [x] 🌀 Comprehensive offerings of the Next.js App Router with the RSCs and everything all new.
- [ ] 📊 Client and server data/query fetching with [**tRPC**](https://github.com/trpc/trpc) & [**TanStack Query**](https://tanstack.com/query).
- [ ] 🌅 Using every usable [**TanStack**](https://tanstack.com) libraries.
- [ ] 📖 Sharing insights with blogs powered by **MDX**.
- [x] 🦫 Dive deep into SQL type-safety via [**Drizzle ORM**](https://orm.drizzle.team/).
- [ ] 📧 Email verification and a lot more features to enhance the application.
- [ ] 📰 Newsletter subscription with **React Email** and **Resend**.
- [x] 🕶️ Stunning UI components, all thanks to [**shadcn/ui**](https://github.com/shadcn/ui).
- [ ] 🤖 Ultimate type-safety using TypeScript, typedRoutes, etc.
- [x] 🤝 Seller and customer workflows.
- [x] 🤩 Styled to impress with **Tailwind CSS**.
- [x] 🧧 User subscriptions via **Stripe**.
- [ ] 💎 Seamless checkout with **Stripe Checkout**.
- [x] 🅰️ Validation with **Zod** and **Valibot**.

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

## 🔃 Migration From Similiar Starter

Know how to migrate your project to the current starter. Migration guides are both for app and pages directories. Your old starter may use Prisma, Zod, and other things.

The content of this section is not yet ready. Check back in a few days. Possible will be moved to [the project wiki](/blefnk/relivator/wiki). Possible stacks: Original Next.js 13, Original T3 Stack, Shadcn Taxonomy.

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

Licensed under the MIT License. Check the [LICENSE](./LICENSE) file for details.

---

Happy coding! Embark on this coding adventure, learn, iterate, and most importantly – enjoy the process! And remember – this is a space of learning and experimentation. Dive in and enjoy the journey! 🚀🌌
