# 🏬 relivator next.js ecommerce starter

> - **Relivator is a robust, production-ready eCommerce template built with Next.js and other modern technologies.**
> - **It's designed for developers who want a fast, modern, and scalable foundation without reinventing the backend.**
> - _🤖 Want to discuss this repo with AI? Reliverse will be happy to chat with you! [💬 Talk here](https://reliverse.org/projects/blefnk/relivator-nextjs-template?chat=true)._
<!-- > - 🎧 _Prefer listening than reading?_ Reliverse Deep Dive on Relivator is live! [▶️ Listen here](./docs/podcast-relivator.mp3). -->

---

<div align="left">
  <a alt="GitHub license" href="https://github.com/blefnk/relivator/blob/main/LICENSE">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/license/blefnk/relivator?style=flat-square&labelColor=32363B&color=ffffff">
      <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/license/blefnk/relivator?style=flat-square&labelColor=EBEEF2&color=000000">
      <img alt="relivator license" src="https://img.shields.io/github/license/blefnk/relivator?style=flat-square&labelColor=EBEEF2&color=000000">
    </picture>
  </a>
  <a alt="GitHub issues" href="https://github.com/blefnk/relivator/issues">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/issues/blefnk/relivator?style=flat-square&labelColor=32363B&color=ffffff">
      <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/issues/blefnk/relivator?style=flat-square&labelColor=EBEEF2&color=000000">
      <img alt="relivator issues" src="https://img.shields.io/github/issues/blefnk/relivator?style=flat-square&labelColor=EBEEF2&color=000000">
    </picture>
  </a>
  <a alt="GitHub repo stars" href="https://github.com/blefnk/relivator/stargazers">
    <picture>
      <source media="(prefers-color-scheme: dark)" srcset="https://img.shields.io/github/stars/blefnk/relivator?style=flat-square&labelColor=32363B&color=ffffff">
      <source media="(prefers-color-scheme: light)" srcset="https://img.shields.io/github/stars/blefnk/relivator?style=flat-square&labelColor=EBEEF2&color=000000">
      <img alt="relivator stars" src="https://img.shields.io/github/stars/blefnk/relivator?style=flat-square&labelColor=EBEEF2&color=000000">
    </picture>
  </a>
</div>

---

[Demo](https://relivator.com) — [Sponsor](https://github.com/sponsors/blefnk) — [Discord](https://discord.gg/Pb8uKbwpsJ) — [GitHub](https://github.com/blefnk/relivator) — [Docs](https://deepwiki.com/blefnk/relivator-nextjs-template) — [Introduction](https://blefnk.reliverse.org/my-projects/relivator)

## Features

The following features are the main Reliverse's stack. You can check the Versator to see Reliverse's another stack variant with Clerk, Stripe, Motion, and more.

- ⚡ **Framework:** Next.js 15.3 • React 19.1 • TypeScript 5.8
- 🔐 **Auth:** First-class authentication with [Better Auth](https://better-auth.com)
- 🗄️ **Database:** Typed PostgreSQL via [Drizzle ORM](https://orm.drizzle.team) & [Neon](https://neon.tech)
- 📄 **Forms:** Powered by schema-ready [TanStack Form](https://tanstack.com/form) _(🏗️ W.I.P)_
- 📄 **Typesafe APIs:** Typed by [oRPC](https://orpc.unnoq.com) _(🏗️ W.I.P)_
- 💳 **Payments:** Integration with [Polar](https://polar.sh) _(🏗️ W.I.P)_
- 📦 **Storage:** Smooth file uploads via [Uploadthing](https://uploadthing.com)
- 🎨 **Styling:** [shadcn/ui](https://ui.shadcn.com) with Tailwind CSS 4.1
- 🦄 **Animations:** Built-in [Anime.js](https://animejs.com) with a sample banner
- 📊 **Analytics:** Built-in optional [Vercel Analytics](https://vercel.com/docs/analytics)
- 🛠️ **DX Tools:** Preconfigured ESLint 9, [Biome](https://biomejs.dev), [Knip](https://knip.dev)

## Quick Start

To get started:

1. Install [Git](https://git-scm.com), [Node.js](https://nodejs.org), and [Bun](https://bun.sh).
2. Run:

   ```bash
   git clone https://github.com/blefnk/relivator.git
   cd relivator
   bun install
   copy .env.example .env
   ```

3. Fill in the required environment variables in the `.env` file.
4. Run:

   ```bash
   bun dev # Start development server
   bun run build # Build production version
   ```

5. Edit something in the code manually or ask AI to help you.
6. Done. Seriously. You're building now.

<!-- 
2. Run:
   ```bash
   bun i -g @reliverse/cli
   reliverse cli
   ```
3. Select **"Create a new project"**.
4. Follow prompts to configure your store.
-->

### Commands

| Command         | Description                    |
|-----------------|--------------------------------|
| `bun dev`       | Start local development        |
| `bun build`     | Create a production build      |
| `bun latest`    | Sync all dependencies          |
| `bun ui`        | Add UI components              |
| `bun db:push`   | Apply DB schema changes        |
| `bun db:auth`   | Update auth-related tables     |
| `bun db:studio` | Open visual DB editor          |

## Notes

- Relivator **1.4.0+** is AI-ready — optimized for AI-powered IDEs like Cursor, making onboarding effortless even for beginners.
- Version **1.3.0** evolved into **Versator**, featuring [Clerk](https://clerk.com) authentication and [Stripe](https://stripe.com) payments. Explore [Versator Demo](https://versator.relivator.com/en), [Repo](https://github.com/blefnk/versator), or [Docs](https://docs.reliverse.org/versator).

<!--
- ⚙️ **Instant setup**: Just run the CLI
- 🤖 **AI-Ready**: Optimized for tools like [Cursor](https://cursor.sh)
- 🧪 **Battle-tested stack**: Built for actual shipping, not just tutorial clout
- 💡 **Evolving fast**: Frequent updates, including Relivator's variants like [Versator](https://versator.relivator.com)
- -->

## Stand with Ukraine

- 💙 Help fund drones, medkits, and victory.
- 💛 Every dollar helps stop [russia's war crimes](https://war.ukraine.ua/russia-war-crimes) and saves lives.
- 👉 [Donate now](https://u24.gov.ua), it matters.

## Stand with Reliverse

- ⭐ [Star the repo](https://github.com/blefnk/relivator) to help Reliverse community grow.
- 🦄 Follow this project's author, [Nazar Kornienko](https://github.com/blefnk) & [Reliverse](https://github.com/reliverse), to get updates about new projects.
- 💖 [Become a sponsor](https://github.com/sponsors/blefnk) and power the next wave of tools that _just feel right_.
- 🧑‍🚀 Every bit of support helps keep the dream alive: dev tools that don't suck.

## License

2025 MIT © [blefnk Nazar Kornienko](https://github.com/blefnk) & [Reliverse](https://github.com/reliverse)
