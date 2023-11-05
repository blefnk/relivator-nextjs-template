# Project Changelog

## v0.0.0-v1.0.0 Project Features

1. [x] 🌍 **[Next.js 14](https://nextjs.org)**, **[React 18](https://react.dev)**, and **[TypeScript 5](https://typescriptlang.org)** used as core.
2. [x] ✅ Perfectly configured `next.config.mjs` with i18n and mdx support implementation.
3. [x] 📚 Everything is tried to be as well-documented as possible, and beginner-friendly.
4. [x] 🧱 Nicely configured and documented with comments `middleware.ts` for i18n and next-auth.
5. [x] 🍭 Cleanly composed modern user interface, built with **[Radix](https://radix-ui.com)** and stunning UI components, all thanks to **[shadcn/ui](https://ui.shadcn.com)** and **[@auth/drizzle-adapter](https://authjs.dev/reference/adapter/drizzle)**..
6. [x] 🌐 Comprehensive implementations for i18n, means internationalization, with 8 languages included, using **[next-intl](https://next-intl-docs.vercel.app/docs/getting-started/app-router-server-components)**, but in the future we want to use our very own solutions, and/or **[next-international](https://github.com/QuiiBz/next-international)**.
7. [x] 🦫 **[Drizzle ORM](https://orm.drizzle.team)** and **[DrizzleKit](https://orm.drizzle.team/kit-docs/overview)** configured for serverless-first environments, for services like **[Neon](https://neon.tech)** and **[Vercel Postgres](https://vercel.com/docs/storage/vercel-postgres)**.
8. [x] 🦺 Usage of [Cuid2](https://github.com/paralleldrive/cuid2) to automatically generate collision-free modern IDs in the database models.
9. [x] 📊 Data fetching, which works on server and client, using **[tRPC](https://trpc.io)** & **[TanStack Query](https://tanstack.com/query)**.
10. [x] ✳️ Awesomely crafted VSCode settings and recommended extensions.
11. [x] 🌿 Authentication via **[NextAuth](https://authjs.dev)** (previously known as NextAuth.js and next-auth).
12. [x] 🛍️ Implementation of storefront with products, categories, and subcategories.
13. [x] 🧫 Indicator implementation for TailwindCSS screen sizes.
14. [x] 💰 Implementation of user subscriptions and checkout system via **Stripe**.
15. [x] 💮 Optimized **[Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata)** for SEO handling, with file-system handlers.
16. [x] 💻 Blog implementation by using **MDX** files.
17. [x] 📖 Well written `README.md`, and is beginner-friendly first, including descriptions for the **[environment variables](https://nextjs.org/docs/basic-features/environment-variables)**.
18. [x] 🤩 Using **[TailwindCSS](https://tailwindcss.com)** for utility-first CSS.
19. [x] 🦦 Using **[EsLint](https://eslint.org)** with **[Prettier](https://prettier.io)** for readable, safe code.
20. [x] 🅰️ The beautiful implementation of font system, using **[Inter](https://rsms.me/inter)** and other typefaces.
21. [x] 🔀 Type-safety validations for project schemas and UI fields via **[Zod](https://zod.dev)**.
22. [x] 🎉 And a lot more amazing things have been already done! [Now Relivator v1.0.0 is officially released](https://github.com/blefnk/relivator/releases/tag/1.0.0)!

## v0.0.0-v.1.0.0 Commits

- [🌱 feat(app): initial deploy](https://github.com/blefnk/relivator/commit/4099c7c7e444b3e5782487355a508fdfdb3a14cd)
- [💎 feat(app): initial update](https://github.com/blefnk/relivator/commit/67a68f4cb93f76937b307fc056ba99a9675ba700)
- [🌅 upd(app): global update](https://github.com/blefnk/relivator/commit/6247d5cda5a5dc5dea19940b64b39a5ab9aa6ce7)
- [🦫 feat(db): add drizzle config](https://github.com/blefnk/relivator/commit/4dbcf8d6682530955913ec088051c63798807d1e)
- [✅ feat(app): configure the app](https://github.com/blefnk/relivator/commit/fc941ef5061662a0dc8052641ab010cc45e66c60)
- [☘️ feat(app): improve env styling](https://github.com/blefnk/relivator/commit/e75ed0ec2413110b0fcd75f778d63eba9d88faea)
- [☘️ feat(store): init app store types](https://github.com/blefnk/relivator/commit/73b00c0ce0f3656bddbe9b71c19631c352ab89b2)
- [☘️ feat(store): add more store things](https://github.com/blefnk/relivator/commit/146f9c451544112a18a734b12622f913dd3c8298)
- [🧹 feat(app): temporary remove image](https://github.com/blefnk/relivator/commit/f3ce181f3d9844ba718a3aef7fadcd03776fdffe)
- [🌿 feat(app): improve header and footer](https://github.com/blefnk/relivator/commit/d178f653844cd259db5095022bfe4a1de9ebd070)
- [🌳 feat(app): add many new store things](https://github.com/blefnk/relivator/commit/b25ea4665975d055310a5f172d658464633d451e)
- [🌄 feat(app): add payments & store actions](https://github.com/blefnk/relivator/commit/639093c454bd758f0536215ce9830daabf466852)
- [💳 feat(store): add checkout & some updates](https://github.com/blefnk/relivator/commit/b61217d1afede932452190dfbbadd9bd86d22260)
- [✨ feat(app): improve the project file hierarchy](https://github.com/blefnk/relivator/commit/3a66fa83eede22a0a28082c37409a6546dca3a97)
- [🔴 feat(auth): deprecate clerk because i18n errors](https://github.com/blefnk/relivator/commit/2d4ff94d089548a30a9e65214c7731a68b6cae65)
- [📄 upd(app): upd islands, landing and other pages](https://github.com/blefnk/relivator/commit/7e5abae355cfc4790f65bce0d6d2ddbb24b2a524)
- [🍭 add(analytics): integrate vercel web analytics](https://github.com/blefnk/relivator/commit/5fb132ec4be5cb2c35e168bc9f1ad9844e3b73eb)
- [🎉 **feat(app): release relivator 1.0.0 version**](https://github.com/blefnk/relivator/commit/52dd52012441c975747b0331530428e8f7ae5825)
