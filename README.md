# Relivator 1.2.6: Next.js 15, React 19, TailwindCSS Template

We are currently migrating the documentation from the existing Relivator README.md to the official, newly launched [Relivator & Reliverse Docs website (https://reliverse.org)](https://reliverse.org). The content will be organized into appropriate sections on the new site. During the migration, some elements might not function properly. The current README.md will contain only minimal information. Please let us know if you encounter any issues.

---

<!--
For those who are viewing the current markdown file using:
 – VSCode: Press F1 or Cmd/Ctrl+Shift+P and enter ">Markdown: Open Preview". Please install the "markdownlint" and "Markdown All in One" extensions.
 – GitHub: Does this .md file appear different from what you are used to seeing on GitHub? Ensure the URL does not end with "?plain=1".
-->

<div align="center">

[🌐 Demo](https://relivator.reliverse.org) | [👋 Introduction](#introduction) | [🏗️ Installation](#installation) | [🩷 Sponsors](#sponsors)

[⚙️ Scripts](#scripts) | [🤔 FAQ](#faq) | [🔍 Details](#details) | [✅ Roadmap](#roadmap) | [📖 Changelog](#changelog)

</div>

<!-- 🚀 Yay! Thanks for the installation and welcome! If you like it, please consider giving us a star! ⭐ -->

<!-- 👉 https://github.com/blefnk/relivator-nextjs-template 🙏 -->

Stop jumping from one starter to the next. With [Relivator](https://github.com/blefnk/relivator-nextjs-template#readme), your possibilities are endless! You can create anything you want; all the tools are ready and waiting for you.

The entire Relivator project was developed by one person, [Nazar Kornienko (blefnk)](https://github.com/blefnk)! Some people have already contributed, and you’re welcome to do the same—any contributions at all are appreciated! Your contributions will not be forgotten; [our awesome community](https://discord.gg/Pb8uKbwpsJ) value them highly, and you might even receive financial gratitude from the project's creator in the future. Let's come together to create the most coolest Next.js template in the world! This will be a joint effort and a shared victory, a true win-win. Thank you all for your contributions and [financial support](#sponsors)!

Please take a moment to read through the information below. You'll find helpful details about how everything works in the project, as well as an extensive list of features.

<div align="center">

<p>
    <span>
      <a href="https://relivator.reliverse.org">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="public/screenshot-dark.png" />
            <source media="(prefers-color-scheme: light)" srcset="public/screenshot-light.png" />
            <img alt="Shows the landing page of Relivator Next.js template, with its logo and the phrase 'Relivator Empowers Your eCommerce with the Power of Next.js'." src="/public/screenshot-light.png" width="40%" />
        </picture>
      </a>
    </span>
    <span>
      <a href="https://github.com/blefnk/relivator-nextjs-template/blob/main/public/og.png">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="public/og.png" />
            <source media="(prefers-color-scheme: light)" srcset="public/og.png" />
            <img alt="Dark-themed image displaying various technologies and tools used in the Relivator project. The heading highlights Next.js 15, React 19, shadcn, and Tailwind Template. The image is divided into multiple sections listing technologies like shadcn, tailwind, next 15, react 19, clerk, authjs, drizzle, neon, ts 5.6, python, eslint 9, ts-eslint 8, knip, biome, unjs, and reliverse. The background features a grid layout with a minimalistic design, inspired by the Figma and Loading UI style." src="/public/og.png" width="45%" />
        </picture>
      </a>
    </span>
</p>

[![Discord chat][badge-discord]][link-discord]
[![npm version][badge-npm]][link-npm]
[![MIT License](https://img.shields.io/github/license/blefnk/relivator-nextjs-template.svg?color=blue)](LICENSE)

[𝕏](https://x.com/blefnk) | [GitHub](https://github.com/blefnk) | [Slack](https://join.slack.com/t/reliverse/shared_invite/zt-2mq703yro-hKnLmsgbIQul0wX~gLxRPA) | [LinkedIn](https://linkedin.com/in/blefnk) | [Facebook](https://facebook.com/blefnk) | [Discord](https://discord.gg/Pb8uKbwpsJ) | [Fiverr](https://fiverr.com/blefnk)

</div>

> *«I couldn't find the ~~sports car~~ Next.js starter of my dreams, so I built it myself.»* © ~~Ferdinand Porsche~~ [@blefnk](https://github.com/blefnk)

Our goal is to create the world's most feature-rich and globally accessible Next.js starter. It offers more than just code—it's an experience. Scroll down to see the impressive list of project features, including the ability to switch between Clerk/Auth.js (next-auth@beta/NextAuth.js) and Drizzle's MySQL/PostgreSQL on the fly. Welcome to the Relivator starter and the Reliverse community!

<!-- <p align="center">
    <span>
      <a href="https://relivator.reliverse.org">
        <picture>
            <source media="(prefers-color-scheme: dark)" srcset="public/screenshot-dark.png" />
            <source media="(prefers-color-scheme: light)" srcset="public/screenshot-light.png" />
            <img alt="Shows the landing page of Relivator Next.js template, with its logo and the phrase 'Relivator Empowers Your eCommerce with the Power of Next.js'." src="/public/screenshot-light.png" width="50%" />
        </picture>
      </a>
    </span>
    <span>
      <a href="https://star-history.com/#blefnk/relivator-nextjs-template&Timeline">
      <picture>
        <source media="(prefers-color-scheme: dark)" srcset="https://api.star-history.com/svg?repos=blefnk/relivator-nextjs-template&type=Timeline&theme=dark" />
        <source media="(prefers-color-scheme: light)" srcset="https://api.star-history.com/svg?repos=blefnk/relivator-nextjs-template&type=Timeline" />
        <img alt="Star History Chart" src="https://api.star-history.com/svg?repos=blefnk/relivator-nextjs-template&type=Timeline" width="50%" />
      </picture>
      </a>
    </span>
</p> -->

## Introduction

[**👉 Read the Detailed Blog Post About 1.2.6 & 1.3.0@canary Update 👈**](https://reliverse.org/relivator/v126)

**✅ Relivator 1.2.6 uses the following dependencies (only some are listed)**: Next.js 15, React 19, TypeScript 5.5/5.6, Tailwind 3/4, tRPC 11, Clerk 5, Auth.js 5, ESLint 9 (with multiple plugins like typescript-eslint 8, react, unicorn, sonarjs, perfectionist, tailwindcss, readable-tailwind, import-x, jsx-a11y, security, markdown, mdx, json), Biome, Stripe, Million, Reliverse, next-intl, shadcn/ui, radix-ui, react-query, pnpm, zod, cn, turbo, Drizzle (Postgres, MySQL, SQLite, Neon, Railway, PlanetScale, Turso), GSAP, SWR, Resend, react-email, next-themes, Putout, Flowbite, Udecode, Slate, uploadthing, Radash, CSpell, TypeStat, Lucide & Radix Icons, Vercel & Loglib Analytics, Axios, Day.js, Embla Carousel, Execa, Math.js, UnJS libs (consola, fs-extra, pathe, etc), and much more

**[upd. 18.08.2024]** You can now try out the first published Reliverse Addon – [@reliverse/fs](https://github.com/reliverse/fs#readme), which is already available and used in Relivator! **🎉 The upcoming Relivator 1.3.0 will have as few dependencies as possible.** Everything will work thanks to @reliverse/addons. Everything will be separated into its own libraries and will be published on npmjs and/or jsr. You will be able to install exactly what you need, including functionality and UI. You will have two options. One is to install the addons the classic way using 'package.json'. The other option is that all these addons can also be installed in a style inspired by shadcn/ui, where you keep all the content directly in your project (as it is currently in test mode in Relivator 1.2.6 (please check `addons` folder or run `pnpm addons`)), although the first option will be recommended for the most use cases. 'addons' folder already contains many cool things, especially related to codemods. It also includes the @reliverse/academy game, where you can check how good you know JavaScript/TypeScript, React/Next.js, Relivator/Reliverse, and even ESLint, ecosystems (you will even find there table of records and will can contest with other players if you share data/players.json and data/progress.json save files to them; the game has also achievement system).

**🙏 Please help us reach 1,000 stars on GitHub**: Once this project reaches this goal, I, @blefnk, the author of this project, will start my video course on the basics of web development (HTML, CSS, JS), React, Next.js, TypeScript, related libraries, and many other topics. This milestone will also affirm that Relivator and [Reliverse](https://github.com/blefnk/reliverse-website-builder) truly make sense to exist, leading to more frequent updates and further dedication to these projects.

**⭐ Bookmark this page in your browser**: This project will only get better in the future. You can also click the star at the top of the page and add the repo to your collection to keep it easily accessible.

## The Huge Relivator 1.2.6 & 1.3.0@canary are Already Available

[**👉 Read the Detailed Blog Post About 1.2.6 & 1.3.0@canary Update 👈**](https://reliverse.org/relivator/v126)

Relivator 1.2.6 was released on August 4, 2024! We are now actively working on the next major update, Relivator 1.3.0, with the goal of making the project production-ready, clean, and high-quality. We invite you to join us in actively searching for issues, contributing freely, and earning cool rewards. A canary branch was launched a few days ago (and is available to everyone in the main repo), and the dev branch is also now available (the dev branch is available for a limited time to all sponsors at any paid pledge level).

**🔥 Important Note:** Relivator currently requires specifying Clerk environment variable keys, as its API has changed. We are working on making Clerk optional again. However, all other environment variables are optional. If this statement is incorrect and something is broken, please let us know.

## What About the Future? Any News on 1.3.0?

**🎉 The upcoming Relivator 1.3.0 will have as few dependencies as possible! Finally!**

I'm ([blefnk](https://github.com/blefnk)) working to automate the Relivator's developer experience as much as possible, including the installation process. The upcoming version 1.3.0 will feature significant automated installation. If you wish to try the initial alpha version of one of my many automation scripts, use the `pnpm deps:install` (or `pnpm deps:install-all`) command. This script already allows you to install and remove project packages, and it also works as a linter. You can check the comprehensive number of predefined commands configured inside the 'scripts' section of the 'package.json' file. However, before running this script, you should manually install the essentials:

- `npx npm add typescript tsx npm @mnrendra/read-package @clack/prompts`
- `npx npm add fs-extra pathe fast-npm-meta semver @types/semver redrun axios`
- `bun|yarn|pnpm dlx jsr add @reliverse/core` (or: `npx jsr add @reliverse/core`)

Thanks to @reliverse/addons, everything now works smoothly with fewer dependencies. In the future, each feature and component will be split into its own library and published on [npmjs](https://npmjs.com) and/or [jsr](https://jsr.io), so you can install only what you need. With the future Relivator 1.3.0 version, you won't have to deal with unnecessary components in web templates anymore. You get the core package and can add features and UI components as you need them.

The 'addons' folder is divided into two parts: terminal context and browser context (it's everything, excluding the 'addons/scripts' folder). The 'addons/scripts' folder contains functions used by the CLI (command line interface), while the 'src' and 'addons/*' folders (excluding 'addons/scripts') are for the browser, since the browser doesn't support certain JS features. So, while 'addons/scripts' has everything needed for the whole app, not everything can import from 'addons/scripts'.

You’ll have two installation options: the classic method using 'package.json' or a new approach inspired by shadcn/ui, where you keep all the content directly in your project (currently in test mode in Relivator 1.2.6—check the `addons` folder or run `pnpm addons`). While the classic method is recommended for most cases, feel free to explore the new approach!

The 'addons' folder is already packed with many exciting features, especially related to codemods, and includes the **@reliverse/academy game**. This game allows you to test your knowledge of JavaScript/TypeScript, React/Next.js, Relivator/Reliverse (make food/tea/coffee before trying this test—it has a lot of questions!), and even ESLint v9 ecosystems. It features a leaderboard, enabling you to compete with others by sharing `data/players.json` and `data/progress.json` save files. Plus, an achievement system keeps you motivated!

I can’t wait for you to experience the new and improved Relivator 1.3.0! By the way, the items in the [✅ Roadmap](#roadmap) section will finally be checked off! But to make 1.3.0 truly stable, production-ready, and just great, let's first work together on Relivator v1.3.0-canary.0, which is coming soon! If you want to get it even faster, there is now a 'dev' branch. We recently opened the project pages on financial support platforms, and currently, any contribution grants you access to the 'dev' branch. Thank you for your attention!

## Sponsors

**[We're Growing Fast! A Huge Thanks to All Our Supporters!](https://github.com/blefnk/relivator-nextjs-template/stargazers)**

Developing something as ambitious as Relivator takes a lot of time, especially since the project is primarily developed by just one person. The development could be significantly accelerated by hiring additional developers. Therefore, @blefnk (Nazar Kornienko), the author of this project, would be immensely grateful to anyone who can donate to the project in any amount. A big thank you to everyone in advance!

**[Visit the "Donate to Relivator" page to learn more.](https://relivator.reliverse.org/donate)**

*Relivator is currently sponsored by the following awesome people/organizations:*

### 💚 [GitHub Sponsors](https://github.com/sponsors/blefnk) 🩵 [PayPal](https://paypal.me/blefony) 🧡 [Patreon](https://patreon.com/blefnk) 💛 [Buy Me a Coffee](https://buymeacoffee.com/blefnk) 🩷 [Ko-fi](https://ko-fi.com/blefnk)

*Love using this project? If you find this project useful, I'd appreciate a cup of coffee. You'll get Reliverse Pro, access to some private repositories, pre-release downloads, and the ability to influence my project planning. Please click on the donation platforms above to learn more. Thank you, everyone, for any kind of support!*

*I retrieve your data from donation and related platforms. If you do not wish for certain information about you to be included here, please contact me.*

- [@devmarauda](https://github.com/devmarauda) *(Discord: kongkong86 | Name: Daniel Humphreys)*
- [@svict4](https://github.com/svict4) *(Discord: svict4 | Name: Simon Victory)*
- [@mfpiano](https://youtube.com/@mfpiano) *(Discord: mfpiano | Name: Petro Melnyk)*

### 💜 [Discord Server Boost](https://discord.gg/C4Z46fHKQ8)

- [@Saif-V](https://github.com/Saif-V) *(Discord: Gh0st | Name: Saif Al-Hashar)*
- [@demiroo](https://github.com/demiroo) *(Discord: demiroezkan | Name: Özkan Demir)*

## 🖥️ Hire Me

Hello, I'm [Nazar Kornienko](https://github.com/blefnk), a flexible web developer specializing in JavaScript/TypeScript and React/Next.js front-end development. If you’re looking for someone with my skill set, please contact me at <blefnk@gmail.com> or via [Discord](https://discordapp.com/users/611578864958832641).

Please explore the current repository to learn more about my experience with the JavaScript/TypeScript and React/Next.js ecosystems. I'm available for both remote work and full-time positions. While my primary focus is frontend and CLI development, if you need help with code automation tools, small tasks related to Python or backend, or even designs in Figma, graphic design, or copywriting/marketing, feel free to reach out to me as well—I’d love to see how I can assist.

## 🤝 Partnerships

Starting with version 1.2.6, Relivator is now truly production-ready. However, there's still much to be accomplished, and you might be surprised when you check the [✅ Roadmap](#roadmap) section! To reach our goals, we are seeking partners to collaborate and support each other's projects' growth. If you're interested and would like to learn more, please feel free to email me at <blefnk@gmail.com>.

### Our Partners

<a href="https://railway.app?referralCode=sATgpf">
  <picture>
    <source media="(prefers-color-scheme: dark)" srcset="public/partners-dark.svg" />
    <source media="(prefers-color-scheme: light)" srcset="public/partners-light.svg" />
    <img alt="Gallery of all partners' logos" src="/public/partners-dark.svg" width="64" />
  </picture>
  <p>Railway</p>
</a>

## 🙏 Dear Audience, I Need Your Help

Currently, I’m in a challenging financial situation, so I would greatly appreciate any recommendations or mentions of my work and Relivator as part of my portfolio, such as on the pages of your own repositories. Your support would mean a lot to me! As a token of my appreciation, I’d be happy to send some interesting gifts to you. Thank you for your time and consideration!

## Installation

<!-- [![Bootstrap Relivator with a stack of your choice using the Reliverse CLI](https://github.com/blefnk/reliverse-website-builder)] -->

**How to Install and Get Started:** You have two options for installation. You can either immediately deploy to Vercel using the button below and start working on the generated repository right away (but still read the information below), or you can follow the short or detailed manual installation instructions provided.

**By The Way:** *Sometimes, we gift `Reliverse Pro`, which gives you early access to the Reliverse projects ecosystem, including Relivator, as well as upcoming plugins, to randomly selected individuals. We also give away other interesting things. Simply `star this repository` and [let us know how to reach you](https://forms.gle/NXZ6QHpwrxh52VA36). To join the discussion, hop into [the project's Discord](https://discord.gg/Pb8uKbwpsJ).*

### One-click Installation Method (**find recommended method below**)

**🔥 Important Note:** Relivator currently requires specifying Clerk environment variable keys, as its API has changed. We are working on making Clerk optional again. However, all other environment variables are optional. If this statement is incorrect and something is broken, please let us know.

By using this method, you will get only the front-end, with all the functionality disabled (learn how to enable it by reading the manual instructions below):

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fblefnk%2Frelivator-nextjs-template&project-name=relivator&repository-name=my-new-repository-name)

**Please note:** As of version 1.2.6 and 1.3.0 (dev and canary), it is recommended to use Clerk as the authProvider (specified in the `reliverse.config.ts` file) since this version has been more thoroughly tested with Clerk. We are working on fixing and improving the stability of Auth.js (next-auth@beta/NextAuth.js) as an authentication provider.

### Manual Installation: Short Method (**find recommended method below**)

**🔥 Important Note:** Relivator currently requires specifying Clerk environment variable keys, as its API has changed. We are working on making Clerk optional again. However, all other environment variables are optional. If this statement is incorrect and something is broken, please let us know.

1. **Node.js LTS**: **(A)** classical method - [Windows/macOS](https://nodejs.org) | [Linux](https://youtu.be/NS3aTgKztis); **(B)** nvm - [Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#install-nvm-windows) | [macOS/Linux](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating); **(C)** [fnm](https://github.com/Schniz/fnm#readme).
2. **Tools**: `corepack enable pnpm` ➞ [*VSCode*](https://code.visualstudio.com) ➞ [*Git*](https://learn.microsoft.com/en-us/devops/develop/git/install-and-set-up-git) ➞ *GitHub Desktop* ([Windows/macOS](https://desktop.github.com) | [Linux](https://dev.to/rahedmir/is-github-desktop-available-for-gnu-linux-4a69)) ➞ [Stripe CLI](https://docs.stripe.com/stripe-cli). Windows only: [PowerShell 7.4+](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4#installing-the-msi-package).
3. **[Fork the repo](https://github.com/blefnk/relivator-nextjs-template/fork)**: Download your fork using GitHub Desktop.
4. **Setup**: `pnpm install && install:global && pnpm reli:setup` ➞ `pnpm reli:vscode` ➞ `cp .env.example .env` ➞ fill in the values inside of `.env` ➞ `pnpm db:push` ➞ `reliverse.config.ts`.
5. **Run, Build, Deploy**: Use `pnpm dev` to run the app. Stop with `Ctrl+C`. Build with `pnpm build`. Run `pnpm appts` to check the code. Upload to GitHub with GitHub Desktop. Deploy on [Vercel](https://vercel.com/new).

### Manual Installation: Detailed Method (recommended)

**🔥 Important Note:** Relivator currently requires specifying Clerk environment variable keys, as its API has changed. We are working on making Clerk optional again. However, all other environment variables are optional. If this statement is incorrect and something is broken, please let us know.

▲ Hotline: [Email](mailto:blefnk@gmail.com) | [Discord](https://discord.gg/Pb8uKbwpsJ) | [Slack](https://join.slack.com/t/reliverse/shared_invite/zt-2mq703yro-hKnLmsgbIQul0wX~gLxRPA) | [Cal.com](https://cal.com/blefnk/reliverse)

> I'm ([blefnk](https://github.com/blefnk)) working to automate the Relivator's installation process as much as possible. The upcoming version 1.3.0 will feature a significant automated installation. If you wish to try the alpha version of one of my many automation scripts, use the `pnpm deps:install` (or `pnpm deps:install-all`) command. However, before running this script, you should manually install the essentials (edit 'pnpm dlx jsr' if needed): `npx nypm add typescript tsx @clack/prompts @mnrendra/read-package nypm ora fs-extra pathe fast-npm-meta semver @types/semver redrun && pnpm dlx jsr add @reliverse/core`.

**Please note**: As of version 1.2.6 and 1.3.0 (dev and canary), it is recommended to use Clerk as the authProvider (specified in the `reliverse.config.ts` file) since this version has been more thoroughly tested with Clerk. We are working on fixing and improving the stability of Auth.js (next-auth@beta/NextAuth.js) as an authentication provider.

1. **Node.js LTS**: Ensure you have *Node.js LTS* installed using: **(a)** classical method - [Windows/macOS](https://nodejs.org) | [Linux](https://youtu.be/NS3aTgKztis); **(b)** nvm - [Windows](https://github.com/coreybutler/nvm-windows?tab=readme-ov-file#install-nvm-windows) | [macOS/Linux](https://github.com/nvm-sh/nvm?tab=readme-ov-file#installing-and-updating); **(c)** [fnm](https://github.com/Schniz/fnm#readme).
2. **Essential Tools**: Then, run `corepack enable pnpm` to install [*pnpm*](https://pnpm.io/installation). Also, install [*VSCode*](https://code.visualstudio.com), [Git](https://learn.microsoft.com/en-us/devops/develop/git/install-and-set-up-git), *GitHub Desktop* ([Windows/macOS](https://desktop.github.com) | [Linux](https://dev.to/rahedmir/is-github-desktop-available-for-gnu-linux-4a69)), and [Stripe CLI](https://docs.stripe.com/stripe-cli). If you're a Windows user: install [PowerShell 7.4+](https://learn.microsoft.com/en-us/powershell/scripting/install/installing-powershell-on-windows?view=powershell-7.4#installing-the-msi-package) as well.
3. **Project Cloning**: [*Fork the repository*](https://github.com/blefnk/relivator-nextjs-template/fork) or click on the `Use this template` button. Use GitHub Desktop to download it to your device. The project size is about 12MB, but ensure you have at least 7GB of disk space for comfortable work, as the `node_modules` and `.next` folders require it.
4. **Configuration**: Open the project folder in VSCode. Install the recommended extensions from [.vscode/extensions.json](.vscode/extensions.json) and/or install the advanced VSCode configurations by using `pnpm reli:vscode` (choose the `default` preset for the best experience or the `ultimate` preset for the best experience). You can also refer to the [⚙️ Scripts](#scripts) and [🤔 FAQ](#faq) *RQ19* below to learn more about this script and its configurations. You can press `Cmd/Ctrl+F` and search for "`Q19`/`Q20`" if you want to install more extensions and settings (remember, more extensions mean slower VSCode). Then click `File > Exit` (VSCode will save all your open windows). Open VSCode again. Press `Ctrl+Shift+P` (or just `F1`) and search for `>Create New Terminal`, or just press **Cmd/Ctrl+Shift+~** *(on Windows make sure that it uses PowerShell 7.4+, click the arrow next to + ➞ Select Default Profile ➞ PowerShell)*. If VSCode prompts you to allow the usage of the project's TypeScript version, allow it if you're a Windows user. On other operating systems, you may or may not encounter path issues.
5. **Environment**: Run `pnpm install` (or `npx nypm install`) and/or, optionally, `install:global` to install the required packages. It is also recommended to configure `reliverse.config.ts` file. Then, optionally, you can use `pnpm deps:install-all`—especially `pnpm deps:install-all` (*this is currently an alpha script*)—to unlock some additional features, like the `eslint.config.ultimate.ts` preset (which will have a `.txt` extension by default starting with Relivator v1.3.0). (NOTE: As of Relivator v1.2.6, the `ultimate` preset is configured by default, so no action is required). Next, configure Relivator to meet your needs using the `pnpm reli:setup` and/or `pnpm reli:vscode` commands, and relaunch VSCode. You have two options: deploy with zero values in the `.env` file (resulting in just the frontend without features related to auth, database, pricing, etc.), or copy the `.env.example` file to a new `.env` file and fill in the values you want (everything is optional starting with Relivator v1.2.6). It is highly recommended to fill in the `DATABASE_URL` field. Then, set the database provider in `drizzle.config.ts` and make changes in related files if needed. Finally, send the database schema to the database using `pnpm db:push`. You can learn more about databases below in the current `README.md` file.
6. **Run, Stop, Build**: Run the app with `pnpm dev` or `pnpm turbo:dev` (interactive but unstable). Visit <http://localhost:3000> to check it out. Stop it by focusing on the console and pressing `Ctrl+C`. After making changes, build the app using `pnpm build` or `pnpm turbo:build`. *Don't worry if you see warnings related to Clerk, React Compiler, Babel, next-auth, etc. when running the build; these are known issues not related to Relivator.* Note that when using the pnpm [turbo:build](https://turbo.build) command, the VSCode terminal may not exit automatically. If this happens, press Cmd/Ctrl+C to close the process manually.
7. **Check, Commit, Deploy**: To check if the current codebase meets [@reliverse/standard](https://github.com/reliverse/standard), run `pnpm appts` (or `pnpm appts:noputout`, or `pnpm turbo:appts`, or `pnpm appts:nobuild`). Learn more about project scripts in the next section. If everything is fine, upload the project to your GitHub profile using GitHub Desktop. Finally, deploy it by importing the project into [Vercel](https://vercel.com/new), making the website publicly accessible on the internet. Alternatively, you can use `pnpm deploy` or just `vercel` to preview and inspect the local deployment without committing to GitHub every time.

**It is recommended:** From time to time, run `pnpm reli:prepare`. This script executes `pnpm install`, which checks for issues or installs/removes manually added/removed dependencies in your `package.json` file. It also executes `pnpm latest`, which installs the latest versions of project dependencies. Finally, it runs `pnpm appts`, which will do its best to improve your code and check for any errors. **Note:** Since `pnpm latest` updates all packages to their latest versions, be aware that something in the code might break, especially if considerable time has passed since the last version of Relivator was released. Therefore, you can use, for example, the VSCode extension `Open Multiple Files` to easily find and fix broken code, or reach out to the [Relivator Discord server](https://discord.gg/Pb8uKbwpsJ) for assistance, or create a [GitHub Issue](https://github.com/blefnk/relivator-nextjs-template/issues). You can learn more about those scripts and the mentioned extension below in the current `README.md` file.

**If you'd like** to share your work, get/provide feedback, or ask for help, feel free to do so either [in our Discord server](https://discord.gg/Pb8uKbwpsJ) or [via GitHub discussions](https://github.com/blefnk/relivator-nextjs-template/discussions). **Note:** Currently, the instructions above may be outdated. Please contact us if something goes wrong; everything will be updated in Relivator 1.3.0.

## 🎶 Recommendation

> Coding becomes a whole new experience with the right music, doesn't it? Enhance your workflow with Relivator and enjoy the soothing melodies from the [MF Piano YouTube channel](https://youtube.com/@mfpiano). This channel, run by my brother, offers beautiful piano covers that are perfect for background music. Your subscriptions, views, likes, and comments would mean the world to us and help his channel grow. Thank you for your support!

## Scripts

The project includes various scripts designed to enhance your developer experience. You can run any script using your terminal. Please note that some CLI scripts may require you to adjust the height of your terminal window to avoid UI anomalies. The Relivator allows you to use the following:

1. **💪 Native Scripts**: These are commands configured in [package.json](package.json) and run by the package manager like [pnpm](https://pnpm.io), [bun](https://bun.sh), [yarn](https://yarnpkg.com), or [npm](https://nodejs.org/en/learn/getting-started/an-introduction-to-the-npm-package-manager). You can run these "native" scripts using commands like `pnpm [dev|build]` and `pnpm db:[push|studio]`.
2. **⚙️ Custom-Built Scripts**: These scripts are written in TypeScript and Python by Reliverse and the community and are mostly located in the `addons` folder. 🔥 *Please be cautious when using transformation scripts, as they are all in their initial versions. Ensure you commit your changes to your [version control provider](https://about.gitlab.com/topics/version-control) (such as [GitHub](https://github.com)) before using any of them.* They can be executed via the command line using `[appts|addons|reli|lint|fix]:*` or manually via `pnpm tsx path/to/file` or `py path/to/file` (e.g., `py addons/scripts/reliverse/relimter/python/tasks/math-to-mathjs.py`).
3. **🐍 Python Script Manager**: Can be executed using `reli:manager` or `py addons/scripts/reliverse/relimter/python/index.py`. Before running it, please read the [🐍 Python](#python) section below to learn how to prepare your workspace to run this manager.

### package.json

Below are some scripts configured in the `scripts` section of the `package.json` file (*the following text may be outdated in some places, please let us know if you find any inaccuracies*):

- **`pnpm appts` / `pnpm appts:putout` / `pnpm appts:verbose` / `pnpm appts:nobuild`**: These commands perform a comprehensive codebase check. They sequentially run `pnpm knip` for various codebase checks, `pnpm format` to format code with Biome (or Prettier, coming soon), and `pnpm lint` for linting with Biome and ESLint (`pnpm lint:eslint`). **Linting may take some time, so please be patient.** The `pnpm appts:putout` command also runs `pnpm lint:putout`. Using `pnpm appts:verbose` displays detailed ESLint progress, useful if you suspect ESLint is stuck (it may be slow, not stuck). You can manually resolve issues by pressing `Ctrl+S` multiple times in VSCode until there are no issues in the "Problems" tab. Usually, issues are resolved by the second or third run. If some specific issues persist, it may mean they are not automatically fixed. Please try to fix them manually, contact us, or disable the rule. Many rules in `eslint.config.js` are disabled by default; enable only what you need. You may also want to run `pnpm reli:setup` to choose the RulesDisabled preset if you want to disable all "error" and "warning" rules at once. `pnpm appts` then runs `pnpm typecheck` for remaining TypeScript errors and `pnpm build`, but you may try `pnpm turbo:appts`, which runs `pnpm turbo:build` to speed up builds using Turborepo v2. Note that **`pnpm turbo:appts`** is a faster, interactive version of `appts` but may not work well with the VSCode terminal. Alternatively, you can use `pnpm appts:nobuild`, which performs only checking, linting, formatting, and fixing, without building.
- **`pnpm fix:putout-unstable`**: [Putout](https://github.com/coderaiser/putout) is a linter and formatter. While the formatter fixes issues reported by the linter, the `fix:putout-unstable` command also makes changes not flagged by the linter. Ensure you commit your code before running this command, as it might cause unexpected changes. After running it, review and adjust the changes in your codebase using VSCode Source Control (Cmd/Ctrl+Shift+G) or GitHub Desktop.
- **`pnpm db:[push|studio|generate|migrate]`**: `push` converts the TypeScript Drizzle schema to SQL and sends it to the DATABASE_URL; `studio` runs Drizzle Studio on <https://local.drizzle.studio>; `migrate` applies migrations generated by the `generate` command (you may not need this command anymore), based on the `drizzle.config.ts` file.
- **`pnpm stripe:listen`**: Runs the Stripe webhook listener and helps set up Stripe environment variables. The [Stripe CLI](https://docs.stripe.com/stripe-cli) must be installed for this command to work.
- **`pnpm addons`**: This command allows you to headlessly run some of the scripts located in the `addons` folder. Many scripts are still not added there, so please check the `addons` folder and run them manually using `pnpm tsx path/to/file` or `py path/to/file`. This also includes the game @reliverse/academy. In the future, it will have many different interesting features. Currently, it is a quiz with a leaderboard and achievements where you can test your knowledge of Relivator, JavaScript, TypeScript, React, and even ESLint.
- **`reli:manager`**: Learn more in the [🐍 Python](#python) section below. This is the alias for the `py addons/scripts/reliverse/relimter/python/index.py` command.
- **`pnpm latest`**: Updates all project packages to their latest stable versions, including some specific packages to their latest versions on rc/beta/alpha/next/canary branches.
- **`pnpm reli:vscode [nothing|minimal|default|ultimate]`**: Enhances VSCode settings with presets by Reliverse. This script adjusts your `settings.json`, `extensions.json`, and `launch.json` files. It will prompt for confirmation before overriding current files. Use `RQ20` to learn more about `.vscode` presets and font installation for the `ultimate` preset, or use the `default` preset (which doesn't contain custom fonts and themes). Choose `default`, `minimal`, or `nothing` if your PC or virtual machine is very slow.
- **`pnpm reli:help`**: Displays useful information about Relivator and Reliverse.
- **`pnpm lint:compiler`**: Runs the React Compiler health check. Note that React Compiler is disabled by default; see the FAQ section for more details.
- **`pnpm tw:[v4|v3]`**: Switches between [Tailwind CSS](https://tailwindcss.com/) v3 and the alpha v4 version. **Important**: After using this command, adjust comments in `postcss.config.cjs`. **Also**: When using Tailwind CSS v4, remove or comment out `tailwindPlugin` from `eslint.config.js` as it doesn't support v4. Some additional changes in the codebase may be required.
- **`pnpm reli:prepare`**: Learn more about this script in the previous section (Cmd/Ctrl+F "It is recommended").

```bash
# pnpm tsx reliverse.config.ts --details
ℹ ▲ Framework: Relivator v1.2.6 ▲ Engine: Reliverse v0.4.0 ▲ Hotline: https://discord.gg/Pb8uKbwpsJ
ℹ Relivator v1.2.6 Release Blog Post 👉 https://reliverse.org/relivator/v126
ℹ Help Relivator become even better! Please star the repo – https://github.com/blefnk/relivator
ℹ For experienced users: run 'pnpm reli:prepare' to update all dependencies to the latest versions and check if the code requires any adjustments.
ℹ Meet quality standards: run 'pnpm appts' and 'pnpm fix:putout-unstable' to get linting, formatting, and more.
ℹ Unstable: try 'pnpm turbo:dev' and faster build with 'pnpm turbo:build': https://turbo.build/repo
ℹ The reactCompiler is enabled in next.config.js - it uses webpack now, so builds take longer.
ℹ Clerk: make sure to connect the domain in the Clerk dashboard so services like PageSpeed will work.
ℹ Please find Q21 in the FAQ of README.md. Copy the adapted bun scripts and replace the current ones in package.json - scripts for other package managers coming soon.
```

### Python

👋 Hello, dear friend! Nice to see you here! I (@blefnk Nazar Kornienko) have a dream of making the open-source world better and of higher quality. I aspire to leave my mark in history by ensuring people genuinely enjoy programming and create quality products. I'm particularly passionate about clean code. The book "Clean Code" by Robert Martin is a must-have!

That's why I've developed numerous tools in Relivator. Over the past few months leading up to Relivator 1.2.6, I've learned a lot. To avoid manually rewriting code, I've developed a unified script manager. The current version of the manager is still very unstable. You can visit the `addons/scripts/reliverse/relimter/python/index.py` file to learn more about how this script manager works.

If you want to use this `Python Script Manager` (refer to [⚙️ Script](#scripts) to read the introduction), then please ensure your workspace is properly prepared for it. Please note that most scripts are largely untested. Commit your code before running any script. Increase your VSCode terminal window size to avoid UI glitches. Need help? Visit our [Discord](https://discord.gg/Pb8uKbwpsJ). Follow the steps below to get started (scroll down to learn even more Python commands):

✅ After following the instructions above, you can safely run the script manager.

1. Install [Python](https://python.org/downloads) and [Ruff](https://docs.astral.sh/ruff/installation). Install the following VSCode extensions: [Python](https://marketplace.visualstudio.com/items?itemName=ms-python.python) and [Ruff](https://marketplace.visualstudio.com/items?itemName=charliermarsh.ruff).
2. Create a new `.venv` folder by pressing `Cmd/Ctrl+Shift+P` and running `>Python: Create Environment...` (VSCode will prompt you to choose the Python interpreter; choose the one installed in step 1). Then, choose `requirements.txt` as the package dependencies file.
3. Please note, VSCode's terminal automatically activates the environment after each launch. You can verify this by hovering over a [pwsh|bash|cmd] button in VSCode's terminal and looking for something like "`Python`: Activated environment for `.\.venv\Scripts\python.exe`". However, if you are using another IDE or an external terminal, you may need to activate the virtual environment manually: [Windows] `.venv/Scripts/activate`; [macOS/Linux] `source .venv/bin/activate`.
4. Ensure all requirement are installed correctly, just run `pip install -r requirements.txt`.

🐍 Everything ready? Nice! Congratulations! Try running the `Python Script Manager` now by executing: `reli:manager` or `py addons/scripts/reliverse/relimter/python/index.py`

### Useful Python Commands

*We are still working on this section. The following description may currently be slightly incorrect.*

```bash
# - Install the required dependencies:
pip install -r requirements.txt

# - Make sure you have `pip-tools` installed to use `pip-compile` and `pip-sync`:
pip install pip-tools

# - You can create/update a `requirements.txt` file:
pip freeze > requirements.txt

# - Sync the dependencies:
pip-sync requirements.txt

# - Remove a specific package (e.g., torch):
pip uninstall torch
pip freeze > requirements.txt
```

*Please note: If you have [UV](https://github.com/astral-sh/uv) installed and you've used a command like `uv pip install InquirerPy` and it shows an error like "The wheel is invalid", the easiest solution is to just use regular pip commands like `pip install InquirerPy`.*

## FAQ

**This is not only a Reliverse-specific FAQ but also a developers' FAQ for Next.js and the React ecosystem in general.**

- **RQ1:** How do I enable the brand new React 19's React Compiler? **RA1:** Please visit the `next.config.js` file, and inside the `experimental` section, find `reactCompiler` and set it to `true`. Additionally, it's recommended to install `pnpm -D babel-plugin-react-compiler`. There are great ESLint rules, but they are uninstalled by default because they enable Babel/Webpack, which may slow down the build. If you just installed this plugin, then open `eslint.config.js`, find, and uncomment things related to it (use `Cmd/Ctrl+F` and search for `compiler`).

- **RQ2:** How do I ensure my code is fully auto-fixed? **RA2:** Please note that you may need to press Cmd/Ctrl+S a few times to have the code fully fixed by various tools.

- **RQ3:** How can I check the project's health? **RA3:** Run `pnpm appts` or `pnpm turbo:appts` (unstable but interactive and faster) to check the project's health.

- **RQ4:** How can I update all packages to the latest version? **RA4:** For experienced developers, run `pnpm latest` to update all packages to the latest version. Alternatively, use 'pnpm reli:prepare' to update all dependencies and check if the code requires any adjustments.

- **RQ5:** Why do I sometimes see the notification `Invalid JSON. JSON5: invalid character '#'`? **RA5:** No worries, looks like you've `thinker.sort-json` VSCode extension installed, and it seems to be an incorrect error thrown by this extension. But it's not recommended to use external sort-json-like extensions, because we've configured `eslint-plugin-jsonc`, which already does sorting in the more predicted way. If you still need `thinker.sort-json`, looks like it can't sort JSON files in rare random cases, but it works fine on the next file save (if your file doesn't have issues, of course). If this error is causing significant problems, such as preventing you from adding a word to CSpell, you can set `source.fixAll.sort-json` to `never` in `editor.codeActionsOnSave` of `.vscode/settings.json`.

- **RQ6:** What should I do if I notice outdated information or other issues in the README.md or other files? **RA6:** In an effort to be as helpful as possible, this README contains a wealth of information. Some text may be outdated and will be updated as we grow. Please let us know on the [discussion page](https://github.com/blefnk/relivator-nextjs-template/discussions/6) if you notice any small issues like outdated info, broken links, or grammatical/spelling errors in README.md or other files.

- **RQ6:** What versions of React and Next.js does the project currently use? **RA6:** The project currently uses `react@canary`, `react-dom@canary`, and `next@canary`. If React 19 and/or Next.js 15 have already been fully released, please remove them from the `latest` script and run, for example, `npx nypm add react@latest react-dom@latest next@latest` in the terminal. You can do the same with any other rc-alpha-beta-next-canary-dev-experimental-etc dependencies, on your choice, if their stable version has already been released.

- **RQ7:** Where should I store project-specific files, and how do I handle ESLint issues? **RA7:** You can use the `src/cluster` folder to store project-specific files. This makes it easy to update Relivator to new versions. Learn more by visiting the Dashboard's main page on the development environment. After doing this, be prepared to see many issues pointed out by the ESLint config. Run `pnpm lint` to apply auto-fixes; **linting can take some time, so please be patient**. You may need to run `lint` or `lint:eslint` again if some issues are not fixed automatically. You can also open those files manually and press `Ctrl+S` multiple times until there are no issues in the VSCode "Problems" tab. Typically, by using the CLI, the issues will be resolved by the second or third run. Next, install the `Open Multiple Files` extension in VSCode; right-click on the `src/cluster` folder, select `Open Multiple Files`, and press Enter. Fix all issues. If you are proceeding incrementally, you can suppress certain ESLint/Biome rules (`// eslint-disable-next-line ...`, `// biome-ignore ...`, or completely disable the rule in the relevant config) or TypeScript errors (`@ts-expect-error`), though this is not recommended.

- **RQ8:** Weird things happening when formatting code? The code looks one way, and then the next second, it looks different? For example, you see the number of code lines increasing and then decreasing at the same time upon file saving? Without changing the code, does Biome notify you e.g. "Fixed 6 files" instead of "No fixes needed" when you rerun `pnpm appts`? **RA8:** Congrats! You've encountered a conflict between linters or formatters. First, we recommend opening the `.vscode/settings.json` file, finding the `eslint.rules.customizations` section, and changing the `severity` from `"off"` to `"info"` (if `"off"` is present). Setting it to `"info"` will help you realize that one of the conflicting parties is potentially a rule in that `eslint.rules.customizations`. Next, you can try to correct files like `eslint.config.js` (e.g., disable that conflicting rule), `biome.json`, `.vscode/settings.json`, etc. You can also try to disable Biome or ESLint formatters completely, by setting `biome.enabled` or `eslint.enable` (or `eslint.format.enable`) to "false" in the `.vscode/settings.json` file. What about that "Fixed 6 files" example? It means Biome changed code in some files in the way which is different from ESLint.

- **RQ9:** What should I do if I get a Babel warning about code generator deoptimization? **RA9:** This is a known issue and can be ignored. One of the reason occurs because the React Compiler is not yet fully natively supported by Next.js, it temporarily enables Babel to make the Compiler work. Also, don't worry if you see warnings thrown by Clerk, next-auth, or others when running `pnpm build` (mainly on Windows and Node.js); it's okay, this is a known issue not related to Relivator. It is also okay if pnpm tells you `Issues with peer dependencies found`; you can hide this warning by editing `pnpm.overrides` in the `package.json` file. **P.S.** Ignore the `Unexpected value or character.` error from Biome if you see it in the `globals.css` file. This is a false error, which you can hide by filtering `!globals.css` or just `!**.css` in the VSCode's Problems tab (use `!**.css, !**/node_modules/**` there if VSCode's Biome extension parses node_modules for some unknown reason).

- **RQ10:** Can I open multiple files in my VSCode? **RA10:** We recommend the `Open Multiple Files` extension. Just right-click on the desired folder, e.g., `src`, and choose "Open Multiple Files".

- **RQ11:** I have a strange `Each child in a list should have a unique "key" prop`. Any tips? **RA11:** If you see something like `at meta / at head` below this error, or `<locals>, but the module factory is not available. It might have been deleted in an HMR update.`, first try disabling `experimental.instrumentationHook`, if you have it, in `next.config.js`. You can also try deleting the `.next` folder. Please contact us if the problem persists.

- **RQ12:** Million Lint reports `Attempted import error: '__SECRET_INTERNALS_DO_NOT_USE_OR_YOU_WILL_BE_FIRED' is not exported from 'react' (imported as 'L').` during the A12#12 What should I do? **RA12:** The easiest solution is to copy the path to the component file that appears under this error and add it to `filter.exclude` in the `next.config.js` file. Generally, the key word is `use`. Click on the component path below this error. It seems Million has not listed every possible external `useSomething`. Many `useSomething` hooks work fine, but some may cause issues. This error is also triggered if you use `"use client";` but no client-specific features are utilized. In this case, remove this directive. Additionally, Million.js sometimes doesn't recognize the `import * as React from "react";` statement – so you need to remove it and explicitly import each React hook, type, etc. This line was removed from over 80 files in Relivator v1.2.6 for this reason.

- **RQ13:** Why do I see a warning in the terminal containing the message `terminating connection due to immediate shutdown command`? **RA13:** This warning occurs because providers like Neon disconnect users from `localhost` if they are inactive for about 5 minutes. Simply refresh the page to restore the connection.

- **RQ14:** How do I remove unused keys from JSON files? **RA14:** Install the `i18n Ally` VSCode extension, open its tab, click on refresh in the `usage report`, right-click on the found unused keys, and select remove.

- **RQ15:** How can I grant admin rights to myself or another user? **RA15:** Run `pnpm db:studio`, navigate to the `${databasePrefix}_user` table, and set `role: admin` for the desired user. In the future, if you have admin rights, you will be able to change user privileges directly from the frontend admin page.

- **RQ16:** What does the `DEMO_NOTES_ENABLED` environment variable mean? **RA16:** Do not use it. It is only used on the official [Relivator demo website](https://relivator.reliverse.org) to showcase certain features that are not needed in real-world applications.

- **RQ17:** I'm using PlanetScale as my database provider. After taking a break from the project, I'm now encountering an "unable to connect to branch" error. How can I fix this? **RA17:** Go to the PlanetScale dashboard and click on the `wake up` button. Please contact us if the database is not asleep and the problem persists.

- **RQ18:** I have build/runtime errors indicating that Node.js utilities like `net`, `tls`, `perf_hooks`, and `fs` are not found. What should I do? **RA18:** Do not install these utilities; it won't fix the issue. Remember, never keep code in the `utils` folder that *can only run on the server*. Otherwise, you will encounter anomalies during the project build. For example, an error like `node:` and `file:` not found, or the package `fs`, `crypto`, etc. not found. Want to see the error for yourself? Move the file `src/server/react.ts` to `src/utils`, import it in this file, run `pnpm build`, get scared, remove the import, and move the file back to its place. You may find on the web the solutions suggesting to add configurations like `"node": { "net": "empty", "tls": "empty", "perf_hooks": "empty", "fs": "empty" }` or `"browser": { "net": false, "tls": false, "perf_hooks": false, "fs": false }` into `package.json` or to the webpack config, but these may not help you. **The main issue likely lies in the following:** You've triggered client-side code. For example, you might have a hook file in the `utils` folder with a corresponding `useEffect` React hook. To debug, try using the global search functionality in the IDE. Note that commenting out the lines may not be the quickest solution in this case, unlike in other debugging scenarios.

- **RQ19:** I love all kinds of interesting things! Can you recommend any cool VSCode extensions? **RA19:** Of course! Just replace the current code in `.vscode/extensions.json` with the one from `addons/scripts/reliverse/presets/vscode/[default|minimal|ultimate]/extensions.json`. Remember, performance issues are possible, so you can just install what you want. Alternatively, you can just run the `pnpm reli:vscode` command to switch easily, and use `Cmd/Ctrl+Shift+P` ➞ `>Extensions: Show Recommended Extensions`.

  The best way to install this opinionated list of extensions, which are in the `ultimate` preset (although `default` is recommended by us), is to open the project folder in VSCode. Then, install them by using `Ctrl+Shift+P` (or just `F1`) and typing `>Extensions: Show Recommended Extensions`. Click on the cloud icon (`Install Workspace Recommended Extensions`). Wait for the completion. Click `File > Exit` (this will save all your open windows). Open VSCode again, and you are ready to go. The configuration for these extensions is already prepared for you. You can learn more about these extensions, which the `ultimate` preset contains, on the corresponding pages.

  *And, remember! If you have something broken, you always can find the default files content of `.vscode` folder in the `.vscode/presets/default` folder.*

  <details>
    <summary>[Reveal the spoiler]</summary>

  This list may be outdated, and will be updated in Relivator v1.3.x.

  1. [aaron-bond.better-comments](https://marketplace.visualstudio.com/items?itemName=aaron-bond.better-comments)
  2. [adpyke.codesnap](https://marketplace.visualstudio.com/items?itemName=adpyke.codesnap)
  3. [astro-build.houston](https://marketplace.visualstudio.com/items?itemName=astro-build.houston)
  4. [biomejs.biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
  5. [bradlc.vscode-tailwindcss](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss) // tw v3 == release version | tw v4 == pre-release version
  6. [chunsen.bracket-select](https://marketplace.visualstudio.com/items?itemName=chunsen.bracket-select)
  7. [davidanson.vscode-markdownlint](https://marketplace.visualstudio.com/items?itemName=davidanson.vscode-markdownlint)
  8. [dbaeumer.vscode-eslint](https://marketplace.visualstudio.com/items?itemName=dbaeumer.vscode-eslint)
  9. [evondev.indent-rainbow-palettes](https://marketplace.visualstudio.com/items?itemName=evondev.indent-rainbow-palettes)
  10. [fabiospampinato.vscode-open-multiple-files](https://marketplace.visualstudio.com/items?itemName=fabiospampinato.vscode-open-multiple-files)
  11. [github.copilot-chat](https://marketplace.visualstudio.com/items?itemName=github.copilot-chat)
  12. [github.github-vscode-theme](https://marketplace.visualstudio.com/items?itemName=github.github-vscode-theme)
  13. [lokalise.i18n-ally](https://marketplace.visualstudio.com/items?itemName=lokalise.i18n-ally)
  14. [mattpocock.ts-error-translator](https://marketplace.visualstudio.com/items?itemName=mattpocock.ts-error-translator)
  15. [mikekscholz.pop-icon-theme](https://marketplace.visualstudio.com/items?itemName=mikekscholz.pop-icon-theme)
  16. [mylesmurphy.prettify-ts](https://marketplace.visualstudio.com/items?itemName=mylesmurphy.prettify-ts)
  17. [neptunedesign.vs-sequential-number](https://marketplace.visualstudio.com/items?itemName=neptunedesign.vs-sequential-number)
  18. [oderwat.indent-rainbow](https://marketplace.visualstudio.com/items?itemName=oderwat.indent-rainbow)
  19. [streetsidesoftware.code-spell-checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)
  20. [unifiedjs.vscode-mdx](https://marketplace.visualstudio.com/items?itemName=unifiedjs.vscode-mdx)
  21. [usernamehw.errorlens](https://marketplace.visualstudio.com/items?itemName=usernamehw.errorlens)
  22. [usernamehw.remove-empty-lines](https://marketplace.visualstudio.com/items?itemName=usernamehw.remove-empty-lines)
  23. [yoavbls.pretty-ts-errors](https://marketplace.visualstudio.com/items?itemName=yoavbls.pretty-ts-errors)
  24. [yzhang.markdown-all-in-one](https://marketplace.visualstudio.com/items?itemName=yzhang.markdown-all-in-one)
  25. [zardoy.ts-essential-plugins](https://marketplace.visualstudio.com/items?itemName=zardoy.ts-essential-plugins)

  **"TypeScript Essential Plugins" Extension Notes**: You can configure extension settings by opening VSCode Settings UI and searching for `@ext:zardoy.ts-essential-plugins` there. The quote from [VSCode Extension Repository](https://github.com/zardoy/typescript-vscode-plugins#readme): «Feature-complete TypeScript plugin that improves every single builtin feature such as completions, definitions, references and so on, and also adds even new TypeScript killer features, so you can work with large codebases faster! We make completions more informative. Definitions, references (and sometimes even completions) less noisy. And finally our main goal is to provide most customizable TypeScript experience for IDE features.»

  </details>

- **RQ20:** *[Related to the previous question]* How can I improve my visual experience with VSCode? **RA20:** The project already has a well-configured `.vscode/settings.json`, but we recommend using our very opinionated configs presets. You have choice to install `default` or `ultimate` (`default` is recommended). **To activate the preset run `pnpm reli:vscode`.** For `ultimate` preset don't forget to install the required stuff: the static, means not variable, versions of [JetBrains Mono](https://jetbrains.com/lp/mono) (recommended) and/or [Geist Mono](https://vercel.com/font) and/or [Monaspace](https://monaspace.githubnext.com) (small manual configuration not or may be needed if you don't want to use `JetBrains Mono` on `ultimate` preset). Next, for `ultimate`, install the recommended `pop-icon-theme` VSCode icons pack extension. Finally, make sure to install the extensions from `Q19`, especially, install the recommended by us `GitHub Light` and `Houston` (by Astro developers) themes. Please note that after installing the Houston theme, you will find a new corresponding tab on the sidebar (🧑‍🚀 there is your new friend, which reacts while you've code issues!), you can of course remove this tab by right-clicking, but we recommend simply dragging this panel to the bottom of the Folders tab.

  - TODO: Fix 'Geist Mono' and 'Monaspace Argon Var', which looks like use Medium/Bold variation instead of Regular (`"editor.fontWeight": "normal"` doesn't help here). 'JetBrains Mono' works fine.*
  - TODO: Do we really need to duplicate fonts for every single thing?* 🤔

<!--
  - **RQ??:** [Related to the previous question] Why did you switch the behavior of the `Cmd/Ctrl` and `alt/opt` keys?
    **RA??:** Please note that you may need to press Cmd/Ctrl+S a few times to have the code fully fixed by various tools.
-->

<!--
  - **RQ??:** [Relivator 1.3.0] How can I improve the experience with the CSpell (Code Spell Checker) extension?
    **RA??:** Install the [CSpell VSCode extension](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker), install the CSpell npm package as a dev dependency if it's not installed (check your `package.json` file), install the necessary packages using your package manager (by using `npx nypm add -D @cspell/dict-companies @cspell/dict-de-de @cspell/dict-es-es @cspell/dict-fr-fr @cspell/dict-fullstack @cspell/dict-it-it @cspell/dict-markdown @cspell/dict-npm @cspell/dict-pl_pl @cspell/dict-tr-tr @cspell/dict-typescript @cspell/dict-fa-ir @cspell/dict-uk-ua cspell`), and add these lines to the `cspell.json` file:

    ```json
    {
      "import": [
        "@cspell/dict-typescript/cspell-ext.json",
        "@cspell/dict-companies/cspell-ext.json",
        "@cspell/dict-fullstack/cspell-ext.json",
        "@cspell/dict-markdown/cspell-ext.json",
        "@cspell/dict-npm/cspell-ext.json",
        "@cspell/dict-de-de/cspell-ext.json",
        "@cspell/dict-es-es/cspell-ext.json",
        "@cspell/dict-fa-ir/cspell-ext.json",
        "@cspell/dict-fr-fr/cspell-ext.json",
        "@cspell/dict-it-it/cspell-ext.json",
        "@cspell/dict-pl_pl/cspell-ext.json",
        "@cspell/dict-tr-tr/cspell-ext.json",
        "@cspell/dict-uk-ua/cspell-ext.json"
      ]
    }
    ```
-->

- **RQ21:** How do I switch the package manager from `pnpm` to bun, yarn, or npm? **RA21:** Here's a variant of `scripts` for `bun`, but it not tested too much by us. Scripts presets for other package managers coming with Relivator 1.3.0. Just replace it in `package.json` (and make sure it don't miss anything).

  <details>
    <summary>[Reveal the spoiler]</summary>

  Just find and remove `packageManager` key, if present, and then replace only these specific lines by bun's alternatives:

  ```json
  {
    "scripts": {
      "check:compiler": "bunx react-compiler-healthcheck@latest",
      "fix:codemod-next-community": "bunx @next/codemod --dry --print",
      "fix:codemod-react": "bunx codemod react/19/replace-use-form-state --target src",
      "install:global": "bun add -g vercel@latest codemod@latest eslint_d@latest",
      "latest:all": "bun update --latest",
      "putout:dont-run-manually": "bun lint:putout . --fix",
      "reli:prepare": "bun install && bun latest && bun appts",
      "rm:other": "bun fse remove .million && bun fse remove .eslintcache && bun fse remove tsconfig.tsbuildinfo"
    }
  }
  ```

  </details>

  After you have replaced the scripts, open the project folder and close VSCode. Delete `node_modules` and `pnpm-lock.yaml`. Open the project in a terminal and run `npx nypm install`. After that, you can reopen VSCode. You're done!

- **RQ22:** I applied the `default`/`ultimate` preset settings in VSCode, and now my IDE is slow when I save a file. **RA22:** Go to the keybindings in VSCode, set `Save without Formatting` to `Ctrl+S` (`Cmd+S`), and `File: Save` to `Ctrl+Shift+S` (`Cmd+Shift+S`). Don't worry if the code might be messy when saving without formatting. Just run pnpm appts and everything will be improved and formatted. You're welcome! P.S. You can also read the VSCode's [Performance Issues](https://github.com/microsoft/vscode/wiki/Performance-Issues) article.

  <details>
    <summary>[Reveal the spoiler]</summary>

  **keybindings.json** (`F1`->`>Preferences: Open Keyboard Shortcuts (JSON)`):

  ```json
  [{
    "command": "workbench.action.files.save",
    "key": "ctrl+shift+s"
  }, {
    "command": "workbench.action.files.saveWithoutFormatting",
    "key": "ctrl+s"
  }, {
    "command": "workbench.action.nextEditor",
    "key": "ctrl+tab"
  }, {
    "command": "workbench.action.previousEditor",
    "key": "ctrl+shift+tab"
  }]
  ```

  </details>

- **RQ23:** What does index.ts do in the server and utils folders? **RA23:** These are called barrel files. You can make imports more convenient in your project by using the barrel approach. To do this, use index.ts files to re-export items from other files. Please note: keep code that can only run on the server in the server folder. Code that can run on both the server and client sides should be kept in the utils folder. Relivator 1.2.6 currently violates this description, so we should fix it in v1.3.0. Typically, server functions look like getDoSomething. Additionally, do not import code from the server folder into .tsx files that use React Hooks (useHookName), except when the component has useTransition or similar, which allows you to perform a server action from within the client component.

- **RQ24:** Why do I see console.[log|info|warn|error|...] only in the browser console and not in the terminal from which the application was launched? **RA24:** If I (@blefnk) researched correctly, it is because you are calling console() in a client-side component (which has the "use client" directive at the top of the file or uses React Hooks). It looks like the terminal works as a server environment. Try calling console() in a file that does not have that directive and hooks. Or just use toasts which works nice with both on the client and the server side.

- **RQ25:** I'm getting strange VSCode extension errors, what should I do? **RA25:** Don't worry, these are just editor anomalies. **Just restart your VSCode, and you're done.** Sometimes, due to insufficient RAM, internal extension failures, or other reasons, a particular extension might crash. Especially anomalous is the notification from TypeScript ESLint stating that it can have no more than 8 entry files (we will try to fix this in 1.3.0). Or Biome might start linting `node_modules` for some reason, which is also strange to us; our attempts to fix this so far have been unsuccessful, but we will try again in 13.0. Besides this, an extension crash might also happen if you just used `pnpm reli:setup` and didn't restart the editor. Or if you manually edited a configuration file and since autosave was enabled, the editor managed to send the configuration with syntax errors to the extension, causing everything to crash. So, restart VSCode, and everything will be fixed! If that doesn't help, check if your configuration files have any issues.

- **RQ26:** How do I change VSCode's panel position? **RA26:** Just right-click on the panel, select `Panel Position`, and choose the desired position, e.g., `Bottom`.

- **RQ27:** I have the correct data (key-value) specified in the `.env` file, but a certain library, for example, Clerk, does not see this data or sees outdated data. What can I do? **RA27:** The simplest solution is to just rename your project folder, run `pnpm install`, and check if the issue is resolved. Otherwise, contact the technical support and community of the respective library.

- **RQ28:** How can I configure `pnpm` or `bun` (as package manager) for my needs? **RA28:** You can visit [this `pnpm` page](https://pnpm.io/package_json) or [this `bun` page](https://bun.sh/docs/runtime/bunfig#package-manager) in the official docs to learn more.

**RQ29:** Should I modify the components by [shadcn/ui](https://ui.shadcn.com) (as of Relivator 1.2.6, they are located in the `"addons/components/ui"` folder)? **RA29:** You may lose your changes if @shadcn or [Reliverse](https://github.com/orgs/reliverse/repositories) updates any of these components in the release of Relivator 1.3.x+. Therefore, the best option currently is to use, for example, the `"addons/cluster/reliverse/shadcn/ui"` folder, where you can have files that you can safely overwrite the original files with, ensuring you do not lose your changes. As an example, this folder already contains a `cluster-readme.tsx` file, which only re-exports the original `button.tsx` file. So, you can create a `button.tsx` file here and copy and paste that line into your newly created file. Alternatively, you can duplicate the code from the original file and make any modifications you want. Use `Cmd/Ctrl+Shift+H` and simply replace `addons/components/ui` with `addons/cluster/reliverse/shadcn/ui` (the difference is only in the words `"browser"` and `"cluster"`). `addons/cluster` is your house; feel free to do anything you want here, mess it up or tidy it up as you wish. This is your own house, and no one has the right to take it away from you.

- **RQ30:** Which command allows me to easily manage the installation of dependencies in a project? **RA30:** `pnpm deps:install`. However, before running this script, you should manually install the essentials:

  - npx nypm add typescript tsx nypm @mnrendra/read-package @clack/prompts
  - npx nypm add fs-extra pathe fast-npm-meta semver @types/semver redrun axios
  - bun|yarn|pnpm dlx jsr add @reliverse/core (or: npx jsr add @reliverse/core)

- **RQ31:** I noticed a [Turborepo](https://turbo.build) file named `turbo.disabled.json`. How can I reactivate `turbo`? **RA31:** Simply remove the `.disabled` from the filename. You can also add the `"scripts"` from the `turbo.scripts.json` file to the `package.json` file (if they are not already there).

- **RQ32:** Where can I find out more details about the Relivator and Reliverse? **RA32:** Read the current README.md file to learn more about each specific aspect of the project. You can also find more information on the project's [Discord](https://discord.gg/Pb8uKbwpsJ) server and on the [GitHub Issues](https://github.com/blefnk/relivator-nextjs-template/issues) page.

## Details

🌐 <https://relivator.reliverse.org>

<img src="/public/screenshot-dark.png" width="600" alt="Screenshot showing the main page of the Relivator project">

We've laid the groundwork—now it's time to dive in and accelerate development. And yeah, have fun! Think of Relivator and Reliverse as a sandbox! It's like Minecraft; with Relivator, you can build anything, as creativity knows no bounds! Explore all the new features of Next.js 13-15 and many other web technologies right here, right now—with Relivator.

> ~~Minecraft~~ Reliverse is to a large degree about having unique experiences that nobody else has had. The ~~levels~~ website templates are ~~randomly~~ elegantly ~~generated~~ bootstrapped, and you can build anything you want to build yourself. © ~~Markus Persson~~ [@blefnk](https://github.com/blefnk)

For real, if you've been exploring which Next.js starter to select for your next project–the search can end here. **If you want a POWERHOUSE**—Relivator is suitable for every scenario—then **Relivator is definitely the starter you need**. Fork it right now! Relivator incorporates numerous features found in other templates and strives to push the limits of Next.js and React capabilities. With Relivator, the opportunities are boundless!

You can even think of Relivator as a Next.js framework! So grab it and enjoy! And don't forget: feedback and stars mean the world to us. Hit that star button! Fork it! Your involvement propels the project to new heights! If you have coding skills, contributions are always welcome!

If you run into issues, join our repository discussions, open an issue, or DM us on: [Discord](https://discord.gg/Pb8uKbwpsJ), [Twitter/X](https://x.com/blefnk), [Fiverr](https://fiverr.com/blefnk), [LinkedIn](https://linkedin.com/in/blefnk), or [Facebook](https://facebook.com/blefnk).

This project has big plans, and we appreciate all the help we can get! If you're eager to contribute, check out the Project Roadmap above to see potential improvements for the project. Also, use `Cmd/Ctrl+Shift+F` in VSCode and search for `TODO:` to find areas that need attention. Please visit the **[Issues](https://github.com/blefnk/relivator-nextjs-template/issues)** tab for more opportunities to help out.

## Project Structure

**Only a few of the files are listed here.** This section will be updated in the future versions.

- [.vscode](https://code.visualstudio.com)
  - presets
  - [extensions.json](https://code.visualstudio.com/docs/editor/extension-marketplace)
  - [launch.json](https://code.visualstudio.com/docs/nodejs/nodejs-debugging#_launch-configuration-attributes)
  - [settings.json](https://code.visualstudio.com/docs/getstarted/settings)
- src
  - [env.js](https://create.t3.gg/en/usage/env-variables)
  - [middleware.ts](https://nextjs.org/docs/app/building-your-application/routing/middleware)
  - ...
- [biome.json](https://biomejs.dev/reference/configuration)
- [cspell.json](https://cspell.org/configuration)
- [eslint.config.js](https://eslint.org/docs/latest/use/configure/configuration-files)
- [knip.json](https://knip.dev/reference/configuration)
- [next.config.js](https://nextjs.org/docs/app/api-reference/next-config-js)
- [package.json](https://docs.npmjs.com/cli/v10/configuring-npm/package-json)
- [README.md](https://docs.github.com/en/get-started/writing-on-github/getting-started-with-writing-and-formatting-on-github/basic-writing-and-formatting-syntax)
- [reliverse.config.ts](https://github.com/blefnk/reliverse)
- [reset.d.ts](https://totaltypescript.com/ts-reset)
- [tsconfig.json](https://typescriptlang.org/docs/handbook/tsconfig-json.html)
- [typestat.json](https://github.com/JoshuaKGoldberg/TypeStat#readme)
- ...

## Configuration

**First thing first, refer to the [`.env.example`](.env.example) file as the guide. Simply copy data from it to a new `.env` file.**

*The instructions below may be outdated, so please double-check them! We will fully update this README.md with the Relivator 1.3.0 release.*

🎉 Everything is optional in `.env` file starting from Relivator 1.2.6! You can deploy Relivator without a .env file! But ensure you verify what's necessary. Though the application will run without certain variables, missing ones may deactivate specific features.

Ensure that default values are defined for essential environment variables. Never store secrets in the `.env.example` file. For newcomers or repo cloners, use `.env.example` as a template to create the `.env` file, ensuring it's never committed. Update the schema in `/src/env.js` when adding new variables.

Further [information about environment variables is available here](https://nextjs.org/docs/app/building-the-application/configuring/environment-variables).

*A cleaner and improved version of this section is coming soon. Stay tuned!*

In the 1.1.0 Relivator release, the `.env.example` file was greatly simplified and will be streamlined even further in upcoming versions. We aim to ensure that unspecified values will simply deactivate related functionality without halting app compilation.

## Payments

Refer to the [`.env.example`](.env.example) file as the guide for where and how to get all the important environment variable keys for Stripe, including webhooks for both localhost and deployment.

Locally, install the [Stripe CLI](https://stripe.com/docs/stripe-cli) and run the command `pnpm stripe:listen` to initiate the Stripe webhook listener. This action connects Stripe to the account and generates a webhook key, which you can then set as an environment variable in Stripe's settings.

When testing Stripe, you can use its test data: `4242424242424242` | `12/34` | `567` | `Random Name` | `Random Country`.

Please refer to the [src/app/api/webhooks/stripe/route.ts](src/app/api/webhooks/stripe/route.ts) file for more details on how Stripe works in the app. You can also visit the [official Stripe repository](https://github.com/stripe/stripe-node#readme), where you'll find a lot of useful information.

## Database

Relivator uses [Drizzle ORM](https://orm.drizzle.team) for database management. By default, the project uses [Neon](https://neon.tech) (Serverless) with [PostgreSQL](https://neon.tech/docs/postgresql/introduction) as the database provider. The project has already followed [Drizzle's guide](https://orm.drizzle.team/learn/tutorials/drizzle-with-neon) on how to set up Drizzle with Neon Postgres.

**August 4, 2024: Hot Update**:

If you use `neon` as your database provider, you no longer need `pnpm db:studio`; simply use Drizzle Studio on [Neon's website](https://neon.tech) 🎉

For development databases without important data, you can use `pnpm db:push`. For production databases containing important data, it is recommended to use `pnpm db:generate` followed by `pnpm db:migrate`.

> Drizzle Kit lets you alter you database schema and rapidly move forward with a [pnpm db:push](https://orm.drizzle.team/kit-docs/overview#prototyping-with-db-push) command. That’s very handy when you have remote databases like Neon, Planetscale or Turso. The 'push' command is ideal for quickly testing new schema designs or changes in a local development environment, allowing fast iterations without the overhead of managing migration files. © [Drizzle Team](https://orm.drizzle.team/learn/tutorials/drizzle-with-neon)

**Drizzle Team**: If you want to iterate quickly during local development or if your project doesn’t require migration files, Drizzle offers a useful command called drizzle-kit push. **When do you need to use the ‘push’ command?** **1.** During the prototyping and experimentation phase of your schema on a local environment. **2.** When you are utilizing an external provider that manages migrations and schema changes for you (e.g., PlanetScale). **3.** If you are comfortable modifying the database schema before your code changes can be deployed.

**Note**: NEXT_PUBLIC_DB_PROVIDER was removed in Relivator v1.2.6. To switch the provider from Neon, modify `drizzle.config.ts`. To use MySQL or LibSQL providers, update the files inside `src/db`. An automatic switcher is coming in Relivator version 1.3.x.

*The instructions below may be outdated, so please double-check them! We will fully update this README.md with the Relivator 1.3.0 release.*

Relivator is designed to effortlessly support both MySQL and PostgreSQL databases. While PostgreSQL and [Neon](https://neon.tech) are the default configurations, switching to MySQL provided by [Railway](https://railway.app?referralCode=sATgpf) or [PlanetScale](https://planetscale.com), or to PostgreSQL provided by [Railway](https://railway.app?referralCode=sATgpf) or [Vercel](https://vercel.com/storage/postgres) is straightforward. Adjust the database configuration inside [drizzle.config.ts](./drizzle.config.ts) and the `src/db/*` files accordingly. Although Relivator is optimized for these providers, other providers compatible with Drizzle and Auth.js (next-auth@beta/NextAuth.js) might also work with some additional setup. Full SQLite support is coming soon.

To set up the `DATABASE_URL` in the `.env` file, refer to `.env.example`. Initiate a new database or propagate schema changes by executing the `pnpm db:push` command. This ensures that all changes made to the schema files in `src/db/*` are mirrored in the selected database provider.

For database migrations, use the `pnpm db:generate` command, review the `drizzle` folder to ensure everything is correct, and run the `pnpm db:migrate` command when ready. If necessary, use `pnpm db:drop` to manage reversals in a controlled way.

If you used Relivator before v1.2.6, you may remove the `drizzle` folder inside the root directory. **Possible outdated information:** Do not manually delete files from the `drizzle` directory. Instead, use the [`pnpm db:drop` command](https://orm.drizzle.team/kit-docs/commands#drop-migration) if a migration needs to be reversed.

We ensure consistent database configuration by using the setup inside `drizzle.config.ts` and exporting configurations in `src/db/index.ts` and `src/db/schema/index.ts`. When selecting a database provider, comment out or remove unneeded providers in the `switch-case` of these files and remove related schema files as necessary. Additional adjustments in other files may also be required. An automatic switcher is coming soon in the Relivator v1.3.0 release.

**Historical context**: In Relivator v1.1.0, we aimed to provide simultaneous support for both MySQL and PostgreSQL for Drizzle ORM. In future releases, we plan to integrate Prisma ORM, making the project even more inclusive.

## Product Categories and Subcategories

To edit product categories, please refer to the `MySQL`, `PostgreSQL`, or `LibSQL` corresponding schema file in the `src/db/schema` folder.

After editing these files, don't forget to run `pnpm db:push` to apply the changes. Or run `pnpm generate` to create a sharable SQL, which another developers may apply with `pnpm migrate` to edit theirs database tables easily.

Then, simply update the category names and subcategories in the [products file](src/constants/products.ts) accordingly.

## Additional Notes About Stripe

*The instructions below may be outdated, so please double-check them! We will fully update this README.md with the Relivator 1.3.0 release.*

The Stripe webhook API route does not need to be invoked explicitly within the application, such as after a user selects a subscription plan or makes a purchase. Webhooks operate independently of user actions on the frontend and serve as a means for Stripe to relay events directly to the server.

When an event occurs on Stripe's end, such as a successful payment, Stripe generates an event object. This object is then automatically sent to the endpoint you've specified, either in the Stripe Dashboard or, for testing purposes, in the `package.json` via the Stripe CLI. Finally, the server's API route receives the event and processes it accordingly.

For example, when a user selects a subscription plan, you would typically first use Stripe's API to create either a `Payment Intent` or `Setup Intent` object. This action can be executed either on the client-side or the server-side. The frontend then confirms the payment using Stripe.js, thereby completing the payment or subscription setup process.

The webhook is automatically triggered based on these events. There's no need to manually "call" the webhook route; Stripe manages this for you according to the settings in the Stripe Dashboard or in the `package.json` for local testing.

After deploying the app, don't forget to specify the webhook URL in the Stripe Dashboard. Navigate to the Webhooks section and enter the following URL: `https://thedomain.com/api/webhooks/stripe`.

In summary, there's no need to specify the path to the Stripe API route where the user selects a subscription plan. The webhook mechanism operates independently and is triggered automatically by Stripe.

## Internationalization

*Stay tuned for further expansions to this section in the future.*

*The instructions below may be outdated, so please double-check them! We will fully update this README.md with the Relivator 1.3.0 release.*

Multilingualism at Bleverse Reliverse vision is revered. We adore discussing it and plan to delve into the topic of Next.js 15 App Router internationalization in future writings.

Presently, all languages are machine-translated. Future revisions by native speakers are planned.

useTranslations works both on the server and client; we only need the getTranslations on async components.

*Currently not available.* Use `pnpm lint:i18n` to verify the i18n files. The tool attempts to rectify issues when possible, offering features like ascending sort. No output means everything is in order.

We are using *next-intl* for internationalization. Sometime we can use beta/rc versions as needed. Find more information about it [here](https://next-intl-docs.vercel.app/blog/next-intl-3-0) and [here](https://github.com/amannn/next-intl/pull/149).

### How to add a new language

*The process described below will be simplified and automated in the future. Please let us know if you have any further questions regarding the current process for adding languages.*

1. We will need an [i18n code](https://saimana.com/list-of-country-locale-code/) (in the format `language-country`; the language code alone is sufficient, but it's not optimal for SEO). For example, let's take Chinese, for which I know the codes *zh-cn/zh-tw/zh-hk* are used.
2. Open the `messages` folder and create a `zh-cn.json` file with the example content: `{ "metadata": { "description": "建立更高效、更吸引人且更有利可图的在线商店：使用 Relivator" } }`.
3. Now open `src/i18n.ts` and add `"zh-cn": zh_cn` with the appropriate `import` at the top.
4. In the file `src/navigation.ts`, add the corresponding values to `locales` and `labels`.
5. Run `pnpm dev` and review the landing page header. If it appears correctly, you're ready to go.
6. Optionally, I recommend using the VSCode extension [i18n Ally](https://marketplace.visualstudio.com/items?itemName=Lokalise.i18n-ally), which makes machine translation easy.
7. Also optionally, install [specific CSpell language](https://github.com/streetsidesoftware/cspell-dicts#language-dictionaries) for full support of this language in VSCode (when using the "[Code Spell Checker](https://marketplace.visualstudio.com/items?itemName=streetsidesoftware.code-spell-checker)" extension). If the language is not available, try to find a word dictionary file on the web or make a new one (see CSpell docs).

By the way, **if the country flag is not displayed**: open `src/localization-main.tsx`, go to *LocaleFlagIcon* and add the `else if`. Please visit the [flag-icons library website](https://flagicons.lipis.dev/) to see the code for the missing icon. The example for *zh-cn* will be: `} else if (baseLocale === "zh") { return <span aria-hidden="true" className="fi fi-cn mr-2" />; }`

Please be aware that both the "i18n Ally" VSCode extension and manual systems like "Google Translate" may incorrectly translate variables. If you encounter an error like this:
Original Message: 'The intl string context variable "类别" was not provided to the string "购买最好的{类别}"'.
This error occurs because we have {类别}, but it should be {category}. To verify the correct variable, refer to the en-us.json file.Certainly! So the correct version for this specific case will be:

```json
{
  "categories": {
    "buyFromCategories": "从最好的商店购买 {category}",
    "buyProducts": "购买 ${category} 类别的产品",
    "buyTheBest": "购买最好的 {category}"
  }
}
```

**Currently supported locales (you can add the own manually):**

- de, en, es, fa, fr, hi, it, pl, tr, uk, zh.
- de-DE, en-US, es-ES, fa-IR, fr-FR, hi-IN, it-IT, pl-PL, tr-TR, uk-UA, zh-CN.

## Principles, Design Decisions, Code Insights, Recommendations

> «There are a lot of impractical things about owning a ~~Porsche~~ Relivator. But they're all offset by the driving experience. It really is unique. ~~Lamborghinis~~ create-t3-app and ~~Ferraris~~ Vercel Store come close. And they are more powerful in specific cases, but they don't handle like a ~~Porsche~~ Relivator.» © ~~Kevin O'Leary~~ [@blefnk](https://github.com/blefnk)

*We're continuously improving this section. Contributions are welcomed!*

Our starter aims to be a rich resource for developers at all stages of their journey. Within the comment blocks and dedicated sections at the end of select files, you'll find valuable insights and clarifications on a wide array of topics. Contributions to enhancing these educational nuggets are highly encouraged!

**Principles (W.I.P):**

- [ ] Prettier's principle over linters related to developer experience ([source](https://prettier.io/docs/en/integrating-with-linters.html#notes)): "You end up with a lot of red squiggly lines in the editor, which gets annoying. Prettier is supposed to make you forget about formatting – and not be in the face about it!"
- [ ] Every file and component should be built consciously, using [KISS/DRY/SOLID/YAGNI principles](https://blog.openreplay.com/applying-design-principles-in-react) with a certain sense of intelligence, and with performance in mind.
- [ ] We need to think of the project as if it were a planet with its own continents, countries, cities, rooms, individuals, entities, etc.

**Advanced Environment Variables:**

The `.env.example` file covers all the essential variables for a fully functional website, tailored for beginners. However, if you require advanced configurations, you can modify any value in the `.env` file as needed.

**About the Plugins Folder:**

This folder contains optional plugins for Relivator. Developed by @blefnk and other contributors, these plugins extend functionality and provide additional features. If you find that certain plugins are not beneficial for the project, feel free to remove their corresponding folders.

**Function Over Const for Components:**

We advocate the use of the `function` keyword instead of `const` when defining React components. Using `function` often improves stack traces, making debugging easier. Additionally, it makes code semantics more explicit, thereby making it easier for other developers to understand the intentions.

**Personal Recommendations:**

We advise regularly clearing the browser cache and deleting the `.next` folder to ensure optimal performance and functionality.

Currently, we don’t utilize Contentlayer due to its instability with Windows. Therefore, we're exploring options for its usage in the `.env` configuration file. Future plans might involve developing our own solution for content writing. Integration with external providers, such as Sanity, may also be a future feature, with corresponding enable/disable options.

NOTE from the [Contentlayer Issues Page](https://github.com/contentlayerdev/contentlayer/issues/313#issuecomment-1305424923): Contentlayer doesn't work well with `next.config.mjs`, so you need to have `next.config.js`. Other libraries may also require this. If you're sure you need `.mjs` and don't plan to use Contentlayer, rename it.

**Project Configuration:**

The `src/app.ts` file hosts main configurations to modify website contents and settings, enabling you to:

- Control the content presented on the website.
- Adjust various settings, such as deactivating the theme toggle.
- Manage generic site-wide information.

Customize this file as per the requirements.

**Authentication:**

Setting up authentication is straightforward.

You can configure available sign-in providers for Clerk in the `src/app.ts` file.

Please remember that Clerk fully works with third-party services like "Google PageSpeed Insight" only when domain and live keys are used.

*This section will be implemented soon.*

**TypeScript Config:**

In the `tsconfig.json` file you can set the options for the TypeScript compiler. You can hover over on each option to get more information about. Hint: You can also press Shift+Space to get auto-completion. Learn more by checking the official TypeScript documentation: @see <https://typescriptlang.org/docs/handbook/tsconfig-json> @see <https://totaltypescript.com/tsconfig-cheat-sheet>.

Next.js has built-in support for TypeScript, using plugin below. But while you use `pnpm build`, it stops on the first type errors. So you can use `pnpm typecheck` to check all type warns/errors at once.

Config includes Atomic CSS plugin in the style attribute. Type-safe static styles with theming, responsive variant support, and no bundler integration. @see <https://github.com/tokenami/tokenami#readme>.

You can enable strict type checking in MDX files by setting `mdx.checkMdx` to true.

These options below can be dangerously set to false, while you're incrementally move to full type-safety.

```json
{
  "alwaysStrict": true,
  "noImplicitAny": false,
  "strict": true,
  "strictNullChecks": true,
  "strictPropertyInitialization": true,
  "verbatimModuleSyntax": true
}
```

**How to Deploy the Project:**

Please check the *How to Install and Get Started* section before making the initial deployment.

Consult the deployment guides for [Vercel](https://create.t3.gg/en/deployment/vercel), [Netlify](https://create.t3.gg/en/deployment/netlify), and [Docker](https://create.t3.gg/en/deployment/docker) for further details. The project has only been tested on Vercel; please inform us if you encounter issues with other deployment services.

**Styling, Design System, UI Components:**

TODO: Implement design system and style guide.

By default, this project includes components from various libraries, as well as unstyled [shadcn/ui](https://ui.shadcn.com) components. Shadcn/ui even allows you to generate new UI components using its CLI (where "button" can be any Shadcn UI element): `pnpm dlx shadcn-ui@latest add button`.

W.I.P. — Use `pnpm css` to watch for [CSS tokens](https://blog.devgenius.io/link-figma-and-react-using-figma-tokens-89e6cc874b4d) in accordance with the project's design system. [Tokenami](https://github.com/tokenami/tokenami#readme) and Figma are anticipated to be utilized for this concept. For additional information, refer to points #33 and #90 in the Relivator's Roadmap.

**Package Manager Compatibility:**

`Relivator` can already harness some fantastic **[`Bun`](https://bun.sh)** features. For this starter, we currently recommend using `pnpm`. Full pnpm support and compatibility will be shipped as soon as [Reliverse](https://github.com/blefnk/reliverse)'s [Versator](https://github.com/blefnk/versator) achieves full similarity with Relivator. *Section expansion coming soon.*

**Recommended Things to Learn:**

1. [The Detailed Git Guide](https://github.com/blefnk/relivator-nextjs-template/blob/main/.github/GITGUIDE.md) by [Nazar Kornienko @Blefnk](https://github.com/blefnk)
2. [Introduction to Next.js and React](https://youtube.com/watch?v=h2BcitZPMn4) by [Lee Robinson](https://twitter.com/leeerob)
3. [Relivator: Next.js 15 Starter (Release Announce of Relivator on Medium)](https://cutt.ly/awf6fScS) by [Nazar Kornienko @Blefnk](https://github.com/blefnk)
4. [Welcome to the Wild World of TypeScript, Mate! Is it scary?](https://cutt.ly/CwjVPUNu) by [Nazar Kornienko @Blefnk](https://github.com/blefnk)
5. [React: Common Mistakes in 2023](https://docs.google.com/presentation/d/1kuBeSh-yTrL031IlmuwrZ8LvavOGzSbo) by [Cory House](https://twitter.com/housecor)
6. [Thoughts on Next.js 13, Server Actions, Drizzle, Neon, Clerk, and More](https://github.com/Apestein/nextflix/blob/main/README.md#overall-thoughts) by [@Apestein](https://github.com/Apestein)
7. [Huge Next-Multilingual Readme About i18n](https://github.com/Avansai/next-multilingual#readme) by [@Avansai](https://github.com/Avansai)
8. [Applying Design Principles in React](https://blog.openreplay.com/applying-design-principles-in-react) by [Jeremiah (Jerry) Ezekwu](https://blog.openreplay.com/authors/jeremiah-\(jerry\)-ezekwu/)
9. [The Power of Prototyping Code](https://medium.com/@joomiguelcunha/the-power-of-prototyping-code-55f4ed485a30) by [João Miguel Cunha](https://medium.com/@joomiguelcunha)
10. [Software Prototyping](https://en.wikipedia.org/wiki/Software_prototyping) on Wikipedia
11. [TDD: Test-driven development](https://en.wikipedia.org/wiki/Test-driven_development) on Wikipedia
12. [React 19 RC Announcement](https://react.dev/blog/2024/04/25/react-19) by [React](https://react.dev)

*More learning resources can be found within the files of this repository.*

## Contributing

*This section will be enhanced soon with simpler steps to get everything ready.*

Contributions are warmly welcomed! We express our gratitude to everyone who has contributed to this repository. the contributions will be recognized. If you have any questions or suggestions, please open an issue. For more information, see the [contributing guide](.github/CONTRIBUTING.md).

Please visit [this special wiki page](https://github.com/blefnk/relivator-nextjs-template/wiki/Project-Credits-&-Contributors) to view the full list of credits and contributors. To contribute to Relivator, follow these steps:

1. Begin by reading the "How to Install and Get Started" section on the top of this repository, and by reading [CONTRIBUTING.md](.github/CONTRIBUTING.md) page.
2. Create a branch: `git checkout -b <branch_name>`.
3. Make and commit the changes: `git commit -m '<commit_message>'`
4. Push to the original branch: `git push origin <branch_name>`
5. Submit the pull request.

Alternatively, check the GitHub docs on [how to create a pull request](https://help.github.com/en/github/collaborating-with-issues-and-pull-requests/creating-a-pull-request).

## Roadmap

*The roadmap below may be outdated. We will fully update this README.md with the Relivator 1.3.0 release.*

*The roadmap below outlines the key features and improvements planned for this Next.js Reliverse starter and for Reliverse CLI. `Items not marked may already be configured` but might not have been thoroughly tested. If you spot any issues, please open an issue.*

- [x] 1. Build on [Next.js 15](https://nextjs.org) [App Router](https://nextjs.org/docs/app) & [Route Handlers](https://nextjs.org/docs/app/building-the-application/routing/route-handlers), with [Million Lint](https://million.dev) and [Turbopack](https://turbo.build/pack) support (with optional [Turborepo v2](https://turbo.build/blog/turbo-2-0) for faster builds). Utilize [React 19](https://react.dev) (with the new [React Compiler](https://react.dev/learn/react-compiler) and [eslint-plugin-react-compiler](https://react.dev/learn/react-compiler#installing-eslint-plugin-react-compiler)), [TailwindCSS](https://tailwindcss.com), and [TypeScript 5](https://typescriptlang.org) as core technologies.
- [x] 2. Implement [Drizzle ORM](https://orm.drizzle.team) to support **both MySQL and PostgreSQL** databases, and integrate with [Neon](https://neon.tech), [Railway](https://railway.app?referralCode=sATgpf), [PlanetScale](https://planetscale.com), and [Vercel](https://vercel.com) services.
- [x] 3. Configure `next.config.js` with i18n, MDX, with both [Million.js Compiler & Million Lint](https://million.dev/blog/lint-rc) support. Enable these cool experiments: after, forceSwcTransforms, instrumentationHook (disabled by default), mdxRs, optimisticClientCache, [optimizePackageImports](https://nextjs.org/docs/app/api-reference/next-config-js/optimizePackageImports), optimizeServerReact, [ppr (Partial Prerendering)](https://nextjs.org/docs/app/api-reference/next-config-js/partial-prerendering), reactCompiler (disabled by default), serverMinification, turbo.
- [x] 4. Aim for thorough documentation and a beginner-friendly approach throughout the project.
- [x] 5. Configure and comment on `middleware.ts` for i18n and next-auth.
- [x] 6. Set up a Content-Security-Policy (CSP) system to prevent XSS attacks (disabled by default).
- [x] 7. Provide well-configured VSCode settings and recommended extensions (set `"extensions.ignoreRecommendations"` to `true` if you don't want to see the recommendations).
- [x] 8. Optimize the [Next.js Metadata API](https://nextjs.org/docs/app/building-the-application/optimizing/metadata) for SEO, integrating file-system handlers.
- [x] 9. Integrate a TailwindCSS screen size indicator for local project runs.
- [x] 10. Implement extensive internationalization in 11 languages (English, German, Spanish, Persian, French, Hindi, Italian, Polish, Turkish, Ukrainian, Chinese) using the [next-intl](https://next-intl-docs.vercel.app) library, which works on both server and client, and include support for `next dev --turbo`.
- [x] 11. Implement authentication through **both [Clerk](https://clerk.com) and [Auth.js (next-auth@beta/NextAuth.js)](https://authjs.dev)**.
- [x] 12. Implement [tRPC](https://trpc.io) and [TanStack Query](https://tanstack.com/query) (with [React Normy](https://github.com/klis87/normy#readme)) for advanced server and client data fetching.
- [x] 13. Establish a user subscription and checkout system using [Stripe](https://github.com/stripe/stripe-node#readme).
- [x] 14. Ensure type-safety validations for project schemas and UI fields using the [zod](https://zod.dev) library.
- [x] 15. Employ [ESLint v9](https://eslint.org) with [TypeScript-ESLint v8](https://typescript-eslint.io) and configure `eslint.config.js` (**Linting can take some time, so please be patient**) to work with both [Biome](https://biomejs.dev) ~~and [Prettier](https://prettier.io) (including the Sort Imports Prettier plugin)~~ for readable, clean, and safe code. **Currently not available | TODO:** use `pnpm ui:eslint` to open the [ESLint Flat Config Viewer](https://github.com/antfu/eslint-flat-config-viewer#eslint-flat-config-viewer) UI tool. **Note:** Starting Relivator 1.3.0 Prettier can be added manually by running `reliverse` command (read [the announcement](https://github.com/blefnk/relivator-nextjs-starter/issues/36)).
- [x] 16. Elegantly implement the font system, utilizing [Inter](https://rsms.me/inter) and additional typefaces.
- [x] 17. Develop a storefront, incorporating product, category, and subcategory functionality.
- [x] 18. Design a modern, cleanly composed UI using [Radix](https://radix-ui.com), with attractive UI components from [shadcn/ui](https://ui.shadcn.com).
- [x] 19. Compose a comprehensive, beginner-friendly `README.md`, including descriptions of [environment variables](https://nextjs.org/docs/basic-features/environment-variables).
- [ ] 20. Realize blog functionality through the use of MDX files.
- [ ] 21. Use absolute paths everywhere where applied in the project. The project has a predictable and consistent import logic, no unnecessary use of things like `import * as React`.
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
- [ ] 33. Move component styles to .css or .scss files, or use packages that provide "syntactic sugar" for styles in .tsx files by using [tokenami](https://github.com/tokenami/tokenami#readme) CSS library. Implement possibility to implement [Figma Tokens System](https://blog.devgenius.io/link-figma-and-react-using-figma-tokens-89e6cc874b4d) to work seamlessly with the project. Tip: go to point #90 of this roadmap to learn more about new ways to use CSS-in-JS.
- [ ] 34. Migrate to Auth.js (next-auth@beta/NextAuth.js)' [next-auth@beta](https://npmjs.com/package/next-auth?activeTab=versions) ([discussions](https://github.com/nextauthjs/next-auth/releases/tag/next-auth%405.0.0-beta.4)), and to [React 19](https://19.react.dev/blog/2024/04/25/react-19).
- [ ] 35. Manage email verification, newsletter sign-ups, and email marketing via [Resend](https://resend.com) and [React Email](https://react.email).
- [ ] 36. Make sure each page and the middleware are green or yellow, but not red, upon build in the development terminal.
- [ ] 37. Make each environment variable optional, allowing the app to operate without anything configured, simply omitting specific code sections as necessary.
- [ ] 38. Keep the project on the best possible way of writing good and clean code, by following guidelines like [Airbnb JavaScript Style Guide](https://github.com/airbnb/javascript/tree/master/react) / [Airbnb React/JSX Style Guide](https://github.com/airbnb/javascript/tree/master/react). Use `??` (nullish coalescing) everywhere instead of `||` (logical OR) (unless there's a good reason to use it in the specific cases) – [why we should use nullish coalescing](https://stackoverflow.com/questions/61480993/when-should-i-use-nullish-coalescing-vs-logical-or); (Is there any ESLint rule/plugin for that?).
- [ ] 39. Keep the project free from things like `@ts-expect-error`, `eslint-disable`, `biome-ignore`, and others related not very safety things.
- [ ] 40. Keep the cookie count as low as possible, prepare for a cookie-free future, implement cookie management and notifications.
- [ ] 41. Introduce a comment system for products, including Review and Question types.
- [ ] 42. Integrate valuable things from [Next.js' Examples](https://github.com/vercel/next.js/tree/canary/examples) into this project.
- [ ] 43. Integrate valuable insights from [Next.js Weekly](https://nextjsweekly.com/issues) into this starter.
- [ ] 44. Implement type-safe [GraphQL](https://hygraph.com/learn/graphql) support by using [Fuse.js](https://fusejs.org) framework.
- [ ] 45. Implement the best things from [Payload CMS](https://github.com/payloadcms/payload) with Relivator's improvements.
- [ ] 46. Implement Storybook 8.x support (read the "[Storybook for React Server Components](https://storybook.js.org/blog/storybook-react-server-components)" announcement).
- [ ] 47. Implement smart and unified log system, both for development and production, both for console and writing to specific files.
- [ ] 48. Implement Sentry to handle errors and CSP reports for the application.
- [ ] 49. Implement Relivator's/Reliverse's own version of [Saas UI](https://saas-ui.dev) to be fully compatible with our project with only needed functionality, with using Tailwind and Shadcn instead of Chakra.
- [ ] 50. Implement our own fork of [Radix Themes](https://radix-ui.com) library with set up `<main>` as wrapper instead of its current `<section>`; OR implement our very own solution which generates Tailwind instead of Radix's classes.
- [ ] 51. Implement full [Million.js](https://million.dev) support (read [Million 3.0 Announcement](https://million.dev/blog/million-3) to learn more).
- [ ] 52. Implement file uploads using [UploadThing](https://uploadthing.com) and [Cloudinary](https://cloudinary.com) (NOTE: "res.cloudinary.com" and "utfs.io" should be added to `nextConfig.images.remotePatterns`).
- [ ] 53. Implement dynamic switching between app features, like database provider, by making corresponding checks for environment variables.
- [ ] 54. Implement docs to the project and move each explanation from the code into that docs.
- [ ] 55. Implement deep feature-parity and easy-migration compatibility with Reliverse.
- [ ] 56. Implement cooperation possibilities by using things like [liveblocks](https://liveblocks.io).
- [ ] 57. Implement CLI to quickly get Relivator with selected options only; try to use [Charm](https://charm.sh) things to build the Reliverse CLI.
- [ ] 58. Implement AI like GPT chat features by using [Vercel AI SDK](https://sdk.vercel.ai/docs) (see: [Introducing the Vercel AI SDK](https://vercel.com/blog/introducing-the-vercel-ai-sdk)).
- [ ] 59. Implement advanced theme switching without flashing, utilizing Tailwind Dark Mode with [React Server Side support](https://michaelangelo.io/blog/darkmode-rsc) and dynamic cookies.
- [ ] 60. Implement [Jest](https://jestjs.io) testing, optimized for Next.js.
- [ ] 61. Guarantee that every possible page is enveloped using predefined shell wrappers.
- [ ] 62. Generously write comment only if it really is needed. Rewrite all code in the way to eliminate need in describing code in comments (read more in "Clean Code" book by Robert Cecil Martin). Consider using `/** block comment */` only in the `.mjs` and `.js` files.
- [ ] 63. Fully develop advanced sign-up and sign-in pages, integrating both social media and classic form methods.
- [ ] 64. Follow the best practices from the articles and videos like "[10 React Antipatterns to Avoid](https://youtube.com/watch?v=b0IZo2Aho9Y)" (check theirs comment section as well).
- [ ] 65. Follow recommendations from [Material Design 3](https://m3.material.io) and other design systems when relevant.
- [ ] 66. Establish, document, and adhere to conventions, such as maintaining a single naming case style for files and variables.
- [ ] 67. Establish a comprehensive i18n, using country and locale codes, and support even more languages. Ensure native speakers verify each language following machine translation. Consider to use the [next-international](https://github.com/QuiiBz/next-international) library.
- [ ] 68. Ensure ultimate type-safety using strict mode in [TypeScript](https://typescriptlang.org) including ["Do's and Don'ts"](https://typescriptlang.org/docs/handbook/declaration-files/do-s-and-don-ts.html) recommendations (without using [dangerous type assertions](https://youtube.com/watch?v=K9pMxqb5IAk), and with [optional types correct usage](https://youtube.com/watch?v=qy6IBZggXSQ), by also using `pnpm typestat` — once you run that, [TypeStat](https://github.com/JoshuaKGoldberg/TypeStat) will start auto-fixing TS typings); And also ensure type-safety with typedRoutes, zod, middleware, etc.
- [ ] 69. Ensure the project lacks any unused items, such as packages, libraries, and variables. Also, make sure the project's code adheres to the [Never Nester principles](https://youtube.com/watch?v=CFRhGnuXG-4). Because, as Linus Torvalds once said, *If you need more than 3 levels of indentation, you're screwed anyway, and should fix the program*.
- [ ] 70. Ensure project has full support for [GSAP](https://gsap.com) (GreenSock Animation Platform) library, with convenient ways to use @gsap/react [useGSAP() hook](https://gsap.com/docs/v3/React/tools/useGSAP).
- [ ] 71. Ensure full Next.js Edge support and compatibility.
- [ ] 72. Ensure full [Biome](https://biomejs.dev), [Bun](https://bun.sh), and [Docker](https://docker.com) support and compatibility.
- [ ] 73. Ensure all website languages are grammatically correct and adhere to the latest rules for each language.
- [ ] 74. Ensure all items in the project are sorted in ascending order unless different sorting is required elsewhere.
- [ ] 75. Ensure the project avoids using redundant imports, such as importing everything from React, when it's sufficient to import only the necessary hooks, for example. The project doesn't use things that are automatically handled by the React Compiler (only where it fails), making the code much more readable. Million Lint must work seamlessly with React Compiler.
- [ ] 76. Ensure accessibility for **users**, **developers** (both beginners and experts), **bots** (like [Googlebot](https://developers.google.com/search/docs/crawling-indexing/googlebot) or [PageSpeed Insights Crawler](https://pagespeed.web.dev)), for **everyone**.
- [ ] 77. Enhance `middleware.ts` configuration with multi-middleware implementation.
- [ ] 78. Employ all relevant [TanStack](https://tanstack.com) libraries.
- [ ] 79. Eliminate each disabling in the `eslint.config.js` file, configure config to strict, but to be still beginner-friendly.
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
- [ ] 90. Consider adding Facebook's [StyleX](https://stylexjs.com/blog/introducing-stylex). However, StyleX currently requires setting up Babel/Webpack in the project, which we avoid to maintain full Turbopack support. As a suitable alternative, consider jjenzz's [Tokenami](https://github.com/tokenami/tokenami#readme) or [Panda CSS](https://panda-css.com) by Chakra. Possibly, we can make a choice between them all while bootstrapping the project with Reliverse CLI. These libraries help with avoiding the deprecated [initial idea](https://stylexjs.com/blog/introducing-stylex/#the-origins-of-stylex) for [CSS-in-JS](https://medium.com/dailyjs/what-is-actually-css-in-js-f2f529a2757). Learn more [here](https://github.com/reactwg/react-18/discussions/110) and in [Next.js docs](https://nextjs.org/docs/app/building-the-application/styling/css-in-js).
- [ ] 91. Confirm the project is free from duplicates, like files, components, etc.
- [ ] 92. Conduct useful tests, including possible stress tests, to simulate and assess app performance under high-traffic conditions.
- [ ] 93. Comprehensively configure RSCs and all other new Next.js 13-15 features. Seamlessly move data fetching between both client-side and server-side by using [useSWR](https://twitter.com/shuding_/status/1794461568505352693).
- [ ] 94. Complete the BA11YC (Bleverse Accessibility Convention) checklist; which may relay on the following principle in the future: [DesignPrototype](https://uiprep.com/blog/ultimate-guide-to-prototyping-in-figma)-[CodePrototype](https://medium.com/@joomiguelcunha/the-power-of-prototyping-code-55f4ed485a30)-CodeTests-HqDesign-[TDD](https://en.wikipedia.org/wiki/Test-driven_development)-HqCode-[CI](https://en.wikipedia.org/wiki/CI/CD).
- [ ] 95. Complete parts of the [BA11YC (Bleverse Accessibility Convention) checklist](https://github.com/bs-oss/BA11YC). This includes using software [Design Patterns](https://refactoring.guru/design-patterns/what-is-pattern) for code refactoring.
- [ ] 96. Check all components with side-effects for re-rendering, it is recommended to re-render each component a maximum of 2 times ([good video about it (in Ukrainian)](https://youtu.be/uH9uMH2e5Ts)).
- [ ] 97. Boost app performance scores on platforms like Google PageSpeed Insights. Ensure the app passes all rigorous tests.
- [ ] 98. Apply the [nuqs](https://nuqs.47ng.com) library where appropriate; for older "next-usequerystate" (the old package's name) versions [read the article](https://francoisbest.com/posts/2023/storing-react-state-in-the-url-with-nextjs).
- [ ] 99. All third-party libraries and React components should be appropriately isolated. This includes verifying data from these libraries, such as Clerk, and wrapping the components with the "use client" directive as necessary.
- [ ] 100. Add a reviews section to the landing page. Obtain feedback on Relivator from five widely recognized individuals on the web.
- [ ] 101. Add an admin dashboard that includes stores, products, orders, subscriptions, and payments.
- [ ] 102. Add global color variables to all places where they are applied, instead of having hardcoded colors.
- [ ] 103. Add pop-ups for cookies/GDPR notifications (with a respective management settings page), and Google floating notifications for quick login, etc.
- [ ] 104. Add some interesting and useful types to the project, for example, using the [type-fest](https://github.com/sindresorhus/type-fest) library.
- [ ] 105. Add the integration of a smart git-hooks system with various additional useful functionality.
- [ ] 106. Add the most valuable and useful ESLint things from [awesome-eslint](https://github.com/dustinspecker/awesome-eslint) collection.

[![Join the Relivator Discord](https://discordapp.com/api/guilds/1075533942096150598/widget.png?style=banner2)][badge-discord]

## License

This project is licensed under [the MIT License](https://choosealicense.com/licenses/mit) and is free to use and modify for your own projects. Please visit the [license](LICENSE) file for details. Since this project is under a free license, the author reserves the right to include referral links. The author may receive compensation from these links if users follow them and, for example, pay their first bill. Thank you all for your understanding!

🌐 <https://relivator.reliverse.org>

## Changelog

*a.k.a. What's Happening?!*

### 1.2.6 - August 4, 2024 – The Resurrection Update

Below you can see a small copy of [the article from Reliverse Docs](https://reliverse.org/relivator/v126), which is possibly outdated. Please refer to [1.2.6 Release Notes Page on GitHub](https://github.com/blefnk/relivator-nextjs-template/releases/tag/1.2.6) or to [this blog post](https://reliverse.org/relivator/v126) to read the most recent version. Reliverse Docs also has translations of the article into other languages; and will contain even more information about Relivator than this README.md, including notes from all past and future releases.

**Relivator is Back with Version 1.2.6!** 🥳

We are excited to announce the release of Relivator 1.2.6! This version marks the end of the "all-in-one" approach as we prepare for a more modular future with Reliverse CLI starting from version 1.3.0. The 1.2.6 release includes significant updates, especially in the database logic. The README.md has been significantly updated. Moving forward, we will introduce Canary, Release Candidate (RC), and General Availability (GA) branches for better version management. 1.2.6 will serve as a foundation, helping us transition more smoothly to the release of those 1.3.0's branches.

### Major Changes and Improvements

- **Database Updates**: This is the last release that simultaneously supports PostgreSQL/MySQL and Auth.js (next-auth@beta/NextAuth.js)/Clerk integrations.
- **React 19 Preparation**: Work has commenced on upgrading from React 18 to React 19.
- **Updated Libraries**: The project now uses next-auth v5, clerk v5 and optionally supports tailwindcss v4. Refer to the updated README.md for more details.

### Migration Guidance

Starting from version 1.3.1, we will provide comprehensive guides for migrating from older versions. The usual migration process involves reviewing commit changes and integrating necessary updates into your custom code. However, due to the extensive changes in versions 1.2.6 and 1.3.0, this method is not feasible. We recommend reinstalling the project and transferring your custom features from the previous version to the new version of starter. Thank you for your understanding!

To make the migration as smooth as possible, it's recommended to create a "`cluster`" folder in "`src`" and moving all your custom code there. If needed, you can adjust the paths using the [Find and Replace](https://code.visualstudio.com/docs/editor/codebasics#_search-and-replace) feature in VSCode. This will make it much easier to save and transfer your custom code to Relivator 1.2.6.

### Default Database Change

Neon PostgreSQL is now the default database instead of PlanetScale MySQL, as the latter no longer offers a free tier. If you require MySQL, [Railway](https://railway.app?referralCode=sATgpf) offers a more affordable alternative with a $5 credit without requiring a credit card. Note that this version has been primarily tested with Neon PostgreSQL.

### Security and Code Improvements

- **Type Safety and Editor Autocomplete**: This update enhances type safety and editor autocomplete for Drizzle ORM libraries.
- **Prettier Replaced by Biome**: Prettier has been removed in favor of Biome. The Prettier config will be removed in the next version from the `addons\scripts\reliverse\relimter\core\temp` folder. You can re-add it by running the `reliverse` command starting from Relivator 1.3.0.

### Reliverse Scripts Transition

Reliverse scripts have moved from the "unknown viability" stage to the "unstable" stage. As always, use them at your own risk and make backups. These scripts are now located in the `addons/relimter/[core|python]` folder. Most scripts require Python to be installed.

For more details on this update, you can read my detailed posts in the Relivator thread on Discord. Start with [this message](https://discord.com/channels/1075533942096150598/1155482425862922370/1241995095125786624).

### Thank You So Much

If anyone have any questions or issues, don't hesitate to contact me, means @blefnk, on Discord or GitHub. For more information about 1.2.6 and 1.3.0, please visit `#⭐-relivator` chat on the project's Discord server and the [GitHub Issues](https://github.com/blefnk/relivator-nextjs-template/issues) page.

Thank you for your continued support and happy coding with [Reliverse Website Builder v0.4.0](https://github.com/blefnk/reliverse-website-builder) and [Relivator Next.js Template v1.2.6](https://github.com/blefnk/relivator-nextjs-template)!

### Release Notes 1.2.5-1.0.0

**This is what happened before 1.2.6 version:**

<details>
  <summary>v1.2.5 — 27.02.2024</summary>

Hello! I, @blefnk Nazar Kornienko, finally have the opportunity to get back to working on Relivator after a month of exams at university. Thanks to all the new starter users! The project already has over 520 stars, 110 forks, 20 repository watchers, and 45 users in Discord - that's really cool and exciting!

I also want to thank the active Discord users of the project: *codingisfun, el_ade, righthill, nyquanh, spacecoder315, adelinb*. Thank you to everyone who creates PR/Issues and everyone else who actively uses the starter, whose nicknames I don't know. Your feedback and contributions are incredibly valuable for the development of the project!

Since there hasn't been an update in over a month, I'm going to make the transition to the next major version smoother. Therefore, version 1.2.5 has been released to simply refresh the dependencies and other minor details and README a bit. This small update will also allow me to check if certain users continue to have the individual strange problems they reported.

If everything goes well, the next update will already be version 1.3.0. By the way, I'm working on 1.2.x and 1.3.0 in parallel, like in big studios, haha. But please note: some files and lines of code was disabled by default for this version to fix and check some things. By the way, the third digit means that this update is not mandatory, but still recommended. And Relivator 1.3.0 may or may not come with a canary version of React/Next.js to start preparing for the upcoming release of React 19.

Well, that's all for today, all the best to everyone, and may your `pnpm latest` and `pnpm appts` always be successful! As usual, I try to write a short announcement, but it turns out a few paragraphs, that's how we live! 😄

P.S. And, please, don't pay attention that so many files have been "changed" in the latest commit, looks like it's because of Prettier I think, I only updated a few files, and if it's important to someone, please let me know in Discord's DM and I'll list you these files.

[Read more about v1.2.5](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.2.5)

</details>

<details>
  <summary>v1.2.4 — 13.01.2024</summary>

Just a small hotfix to improve the developer experience.

[Read more about 1.2.4](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.2.4)

</details>

<details>
  <summary>v1.2.3 — 12.01.2024</summary>

Just a small hotfix to improve the developer experience.

[Read more about 1.2.3](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.2.3)

</details>

<details>
  <summary>1.2.2 — 03.01.2024</summary>

1.2.2 brings ESLint Stylistic Plugin into the life. This will make the work with the project even more enjoyable.

Remember, Relivator is designed to be beginner-friendly, so quite a lot of ESLint options are turned off, just turn on what you need.

These turn-offs will be gradually eliminated as we move towards the massive 2.0.0, which will significantly raise the project's standards, being professional, will be even more convenient for beginners.

[Read more about v1.2.2](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.2.2)

</details>

<details>
  <summary>1.2.1 — 02.01.2024</summary>

This is quite a small update compared to all the past ones, but this one also deserves the attention. Now, updates will generally be smaller but will appear more frequently. Thanks to this, it will be possible to easily update forks and independent projects that use Relivator as their base.

Update v1.2.1 adds Chinese localization, and among other things, work has begun on the so-called token system, which will allow future versions to work with Figma design systems in an automated way. It will also help to make the styles in the project cleaner by significantly reducing the number of Tailwind classes. For this, Relivator now installs the wonderful package @tokenami, developed by @jjenzz; Jenna, thank you so much for this library!

p.s. 1.2.1 is the first commit to the Relivator repository that no longer contains an emoji at the beginning of its name. Thanks to this, contributors to Relivator/Reliverse will no longer have to spend time inventing a suitable emoji.

[Read more about v1.2.1](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.2.1)

</details>

<details>
  <summary>1.2.0 — [27.12.2023] 🎄 Relivator v1.2.0 is here! 🥳 Click to see the announcement 🎁</summary>

*Relivator 1.2.0 is already here! I, [@blefnk Nazar Kornienko](https://github.com/blefnk), am thrilled to wrap up this year 2023, proudly presenting this release to the OSS community! So, the result of over two months of hard work is finally here!*

In this version, significant attention was focused on stability, security, performance optimization, and a substantial improvements in design—both visually, UX, and the logic of how the app works. A lot was really done, too much to list everything! Be sure to install it and check it out!

By the way, you can now enjoy a finely-tuned ESLint Flat Config! Also, it's worth noting that Clerk, since version 1.1.0, is no longer considered deprecated in the Relivator project. Thanks to 1.2.0, Clerk now works seamlessly with an easy switch to Auth.js (next-auth@beta/NextAuth.js) when needed, all on the fly. Plus, full support for Turbopack (next dev --turbo) is finally here, even for next-intl!

As for next-intl, finally, we can now enjoy internationalization that works not only on the client-side but also on the server! Only the 404 page has client-side i18n messages, all other pages and components use i18n as server-first. And this is really cool!

Many unique solutions have been implemented in this new version. Moreover, using Relivator from this version, you have the opportunity to try out the alpha version of our unique Code-First/No-Code Builder system for React pages and components (which will appear in Reliverse CMS in the future). Just visit the Admin page while in the development environment and enjoy.

If you have already used Relivator before, please pay attention, this is very important! Be sure to check the updated .env.example file and update the .env file accordingly.

As a small teaser/spoiler, for Relivator 1.3.0, even more improvements in visual design and UX are planned; 1.4.0 will come with a magical CLI implementation, allowing you to quickly obtain only the necessary features and dependencies for the app (even automated updates and the ability to add other functions and packages to an already installed app); 1.5.0 will undergo a full code refactoring that will meet all the best standards and practices; 1.6.0-2.0.0+ versions, apart from many other things, will receive most of the items currently unchecked in the Roadmap (located in the project's README.md). It's going to be incredible!

So, install this new version of Relivator 1.2.0 and appreciate the multitude of incredible features, and freely use it in the own projects today. Please use the preferred feedback channels to share the thoughts on Relivator 1.2.0 and what you would like to see in future releases.

Don't forget to also check out the significantly updated README.md, it's worth it.

Enjoy! ❄️☃️ Merry Christmas and Happy New Year 2024! 🎇🥳

</details>

<details>
  <summary>1.1.0 — 🔥 The Most Feature-Rich Next.js 15 Starter</summary>

Here it is! Relivator has been updated to version 1.1.0!

**Now it's even more feature-rich, with cleaner code, and a more stable Next.js starter.**

Ever dreamed of having both MySQL/PostgreSQL and Clerk/Auth.js (next-auth@beta/NextAuth.js) in one project with the ability to switch on the fly? And even if you hadn't thought about it – now it's possible. Mix and match at will – even more possibilities for on-the-fly switching are coming soon in the next releases of Relivator.

Among many other new and fixed things, Stripe is now fully functional and comes with extensive docs in the form of comments within the relevant files.

`Please star this repository` to show the support! Thank you to everyone who has shown interest in this project!

Please check out the updated list of project features in the project's README. Enjoy and please share the feedback!

[Read more about v1.1.0](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.1.0)

</details>

<details>
  <summary>1.0.0 — 🎉 Relivator Release</summary>

How to Install and Get Started? Please refer to the [🏗️ Installation](#installation) section, where you can always find information about the project and how to install it easily.

[Read more about v1.0.0](https://github.com/blefnk/relivator-nextjs-template/releases/tag/1.0.0)

</details>

Please visit the [CHANGELOG.md](.github/CHANGELOG.md) or [Reliverse Docs](https://reliverse.org/relivator) to read the release notes for older versions.

## The Final Words

This Next.js 15 starter — Relivator — was crafted with love by [@blefnk Nazar Kornienko](https://github.com/blefnk) and the incredible [Bleverse OSS community](https://github.com/blefnk/relivator-nextjs-template/wiki/Project-Credits-&-Contributors). We are deeply grateful for all your contributions and support for this project.

Happy coding! Embark on the coding adventure, learn, iterate, and most importantly – enjoy the process! Remember – this is a space of learning and experimentation. Dive in and savor the journey! 🚀🌌

Check out [our other free Next.js 15 starter](https://github.com/blefnk/reliverse). This monorepo provides the tech used in the current starter and adds: Turborepo/Turbopack, Prisma, Valibot, Lucia, Clerk, and much more, as we experimentally attempt to combine all vital and widely-used tech. Think of it as: Reliverse (WordPress) + Relivator (WooCommerce) = 😍. So, start right now! Start today with Relivator!

<p>
  <span>
    <a href="https://github.com/blefnk/relivator-nextjs-template/blob/main/public/reliverse.png">
      <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/reliverse.png" />
          <source media="(prefers-color-scheme: light)" srcset="public/reliverse.png" />
          <img alt="Reliverse" src="/public/reliverse.png" width="35%" />
      </picture>
    </a>
  </span>
</p>

> 🚀 **Ready to launch?** Start building your project with Relivator and Reliverse as soon as possible! With one-click deploy on Vercel:

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fblefnk%2Frelivator-nextjs-template&project-name=relivator&repository-name=my-new-repository-name)

> 💻 **Prefer manual installation?** Refer to the [🏗️ Installation](#installation) section or just clone the project using the most classical way:

```bash
git clone https://github.com/blefnk/relivator.git
```

[2023-2024 © Nazar Kornienko / Nazar Kornienko / blefnk](https://github.com/blefnk) (<https://relivator.reliverse.org>)

<p>
  <span>
    <a href="https://github.com/blefnk/relivator-nextjs-template/blob/main/public/og.png">
      <picture>
          <source media="(prefers-color-scheme: dark)" srcset="public/og.png" />
          <source media="(prefers-color-scheme: light)" srcset="public/og.png" />
          <img alt="Relivator OG Image" src="/public/og.png" width="35%" />
      </picture>
    </a>
  </span>
</p>

[![Join the Relivator Discord](https://discordapp.com/api/guilds/1075533942096150598/widget.png?style=banner2)][badge-discord]

[🌐 Demo](https://relivator.reliverse.org) | [👋 Introduction](#introduction) | [🏗️ Installation](#installation) | [🤔 FAQ](#faq) | [🔍 Details](#details) | [✅ Roadmap](#roadmap) | [📖 Changelog](#changelog)

**Follow Us Everywhere:** [𝕏](https://x.com/blefnk) | [GitHub](https://github.com/blefnk) | [LinkedIn](https://linkedin.com/in/blefnk) | [Facebook](https://facebook.com/blefnk) | [Discord](https://discord.gg/Pb8uKbwpsJ) | [Fiverr](https://fiverr.com/blefnk)

[badge-discord]: https://badgen.net/discord/members/Pb8uKbwpsJ?icon=discord&label=discord&color=purple
[badge-npm]: https://badgen.net/npm/v/reliverse?icon=npm&color=green&label=%40blefnk%2Freliverse
[link-discord]: https://discord.gg/Pb8uKbwpsJ
[link-npm]: https://npmjs.com/package/reliverse/v/latest
