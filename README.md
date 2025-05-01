# 🏬 relivator next.js ecommerce starter

[demo](https://relivator.com) — [sponsor](https://github.com/sponsors/blefnk) — [discord](https://discord.gg/Pb8uKbwpsJ) — [github](https://github.com/blefnk/relivator) — [docs](https://deepwiki.com/blefnk/relivator-nextjs-template)

> relivator is a robust ecommerce template built with next.js and other modern technologies. it's designed for developers who want a fast, modern, and scalable foundation without reinventing the backend.

## features

- ⚡ **framework:** next.js 15.3 + react 19.1 + ts 5.8
- 🔐 **auth:** [better-auth](https://better-auth.com)
- 🗄️ **db:** pg + [drizzle-orm](https://orm.drizzle.team)
- 📦 **storage:** [uploadthing](https://uploadthing.com)
- 🎨 **styling:** tailwind 4.1 + [shadcn](https://ui.shadcn.com)
- 🦄 **animations:** [anime.js](https://animejs.com)
- 📊 **analytics:** [vercel](https://vercel.com/docs/analytics)
- 🛠️ **dx tools:** eslint + [biome](https://biomejs.dev) + [knip](https://knip.dev)
- 💳 **payments:** [polar](https://polar.sh) _(🏗️ w.i.p)_
- 🧬 **api:** next + [orpc](https://orpc.unnoq.com) _(🏗️ w.i.p)_
- 📄 **forms:** [tanstack](https://tanstack.com/form) _(🏗️ w.i.p)_

> these features define the standard reliverse stack. for an alternative setup—featuring clerk, stripe, trpc, and more—check out [versator](https://github.com/blefnk/versator).

## quick start

1. install [git](https://git-scm.com), [node.js](https://nodejs.org), [bun](https://bun.sh).
2. run:

   ```bash
   git clone https://github.com/blefnk/relivator.git
   cd relivator
   bun i
   copy .env.example .env
   ```

3. fill in the required environment variables in the `.env` file.
4. run:

   ```bash
   bun dev # start development server
   bun run build # build production version
   ```

5. edit something in the code manually or ask ai to help you.
6. done. seriously. you're building now.

<!-- 
2. run:
   ```bash
   bun i -g @reliverse/cli
   reliverse cli
   ```
3. select **"create a new project"**.
4. follow prompts to configure your store.
-->

### commands

| command         | description                    |
|-----------------|--------------------------------|
| `bun dev`       | start local development        |
| `bun build`     | create a production build      |
| `bun latest`    | install latest deps            |
| `bun ui`        | add shadcn components          |
| `bun db:push`   | apply db schema changes        |
| `bun db:auth`   | update auth-related tables     |
| `bun db:studio` | open visual db editor          |

## notes

- relivator **1.4.0+** is ai-ready — optimized for ai-powered ides like cursor, making onboarding effortless even for beginners.
- version **1.3.0** evolved into **versator**, featuring [clerk](https://clerk.com) authentication and [stripe](https://stripe.com) payments. explore [versator demo](https://versator.relivator.com/en), [repo](https://github.com/blefnk/versator), or [docs](https://docs.reliverse.org/versator).

## stand with ukraine

- help fund drones, medkits, and victory.
- every dollar helps stop [russia's war crimes](https://war.ukraine.ua/russia-war-crimes) and saves lives.
- [donate now](https://u24.gov.ua), it matters.

## stand with reliverse

- [star the repo](https://github.com/blefnk/relivator) to help the reliverse community grow.
- follow this project's author, [nazar kornienko](https://github.com/blefnk) and his [reliverse](https://github.com/reliverse) ecosystem, to get updates about new projects faster.
- [become a sponsor](https://github.com/sponsors/blefnk) and power the next wave of tools that _just feel right_.
- every bit of support helps keep the dream alive: dev tools that don't suck.

## license

mit © 2025 [nazar kornienko (blefnk)](https://github.com/blefnk), [reliverse](https://github.com/reliverse)
