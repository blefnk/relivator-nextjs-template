# Relivator 1.2.2: The Most Feature-Rich Next.js 14 Starter

<!-- https://github.com/blefnk/relivator#readme -->

🌐 [Launch Relivator's Demo](https://relivator.bleverse.com) | ❄️ [Check Project Features](https://github.com/blefnk/relivator#project-features-checklist)

Stop running from one starter to the next. With Relivator, you'll have unlimited possibilities. You can create anything you want; all the tools are already prepared, just for you.

We aim to create the world's most feature-rich and global Next.js starter. Offering more than just code—it's a journey. It's stable and ready for production. Scroll down and check out the breathtaking list of project features, including switching between Clerk/NextAuth.js and Drizzle's MySQL/PostgreSQL on the fly.

Please scroll down the page to see a lot of useful information about how everything works in the project, and a comprehensive list of project features as well.

## How to Install and Get Started

1. **Essential Tools**: Ensure that [_VSCode_](https://code.visualstudio.com), [_Git_](https://learn.microsoft.com/en-us/devops/develop/git/install-and-set-up-git), _GitHub Desktop_ ([Windows/macOS](https://desktop.github.com) | [Linux](https://dev.to/rahedmir/is-github-desktop-available-for-gnu-linux-4a69)), and _Node.js LTS_ ([Windows/macOS](https://nodejs.org) | [Linux](https://youtu.be/NS3aTgKztis)) are installed.
2. **Project Cloning**: [_Create a new fork_](https://github.com/blefnk/relivator/fork) and use GitHub Desktop to download it.
3. **Configuration**: Open VSCode and load the project folder. Press `Ctrl+Shift+P` and search for `>Create New Terminal`. Install _PNPM_ using `corepack enable`. Then, enter `pnpm install` to install the packages. Next, copy the `.env.example` file to a new `.env` file and fill in at least the `NEXT_PUBLIC_DB_PROVIDER` and `DATABASE_URL` fields. Finally, send the database schema to your database using `pnpm mysql:push` or `pnpm pg:push`.
4. **Run, Stop, Build**: Use `pnpm dev` to run the app (visit <http://localhost:3000> to check it). Stop it by focusing on the console and pressing `Ctrl+C`. After making changes, build the app using `pnpm build`. _Thats okay if you see Clerk's warnings_ when executing `pnpm build`, this is a known issue not related to Relivator.
5. **Commit and Deploy**: Upload your project to your GitHub profile using GitHub Desktop. Then, deploy it by importing the project into [Vercel](https://vercel.com/new), making your website publicly accessible on the internet. If you wish to share your work, seek feedback, or ask for assistance, you're welcome to do so either [in our Discord server](https://discord.gg/Pb8uKbwpsJ) or [via GitHub discussions](https://github.com/blefnk/relivator/discussions).

Tip! You can create a folder, for instance, `home`, within the `src` directory, to store your project-specific files. It allows you for easy updates whenever Relivator has new versions.

## Project Roadmap Features Checklist

**Note:** _Sometimes, we gift early access to Relivator's future plugins to three randomly selected individuals. We also give away various other interesting things. Simply `star this repository` and [let us know how to contact you](https://forms.gle/NXZ6QHpwrxh52VA36). For discussions, join [the project's Discord](https://discord.gg/Pb8uKbwpsJ)._

<details>
  <summary>[27.12.2023] 🎄 Relivator v1.2.0 is here! 🥳 Click to see the announcement 🎁</summary>

---

_Relivator 1.2.0 is already here! I, [@blefnk Nazarii Korniienko](https://github.com/blefnk), am thrilled to wrap up this year 2023, proudly presenting this release to the OSS community! So, the result of over two months of hard work is finally here!_

In this version, significant attention was focused on stability, security, performance optimization, and a substantial improvements in design—both visually, UX, and the logic of how the app works. A lot was really done, too much to list everything! Be sure to install it and check it out for yourself!

By the way, you can now enjoy a finely-tuned ESLint Flat Config! Also, it's worth noting that Clerk, since version 1.1.0, is no longer considered deprecated in the Relivator project. Thanks to 1.2.0, Clerk now works seamlessly with an easy switch to NextAuth.js when needed, all on the fly. Plus, full support for Turbopack (next dev --turbo) is finally here, even for next-intl!

As for next-intl, finally, we can now enjoy internationalization that works not only on the client-side but also on the server! Only the 404 page has client-side i18n messages, all other pages and components use i18n as server-first. And this is really cool!

Many unique solutions have been implemented in this new version. Moreover, using Relivator from this version, you have the opportunity to try out the alpha version of our unique Code-First/No-Code Builder system for React pages and components (which will appear in Reliverse CMS in the future). Just visit the Admin page while in the development environment and enjoy.

If you have already used Relivator before, please pay attention, this is very important! Be sure to check the updated .env.example file and update your .env file accordingly.

As a small teaser/spoiler, for Relivator 1.3.0, even more improvements in visual design and UX are planned; 1.4.0 will come with a magical CLI implementation, allowing you to quickly obtain only the necessary features and dependencies for your app (even automated updates and the ability to add other functions and packages to an already installed app); 1.5.0 will undergo a full code refactoring that will meet all the best standards and practices; 1.6.0-2.0.0+ versions, apart from many other things, will receive most of the items currently unchecked in the Roadmap (located in the project's README.md). It's going to be incredible!

So, install this new version of Relivator 1.2.0 and appreciate the multitude of incredible features, and freely use it in your own projects today. Please use your preferred feedback channels to share your thoughts on Relivator 1.2.0 and what you would like to see in future releases.

Don't forget to also check out the significantly updated README.md, it's worth it.

Enjoy! ❄️☃️ Merry Christmas and Happy New Year 2024! 🎇🥳

</details>

---

_The roadmap below outlines the key features and improvements planned for implementation in this Next.js starter. `Items not marked may already be configured` but might not have undergone extensive testing. Should you find any mistakes, please create an issue._

- [x] 1. Utilized [Next.js 14](https://nextjs.org) with **complete [Turbopack](https://turbo.build) support**, alongside [React 18](https://react.dev), [TailwindCSS](https://tailwindcss.com), and [TypeScript](https://typescriptlang.org) as the project's core technologies.
- [x] 2. Undertook [Drizzle ORM](https://orm.drizzle.team), utilizing **both MySQL and PostgreSQL** databases, and [PlanetScale](https://planetscale.com)/[Neon](https://neon.tech)/[Vercel](https://vercel.com)/[Railway](https://railway.app) services.
- [x] 3. Successfully configured `next.config.mjs` with i18n, MDX, and even [Million.js](https://million.dev) support.
- [x] 4. Strived for thorough documentation and a beginner-friendly approach throughout the project.
- [x] 5. Skillfully configured and commented on `middleware.ts` for i18n and next-auth.
- [x] 6. Set upped the Content-Security-Policy (CSP) system as a security measure to prevent XSS attacks (disabled by default).
- [x] 7. Provided exemplary VSCode settings and recommended extensions.
- [x] 8. Optimized the [Next.js Metadata API](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) for SEO, integrating file-system handlers.
- [x] 9. Integrated a TailwindCSS screen size indicator for local project runs.
- [x] 10. Implemented extensive internationalization in 10 languages (English, German, Spanish, Persian, French, Hindi, Italian, Polish, Turkish, Ukrainian) using the [next-intl](https://next-intl-docs.vercel.app) library, which works both on server and client, and included support for `next dev --turbo`.
- [x] 11. Implemented authentication through **both [Clerk](https://clerk.com) and [NextAuth.js](https://authjs.dev)**.
- [x] 12. Implemented [tRPC](https://trpc.io) and [TanStack Query](https://tanstack.com/query) (with [React Normy](https://github.com/klis87/normy#readme)) to have advanced server and client data fetching.
- [x] 13. Established a user subscription and checkout system using [Stripe](hhttps://github.com/stripe/stripe-node#readme).
- [x] 14. Ensured type-safety validations for project schemas and UI fields using [zod](https://zod.dev) library.
- [x] 15. Employed [EsLint](https://eslint.org) (with [Flat Config support](https://eslint.org/docs/latest/user-guide/configuring/configuration-files-new) and [@antfu/eslint-config](https://github.com/antfu/eslint-config#antfueslint-config), including a [TypeScript patch](https://github.com/antfu/eslint-ts-patch#eslint-ts-patch) to enable the `eslint.config.ts` filename), perfectly configured to work with both [Biome](https://biomejs.dev) and [Prettier](https://prettier.io) (including the latest Sort Imports addon) to ensure the code is readable, clean, and safe. **Tip:** use `pnpm ui:eslint` to open [ESLint Flat Config Viewer](https://github.com/antfu/eslint-flat-config-viewer#eslint-flat-config-viewer) UI tool.
- [x] 16. Elegantly executed the font system, utilizing [Inter](https://rsms.me/inter) and additional typefaces.
- [x] 17. Developed a storefront, incorporating product, category, and subcategory functionality.
- [x] 18. Designed a modern, cleanly composed UI using [Radix](https://radix-ui.com), with attractive UI components from [shadcn/ui](https://ui.shadcn.com).
- [x] 19. Composed a comprehensive, beginner-friendly `README.md`, including descriptions of [environment variables](https://nextjs.org/docs/basic-features/environment-variables).
- [x] 20. Blog functionality realized through the use of MDX files.
- [ ] 21. Use absolute paths everywhere where applied in the project.
- [ ] 22. Use [Kysely](https://kysely.dev) with Drizzle to achieve full TypeScript SQL query builder type-safety.
- [ ] 23. Translate README.md and related files into more languages.
- [ ] 24. Transform beyond a simple e-commerce store to become a universal website starter.
- [ ] 25. Tidy up `package.json` with correctly installed and orderly sorted packages in `dependencies` and `devDependencies`.
- [ ] 26. The project author should publish a series of detailed videos on how to use this project. There should also be some enthusiasts willing to publish their own videos about the project on their resources.
- [ ] 27. Reduce the number of project packages, config files, and etc., as much as possible.
- [ ] 28. Reduce HTML tag nesting and ensure correct usage of HTML tags whenever possible.
- [ ] 29. Prioritize accessibility throughout, for both app user UI (User Interface) and UX (User Experience), as well as developers' DX (Developer Experience). Maintain usability without compromising aesthetics.
- [ ] 30. Prefer using [const-arrow](https://freecodecamp.org/news/when-and-why-you-should-use-es6-arrow-functions-and-when-you-shouldnt-3d851d7f0b26) and [type](https://million.dev/docs/manual-mode/block) over [function](https://freecodecamp.org/news/the-difference-between-arrow-functions-and-normal-functions) and [interface](https://totaltypescript.com/type-vs-interface-which-should-you-use) where applicable, and vice versa where applicable correspondingly, with using helpful ESLint [arrow-functions](https://github.com/JamieMason/eslint-plugin-prefer-arrow-functions#readme) plugin, to maintain readable and clean code by adhering to specific [recommendations](https://youtu.be/nuML9SmdbJ4) for [functional programming](https://toptal.com/javascript/functional-programming-javascript).
- [ ] 31. Optimize all app elements to improve dev cold start and build speeds.
- [ ] 32. Move each related system to its special folder (into the `src/core` folder), so any system can be easily removed from the project as needed.
- [ ] 33. Move component styles to .css or .scss files, or use packages that provide "syntactic sugar" for styles in .tsx files by using [tokenami](https://github.com/tokenami/tokenami#readme) CSS library. Implement possibility to implement [Figma Tokens System](https://blog.devgenius.io/link-figma-and-react-using-figma-tokens-89e6cc874b4d) to work seamlessly with the project. Tip: go to point #90 of this roadmap to lean more about new ways to use CSS-in-JS.
- [ ] 34. Migrate to NextAuth.js' [next-auth@beta](https://npmjs.com/package/next-auth?activeTab=versions) ([discussions](https://github.com/nextauthjs/next-auth/releases/tag/next-auth%405.0.0-beta.4)), and to Clerk's [@clerk/*@alpha].
- [ ] 35. Manage email verification, newsletter sign-ups, and email marketing via [Resend](https://resend.com) and [React Email](https://react.email).
- [ ] 36. Make sure each page and the middleware are green or yellow, but not red, upon build in the development terminal.
- [ ] 37. Make each environment variable optional, allowing the app to operate without anything configured, simply omitting specific code sections as necessary.
- [ ] 38. Keep the project on the best possible way of writing good and clean code, by following guidelines like [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/react) / [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react).
- [ ] 39. Keep the project free from things like `@ts-expect-error`, `eslint-disable`, `biome-ignore`, and others related not very safety things.
- [ ] 40. Keep the cookie count as low as possible, prepare for a cookie-free future, implement cookie management and notifications.
- [ ] 41. Introduce a comment system for products, including Review and Question types.
- [ ] 42. Integrate valuable things from [Next.js' Examples](https://github.com/vercel/next.js/tree/canary/examples) into this project.
- [ ] 43. Integrate valuable insights from [Next.js Weekly](https://nextjsweekly.com/issues) into this starter.
- [ ] 44. Implement type-safe [GraphQL](https://hygraph.com/learn/graphql) support by using [Fuse.js](https://fusejs.org) framework.
- [ ] 45. Implement the best things from [Payload CMS](https://github.com/payloadcms/payload) with Relivator's improvements.
- [ ] 46. Implement Storybook 8.0 support (read the "[Storybook for React Server Components](https://storybook.js.org/blog/storybook-react-server-components)" announcement).
- [ ] 47. Implement smart and unified log system, both for development and production, both for console and writing to specific files.
- [ ] 48. Implement Sentry to handle errors and CSP reports for the application.
- [ ] 49. Implement Relivator's/Reliverse's own version of [Saas UI](https://saas-ui.dev) to be fully compatible with our project with only needed functionality, with using Tailwind and Shadcn instead of Chakra.
- [ ] 50. Implement our own fork of [Radix Themes](https://radix-ui.com) library with set up `<main>` as wrapper instead of its current `<section>`; OR implement our very own solution which generates Tailwind instead of Radix's classes.
- [ ] 51. Implement full [Million.js](https://million.dev) support (read [Million 3.0 Announcement](https://million.dev/blog/million-3) to learn more).
- [ ] 52. Implement file uploads using [UploadThing](https://uploadthing.com) and [Cloudinary](https://cloudinary.com).
- [ ] 53. Implement dynamic switching between app features, like database provider, by making corresponding checks for environment variables.
- [ ] 54. Implement docs to the project and move each explanation from the code into that docs.
- [ ] 55. Implement deep feature-parity and easy-migration compatibility with Reliverse.
- [ ] 56. Implement cooperation possibilities by using things like [liveblocks](https://liveblocks.io).
- [ ] 57. Implement CLI to quickly get Relivator with selected options only; try to use [Charm](https://charm.sh) things to build the Reliverse CLI.
- [ ] 58. Implement AI like GPT chat features by using [Vercel AI SDK](https://sdk.vercel.ai/docs) (see: [Introducing the Vercel AI SDK](https://vercel.com/blog/introducing-the-vercel-ai-sdk)).
- [ ] 59. Implement advanced theme switching without flashing, utilizing Tailwind Dark Mode with [React Server Side support](https://michaelangelo.io/blog/darkmode-rsc) and dynamic cookies.
- [ ] 60. Implement [Jest](https://jestjs.io) testing, optimized for Next.js.
- [ ] 61. Guarantee that every possible page is enveloped using predefined shell wrappers.
- [ ] 62. Generously comment throughout the code, while keeping it clean.
- [ ] 63. Fully develop advanced sign-up and sign-in pages, integrating both social media and classic form methods.
- [ ] 64. Follow the best practices from the articles and videos like "[10 React Antipatterns to Avoid](https://youtube.com/watch?v=b0IZo2Aho9Y)" (check theirs comment section as well).
- [ ] 65. Follow recommendations from [Material Design 3](https://m3.material.io) and other design systems when relevant.
- [ ] 66. Establish, document, and adhere to conventions, such as maintaining a single naming case style for files and variables.
- [ ] 67. Establish a comprehensive i18n, using country and locale codes, and support even more languages. Ensure native speakers verify each language following machine translation. Consider to use the [next-international](https://github.com/QuiiBz/next-international) library.
- [ ] 68. Ensure ultimate type-safety using strict mode in [TypeScript](https://typescriptlang.org) including ["Do's and Don'ts"](https://typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html) recommendations (without using [dangerous type assertions](https://youtube.com/watch?v=K9pMxqb5IAk), and with [optional types correct usage](https://youtube.com/watch?v=qy6IBZggXSQ), by also using `pnpm fix:ts` — once you run that, [TypeStat](https://github.com/JoshuaKGoldberg/TypeStat) will start auto-fixing TS typings); And also ensure type-safety with typedRoutes, zod, middleware, etc.
- [ ] 69. Ensure the project lacks any unused items, such as packages, libraries, and variables. Also, make sure the project's code adheres to the [Never Nester principles](https://youtube.com/watch?v=CFRhGnuXG-4). Because, as Linus Torvalds once said, _If you need more than 3 levels of indentation, you're screwed anyway, and should fix your program_.
- [ ] 70. Ensure project has full support for [GSAP](https://gsap.com) (GreenSock Animation Platform) library, with convient ways to use @gsap/react [useGSAP() hook](https://gsap.com/docs/v3/React/tools/useGSAP).
- [ ] 71. Ensure full Next.js Edge support and compatibility.
- [ ] 72. Ensure full [Biome](https://biomejs.dev), [Bun](https://bun.sh), and [Docker](https://docker.com) support and compatibility.
- [ ] 73. Ensure all website languages are grammatically correct and adhere to the latest rules for each language.
- [ ] 74. Ensure all items in the project are sorted in ascending order unless different sorting is required elsewhere.
- [ ] 75. Ensure the project avoids using redundant imports, such as importing everything from React, when it's sufficient to import only the necessary hooks, for example.
- [ ] 76. Ensure accessibility for **users**, **developers** (both beginners and experts), **bots** (like [Googlebot](https://developers.google.com/search/docs/crawling-indexing/googlebot) or [PageSpeed Insights Crawler](https://pagespeed.web.dev)), for **everyone**.
- [ ] 77. Enhance `middleware.ts` configuration with multi-middleware implementation.
- [ ] 78. Employ all relevant [TanStack](https://tanstack.com) libraries.
- [ ] 79. Eliminate each disabling in the `.eslintrc.cjs` file, configure config to strict, but to be still beginner-friendly.
- [ ] 80. Elegantly configure `app.ts`, offering a single config to replace all possible others.
- [ ] 81. Develop workflows for both sellers and customers.
- [ ] 82. Develop an even more sophisticated implementation of user subscriptions and the checkout system via Stripe; and also write Jest/Ava tests for Stripe and use `.thing/hooks/stripe_*.json` [webhookthing](https://docs.webhookthing.com) data files for these tests.
- [ ] 83. Develop an advanced storefront featuring products, categories, and subcategories.
- [ ] 84. Develop an advanced 404 Not Found page with full internationalization support.
- [ ] 85. Develop advanced sign-up, sign-in, and restoration using email-password and magic links.
- [ ] 86. Decrease file count by merging similar items, etc.
- [ ] 87. Create the most beginner-friendly and aesthetically pleasing starter possible.
- [ ] 88. Create an advanced notification system, inclusive of toasters, pop-ups, and pages.
- [ ] 89. Create a new landing page with a distinctive design and update components, plus fully redesign all other pages and components.
- [ ] 90. Consider adding Facebook's [StyleX](https://stylexjs.com/blog/introducing-stylex). However, StyleX currently requires setting up Babel/Webpack in the project, which we avoid to maintain full Turbopack support. As a suitable alternative, consider jjenzz's [Tokenami](https://github.com/tokenami/tokenami#readme) or Chakra's [Panda CSS](https://panda-css.com). Possibly, we can make a choice between them all while bootstrapping the project with Reliverse CLI. These libraries help with avoiding the deprecated [initial idea](https://stylexjs.com/blog/introducing-stylex/#the-origins-of-stylex) for [CSS-in-JS](https://medium.com/dailyjs/what-is-actually-css-in-js-f2f529a2757). Learn more [here](https://github.com/reactwg/react-18/discussions/110) and in [Next.js docs](https://nextjs.org/docs/app/building-your-application/styling/css-in-js).
- [ ] 91. Confirm the project is free from duplicates, like files, components, etc.
- [ ] 92. Conduct useful tests, including possible stress tests, to simulate and assess app performance under high-traffic conditions.
- [ ] 93. Comprehensively configure Next.js 14 App Router, with API routes managed by Route Handlers, including the RSCs and all other new features.
- [ ] 94. Complete the BA11YC (Bleverse Accessibility Convention) checklist; which may relay on the following principle in the future: [DesignPrototype](https://uiprep.com/blog/ultimate-guide-to-prototyping-in-figma)-[CodePrototype](https://medium.com/@joomiguelcunha/the-power-of-prototyping-code-55f4ed485a30)-CodeTests-HqDesign-[TDD](https://en.wikipedia.org/wiki/Test-driven_development)-HqCode-[CI](https://en.wikipedia.org/wiki/CI/CD).
- [ ] 95. Complete parts of the [BA11YC (Bleverse Accessibility Convention) checklist](https://github.com/bs-oss/BA11YC). This includes using software [Design Patterns](https://refactoring.guru/design-patterns/what-is-pattern) for code refactoring.
- [ ] 96. Check all components with side-effects for re-rendering, it is recommended to re-render each component a maximum of 2 times ([good video about it (in Ukrainian)](https://youtu.be/uH9uMH2e5Ts)).
- [ ] 97. Boost app performance scores on platforms like Google PageSpeed Insights. Ensure the app passes all rigorous tests.
- [ ] 98. Apply the [next-usequerystate](https://github.com/47ng/next-usequerystate) library where appropriate ([read the article](https://francoisbest.com/posts/2023/storing-react-state-in-the-url-with-nextjs)).
- [ ] 99. All third-party libraries and React components should be appropriately isolated. This includes verifying data from these libraries, such as Clerk, and wrapping the components with the "use client" directive as necessary.
- [ ] 100. Add a reviews section to the landing page. Obtain feedback on Relivator from five widely recognized individuals on the web.
- [ ] 101. Add an admin dashboard that includes stores, products, orders, subscriptions, and payments.
- [ ] 102. Add global color variables to all places where they are applied, instead of having hardcoded colors.
- [ ] 103. Add pop-ups for cookies/GDPR notifications (with a respective management settings page), and Google floating notifications for quick login, etc.
- [ ] 104. Add some interesting and useful types to the project, for example, using the [type-fest](https://github.com/sindresorhus/type-fest) library.
- [ ] 105. Add the integration of a smart git-hooks system with various additional useful functionality.
- [ ] 106. Add the most valuable and useful ESLint things from [awesome-eslint](https://github.com/dustinspecker/awesome-eslint) collection.

![Relivator Landing Page Screenshot](/public/screenshot.png)

🌐 [https://relivator.bleverse.com](https://relivator.bleverse.com)

## Project Commands

- **`pnpm db:studio`**: This command runs the Drizzle Studio on the <https://local.drizzle.studio> path.
- **`pnpm stripe:listen`**: This command runs the Stripe webhook listener and assists in setting up Stripe environment variables. You may need to have the [Stripe CLI](https://stripe.com/docs/stripe-cli) installed to run this command.
- **`pnpm latest`**: This command updates all project packages to their latest stable versions and updates tRPC to the most recent version on the next branch. This ensures we have the newest versions of TanStack Query v5.
- **`pnpm up-next:canary`**: This command updates Next.js and React to the latest versions available on their canary branches. Use this only if you are certain about its necessity.
- **`pnpm appts`**: This command performs a comprehensive check of the codebase. It sequentially executes `pnpm typecheck` to identify any TypeScript errors, `pnpm format` to format the code with Prettier (and/or with Biome — coming soon), `pnpm lint` for code linting with EsLint (most of rules in `eslint.config.ts` are disabled by default, just enable what you need) (and/or with Biome — coming soon). **NOTE**: Linting can be time-consuming, so please be patient. The command also runs `pnpm test` to check Jest tests, and finally, it executes `pnpm build`. _Thats okay if you see Clerk's warnings_ when executing `pnpm build`, this is a known issue not related to Relivator.

## Details About the Project

[![Join the Relivator Discord](https://discordapp.com/api/guilds/1075533942096150598/widget.png?style=banner2)][bleverse-discord]

We've laid the foundation—now it's your turn to dive in and speed up your development. And, yes, have **fun—think of Relivator as a sandbox**! It's like Minecraft; you can build anything with Relivator, as your creativity has no limits! Explore everything new with Next.js 14 and with many web things right here, right now—with Relivator.

You can even think of Relivator as a Next.js framework! So, finally, just grab it and enjoy! And, don’t forget: your feedback and stars mean the world to us. Smash that star button! Fork it! Your involvement lifts the project to new heights! If you have coding skills, your contributions are always welcome!

Run into issues? Join our repository discussions, open an issue, or DM us on: [Twitter/𝕏](https://x.com/blefnk), [Discord](https://discord.gg/Pb8uKbwpsJ), [Fiverr](https://fiverr.com/blefnk), [LinkedIn](https://linkedin.com/in/blefnk), or [Facebook](https://facebook.com/blefnk).

This project has big plans and we value all the help we can get! If you’re keen to make your own commits, check out the Project Roadmap above to see potential enhancements for the project. Also, use `Cmd/Ctrl+Shift+F` in VSCode and search for `todo:` to find spots that need attention. Please visit the **[Commits](https://github.com/blefnk/relivator/issues)** tab for more opportunities to assist.

**🔥 We're Growing Fast! A Huge Thanks to [All Our Supporters](https://github.com/blefnk/relivator/stargazers)! Check Out Our Star History:**

[![Star History Chart](https://api.star-history.com/svg?repos=blefnk/relivator&type=Date)](https://star-history.com/#blefnk/relivator&Date)

> **Note**
> Striving to be highly useful, this README contains a lot of information. Some text may be outdated and will be updated as we grow. Please let us know on the [discussion page](https://github.com/blefnk/relivator/discussions/6) if you spot any small issues like outdated info, broken links, or grammatical/spelling errors in README.md or other files.

_Hint: This README.md is translated into these languages (may be outdated):_ [Polish](https://github.com/blefnk/relivator/blob/main/.github/translations/polish.md), [Ukrainian](https://github.com/blefnk/relivator/blob/main/.github/translations/ukrainian.md).

## Environment Variables (`.env` file)

**Refer to the [`.env.example`](https://github.com/blefnk/relivator/blob/main/.env.example) file as your guide. Simply copy data from it to a new `.env` file.**

The `DATABASE_URL`, `NEXT_PUBLIC_DB_PROVIDER`, and `NEXT_PUBLIC_AUTH_PROVIDER` environment variables are mandatory; others are optional. You're welcome to deploy the application as-is, but ensure you verify what's necessary. Though the application will run without certain variables, missing ones may deactivate specific features.

Ensure that default values are defined for essential environment variables. Never store secrets in the `.env.example` file. For newcomers or repo cloners, use `.env.example` as a template to create your `.env` file, ensuring it’s never committed. Update the schema in `/src/env.mjs` when adding new variables.

Further [information about environment variables is available here](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).

_A cleaner and improved version of this section is coming soon. Keep an eye out!_

In the 1.1.0 Relivator release, the `.env.example` file was greatly simplified and will be streamlined even further in upcoming versions. We aim to ensure that unspecified values will simply deactivate related functionality without halting app compilation.

## Stripe Payments

Refer to the [`.env.example`](https://github.com/blefnk/relivator/blob/main/.env.example) file as your guide where and how to get all the important environment variable keys for Stripe, including webhooks both for localhost and deployment.

Locally, install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run the command `pnpm stripe:listen` to initiate the Stripe webhook listener. This action connects Stripe to your account and generates a webhook key, which you can then set as an environment variable in Stripe's settings.

When testing Stripe, you can use its test data: `4242424242424242` | `12/34` | `567` | `Random Name` | `Random Country`.

Please refer to [src/app/api/webhooks/stripe/route.ts](https://github.com/blefnk/relivator/blob/main/src/app/api/webhooks/stripe/route.ts) file to learn more in the deep details how Stripe things work in the app. You can also visit the [official Stripe repository](https://github.com/stripe/stripe-node#readme), where you'll find a lot of useful information.

## Database Support

Relivator is designed to effortlessly support both `MySQL` and `PostgreSQL` databases. Although it comes with MySQL and [PlanetScale](https://planetscale.com) configured as the default database provider, switching to PostgreSQL provided by [Neon](https://neon.tech)/[Vercel](https://vercel.com/storage/postgres)/[Railway](https://railway.app) — is really simple as pie. To do so, just update the `NEXT_PUBLIC_DB_PROVIDER` key in your `.env` file to `neon`/`vercel`/`railway` accordingly. While Relivator is optimized for these providers, any others compatible with Drizzle and NextAuth.js might also work, though they may require some additional setup.

To initiate a new database or propagate schema changes, execute the `pnpm mysql:push` or `pnpm pg:push` command. This ensures that all drafts made to the schema files—found under `src/data/db/*`—are mirrored in your selected database provider.

For database migrations, utilize the `mysql:generate`/`pg:generate`, review the `drizzle` folder to ensure everything correct (execute `db:drop` if not), and run the `pnpm:migrate` command when you are ready.

Ensure you do not manually delete files from the `drizzle` directory. If a migration needs to be reversed, employ the [`pnpm db:drop` command](https://orm.drizzle.team/kit-docs/commands#drop-migration) to manage this in a controlled way.

In the release of Relivator v1.1.0, we made our best efforts to provide simultaneous support for both MySQL and PostgreSQL for the Drizzle ORM. In future releases, we aim to integrate Prisma ORM to this project as well. Thanks to it, the project will be even more inclusive to everyone.

By default we ensure that every database system has everything the same by using `NEXT_PUBLIC_DB_PROVIDER` env variable and by exporting things in the `src/data/db/index.ts` file. When you decide which database provider is best suit your needs, you can safely comment out or remove unneeded providers in the `switch-case` of this file, then related schema files can be removed as well; note that some small additional work may be also required.

### Additional Notes About Stripe

The Stripe webhook API route does not need to be invoked explicitly within your application, such as after a user selects a subscription plan or makes a purchase. Webhooks operate independently of user actions on the frontend and serve as a means for Stripe to relay events directly to your server.

When an event occurs on Stripe's end, such as a successful payment, Stripe generates an event object. This object is then automatically sent to the endpoint you've specified, either in your Stripe Dashboard or, for testing purposes, in your `package.json` via the Stripe CLI. Finally, your server's API route receives the event and processes it accordingly.

For example, when a user selects a subscription plan, you would typically first use Stripe's API to create either a `Payment Intent` or `Setup Intent` object. This action can be executed either on the client-side or the server-side. The frontend then confirms the payment using Stripe.js, thereby completing the payment or subscription setup process.

Your webhook is automatically triggered based on these events. There's no need to manually "call" the webhook route; Stripe manages this for you according to your settings in the Stripe Dashboard or in your `package.json` for local testing.

After deploying your app, don't forget to specify the webhook URL in your Stripe Dashboard. Navigate to the Webhooks section and enter the following URL: `https://yourdomain.com/api/webhooks/stripe`.

In summary, there's no need to specify the path to your Stripe API route where the user selects a subscription plan. The webhook mechanism operates independently and is triggered automatically by Stripe.

## Internationalization

_Stay tuned for further expansions to this section in the future._

Multilingualism at Bleverse is revered. We adore discussing it and plan to delve into the topic of Next.js 14 App Router internationalization in future writings.

Presently, all languages are machine-translated. Future revisions by native speakers are planned. Note that i18n messages from another one of our open-source projects are currently present and will be removed shortly.

_Currently not available._ Use `pnpm lint:i18n` to verify your i18n files. The tool attempts to rectify issues when possible, offering features like ascending sort. No output means everything is in order.

We are using _next-intl_ for internationalization. Sometime we can use beta/rc versions as needed. Find more information about it [here](https://next-intl-docs.vercel.app/blog/next-intl-3-0) and [here](https://github.com/amannn/next-intl/pull/149).

### How to add a new language

_The process described below will be simplified and automated in the future. Please let us know if you have any further questions regarding the current process for adding languages._

1. We will need an [i18n code](https://saimana.com/list-of-country-locale-code/) (in the format `language-country`; the language code alone is sufficient, but it's not optimal for SEO). For example, let's take Chinese, for which I know the codes _zh-cn/zh-tw/zh-hk_ are used.
2. Open the `src/data/i18n` folder and create a `zh-cn.json` file with the example content: `{ "landing": { "heading": "建立更高效、更吸引人且更有利可图的在线商店：使用 Relivator" } }`.
3. Now open `src/i18n.ts` and add `"zh-cn": zh_cn` with the appropriate `import` at the top.
4. In the file `src/navigation.ts`, add the corresponding values to `locales` and `labels`.
5. Run `pnpm dev` and review the landing page header. If it appears correctly, you're ready to go.
6. Optionally, I recommend using the VSCode extension [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally), which makes machine translation easy.
7. Also optionally, install [specific CSpell language](https://github.com/streetsidesoftware/cspell-dicts#language-dictionaries) for full support of this language in VSCode (when using the "[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)" extension). If your language is not available, try to find a word dictionary file on the web or make one yourself (see CSpell docs).

By the way, **if the country flag is not displayed**: open `src/localization-main.tsx`, go to _LocaleFlagIcon_ and add your `else if`. Please visit the [flag-icons library website](https://flagicons.lipis.dev/) to see the code for the missing icon. The example for _zh-cn_ will be: `} else if (baseLocale === "zh") { return <span aria-hidden="true" className="fi fi-cn mr-2" />; }`

Please be aware that both the "i18n Ally" VSCode extension and manual systems like "Google Translate" may incorrectly translate variables. If you encounter an error like this:
Original Message: 'The intl string context variable "类别" was not provided to the string "购买最好的{类别}"'.
This error occurs because we have {类别}, but it should be {category}. To verify the correct variable, refer to the en-us.json file.Certainly! Here's a grammatically corrected version of your text:

Please be aware that both the "i18n Ally" VSCode extension and manual systems like "Google Translate" may incorrectly translate variables. If you encounter an error like this:
Original Message: 'The intl string context variable "类别" was not provided to the string "购买最好的{类别}"'.
This error occurs because we have {类别}, but it should be {category}. To verify the correct variable, refer to the en-us.json file.
So the correct version for this specific case will be:

```txt
"categories": {
  "buyProducts": "购买 ${category} 类别的产品",
  "buyFromCategories": "从最好的商店购买 {category}",
  "buyTheBest": "购买最好的 {category}"
},
```

**Currently supported locales (you can add your own manually):**

de-DE, en-US, es-ES, fa-IR, fr-FR, hi-IN, it-IT, pl-PL, tr-TR, uk-UA.

## Principles, Design Decisions, Code Insights, Recommendations

_We're continuously improving this section. Contributions are welcomed!_

Our starter aims to be a rich resource for developers at all stages of their journey. Within the comment blocks and dedicated sections at the end of select files, you'll find valuable insights and clarifications on a wide array of topics. Your contributions to enhancing these educational nuggets are highly encouraged!

**Principles (W.I.P):**

- [ ] Every file and component should be built consciously, by using [KISS/DRY/SOLID/YAGNI principles](https://blog.openreplay.com/applying-design-principles-in-react), with a certain sense of intelligence, with performance in mind.
- [ ] We need to think of the project as if it were a planet with its own continents, countries, cities, rooms, individuals, entities etc.

**Highly-Recommended VSCode Extensions:**

1. [Better Comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
2. [Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
3. [Error Lens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
4. [ESLint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
5. [GitHub Copilot](https://marketplace.visualstudio.com/items?itemName=GitHub.copilot)
6. [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally)
7. [JavaScript and TypeScript Nightly](https://marketplace.visualstudio.com/items?itemName=ms-vscode.vscode-typescript-next)
8. [Markdown All in One](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
9. [markdownlint](https://marketplace.visualstudio.com/items?itemName=DavidAnson.vscode-markdownlint)
10. [POP! Icon Theme](https://marketplace.visualstudio.com/items?itemName=mikekscholz.pop-icon-theme)
11. [Prettier—Code formatter](https://marketplace.visualstudio.com/items?itemName=esbenp.prettier-vscode)
12. [Pretty TypeScript Errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
13. [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
14. [TailwindCSS Tune](https://marketplace.visualstudio.com/items?itemName=omkarbhede.tailwindcss-tune)
15. [TypeScript Essential Plugins](https://marketplace.visualstudio.com/items?itemName=zardoy.ts-essential-plugins)

<details>
  <summary>Why "TypeScript Essential Plugins" is Recommended</summary>

«Feature-complete TypeScript plugin that improves every single builtin feature such as completions, definitions, references and so on, and also adds even new TypeScript killer features, so you can work with large codebases faster! We make completions more informative. Definitions, references (and sometimes even completions) less noisy. And finally our main goal is to provide most customizable TypeScript experience for IDE features.» © [VSCode Extension Repository](https://github.com/zardoy/typescript-vscode-plugins#readme)

Note: You can configure extension settings by opening VSCode Settings UI and searching for `@ext:zardoy.ts-essential-plugins` there.

</details>

**Advanced Environment Variables:**

The `.env.example` file covers all the essential variables for a fully functional website, tailored for beginners. However, if you require advanced configurations, you can modify any value in `.env` file as needed.

**About the Plugins Folder:**

This folder contains optional plugins for Relivator. Developed by @blefnk and other contributors, these plugins extend functionality and provide additional features. If you find that certain plugins are not beneficial for your project, feel free to remove their corresponding folders.

**Function Over Const for Components:**

We advocate the use of the `function` keyword instead of `const` when defining React components. Using `function` often improves stack traces, making debugging easier. Additionally, it makes code semantics more explicit, thereby making it easier for other developers to understand your intentions.

**Personal Recommendations:**

We advise regularly clearing your browser cache and deleting the `.next` folder to ensure optimal performance and functionality.

Currently, we don’t utilize Contentlayer due to its instability with Windows. Therefore, we're exploring options for its usage in the `.env` configuration file. Future plans might involve developing our own solution for content writing. Integration with external providers, such as Sanity, may also be a future feature, with corresponding enable/disable options.

**Project Configuration:**

The `src/app.ts` file hosts critical configurations to modify website contents and settings, enabling you to:

- Control the content presented on the website.
- Adjust various settings, such as deactivating the theme toggle.
- Manage generic site-wide information.

Customize this file as per your requirements.

**Authentication:**

Setting up authentication is straightforward.

You can configure available sign-in providers for Clerk in the `src/app.ts` file.

Please remember that Clerk fully works with third-party services like "Google PageSpeed Insight" only when domain and live keys are used.

_This section will be implemented soon._

**How to Deploy the Project:**

Please check the _How to Install and Get Started_ section before making the initial deployment.

Consult the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify), and [Docker](https://create.t3.gg/en/deployment/docker) for further details. The project has only been tested on Vercel; please inform us if you encounter issues with other deployment services.

**Styling, Design System, UI Components:**

TODO: Implement design system and style guide.

By default, this project includes components from various libraries, as well as unstyled [shadcn/ui](https://ui.shadcn.com) components. Shadcn/ui even allows you to generate new UI components using its CLI (where "button" can be any Shadcn UI element): `pnpm dlx shadcn-ui@latest add button`.

W.I.P. — Use `pnpm css` to watch for [CSS tokens](https://blog.devgenius.io/link-figma-and-react-using-figma-tokens-89e6cc874b4d) in accordance with the project's design system. [Tokenami](https://github.com/tokenami/tokenami#readme) and Figma are anticipated to be utilized for this concept. For additional information, refer to points #33 and #90 in the Relivator's Roadmap.

**Bun Things Compatibility:**

`Relivator` can already harness some fantastic **[`Bun`](https://bun.sh)** features. For this starter, we currently recommend using `pnpm`. Full Bun support and compatibility will be shipped as soon as Windows binaries are available. _Section expansion coming soon._

**Typical App Workflow (Coming Soon):**

A comprehensive guide detailing the typical application workflow will be implemented soon. For now, here's a quick overview:

1. _Run Development Server_: `pnpm dev`
2. _Environment Configuration_: `.env`
3. _Middleware Setup_: `middleware.ts`
4. _Additional Steps_: Stay tuned...

**FAQ (Frequently Asked Questions):**

_Q:_ How to grant admin rights to myself or to another user?
_A:_ Just run `pnpm db:studio`, navigate to the `acme_user` table and set `role: admin` for the user you need. In the future, if you have admin rights, you will be able to change the user privilegies of selected users directly from the frontend admin page.

_Q:_ What does the `DEV_DEMO_NOTES` environment variable mean?
_A:_ Just don't use it. It is used only on the official [Relivator demo website](https://relivator.bleverse.com) to showcase certain features that are not needed in real-world applications.

_Q:_ I'm using PlanetScale as my database provider. After taking a break from the project, I'm now encountering "unable to connect to branch" error in the console. How can I fix this?
_A:_ Simply go to the PlanetScale dashboard and click on the `wake up` button. Please contact us in case if your database is not asleep and the problem still persists.

**Recommended Things to Learn:**

1. [Introduction to Next.js and React](https://youtube.com/watch?v=h2BcitZPMn4) by [Lee Robinson](https://twitter.com/leeerob)
2. [Relivator: Next.js 14 Starter (Release Announce of Relivator on Medium)](https://cutt.ly/awf6fScS) by [Nazarii Korniienko @Blefnk](https://github.com/blefnk)
3. [Welcome to the Wild World of TypeScript, Mate! Is it scary?](https://cutt.ly/CwjVPUNu) by [Nazarii Korniienko @Blefnk](https://github.com/blefnk)
4. [React: Common Mistakes in 2023](https://docs.google.com/presentation/d/1kuBeSh-yTrL031IlmuwrZ8LvavOGzSbo) by [Cory House](https://twitter.com/housecor)
5. [Thoughts on Next.js 13, Server Actions, Drizzle, Neon, Clerk, and More](https://github.com/Apestein/nextflix/blob/main/README.md#overall-thoughts) by [@Apestein](https://github.com/Apestein)
6. [Huge Next-Multilingual Readme About i18n](https://github.com/Avansai/next-multilingual#readme) by [@Avansai](https://github.com/Avansai)
7. [Applying Design Principles in React](https://blog.openreplay.com/applying-design-principles-in-react) by [Jeremiah (Jerry) Ezekwu](<https://blog.openreplay.com/authors/jeremiah-(jerry)-ezekwu/>)
8. [The Power of Prototyping Code](https://medium.com/@joomiguelcunha/the-power-of-prototyping-code-55f4ed485a30) by [João Miguel Cunha](https://medium.com/@joomiguelcunha)
9. [Software Prototyping](https://en.wikipedia.org/wiki/Software_prototyping) on Wikipedia
10. [TDD: Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) on Wikipedia
11. [React 18 Discussions](https://github.com/reactwg/react-18/discussions) by [React Working Group](https://github.com/reactwg)

_More learning resources can be found within the files of this repository._

## Migration from Other Starters to Relivator

If you've been exploring which Next.js starter to select for your next project like [create-next-app](https://vercel.com/templates/next.js/nextjs-boilerplate), [create-t3-app](https://create.t3.gg), [Next.js Commerce (Vercel Store)](https://vercel.store), [Skateshop](https://github.com/sadmann7/skateshop), [OneStopShop](https://github.com/jackblatch/OneStopShop), [Taxonomy](https://github.com/shadcn-ui/taxonomy)/[nextflix](https://github.com/Apestein/nextflix), [payload](https://github.com/payloadcms/payload), [Medusa](https://github.com/medusajs/medusa), or [any other projects](https://github.com/blefnk/relivator/wiki/Project-Credits-&-Contributors) – your search can end here.

_«There are a lot of impractical things about owning a ~~Porsche~~ Relivator. But they're all offset by the driving experience. It really is unique. ~~Lamborghinis~~ Skateshop and ~~Ferraris~~ Vercel Store come close. And they are more powerful in specific cases, but they don't handle like a ~~Porsche~~ Relivator.» © Kevin O'Leary_

All these projects are incredible, and if minimalism appeals to you, we recommend checking them out. The creators behind these projects are extremely talented individuals, and we offer them our endless thanks. Without them, this starter would not exist.

However, **if you want a POWERHOUSE**—Relivator suitable for every scenario—then **Relivator is definitely the starter you need** to fork it right now! Relivator incorporates numerous features from all those projects and strives to push the limits of Next.js and React capabilities. With Relivator, your opportunities are boundless.

If you **choose Relivator to be your next project starter** and you want to migrate from the projects above to Relivator, then please give us a few days. We will use the project wiki to write there guide how to do this. In this guide you will learn how to migrate your project to our project. Migration guide will be available for both "app" and "pages" directories.

## Contributing and Credits

_This section will be enhanced soon with simpler steps to get everything ready._

Contributions are warmly welcomed! We express our gratitude to everyone who has contributed to this repository. Your contributions will be recognized. If you have any questions or suggestions, please open an issue. For more information, see the [contributing guide](https://github.com/blefnk/relivator/blob/main/contributing.md).

Please visit [this special wiki page](https://github.com/blefnk/relivator/wiki/Project-Credits-&-Contributors) to view the full list of credits and contributors. To contribute to Bleverse Relivator, follow these steps:

1. Begin by reading the "How to Install and Get Started" section on the top of this repository, and by reading [CONTRIBUTING.md](https://github.com/blefnk/relivator/blob/main/contributing.md) page.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make and commit your changes: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <branch_name>`
5. Submit the pull request.

Alternatively, check the GitHub docs on [how to create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Project License

This project is licensed under MIT and is free to use and modify for your own projects. Check the [LICENSE.md](https://github.com/blefnk/relivator/LICENSE.md) file for details.

🌐 [https://relivator.bleverse.com](https://relivator.bleverse.com)

---

**Follow Us Everywhere:** [GitHub](https://github.com/blefnk) | [Twitter/𝕏](https://x.com/blefnk) | [Discord](https://discord.gg/Pb8uKbwpsJ) | [Fiverr](https://fiverr.com/blefnk) | [LinkedIn](https://linkedin.com/in/blefnk) | [Facebook](https://facebook.com/blefnk)

This Next.js 14 starter—Relivator—was crafted with love by [@blefnk Nazarii Korniienko](https://github.com/blefnk), and by the incredible [Bleverse OSS community](https://github.com/blefnk/relivator/wiki/Project-Credits-&-Contributors). We are deeply grateful for all the contributions and support provided by everyone for this project.

_«I couldn't find the ~~sports car~~ Next.js starter of my dreams, so I built it myself.» © Ferdinand Porsche_

---

Happy coding! Embark on your coding adventure, learn, iterate, and most importantly – enjoy the process! Remember – this is a space of learning and experimentation. Dive in and savor the journey! 🚀🌌

![Bleverse Relivator OG Image](/public/og-image.png)

Check out [our other free Next.js 14 starter](https://github.com/blefnk/reliverse). This one, a monorepo, provides the tech used in the current starter and adds: Turborepo/Turbopack, Prisma, Valibot, Lucia, Clerk, and much more, as we experimentally attempt to combine all vital and widely-used tech. It's like thinking about: Reliverse (WordPress) + Relivator (WooCommerce) = 😍.

[bleverse-discord]: https://discord.gg/Pb8uKbwpsJ

---

<details>
  <summary>Relivator v1.2.0: Table of Dependencies</summary>

| Unsorted Packages                            | Radix/Udecode                       | ESLint Plugins                         | React/Next                  | CSpell                      | Types                 |
| -------------------------------------------- | ----------------------------------- | -------------------------------------- | --------------------------- | --------------------------- | --------------------- |
| 1. @auth/core                                | 2. @radix-ui/react-accordion        | 3. eslint-plugin-drizzle               | 4. next-auth                | 5. @cspell/dict-companies   | 6. @types/mdx         |
| 7. @auth/drizzle-adapter                     | 8. @radix-ui/react-alert-dialog     | 9. eslint-plugin-deprecation           | 10. next-international      | 11. @cspell/dict-de-de      | 12. @types/jest       |
| 13. @clerk/clerk-react                       | 14. @radix-ui/react-aspect-ratio    | 15. eslint-plugin-format               | 16. next-intl               | 17. @cspell/dict-es-es      | 18. @types/lodash     |
| 19. @clerk/localizations                     | 20. @radix-ui/react-avatar          | 21. eslint-plugin-functional           | 22. next-safe-action        | 23. @cspell/dict-fr-fr      | 24. @types/negotiator |
| 25. @clerk/nextjs                            | 26. @radix-ui/react-checkbox        | 27. eslint-plugin-import               | 28. next-themes             | 29. @cspell/dict-fullstack  | 30. @types/node       |
| 31. @clerk/themes                            | 32. @radix-ui/react-dialog          | 33. eslint-plugin-jest                 | 34. next-usequerystate      | 35. @cspell/dict-it-it      | 36. @types/pg         |
| 37. @clerk/types                             | 38. @radix-ui/react-dropdown-menu   | 39. eslint-plugin-jest-extended        | 40. react-aria-components   | 41. @cspell/dict-markdown   | 42. @types/react      |
| 43. @faire/mjml-react                        | 44. @radix-ui/react-icons           | 45. eslint-plugin-jest-formatting      | 46. react-cropper           | 47. @cspell/dict-npm        | 48. @types/react-dom  |
| 49. @faker-js/faker                          | 50. @radix-ui/react-label           | 51. eslint-plugin-jsdoc                | 52. react-day-picker        | 53. @cspell/dict-pl_pl      |                       |
| 54. @formatjs/intl-localematcher             | 55. @radix-ui/react-menubar         | 56. eslint-plugin-jsonc                | 57. react-dom               | 58. @cspell/dict-tr-tr      |                       |
| 59. @gsap/react                              | 60. @radix-ui/react-navigation-menu | 61. eslint-plugin-jsx-a11y             | 62. react-dropzone          | 63. @cspell/dict-typescript |                       |
| 64. @hookform/resolvers                      | 65. @radix-ui/react-popover         | 66. eslint-plugin-no-barrel-files      | 67. react-hook-form         | 68. @cspell/dict-fa-ir      |                       |
| 69. @inquirer/prompts                        | 70. @radix-ui/react-scroll-area     | 71. eslint-plugin-no-secrets           | 72. react-hot-toast         | 73. @cspell/dict-uk-ua      |                       |
| 74. @lemonsqueezy/lemonsqueezy.js            | 75. @radix-ui/react-select          | 76. eslint-plugin-promise              | 77. react-icons             |                             |                       |
| 78. @liveblocks/client                       | 79. @radix-ui/react-separator       | 80. eslint-plugin-react                | 81. react-lag-radar         |                             |                       |
| 82. @liveblocks/react                        | 83. @radix-ui/react-slider          | 84. eslint-plugin-react-hooks          | 85. react-medium-image-zoom |                             |                       |
| 86. @loglib/tracker                          | 87. @radix-ui/react-slot            | 88. eslint-plugin-react-refresh        | 89. react-wrap-balancer     |                             |                       |
| 90. @mdx-js/loader                           | 91. @radix-ui/react-switch          | 92. eslint-plugin-redundant-undefined  | 93. next-secure-headers     |                             |                       |
| 94. @mdx-js/react                            | 95. @radix-ui/react-tabs            | 96. eslint-plugin-sonarjs              |                             |                             |                       |
| 97. @neondatabase/serverless                 | 98. @radix-ui/react-toast           | 99. eslint-plugin-tailwindcss          |                             |                             |                       |
| 100. @next/mdx                               | 101. @radix-ui/react-tooltip        | 102. eslint-plugin-tsdoc               |                             |                             |                       |
| 103. @normy/react-query                      | 104. @udecode/cn                    | 105. eslint-plugin-unicorn             |                             |                             |                       |
| 106. @planetscale/database                   | 107. @udecode/plate-autoformat      | 108. eslint-plugin-write-good-comments |                             |                             |                       |
| 109. @preact/signals-core                    | 110. @udecode/plate-basic-marks     | 111. eslint-plugin-xss                 |                             |                             |                       |
| 112. @preact/signals-react                   | 113. @udecode/plate-block-quote     |                                        |                             |                             |                       |
| 114. @react-rxjs/core                        | 115. @udecode/plate-break           |                                        |                             |                             |                       |
| 116. @react-rxjs/utils                       | 117. @udecode/plate-code-block      |                                        |                             |                             |                       |
| 118. @redux-devtools/extension               | 119. @udecode/plate-common          |                                        |                             |                             |                       |
| 120. @storybook/nextjs                       | 121. @udecode/plate-heading         |                                        |                             |                             |                       |
| 122. @stripe/react-stripe-js                 | 123. @udecode/plate-highlight       |                                        |                             |                             |                       |
| 124. @stripe/stripe-js                       | 125. @udecode/plate-horizontal-rule |                                        |                             |                             |                       |
| 126. @t3-oss/env-nextjs                      | 127. @udecode/plate-indent-list     |                                        |                             |                             |                       |
| 128. @tanstack/react-query                   | 129. @udecode/plate-link            |                                        |                             |                             |                       |
| 130. @tanstack/react-query-devtools          | 131. @udecode/plate-list            |                                        |                             |                             |                       |
| 132. @tanstack/react-query-next-experimental | 133. @udecode/plate-media           |                                        |                             |                             |                       |
| 134. @tanstack/react-table                   | 135. @udecode/plate-node-id         |                                        |                             |                             |                       |
| 136. @trpc/client                            | 137. @udecode/plate-normalizers     |                                        |                             |                             |                       |
| 138. @trpc/react-query                       | 139. @udecode/plate-paragraph       |                                        |                             |                             |                       |
| 140. @trpc/server                            | 141. @udecode/plate-reset-node      |                                        |                             |                             |                       |
| 142. @uploadthing/react                      | 143. @udecode/plate-select          |                                        |                             |                             |                       |
| 144. @upstash/ratelimit                      | 145. @udecode/plate-table           |                                        |                             |                             |                       |
| 146. @upstash/redis                          | 147. @udecode/plate-trailing-block  |                                        |                             |                             |                       |
| 148. @vercel/analytics                       |                                     |                                        |                             |                             |                       |
| 149. axios                                   |                                     |                                        |                             |                             |                       |
| 150. browserslist                            |                                     |                                        |                             |                             |                       |
| 151. class-variance-authority                |                                     |                                        |                             |                             |                       |
| 152. clsx                                    |                                     |                                        |                             |                             |                       |
| 153. cmdk                                    |                                     |                                        |                             |                             |                       |
| 154. cookies-next                            |                                     |                                        |                             |                             |                       |
| 155. cropperjs                               |                                     |                                        |                             |                             |                       |
| 156. dat.gui                                 |                                     |                                        |                             |                             |                       |
| 157. dayjs                                   |                                     |                                        |                             |                             |                       |
| 158. drizzle-orm                             |                                     |                                        |                             |                             |                       |
| 159. drizzle-zod                             |                                     |                                        |                             |                             |                       |
| 160. embla-carousel-react                    |                                     |                                        |                             |                             |                       |
| 161. eslint-config-next                      |                                     |                                        |                             |                             |                       |
| 162. flag-icons                              |                                     |                                        |                             |                             |                       |
| 163. fuse                                    |                                     |                                        |                             |                             |                       |
| 164. graphql                                 |                                     |                                        |                             |                             |                       |
| 165. graphql-scalars                         |                                     |                                        |                             |                             |                       |
| 166. gsap                                    |                                     |                                        |                             |                             |                       |
| 167. healthier                               |                                     |                                        |                             |                             |                       |
| 168. international-types                     |                                     |                                        |                             |                             |                       |
| 169. lodash                                  |                                     |                                        |                             |                             |                       |
| 170. lucide-react                            |                                     |                                        |                             |                             |                       |
| 171. mdx                                     |                                     |                                        |                             |                             |                       |
| 172. micro                                   |                                     |                                        |                             |                             |                       |
| 173. million                                 |                                     |                                        |                             |                             |                       |
| 174. negotiator                              |                                     |                                        |                             |                             |                       |
| 175. next                                    |                                     |                                        |                             |                             |                       |
| 176. nextjs-google-analytics                 |                                     |                                        |                             |                             |                       |
| 177. nodemailer                              |                                     |                                        |                             |                             |                       |
| 178. pg                                      |                                     |                                        |                             |                             |                       |
| 179. postgres                                |                                     |                                        |                             |                             |                       |
| 180. react                                   |                                     |                                        |                             |                             |                       |
| 181. reflect-metadata                        |                                     |                                        |                             |                             |                       |
| 182. remark-gfm                              |                                     |                                        |                             |                             |                       |
| 183. request-ip                              |                                     |                                        |                             |                             |                       |
| 184. resend                                  |                                     |                                        |                             |                             |                       |
| 185. rooks                                   |                                     |                                        |                             |                             |                       |
| 186. rxjs                                    |                                     |                                        |                             |                             |                       |
| 187. slate                                   |                                     |                                        |                             |                             |                       |
| 188. slate-history                           |                                     |                                        |                             |                             |                       |
| 189. slate-hyperscript                       |                                     |                                        |                             |                             |                       |
| 190. slate-react                             |                                     |                                        |                             |                             |                       |
| 191. storybook                               |                                     |                                        |                             |                             |                       |
| 192. string-ts                               |                                     |                                        |                             |                             |                       |
| 193. stripe                                  |                                     |                                        |                             |                             |                       |
| 194. superjson                               |                                     |                                        |                             |                             |                       |
| 195. tailwind-variants                       |                                     |                                        |                             |                             |                       |
| 196. tailwindcss-animate                     |                                     |                                        |                             |                             |                       |
| 197. ts-deepmerge                            |                                     |                                        |                             |                             |                       |
| 198. type-fest                               |                                     |                                        |                             |                             |                       |
| 199. type-graphql                            |                                     |                                        |                             |                             |                       |
| 200. uploadthing                             |                                     |                                        |                             |                             |                       |
| 201. vaul                                    |                                     |                                        |                             |                             |                       |
| 202. winston                                 |                                     |                                        |                             |                             |                       |
| 203. zod                                     |                                     |                                        |                             |                             |                       |
| 204. zustand                                 |                                     |                                        |                             |                             |                       |
| 205. @0no-co/graphqlsp                       |                                     |                                        |                             |                             |                       |
| 206. @antfu/eslint-config                    |                                     |                                        |                             |                             |                       |
| 207. @ava/typescript                         |                                     |                                        |                             |                             |                       |
| 208. @biomejs/biome                          |                                     |                                        |                             |                             |                       |
| 209. @bufbuild/jest-environment-jsdom        |                                     |                                        |                             |                             |                       |
| 210. @commitlint/cli                         |                                     |                                        |                             |                             |                       |
| 211. @commitlint/config-conventional         |                                     |                                        |                             |                             |                       |
| 212. @commitlint/types                       |                                     |                                        |                             |                             |                       |
| 213. @graphql-typed-document-node/core       |                                     |                                        |                             |                             |                       |
| 214. @ianvs/prettier-plugin-sort-imports     |                                     |                                        |                             |                             |                       |
| 215. @limegrass/eslint-plugin-import-alias   |                                     |                                        |                             |                             |                       |
| 216. @next/eslint-plugin-next                |                                     |                                        |                             |                             |                       |
| 217. @playwright/test                        |                                     |                                        |                             |                             |                       |
| 218. @tailwindcss/typography                 |                                     |                                        |                             |                             |                       |
| 219. @tanstack/eslint-plugin-query           |                                     |                                        |                             |                             |                       |
| 220. @testing-library/jest-dom               |                                     |                                        |                             |                             |                       |
| 221. @total-typescript/ts-reset              |                                     |                                        |                             |                             |                       |
| 222. @typescript-eslint/eslint-plugin        |                                     |                                        |                             |                             |                       |
| 223. @typescript-eslint/parser               |                                     |                                        |                             |                             |                       |
| 224. autoprefixer                            |                                     |                                        |                             |                             |                       |
| 225. ava                                     |                                     |                                        |                             |                             |                       |
| 226. cross-env                               |                                     |                                        |                             |                             |                       |
| 227. cspell                                  |                                     |                                        |                             |                             |                       |
| 228. dotenv-cli                              |                                     |                                        |                             |                             |                       |
| 229. drizzle-kit                             |                                     |                                        |                             |                             |                       |
| 230. eslint                                  |                                     |                                        |                             |                             |                       |
| 231. eslint-config-airbnb                    |                                     |                                        |                             |                             |                       |
| 232. eslint-config-prettier                  |                                     |                                        |                             |                             |                       |
| 233. eslint-import-resolver-typescript       |                                     |                                        |                             |                             |                       |
| 234. eslint-interactive                      |                                     |                                        |                             |                             |                       |
| 235. eslint-ts-patch                         |                                     |                                        |                             |                             |                       |
| 236. husky                                   |                                     |                                        |                             |                             |                       |
| 237. jest                                    |                                     |                                        |                             |                             |                       |
| 238. jest-environment-jsdom                  |                                     |                                        |                             |                             |                       |
| 239. jest-extended                           |                                     |                                        |                             |                             |                       |
| 240. jsonc-eslint-parser                     |                                     |                                        |                             |                             |                       |
| 241. knip                                    |                                     |                                        |                             |                             |                       |
| 242. lemonsqueezy.ts                         |                                     |                                        |                             |                             |                       |
| 243. lint-staged                             |                                     |                                        |                             |                             |                       |
| 244. markdown-it-shikiji                     |                                     |                                        |                             |                             |                       |
| 245. mysql2                                  |                                     |                                        |                             |                             |                       |
| 246. npm-check                               |                                     |                                        |                             |                             |                       |
| 247. npm-run-all2                            |                                     |                                        |                             |                             |                       |
| 248. postcss                                 |                                     |                                        |                             |                             |                       |
| 249. postcss-load-config                     |                                     |                                        |                             |                             |                       |
| 250. prettier                                |                                     |                                        |                             |                             |                       |
| 251. prettier-plugin-packagejson             |                                     |                                        |                             |                             |                       |
| 252. prettier-plugin-tailwindcss             |                                     |                                        |                             |                             |                       |
| 253. rehype-shikiji                          |                                     |                                        |                             |                             |                       |
| 254. shikiji                                 |                                     |                                        |                             |                             |                       |
| 255. standard                                |                                     |                                        |                             |                             |                       |
| 256. stylelint                               |                                     |                                        |                             |                             |                       |
| 257. stylelint-config-css-modules            |                                     |                                        |                             |                             |                       |
| 258. stylelint-config-standard               |                                     |                                        |                             |                             |                       |
| 259. stylelint-config-standard-scss          |                                     |                                        |                             |                             |                       |
| 260. stylelint-scss                          |                                     |                                        |                             |                             |                       |
| 261. tailwind-merge                          |                                     |                                        |                             |                             |                       |
| 262. tailwindcss                             |                                     |                                        |                             |                             |                       |
| 263. ts-jest                                 |                                     |                                        |                             |                             |                       |
| 264. ts-node                                 |                                     |                                        |                             |                             |                       |
| 265. ts-standard                             |                                     |                                        |                             |                             |                       |
| 266. tslib                                   |                                     |                                        |                             |                             |                       |
| 267. tsx                                     |                                     |                                        |                             |                             |                       |
| 268. typescript                              |                                     |                                        |                             |                             |                       |
| 269. xo                                      |                                     |                                        |                             |                             |                       |

</details>
