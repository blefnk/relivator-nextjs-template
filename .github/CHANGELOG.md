# Changelog

<!--
For those who are viewing the current markdown file using:
 – VSCode: Press F1 or Cmd/Ctrl+Shift+P and enter ">Markdown: Open Preview". Please install the "markdownlint" and "Markdown All in One" extensions.
 – GitHub: Does this .md file appear different from what you are used to seeing on GitHub? Ensure the URL does not end with "?plain=1".
-->

## What's Happening

<!-- ### Relivator & Reliverse Roadmap -->

<!-- Our [prioritized roadmap](https://github.com/blefnk/relivator-nextjs-template#roadmap) of features and utilities that the core team is focusing on. -->

### 1.2.6 - August 4, 2024 – The Resurrection Update

Below you can see a copy of [the article from Reliverse Docs](https://reliverse.org/relivator/v126), which may be a bit outdated below. Please refer to [this blog post](https://reliverse.org/relivator/v126) to read the most recent version. Reliverse Docs also has translations of the article into other languages; and will contain even more information about Relivator than this README.md, including notes from all past and future releases.

**Relivator is Back with Version 1.2.6!** 🥳

We are excited to announce the release of Relivator 1.2.6! This version marks the end of the "all-in-one" approach as we prepare for a more modular future with Reliverse CLI starting from version 1.3.0. The 1.2.6 release includes significant updates, especially in the database logic. The README.md has been significantly updated. Moving forward, we will introduce Canary, Release Candidate (RC), and General Availability (GA) branches for better version management. 1.2.6 will serve as a foundation, helping us transition more smoothly to the release of those 1.3.0's branches.

### Major Changes and Improvements

- **Database Updates**: This is the last release that simultaneously supports PostgreSQL/MySQL and NextAuth.js/Clerk integrations.
- **React 19 Preparation**: Work has commenced on upgrading from React 18 to React 19.
- **Updated Libraries**: The project now uses next-auth v5, clerk v5 and optionally supports tailwindcss v4. Refer to the updated README.md for more details.

### Migration Guidance

Starting from version 1.3.1, we will provide comprehensive guides for migrating from older versions. The usual migration process involves reviewing commit changes and integrating necessary updates into your custom code. However, due to the extensive changes in versions 1.2.6 and 1.3.0, this method is not feasible. We recommend reinstalling the project and transferring your custom features from the previous version to the new version of starter. Thank you for your understanding!

To make the migration as smooth as possible, it's recommended to create a "`cluster`" folder in "`src`" and moving all your custom code there. If needed, you can adjust the paths using the [Find and Replace](https://code.visualstudio.com/docs/editor/codebasics#_search-and-replace) feature in VSCode. This will make it much easier to save and transfer your custom code to Relivator 1.2.6.

### Default Database Change

Neon PostgreSQL is now the default database instead of PlanetScale MySQL, as the latter no longer offers a free tier. If you require MySQL, [Railway](https://railway.app?referralCode=sATgpf) offers a more affordable alternative with a $5 credit without requiring a credit card. Note that this version has been primarily tested with Neon PostgreSQL.

### Security and Code Improvements

- **Type Safety and Editor Autocomplete**: This update enhances type safety and editor autocomplete for Drizzle ORM libraries.
- **Prettier Replaced by Biome**: Prettier has been removed in favor of Biome. The Pterrier's config will be removed in the next version from the `addons\scripts\reliverse\relimter\core\temp` folder. You can re-add it by running the `reliverse` command starting from Relivator 1.3.0.

### Reliverse Scripts Transition

Reliverse scripts have moved from the "unknown viability" stage to the "unstable" stage. As always, use them at your own risk and make backups. These scripts are now located in the `src/tools/unstable` folder. Most scripts require Python to be installed.

For more details on this update, you can read my detailed posts in the Relivator thread on Discord. Start with [this message](https://discord.com/channels/1075533942096150598/1155482425862922370/1241995095125786624).

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
  <summary>1.2.2 | 03.01.2024</summary>

1.2.2 brings ESLint Stylistic Plugin into the life. This will make the work with the project even more enjoyable.

Remember, Relivator is designed to be beginner-friendly, so quite a lot of ESLint options are turned off, just turn on what you need.

These turn-offs will be gradually eliminated as we move towards the massive 2.0.0, which will significantly raise the project's standards, being professional, will be even more convenient for beginners.

[Read more about v1.2.2](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.2.2)

</details>

<details>
  <summary>1.2.1 | 02.01.2024</summary>

This is quite a small update compared to all the past ones, but this one also deserves the attention. Now, updates will generally be smaller but will appear more frequently. Thanks to this, it will be possible to easily update forks and independent projects that use Relivator as their base.

Update v1.2.1 adds Chinese localization, and among other things, work has begun on the so-called token system, which will allow future versions to work with Figma design systems in an automated way. It will also help to make the styles in the project cleaner by significantly reducing the number of Tailwind classes. For this, Relivator now installs the wonderful package @tokenami, developed by @jjenzz; Jenna, thank you so much for this library!

p.s. 1.2.1 is the first commit to the Relivator repository that no longer contains an emoji at the beginning of its name. Thanks to this, contributors to Relivator/Reliverse will no longer have to spend time inventing a suitable emoji.

[Read more about v1.2.1](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.2.1)

</details>

<details>
  <summary>1.2.0 | [27.12.2023] 🎄 Relivator v1.2.0 is here! 🥳 Click to see the announcement 🎁</summary>

*Relivator 1.2.0 is already here! I, [@blefnk Nazar Kornienko](https://github.com/blefnk), am thrilled to wrap up this year 2023, proudly presenting this release to the OSS community! So, the result of over two months of hard work is finally here!*

In this version, significant attention was focused on stability, security, performance optimization, and a substantial improvements in design—both visually, UX, and the logic of how the app works. A lot was really done, too much to list everything! Be sure to install it and check it out!

By the way, you can now enjoy a finely-tuned ESLint Flat Config! Also, it's worth noting that Clerk, since version 1.1.0, is no longer considered deprecated in the Relivator project. Thanks to 1.2.0, Clerk now works seamlessly with an easy switch to NextAuth.js when needed, all on the fly. Plus, full support for Turbopack (next dev --turbo) is finally here, even for next-intl!

As for next-intl, finally, we can now enjoy internationalization that works not only on the client-side but also on the server! Only the 404 page has client-side i18n messages, all other pages and components use i18n as server-first. And this is really cool!

Many unique solutions have been implemented in this new version. Moreover, using Relivator from this version, you have the opportunity to try out the alpha version of our unique Code-First/No-Code Builder system for React pages and components (which will appear in Reliverse CMS in the future). Just visit the Admin page while in the development environment and enjoy.

If you have already used Relivator before, please pay attention, this is very important! Be sure to check the updated .env.example file and update the .env file accordingly.

As a small teaser/spoiler, for Relivator 1.3.0, even more improvements in visual design and UX are planned; 1.4.0 will come with a magical CLI implementation, allowing you to quickly obtain only the necessary features and dependencies for the app (even automated updates and the ability to add other functions and packages to an already installed app); 1.5.0 will undergo a full code refactoring that will meet all the best standards and practices; 1.6.0-2.0.0+ versions, apart from many other things, will receive most of the items currently unchecked in the Roadmap (located in the project's README.md). It's going to be incredible!

So, install this new version of Relivator 1.2.0 and appreciate the multitude of incredible features, and freely use it in the own projects today. Please use the preferred feedback channels to share the thoughts on Relivator 1.2.0 and what you would like to see in future releases.

Don't forget to also check out the significantly updated README.md, it's worth it.

Enjoy! ❄️☃️ Merry Christmas and Happy New Year 2024! 🎇🥳

</details>

<details>
  <summary>1.1.0 | 🔥 The Most Feature-Rich Next.js 15 Starter</summary>

Here it is! Relivator has been updated to version 1.1.0!

**Now it's even more feature-rich, with cleaner code, and a more stable Next.js starter.**

Ever dreamed of having both MySQL/PostgreSQL and Clerk/NextAuth.js in one project with the ability to switch on the fly? And even if you hadn't thought about it – now it's possible. Mix and match at will – even more possibilities for on-the-fly switching are coming soon in the next releases of Relivator.

Among many other new and fixed things, Stripe is now fully functional and comes with extensive docs in the form of comments within the relevant files.

`Please star this repository` to show the support! Thank you to everyone who has shown interest in this project!

Please check out the updated list of project features in the project's README. Enjoy and please share the feedback!

[Read more about v1.1.0](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.1.0)

</details>

<details>
  <summary>1.0.0 | 🎉 Relivator Release</summary>

How to Install and Get Started? Please visit [the project's README](../README.md#readme), where you can always find up-to-date information about the project and how to install it easily.

[Read more about v1.0.0](https://github.com/blefnk/relivator-nextjs-template/releases/edit/1.0.0)

</details>

Please visit the CHANGELOG.md or [Reliverse Docs](https://reliverse.org/relivator) to read the older versions release notes.

### Everyone! Thank You 🙏

If anyone have any questions or issues, don't hesitate to contact me, means @blefnk, on Discord or GitHub. For more information about 1.2.6 and 1.3.0, please visit `#⭐-relivator` chat on the project's Discord server and the [GitHub Issues](https://github.com/blefnk/relivator-nextjs-template/issues) page.

Thank you for your continued support and happy coding with Relivator 1.2.6!
