# Relivator Next.js Template

This template serves as the foundation for your eCommerce platform, helping you build efficient, engaging, and profitable online stores.

- [🚀 Demo](https://relivator.com)
- [💬 Discord](https://discord.gg/Pb8uKbwpsJ)
- [🧑‍💻 GitHub](https://github.com/blefnk/relivator)
- [📚 Docs](https://docs.reliverse.org/relivator)
- [💖 Patreon](https://patreon.com/blefnk)

## Get Started

_Make sure you have [Git](https://git-scm.com/downloads), [Node.js](https://nodejs.org/en), and [Bun](https://bun.sh) installed. Then:_

1. Run `bun i -g @reliverse/cli`
2. Execute `reliverse cli`
3. Select _✨ Create a brand new project_
4. Provide or skip details about your project
5. It's ready—enjoy! 😊

## Help Relivator Grow

**If you find this project useful, please consider:**

- Starring the [GitHub repository](https://github.com/blefnk/relivator)
- Supporting via [Patreon](https://patreon.com/blefnk), [GitHub Sponsors](https://github.com/sponsors/blefnk), or [PayPal](https://paypal.me/blefony)

## Tech Stack

- **Core**: [Next.js 15.2](https://nextjs.org), [React 19](https://react.dev), [TypeScript 5.8](https://typescriptlang.org)
- **Styling**: [Tailwind 4](https://tailwindcss.com/) & [shadcn/ui](https://ui.shadcn.com/)
- **Auth**: [Better Auth](https://better-auth.com)
- **Payments**: [🏗️ Polar](https://polar.sh/)
- **Database**: [Drizzle](https://orm.drizzle.team) & [Neon](https://neon.tech)
- **File Storage**: [🏗️ Uploadthing](https://uploadthing.com)
- **Tools**: [ESLint](https://eslint.org), [Biome](https://biomejs.dev/), [🏗️ Knip](https://knip.dev)

> **Note**
> Relivator (previously version 1.3.0) has been renamed to Versator. If you're interested in using [Clerk](https://clerk.com) and [Stripe](https://stripe.com) instead of Better Auth and Polar, check out the Versator [demo](https://versator.relivator.com/en), [repo](https://github.com/blefnk/versator), or [docs](https://docs.reliverse.org/versator).

### Commands

- `bun build`: Builds the project
- `bun dev`: Runs the development server
- `bun db:push`: Saves database schema changes
- `bun db:auth`: Regenerates `src/db/schema/users.ts` based on `src/lib/auth.ts`
- `bun db:studio`: Opens the Drizzle ORM database visual editor
- `bun ui`: Installs shadcn/ui components (e.g., `bun ui button`)
- `bun latest`: Updates all dependencies to their latest versions
- `bun check`: Runs type checking, linting, and formatting

## License

MIT. This project was created by [blefnk Nazar Kornienko](https://github.com/blefnk).
