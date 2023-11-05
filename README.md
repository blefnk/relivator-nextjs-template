# Relivator: The Most Feature-Rich Next.js 14 Starter

<!-- https://github.com/blefnk/relivator#readme -->

🌐 [https://relivator.bleverse.com](https://relivator.bleverse.com)

We aim to create the world's most feature-rich and global Next.js starter. Offering more than just code—it's a journey. It's stable and ready for production. Scroll down and check out the breathtaking list of project features, including switching between Clerk/NextAuth.js and MySQL/PostgreSQL on the fly.

Each week, we grant early access to Relivator to 2 randomly selected individuals. Simply `star this repository` and [let us know how to contact you](https://forms.gle/NXZ6QHpwrxh52VA36). For discussions, join [the project Discord](https://discord.gg/Pb8uKbwpsJ).

## How to Install and Get Started

1. **Essential Tools**: Ensure that [_VSCode_](https://code.visualstudio.com), [_Git_](https://learn.microsoft.com/en-us/devops/develop/git/install-and-set-up-git), _GitHub Desktop_ ([Windows/macOS](https://desktop.github.com/) | [Linux](https://dev.to/rahedmir/is-github-desktop-available-for-gnu-linux-4a69)), and _Node.js LTS_ ([Windows/macOS](https://nodejs.org) | [Linux](https://youtu.be/NS3aTgKztis)) are installed.
2. **Project Cloning**: [_Create a new fork_](https://github.com/blefnk/relivator/fork) and use GitHub Desktop to download it.
3. **Configuration**: Open VSCode and load the project folder. Press `Ctrl+Shift+P` and search for `>Create New Terminal`. Install _PNPM_ using `corepack enable`. Then, enter `pnpm install` to install the packages. Next, copy the `.env.example` file to a new `.env` file and fill in at least the `DATABASE_URL` field. Finally, send the database schema to your database using `pnpm mysql:push` or `pnpm pg:push`.
4. **Run, Stop, Build**: Use `pnpm dev` to run the app (visit <http://localhost:3000> to check it). Stop it by focusing on the console and pressing `Ctrl+C`. After making changes, build the app using `pnpm build`. Thats okay if you see Clerk's warnings.
5. **Commit and Deploy**: Upload your project to your GitHub profile using GitHub Desktop. Then, deploy it by importing the project into [Vercel](https://vercel.com/new), making your website publicly accessible on the internet. If you wish to share your work, seek feedback, or ask for assistance, you're welcome to do so either [in our Discord server](https://discord.gg/Pb8uKbwpsJ) or [via GitHub discussions](https://github.com/blefnk/relivator/discussions).

Please scroll down the page to see a lot of useful information about how everything works in the project.

## Project Features Checklist

- [x] Utilized [Next.js 14](https://nextjs.org), [React 18](https://react.dev), [TailwindCSS](https://tailwindcss.com), and [TypeScript](https://typescriptlang.org) serve as the project's core technologies.
- [x] Implemented authentication through **both [Clerk](https://clerk.com/) and [NextAuth.js](https://authjs.dev)**.
- [x] Unleashed extensive internationalization **in 9 languages** (_English, German, Spanish, French, Hindi, Italian, Polish, Turkish, Ukrainian_), using [next-intl](https://next-intl-docs.vercel.app).
- [x] Undertook [Drizzle ORM](https://orm.drizzle.team), utilizing **both MySQL and PostgreSQL** databases, and [PlanetScale](https://planetscale.com)/[Neon](https://neon.tech)/[Vercel](https://vercel.com)/[Railway](https://railway.app) services.
- [x] Successfully configured `next.config.mjs` with i18n and MDX support.
- [x] Strived for thorough documentation and a beginner-friendly approach throughout the project.
- [x] Skillfully configured and commented on `middleware.ts` for i18n and next-auth.
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
- [ ] Use absolute paths where applied.
- [ ] Use [Kysely](https://kysely.dev) with Drizzle to achieve full TypeScript SQL query builder type-safety.
- [ ] Translate README.md and related files into more languages.
- [ ] Transform beyond a simple e-commerce store to become a universal website starter.
- [ ] Tidy up `package.json` with correctly installed and orderly sorted packages in `dependencies` and `devDependencies`.
- [ ] The project author should publish a series of detailed videos on how to use this project. There should also be some enthusiasts willing to publish their own videos about the project on their resources.
- [ ] Reduce the number of config files as much as possible.
- [ ] Reduce HTML tag nesting and ensure correct usage of HTML tags whenever possible.
- [ ] Prioritize accessibility throughout, for both app user UI (User Interface) and UX (User Experience), as well as developers' DX (Developer Experience). Maintain usability without compromising aesthetics.
- [ ] Prefer `function` over `const` for components to maintain clean and beginner-friendly code.
- [ ] Optimize all app elements to improve dev cold start and build speeds.
- [ ] Manage email verification, newsletter sign-ups, and email marketing via [Resend](https://resend.com) and [React Email](https://react.email).
- [ ] Make certain environment variables optional, allowing the app to operate without them, simply omitting specific code sections as necessary.
- [ ] Keep the project free from `@ts-expect-error` and related not very type-safety things.
- [ ] Keep the cookie count as low as possible, prepare for a cookie-free future, and implement cookie notifications.
- [ ] Introduce a comment system for products, including Review and Question types.
- [ ] Integrate valuable insights from [Next.js Weekly](https://nextjsweekly.com/issues) into this starter.
- [ ] Implement file uploads using [UploadThing](https://uploadthing.com) and [Cloudinary](https://cloudinary.com).
- [ ] Implement dynamic switching between app features, like database provider, by making corresponding checks for environment variables.
- [ ] Implement AI features and chat, using, for example, [Vercel AI SDK](https://sdk.vercel.ai/docs) (see: [Introducing the Vercel AI SDK](https://vercel.com/blog/introducing-the-vercel-ai-sdk)).
- [ ] Implement advanced theme switching without flashing, utilizing Tailwind Dark Mode with [React Server Side support](https://michaelangelo.io/blog/darkmode-rsc) and dynamic cookies.
- [ ] Implement [Jest](https://jestjs.io) testing, optimized for Next.js.
- [ ] Implement CLI to quickly get Relivator with selected options only.
- [ ] Guarantee that every possible page is enveloped using predefined shell wrappers.
- [ ] Generously comment throughout your code, while keeping it clean.
- [ ] Fully develop advanced sign-up and sign-in pages, integrating both social media and classic form methods.
- [ ] Follow recommendations from [Material Design 3](https://m3.material.io) and other design systems when relevant.
- [ ] Establish, document, and adhere to conventions, such as maintaining a single naming case style for files and variables.
- [ ] Establish a comprehensive i18n, using country and locale codes, and support even more languages. Ensure native speakers verify each language following machine translation. Consider to use the [next-international](https://github.com/QuiiBz/next-international) library.
- [ ] Ensure ultimate type safety using strict mode in [TypeScript](https://typescriptlang.org), typedRoutes, Zod, middleware, etc.
- [ ] Ensure the project lacks any unused items, including packages, libraries, variables, etc.
- [ ] Ensure full Next.js Edge support and compatibility.
- [ ] Ensure full [Bun](https://bun.sh) support and compatibility.
- [ ] Ensure all website languages are grammatically correct and adhere to the latest rules for each language.
- [ ] Ensure all items in the project are sorted in ascending order unless different sorting is required elsewhere.
- [ ] Ensure accessibility for **users**, **developers** (both beginners and experts), **bots** (like [Googlebot](https://developers.google.com/search/docs/crawling-indexing/googlebot) or [PageSpeed Insights Crawler](https://pagespeed.web.dev)), for **everyone**.
- [ ] Enhance `middleware.ts` configuration with multi-middleware implementation.
- [ ] Employ all relevant [TanStack](https://tanstack.com) libraries.
- [ ] Elegantly configure `app.ts`, offering a single config to replace all others.
- [ ] Develop workflows for both sellers and customers.
- [ ] Develop an advanced storefront featuring products, categories, and subcategories.
- [ ] Develop an advanced 404 Not Found page with full internationalization support.
- [ ] Develop advanced sign-up, sign-in, and restoration using email-password and magic links.
- [ ] Develop an even more sophisticated implementation of user subscriptions and the checkout system via Stripe.
- [ ] Decrease file count by merging similar items, etc.
- [ ] Create the most beginner-friendly and aesthetically pleasing starter possible.
- [ ] Create an advanced notification system, inclusive of toasters, pop-ups, and pages.
- [ ] Create a new landing page with a distinctive design and update components, plus fully redesign all other pages and components.
- [ ] Confirm the project is free from duplicates, like files, components, etc.
- [ ] Conduct useful tests, including possible stress tests, to simulate and assess app performance under high-traffic conditions.
- [ ] Comprehensively configure Next.js 14 App Router, with API routes managed by Route Handlers, including the RSCs and all other new features.
- [ ] Complete the BA11YC (Bleverse Accessibility Convention) checklist.
- [ ] Complete parts of the [BA11YC (Bleverse Accessibility Convention) checklist](https://github.com/bs-oss/BA11YC).
- [ ] Boost app performance scores on platforms like Google PageSpeed Insights. Ensure the app passes all rigorous tests.
- [ ] Apply the [next-usequerystate](https://github.com/47ng/next-usequerystate) library where appropriate ([read the article](https://francoisbest.com/posts/2023/storing-react-state-in-the-url-with-nextjs)).
- [ ] Add some interesting and useful types to the project, for example, using the [type-fest](https://github.com/sindresorhus/type-fest) library.
- [ ] Add pop-ups for cookies/GDPR notifications (with a respective management settings page), and Google floating notifications for quick login, etc.
- [ ] Add an admin dashboard that includes stores, products, orders, subscriptions, and payments.
- [ ] Add advanced indicators for installed packages, environment variables, and improvements to TailwindCSS screen sizes.

This roadmap outlines the key features and improvements planned for implementation in this Next.js starter. Items not marked may already be configured but might not have undergone extensive testing. Should you find any mistakes, please create an issue.

![Relivator Landing Page Screenshot](/public/screenshot.png)

🌐 [https://relivator.bleverse.com](https://relivator.bleverse.com)

## Project Commands

- **`pnpm stripe:listen`**: This command runs the Stripe webhook listener and assists in setting up Stripe environment variables. You may need to have [Stripe CLI](https://stripe.com/docs/stripe-cli) installed to run this command.
- **`pnpm appts`**: This command performs a comprehensive check of the codebase. It sequentially executes `pnpm typecheck` to conduct type-checking and identify any TypeScript errors, `pnpm lint` for code linting, `pnpm format` to format with Prettier, and finally, `pnpm:build`.
- **`pnpm latest`**: This command updates all project packages to their latest stable versions and updates `next-intl` to the latest beta version. Please update the latest line in the `scripts` section of `package.json` if a [newer beta version of _next-intl_](https://github.com/amannn/next-intl/pull/149) is released.
- **`pnpm latest:canary`**: This command runs `pnpm latest` and updates Next.js and React to the latest versions available on their canary branches. Use this only if you are certain about why you need it.

## About the Project

We've laid the foundation – now it’s your turn to dive in and speed up your development. Explore everything new with Next.js 14 right here, with Relivator.

Grab it and enjoy! Don’t forget: your feedback and stars mean the world to us. Smash that star button! Fork it! Your involvement lifts the project to new heights! If you have coding skills, your contributions are always welcome!

Run into issues? Join our repository discussions, open an issue, or DM us on: [Twitter/𝕏](https://x.com/blefnk), [Discord](https://discord.gg/Pb8uKbwpsJ), [Fiverr](https://fiverr.com/blefnk), [LinkedIn](https://linkedin.com/in/blefnk), or [Facebook](https://facebook.com/blefnk).

This project has big plans and we value all the help we can get! If you’re keen to make your own commits, check out the Project Roadmap above to see potential enhancements for the project. Also, use `Cmd/Ctrl+Shift+F` in VSCode and search for `todo:` to find spots that need attention. Please visit the **[Commits](https://github.com/blefnk/relivator/issues)** tab for more opportunities to assist.

> **Note**
> Striving to be highly useful, this README contains a lot of information. Some text may be outdated and will be updated as we grow. Please let us know on the [discussion page](https://github.com/blefnk/relivator/discussions/6) if you spot any small issues like outdated info, broken links, or grammatical/spelling errors in README.md or other files.

## Environment Variables (`.env` file)

**Refer to the [`.env.example`](https://github.com/blefnk/relivator/blob/main/.env.example) file as your guide. Simply copy data from it to a new `.env` file.**

The DATABASE_URL environment variable is mandatory; others are optional. You're welcome to deploy the application as-is, but ensure you verify what's necessary. Though the application will run without certain variables, missing ones may deactivate specific features.

Ensure that default values are defined for essential environment variables. Never store secrets in the `.env.example` file. For newcomers or repo cloners, use `.env.example` as a template to create your `.env` file, ensuring it’s never committed. Update the schema in `/src/env.mjs` when adding new variables.

Further [information about environment variables is available here](https://nextjs.org/docs/app/building-your-application/configuring/environment-variables).

_A cleaner and improved version of this section is coming soon. Keep an eye out!_

In the 1.1.0 Relivator release, the `.env.example` file was greatly simplified and will be streamlined even further in upcoming versions. We aim to ensure that unspecified values will simply deactivate related functionality without halting app compilation.

## Stripe Payments

Refer to the [`.env.example`](https://github.com/blefnk/relivator/blob/main/.env.example) file as your guide where and how to get all the important environment variable keys for Stripe, including webhooks both for localhost and deployment.

Locally, install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run the command `pnpm stripe:listen` to initiate the Stripe webhook listener. This action connects Stripe to your account and generates a webhook key, which you can then set as an environment variable in Stripe's settings.

When testing Stripe, you can use its test data: `4242 4242 4242 4242` | `12/34` | `567` | `Random Name` | `Random Country`.

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

Use `pnpm lint:i18n` to verify your i18n files. The tool attempts to rectify issues when possible, offering features like ascending sort. No output means everything is in order.

Presently, all languages are machine-translated. Future revisions by native speakers are planned.

Note that i18n messages from another one of our open-source projects are currently present and will be removed shortly.

**Currently supported locales (you can add your own manually):**

de-DE, en-US, es-ES, fr-FR, hi-IN, it-IT, pl-PL, tr-TR, uk-UA.

## Design Decisions, Code Insights, Recommendations

_We're continuously improving this section. Contributions are welcomed!_

Our starter aims to be a rich resource for developers at all stages of their journey. Within the comment blocks and dedicated sections at the end of select files, you'll find valuable insights and clarifications on a wide array of topics. Your contributions to enhancing these educational nuggets are highly encouraged!

**Advanced Environment Variables:**

The `.env.example` file covers all the essential variables for a fully functional website, tailored for beginners. However, if you require advanced configurations, you can extend your `.env` file with the following variables:

```properties
# For Discord Server Integration: Navigate to Edit Channel > Integrations > New Webhook to obtain the URL.
DISCORD_WEBHOOK_URL=""

# For Loglib Integration: The site ID can be found on https://loglib.io.
LOGLIB_SITE_ID=""
```

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

**How to Deploy the Project:**

Please check the _How to Install and Get Started_ section before making the initial deployment.

Consult the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify), and [Docker](https://create.t3.gg/en/deployment/docker) for further details. The project has only been tested on Vercel; please inform us if you encounter issues with other deployment services.

**UI Components:**

By default, this project includes components from various libraries, as well as unstyled [shadcn/ui](https://ui.shadcn.com) components. Shadcn/ui even allows you to generate new UI components using its CLI (where "button" can be any Shadcn UI element): `pnpm dlx shadcn-ui@latest add button`.

**Authentication:**

Setting up authentication is straightforward.
_This section will be implemented soon._

**Bun Things Compatibility:**

`Relivator` can already harness some fantastic **[`Bun`](https://bun.sh)** features. For this starter, we currently recommend using `pnpm`. Full Bun support and compatibility will be shipped as soon as Windows binaries are available. _Section expansion coming soon._

**Typical App Workflow (Coming Soon):**

A comprehensive guide detailing the typical application workflow will be implemented soon. For now, here's a quick overview:

1. _Run Development Server_: `pnpm dev`
2. _Environment Configuration_: `.env`
3. _Middleware Setup_: `middleware.ts`
4. _Additional Steps_: Stay tuned...

**Recommended Things to Learn:**

1. [Relivator: Next.js 14 Starter (Release Announce of Relivator on Medium)](https://cutt.ly/awf6fScS) by [Nazarii Korniienko @Blefnk](https://github.com/blefnk)
2. [Welcome to the Wild World of TypeScript, Mate! Is it scary?](https://cutt.ly/CwjVPUNu) by [Nazarii Korniienko @Blefnk](https://github.com/blefnk)
3. [Thoughts on Next.js 13, Server Actions, Drizzle, Neon, Clerk, and More](https://github.com/Apestein/nextflix/blob/main/README.md#overall-thoughts) by [@Apestein](https://github.com/Apestein)
4. [Huge Next-Multilingual Readme About i18n](https://github.com/Avansai/next-multilingual#readme) by [@Avansai](https://github.com/Avansai)

_More learning resources can be found within the files of this repository._

## Migration from Other Starters to Relivator

If you've been exploring which Next.js starter to select for your next project like [create-next-app](https://vercel.com/templates/next.js/nextjs-boilerplate), [create-t3-app](https://create.t3.gg), [Next.js Commerce (Vercel Store)](https://vercel.store), [SkateShop](https://github.com/sadmann7/skateshop), [OneStopShop](https://github.com/jackblatch/OneStopShop), [Taxonomy](https://github.com/shadcn-ui/taxonomy)/[nextflix](https://github.com/Apestein/nextflix), [payload](https://github.com/payloadcms/payload), [Medusa](https://github.com/medusajs/medusa), or [any other projects](https://github.com/blefnk/relivator/wiki/Project-Credits-&-Contributors) – your search can end here.

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

This Next.js 14 starter was crafted with love by [@blefnk Nazarii Korniienko](https://github.com/blefnk), and by the incredible [Bleverse OSS community](https://github.com/blefnk/relivator/wiki/Project-Credits-&-Contributors). We are deeply grateful for all the contributions and support provided by everyone for this project.

---

Happy coding! Embark on your coding adventure, learn, iterate, and most importantly – enjoy the process! Remember – this is a space of learning and experimentation. Dive in and savor the journey! 🚀🌌

[![Join the Bleverse Discord](https://discordapp.com/api/guilds/1075533942096150598/widget.png?style=banner2)][bleverse-discord]

**🔥 We're Growing Fast! A Huge Thanks to [All Our Supporters](https://github.com/blefnk/relivator/stargazers)! Check Out Our Star History:**

[![Star History Chart](https://api.star-history.com/svg?repos=blefnk/relivatorandtype=Timeline)](https://star-history.com/#blefnk/relivator)

---

![Bleverse Relivator OG Image](/public/og-image.png)

_Check out [our other free Next.js 14 starter](https://github.com/blefnk/reliverse). This one, a monorepo, provides the tech used in the current starter and adds: Turborepo/Turbopack, Prisma, Valibot, Lucia, Clerk, and much more, as we experimentally attempt to combine all vital and widely-used tech._

[bleverse-discord]: https://discord.gg/Pb8uKbwpsJ
