# Developer Onboarding

🚀 Yay! Congrats on the installation! If you like it, please [give us a star on GitHub](https://github.com/blefnk/relivator-nextjs-template)! 🙏

Welcome to Relivator 1.2.6, a project created by @blefnk Nazar Kornienko.

**This replacement system is still under development and may not be finalized. Please check back later. For now, you can use this folder to simply store files that you don't want to be overwritten during an upgrade.**

## Draft Description

You are reading the `onboard.md` file in the `cluster` folder. You can read more about this folder at the end of this onboarding tutorial. Thank you for installing Relivator!

## Recommended Steps

1. **Explore the App**: Click on everything you see in the app to learn how it works.
2. **Read the Documentation**: Go to [Relivator's README.md](../../README.md) and read the latest documentation.
3. **Understand the Cluster Folder**: Read the `The Cluster Folder` section below. Create your own components there or anywhere you prefer.
4. **Join Our Community**: Join the project's <a href="https://discord.gg/Pb8uKbwpsJ">Discord server</a>.
5. **Contribute**: Contribute to the project or create a new issue and grab some cool gifts.

## The Cluster Folder

The `cluster` folder is intended for your custom components and files. Storing them here ensures they will not be overwritten when new Relivator updates are released.

You can also use the `cluster` folder to override the default components and files that come with Relivator. This is useful if you want to make global changes to the default components and files provided by Relivator, but do not want to touch the original files.

For example, if you want to override the default `Onboarding.tsx` file (originally located in `src\components\Emails\Onboarding.tsx`), you can place an `Onboarding.tsx` file in the `cluster` folder. The `Onboarding.tsx` file in the `cluster` folder will override the default `Onboarding.tsx` file that comes with Relivator. Currently you need manually change paths! 😉

The same applies to any other component or file that you want to override. Ensure you replace the paths in the original files with the paths to the `cluster` folder when overriding the original components and files.

Additionally, you can easily migrate to Relivator by placing specific parts or the entire current React project in this folder and then incrementally adapting it to work with Relivator.

## Have Any Questions or Issues?

If you have any questions or issues regarding this project, please contact us:

- By visiting our <a href="https://discord.gg/Pb8uKbwpsJ">Discord server</a>
- By email: <a href="mailto:blefnk@gmail.com">blefnk@gmail.com</a>
- By creating a <a href="https://github.com/blefnk/relivator-nextjs-template/issues">new issue</a>

## P.S

You may not need this folder in the future. We have a great idea for 1.3.x, we have something incredible coming! Stay tuned for more details!
