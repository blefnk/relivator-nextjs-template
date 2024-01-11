# Project Changelog

Please check the roadmap checklist on README.md instead reading this OUTDATED file.

## v0.0.0-v1.2.0 Features

- [x] Utilized [Next.js 14](https://nextjs.org), [React 18](https://react.dev), [TailwindCSS](https://tailwindcss.com), and [TypeScript](https://typescriptlang.org) serve as the project's core technologies.
- [x] Implemented authentication through **both [Clerk](https://clerk.com/) and [NextAuth.js](https://authjs.dev)**.
- [x] Unleashed extensive internationalization **in 10 languages** (_English, German, Spanish, Persian, French, Hindi, Italian, Polish, Turkish, Ukrainian_), using [next-intl](https://next-intl-docs.vercel.app).
- [x] Undertook [Drizzle ORM](https://orm.drizzle.team), utilizing **both MySQL and PostgreSQL** databases, and [PlanetScale](https://planetscale.com)/[Neon](https://neon.tech)/[Vercel](https://vercel.com)/[Railway](https://railway.app) services.
- [x] Successfully configured `next.config.mjs` with i18n and MDX support.
- [x] Strived for thorough documentation and a beginner-friendly approach throughout the project.
- [x] Skillfully configured and commented on `middleware.ts` for i18n and next-auth.
- [x] Set upped the Content-Security-Policy header as a security measure to prevent XSS attacks.
- [x] Provided exemplary VSCode settings and recommended extensions.
- [x] Optimized the [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) for SEO, integrating file-system handlers.
- [x] Integrated a TailwindCSS screen size indicator for local project runs.
- [x] Established a user subscription and checkout system using [Stripe](hhttps://github.com/stripe/stripe-node#readme).
- [x] Ensured type-safety validations for project schemas and UI fields using [Zod](https://zod.dev).
- [x] Employed [EsLint](https://eslint.org) and [Prettier](https://prettier.io) to ensure the code is safe and readable.
- [x] Elegantly executed the font system, utilizing [Inter](https://rsms.me/inter) and additional typefaces.
- [x] Developed a storefront, incorporating product, category, and subcategory functionality.
- [x] Designed a modern, cleanly composed UI using [Radix](https://radix-ui.com), with attractive UI components from [shadcn/ui](https://ui.shadcn.com).
- [x] Composed a comprehensive, beginner-friendly `README.md`, including descriptions of [environment variables](https://nextjs.org/docs/basic-features/environment-variables).
- [x] Blog functionality realized through the use of MDX files.
- [x] Implemented [tRPC](https://trpc.io) and [TanStack Query](https://tanstack.com/query) for server and client data fetching.

## v1.0.0-v1.2.0 Commits

- 19. [🟢 feat(app): add a large number of updates](https://github.com/blefnk/relivator/commit/0bcee920b482e63c67dbe030fe12784429d6c8fc)
- 20. [🛡️ feat(app): improve stability and security](https://github.com/blefnk/relivator/releases/tag/1.2.0)

## v0.0.0-v1.0.0 Commits

- 1. [🌱 feat(app): initial deploy](https://github.com/blefnk/relivator/commit/4099c7c7e444b3e5782487355a508fdfdb3a14cd)
- 2. [💎 feat(app): initial update](https://github.com/blefnk/relivator/commit/67a68f4cb93f76937b307fc056ba99a9675ba700)
- 3. [🌅 upd(app): global update](https://github.com/blefnk/relivator/commit/6247d5cda5a5dc5dea19940b64b39a5ab9aa6ce7)
- 4. [🦫 feat(db): add drizzle config](https://github.com/blefnk/relivator/commit/4dbcf8d6682530955913ec088051c63798807d1e)
- 5. [✅ feat(app): configure the app](https://github.com/blefnk/relivator/commit/fc941ef5061662a0dc8052641ab010cc45e66c60)
- 6. [☘️ feat(app): improve env styling](https://github.com/blefnk/relivator/commit/e75ed0ec2413110b0fcd75f778d63eba9d88faea)
- 7. [☘️ feat(store): init app store types](https://github.com/blefnk/relivator/commit/73b00c0ce0f3656bddbe9b71c19631c352ab89b2)
- 8. [☘️ feat(store): add more store things](https://github.com/blefnk/relivator/commit/146f9c451544112a18a734b12622f913dd3c8298)
- 9. [🧹 feat(app): temporary remove image](https://github.com/blefnk/relivator/commit/f3ce181f3d9844ba718a3aef7fadcd03776fdffe)
- 10. [🌿 feat(app): improve header and footer](https://github.com/blefnk/relivator/commit/d178f653844cd259db5095022bfe4a1de9ebd070)
- 11. [🌳 feat(app): add many new store things](https://github.com/blefnk/relivator/commit/b25ea4665975d055310a5f172d658464633d451e)
- 12. [🌄 feat(app): add payments & store actions](https://github.com/blefnk/relivator/commit/639093c454bd758f0536215ce9830daabf466852)
- 13. [💳 feat(store): add checkout & some updates](https://github.com/blefnk/relivator/commit/b61217d1afede932452190dfbbadd9bd86d22260)
- 14. [✨ feat(app): improve the project file hierarchy](https://github.com/blefnk/relivator/commit/3a66fa83eede22a0a28082c37409a6546dca3a97)
- 15. [🔴 feat(auth): deprecate clerk because i18n errors](https://github.com/blefnk/relivator/commit/2d4ff94d089548a30a9e65214c7731a68b6cae65)
- 16. [📄 upd(app): upd islands, landing and other pages](https://github.com/blefnk/relivator/commit/7e5abae355cfc4790f65bce0d6d2ddbb24b2a524)
- 17. [🍭 add(analytics): integrate vercel web analytics](https://github.com/blefnk/relivator/commit/5fb132ec4be5cb2c35e168bc9f1ad9844e3b73eb)
- 18. [🎉 feat(app): release relivator 1.0.0 version](https://github.com/blefnk/relivator/commit/52dd52012441c975747b0331530428e8f7ae5825)
