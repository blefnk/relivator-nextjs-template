import { log, spinner as spinnerClack } from "@clack/prompts";
import { readPackageSync } from "@mnrendra/read-package";
import axios from "axios";
import { getLatestVersion } from "fast-npm-meta";
import fs from "fs-extra";
import { version as osVersion, platform } from "node:os";
import { performance } from "node:perf_hooks";
import { argv, cwd, exit, version as nodeVersion } from "node:process";
import {
  addDependency,
  addDevDependency,
  detectPackageManager,
  removeDependency,
} from "nypm";
import path, { normalize } from "pathe";
import semver from "semver";

// package.json CLI to manage packages
// Created by https://github.com/blefnk
//
// 💡 You can run "@reliverse/deps v0.0.0-canary.0" using:
//
// 🟢 core ▶️ pnpm deps:install (displays the details)
// 🟢 core ▶️ pnpm deps:install-all (installs all packages)
//
// 🟡 utils ▶️ pnpm deps:info (or: pnpm deps:updates)
// 🟡 utils ▶️ pnpm deps:check (checks for unregistered packages)
// 🟡 utils ▶️ pnpm deps:locations (checks for incorrectly placed packages)
// 🟡 utils ▶️ pnpm deps:use-next-15-rc (or: deps:use-next-15 (or: pnpm tsx packageJson.ts use next-15-unstable))
//
// 🔵 modules ▶️ pnpm deps:install install-basic-packages
// 🔵 modules ▶️ pnpm deps:install install-eslint-basic-packages
// 🔵 modules ▶️ pnpm deps:install install-eslint-extended-packages
//
// 🔴 dangerous ▶️ pnpm deps:install remove-all-packages (includes dependenciesEslintExtended)
// 🔴 dangerous ▶️ pnpm deps:install remove-all-packages-ignore-exclusions
//
// Announcement:
//
// I am ([blefnk](https://github.com/blefnk)) working to automate the Relivator's installation process
// as much as possible. The upcoming v1.3.0 will feature a significant automated installation. If you wish to try the
// alpha version of one of my many automation scripts, use the pnpm deps:install (or: pnpm deps:install-all) command.
//
// However, before running this script, you should manually install the essentials:
// - npx nypm add typescript tsx nypm @mnrendra/read-package @clack/prompts
// - npx nypm add fs-extra pathe fast-npm-meta semver @types/semver redrun axios
// - bun|yarn|pnpm dlx jsr add @reliverse/core (or: npx jsr add @reliverse/core)
//
const localDebugEnabled = false;
const throwErrorOnFailedDepsCommand = false; // related to: ▶️ pnpm deps (deps:check deps:locations)
// To enable the following feature, 'localDebugEnabled' variable must also be set to 'true'.
const automaticPackageJsonDependenciesMover = false; // This feature can be unstable currently.

type PackageJson = {
  [key: string]: any;
  dependencies?: Record<string, string>;
  devDependencies?: Record<string, string>;
};

const flags = [
  "find-incorrectly-placed-packages",
  "find-unregistered-packages",
  "info",
  "help",
  "welcome",
  "install-all-packages",
  "install-basic-packages",
  "install-eslint-basic-packages",
  "install-eslint-extended-packages",
  "remove-all-packages-ignore-exclusions",
  "remove-all-packages",
  "updates",
  "use",
] as const;

// [usage example] ▶️ pnpm deps:use-next-15-rc (or: deps:use-next-15)
// (or: pnpm tsx packageJson.ts use next-15-unstable)
const useFlags = [
  "next-14",
  "next-15-rc",
  "next-15-unstable",
  "react-18",
  "react-19-unstable",
  "tailwindcss-3",
  "tailwindcss-4-unstable",
] as const;

// good alternative: import ora from "ora";
// const spinner = ora({ spinner: "sand" });
const spinner = spinnerClack();

// @reliverse/core is published on jsr.io instead npmjs.com
const ignoreUnregisteredDependencies = ["@reliverse/core"];

const dependenciesShadcn: string[] = [
  "@radix-ui/react-accordion",
  "@radix-ui/react-alert-dialog",
  "@radix-ui/react-aspect-ratio",
  "@radix-ui/react-avatar",
  "@radix-ui/react-checkbox",
  "@radix-ui/react-dialog",
  "@radix-ui/react-dropdown-menu",
  "@radix-ui/react-hover-card",
  "@radix-ui/react-icons",
  "@radix-ui/react-label",
  "@radix-ui/react-menubar",
  "@radix-ui/react-navigation-menu",
  "@radix-ui/react-popover",
  "@radix-ui/react-progress",
  "@radix-ui/react-scroll-area",
  "@radix-ui/react-select",
  "@radix-ui/react-separator",
  "@radix-ui/react-slider",
  "@radix-ui/react-slot",
  "@radix-ui/react-switch",
  "@radix-ui/react-tabs",
  "@radix-ui/react-toast",
  "@radix-ui/react-tooltip",
  "@radix-ui/themes",
  "input-otp",
];

const dependenciesUdecode: string[] = [
  "@udecode/plate-autoformat",
  "@udecode/plate-basic-marks",
  "@udecode/plate-block-quote",
  "@udecode/plate-break",
  "@udecode/plate-code-block",
  "@udecode/plate-common",
  "@udecode/plate-heading",
  "@udecode/plate-highlight",
  "@udecode/plate-horizontal-rule",
  "@udecode/plate-indent-list",
  "@udecode/plate-list",
  "@udecode/plate-media",
  "@udecode/plate-node-id",
  "@udecode/plate-normalizers",
  "@udecode/plate-paragraph",
  "@udecode/plate-reset-node",
  "@udecode/plate-select",
  "@udecode/plate-table",
  "@udecode/plate-trailing-block",
];

const basicDependencies: string[] = [
  ...dependenciesShadcn,
  ...dependenciesUdecode,
  "@atao60/fse-cli",
  "@auth/core",
  "@auth/drizzle-adapter",
  "@clack/prompts",
  "@clerk/localizations",
  "@clerk/nextjs",
  "@clerk/themes",
  "@clerk/types",
  "@dicebear/collection",
  "@dicebear/core",
  "@faire/mjml-react",
  "@faker-js/faker",
  "@hookform/resolvers",
  "@inquirer/prompts",
  "@libsql/client",
  "@loglib/tracker",
  "@mdx-js/loader",
  "@mdx-js/react",
  "@million/lint",
  "@mnrendra/read-package",
  "@neondatabase/serverless",
  "@next/bundle-analyzer",
  "@next/mdx",
  "@normy/react-query",
  "@planetscale/database",
  "@react-email/components",
  "@react-email/head",
  "@react-email/html",
  "@react-email/img",
  "@react-email/tailwind",
  "@reliverse/core",
  "@remotion/bundler",
  "@remotion/cli",
  "@remotion/renderer",
  "@simplewebauthn/browser",
  "@simplewebauthn/server",
  "@stripe/react-stripe-js",
  "@stripe/stripe-js",
  "@t3-oss/env-nextjs",
  "@tailwindcss/postcss",
  "@tanstack/react-query-devtools",
  "@tanstack/react-query-next-experimental",
  "@tanstack/react-query",
  "@tanstack/react-table",
  "@trpc/client",
  "@trpc/react-query",
  "@trpc/server",
  "@uidotdev/usehooks",
  "@uploadthing/react",
  "@vercel/analytics",
  "@vercel/flags",
  "@vercel/speed-insights",
  "@vercel/toolbar",
  "@xyflow/react",
  "ajv-formats",
  "ajv",
  "axios",
  "better-sqlite3",
  "c12",
  "citty",
  "class-variance-authority",
  "clsx",
  "cmdk",
  "commander",
  "consola",
  "cookies-next",
  "cropperjs",
  "dayjs",
  "destr",
  "dotenv-cli",
  "dotenv",
  "drizzle-orm",
  "drizzle-zod",
  "embla-carousel-react",
  "flowbite-react",
  "fs-extra",
  "glob",
  "log4js",
  "lucide-react",
  "mathjs",
  "mdx",
  "million",
  "minimatch",
  "modern-errors-cli",
  "modern-errors-serialize",
  "modern-errors",
  "montag",
  "mysql2",
  "nanoid",
  "nanotar",
  "next-auth@beta",
  "next-intl",
  "next-superjson-plugin",
  "next-themes",
  "next",
  "nextjs-google-analytics",
  "node-fetch-native",
  "nodemailer",
  "nuqs",
  "nypm",
  "ofetch",
  "pathe",
  "pg",
  "pick-random-weighted",
  "picocolors",
  "postgres",
  "prettyjson",
  "radash",
  "react-cropper",
  "react-day-picker",
  "react-dom",
  "react-dropzone",
  "react-hook-form",
  "react-medium-image-zoom",
  "react-syntax-highlighter",
  "react-wrap-balancer",
  "react",
  "recharts",
  "redrun",
  "remark-frontmatter",
  "remark-gfm",
  "remark-mdx",
  "remotion",
  "resend",
  "semver",
  "server-only",
  "sharp",
  "slate-history",
  "slate-react",
  "slate",
  "std-env",
  "string-ts",
  "stripe",
  "superjson",
  "tailwind-merge",
  "tailwind-variants",
  "tailwindcss-animate",
  "tasuku",
  "try-catch",
  "try-to-catch",
  "ufo",
  "uncrypto",
  "uploadthing",
  "uuid",
  "vaul",
  "zod",
  "zustand",
];

const dependenciesEslintBasic: string[] = [
  "@eslint/js",
  "@stylistic/eslint-plugin",
  "@types/eslint__js",
  "eslint-plugin-perfectionist",
  "eslint",
  "globals",
  "typescript-eslint",
];

const dependenciesEslintExtended: string[] = [
  "@eslint-react/eslint-plugin",
  "@next/eslint-plugin-next",
  "@remotion/eslint-config",
  "@tanstack/eslint-plugin-query",
  "eslint-plugin-barrel-files",
  "eslint-plugin-drizzle",
  "eslint-plugin-eslint-comments",
  "eslint-plugin-import-x",
  "eslint-plugin-jsonc",
  "eslint-plugin-jsx-a11y",
  "eslint-plugin-markdown",
  "eslint-plugin-mdx",
  "eslint-plugin-n",
  "eslint-plugin-no-comments",
  "eslint-plugin-no-relative-import-paths",
  "eslint-plugin-perfectionist",
  "eslint-plugin-promise",
  "eslint-plugin-react-hooks",
  "eslint-plugin-react-refresh",
  "eslint-plugin-react",
  "eslint-plugin-readable-tailwind",
  "eslint-plugin-regexp",
  "eslint-plugin-sonarjs",
  "eslint-plugin-sort-exports",
  "eslint-plugin-sort",
  "eslint-plugin-tailwindcss",
  "eslint-plugin-unicorn",
  "eslint-plugin-yml",
  "jsonc-eslint-parser",
];

const dependenciesPutout: string[] = [
  "@putout/eslint-flat",
  "@putout/plugin-apply-montag",
  "@putout/plugin-apply-nullish-coalescing",
  "@putout/plugin-apply-shorthand-properties",
  "@putout/plugin-convert-assert-to-with",
  "@putout/plugin-convert-is-nan-to-number-is-nan",
  "@putout/plugin-convert-throw",
  "@putout/plugin-nextjs",
  "@putout/plugin-react-hook-form",
  "@putout/plugin-react-hooks",
  "@putout/plugin-react",
  "eslint-plugin-putout",
  "putout",
];

const dependenciesCspell: string[] = [
  "@cspell/dict-companies",
  "@cspell/dict-de-de",
  "@cspell/dict-es-es",
  "@cspell/dict-fa-ir",
  "@cspell/dict-fr-fr",
  "@cspell/dict-fullstack",
  "@cspell/dict-it-it",
  "@cspell/dict-markdown",
  "@cspell/dict-npm",
  "@cspell/dict-pl_pl",
  "@cspell/dict-tr-tr",
  "@cspell/dict-typescript",
  "@cspell/dict-uk-ua",
  "cspell",
];

const dependenciesTypes: string[] = [
  "@types/better-sqlite3",
  "@types/eslint",
  "@types/fs-extra",
  "@types/glob",
  "@types/mdx",
  "@types/node",
  "@types/pg",
  "@types/prettyjson",
  "@types/react-dom",
  "@types/react-syntax-highlighter",
  "@types/react",
  "@types/semver",
  "@types/try-catch",
  "@types/try-to-catch",
  "@types/uuid",
  "@types/yargs",
];

const basicDevDependencies: string[] = [
  ...dependenciesEslintBasic,
  ...dependenciesPutout,
  ...dependenciesCspell,
  ...dependenciesTypes,
  "@biomejs/biome",
  "@stylistic/eslint-plugin",
  "@tailwindcss/cli",
  "@tanstack/eslint-plugin-query",
  "@total-typescript/ts-reset",
  "autoprefixer",
  "codeup",
  "cross-env",
  "deadfile",
  "drizzle-kit",
  "envinfo",
  "eslint",
  "fast-npm-meta",
  "knip",
  "magicast",
  "postcss",
  "tailwindcss",
  "tsx",
  "turbo",
  "typescript-eslint",
  "typescript@beta", // 🟦 Change to "typescript" if you want to use Stable TS 5.5
  "typestat",
  "yargs",
];

// 💡 Alternative to "pnpm latest:overrides".
// 🟦 Remove "typescript@beta" from here if you
// 🟦 have "typescript" in basicDevDependencies.
// 🟦 After that re-run `pnpm deps:install-all`.
const rcBetaAlphaCanaryNextDepsDEV = ["typescript@beta"];
const rcBetaAlphaCanaryNextDeps = ["next-auth@beta"];

const exclusionsUninstalling = [
  ...basicDependencies,
  ...basicDevDependencies,
].join(" ");

async function displayWelcomeMessage(): Promise<void> {
  log.info(
    "👋 Hello! This script helps improve your developer experience by installing and removing specific packages.",
  );
  log.step("💡 Usage example 1: pnpm deps:install info (or: updates)");
  log.step("💡 Usage example 2: pnpm deps:install install-basic-packages");
  log.step("💡 Usage example 3: pnpm deps:install-all (installs all packages)");
  log.step(
    "💡 Usage example 4: pnpm deps:install install-eslint-basic-packages",
  );
  log.step(
    "💡 Usage example 5: pnpm deps:install install-eslint-extended-packages",
  );
  log.step(
    "💡 Usage example 6: pnpm deps:install remove-all-packages (includes dependenciesEslintExtended)",
  );
  log.step(
    "💡 Usage example 7: pnpm deps:install find-unregistered-packages (alternative: pnpm deps:check)",
  );
  log.step(
    "💡 Usage example 8: pnpm deps:install find-incorrectly-placed-packages (alternative: pnpm deps:locations)",
  );
  log.step(
    // eslint-disable-next-line @stylistic/max-len
    `💡 Usage example 9: pnpm deps:use-next-15-rc (or: deps:use-next-15 (or: pnpm tsx packageJson.ts use ${useFlags.join(" / ")}))`,
  );
  log.info(
    `⭐ Full list of available flags (NOTE: 'use' flag has its own flags): ${flags.join(" / ")}\n`,
  );
}

function logError(error: unknown): void {
  if (error instanceof Error) {
    log.error(`❌ Error: ${error.message}`);
  } else {
    log.error("❌ An unknown error occurred.");
  }
}

type Flag = (typeof flags)[number];

type UseFlag = (typeof useFlags)[number];

const flag = argv[2];
const secondaryFlag = argv[3] as UseFlag;

const flagsSet = new Set(flags);
const useFlagsSet = new Set(useFlags);

function isFlag(value: any): value is Flag {
  return flagsSet.has(value);
}

function isUseFlag(value: any): value is UseFlag {
  return useFlagsSet.has(value);
}

function getInstalledDependencies(): {
  dependenciesArray: string[];
  dependenciesObject: Record<string, string>;
  dependenciesString: string;
} {
  const { dependencies, devDependencies } = readPackageSync();

  const dependenciesObject: Record<string, string> = {
    ...dependencies,
    ...devDependencies,
  };

  const dependenciesArray = Object.keys(dependenciesObject);
  const dependenciesString = dependenciesArray.join(" ");

  return { dependenciesArray, dependenciesObject, dependenciesString };
}

// eslint-disable-next-line complexity
async function handleDependencies(
  flag: (typeof flags)[number],
  cwd: string,
): Promise<void> {
  try {
    const { dependencies = {}, devDependencies = {} } = readPackageSync();

    const allDependencies: Record<string, string> = {
      ...dependencies,
      ...devDependencies,
    };

    const isBetaAlphaCanaryNextDepInstalled =
      rcBetaAlphaCanaryNextDepsDEV.every((dep) => {
        const [name, version] = dep.split("@");

        if (name === undefined || version === undefined) {
          log.error(`❌ Invalid dependency: ${dep}`);

          return false;
        }

        if (name in allDependencies) {
          const installedVersion = allDependencies[name];

          if (installedVersion === undefined) {
            log.error(`❌ Unable to find installed version for: ${name}`);

            return false;
          }

          return installedVersion.includes(version);
        }

        return false;
      }) &&
      rcBetaAlphaCanaryNextDeps.every((dep) => {
        const [name, version] = dep.split("@");

        if (name === undefined || version === undefined) {
          log.error(`❌ Invalid dependency: ${dep}`);

          return false;
        }

        if (name in allDependencies) {
          const installedVersion = allDependencies[name];

          if (installedVersion === undefined) {
            log.error(`❌ Unable to find installed version for: ${name}`);

            return false;
          }

          return installedVersion.includes(version);
        }

        return false;
      });

    switch (flag) {
      case "help":
        await handleUseFlags(secondaryFlag);
        break;

      case "install-all-packages":
        const allDepsToInstall = [
          ...basicDependencies,
          ...basicDevDependencies,
          ...dependenciesEslintBasic,
          ...dependenciesEslintExtended,
        ]
          .filter((dep) => !allDependencies[dep])
          .filter((dep) => !rcBetaAlphaCanaryNextDepsDEV.includes(dep))
          .filter((dep) => !rcBetaAlphaCanaryNextDeps.includes(dep));

        if (
          allDepsToInstall.length === 0 &&
          isBetaAlphaCanaryNextDepInstalled
        ) {
          log.success(
            "✅ Nothing to install. All packages registered in ./packageJson.ts are already installed.",
          );

          return;
        }

        spinner.start("Installing all missing dependencies...");

        if (!isBetaAlphaCanaryNextDepInstalled) {
          log.step(
            // eslint-disable-next-line @stylistic/max-len
            `The following packages will be installed: ${[...rcBetaAlphaCanaryNextDepsDEV, ...rcBetaAlphaCanaryNextDeps].join(" ")}\n`,
          );
          await addDevDependency(rcBetaAlphaCanaryNextDepsDEV, {
            silent: true,
          });
          await addDependency(rcBetaAlphaCanaryNextDeps, {
            silent: true,
          });
        }

        if (allDepsToInstall.length > 0) {
          log.step(
            `The following packages will be installed: ${allDepsToInstall.join(" ")}\n`,
          );
          await addDependency(allDepsToInstall, { silent: true });
        }

        spinner.stop();

        // eslint-disable-next-line @stylistic/max-len
        // log.warn("⭐ The Optional Next Steps:\n- Run `pnpm reli:setup` to switch to the 'ultimate' ESLint preset configured by the Reliverse.");
        log.success(
          // eslint-disable-next-line @stylistic/max-len
          "🎉 Great! All dependencies registered in ./packageJson.ts are installed now. In VSCode: `Cmd/Ctrl+Shift+P`  ➞  `>Developer: Restart Extension Host`.\n",
        );

        break;

      // ▶️ pnpm tsx packageJson.ts install-basic-packages
      case "install-basic-packages":
        const basicDepsToInstall = basicDependencies
          .filter((dep) => !allDependencies[dep])
          .filter((dep) => !rcBetaAlphaCanaryNextDepsDEV.includes(dep))
          .filter((dep) => !rcBetaAlphaCanaryNextDeps.includes(dep));

        const basicDevDepsToInstall = basicDevDependencies
          .filter((dep) => !allDependencies[dep])
          .filter((dep) => !rcBetaAlphaCanaryNextDepsDEV.includes(dep))
          .filter((dep) => !rcBetaAlphaCanaryNextDeps.includes(dep));

        if (
          basicDepsToInstall.length === 0 &&
          basicDevDepsToInstall.length === 0 &&
          isBetaAlphaCanaryNextDepInstalled
        ) {
          log.success(
            "✅ Nothing to install. All basic packages are already installed.",
          );

          return;
        }

        spinner.start("Installing basic dependencies");

        if (!isBetaAlphaCanaryNextDepInstalled) {
          log.step(
            // eslint-disable-next-line @stylistic/max-len
            `The following packages will be installed: ${[...rcBetaAlphaCanaryNextDepsDEV, ...rcBetaAlphaCanaryNextDeps].join(" ")}\n`,
          );
          await addDevDependency(rcBetaAlphaCanaryNextDepsDEV, {
            silent: true,
          });
          await addDependency(rcBetaAlphaCanaryNextDeps, {
            silent: true,
          });
        }

        log.step(
          // eslint-disable-next-line @stylistic/max-len
          `The following packages will be installed: ${basicDepsToInstall.join(" ")} ${basicDevDepsToInstall.join(" ")}\n`,
        );

        if (basicDepsToInstall.length > 0) {
          await addDependency(basicDepsToInstall, { silent: true });
        }

        if (basicDevDepsToInstall.length > 0) {
          await addDevDependency(basicDevDepsToInstall, { silent: true });
        }

        spinner.stop();
        log.success("🎉 Basic dependencies installed.");
        break;

      case "install-eslint-extended-packages":
        const eslintExtendedDepsToInstall = dependenciesEslintExtended.filter(
          (dep) => !allDependencies[dep],
        );

        if (eslintExtendedDepsToInstall.length === 0) {
          log.success(
            "✅ Nothing to install. Extended ESLint dependencies are already installed.",
          );

          return;
        }

        spinner.start("Installing extended ESLint dependencies");
        await addDevDependency(eslintExtendedDepsToInstall, { silent: true });
        spinner.stop();
        log.success("🎉 Extended ESLint dependencies installed.");
        break;

      case "remove-all-packages":
        const allDependenciesExceptExclusions = Object.keys(
          allDependencies,
        ).filter(
          (dep) =>
            !basicDependencies.includes(dep) &&
            !basicDevDependencies.includes(dep),
        );

        if (allDependenciesExceptExclusions.length === 0) {
          log.info("✅ No dependencies to remove.");
          log.info(
            `✅ All packages have already been removed except exclusions: \n${exclusionsUninstalling}\n`,
          );

          return;
        }

        await removeDependencies(
          allDependenciesExceptExclusions,
          cwd,
          "remove-all-packages",
        );
        break;

      case "remove-all-packages-ignore-exclusions":
        const allDependenciesIgnoreExclusions = Object.keys(allDependencies);

        if (allDependenciesIgnoreExclusions.length === 0) {
          log.info(
            "✅ No dependencies to remove. All packages have already been removed.\n",
          );

          return;
        }

        await removeDependencies(
          allDependenciesIgnoreExclusions,
          cwd,
          "remove-all-packages-ignore-exclusions",
        );
        break;

      case "welcome":
        await displayWelcomeMessage();
        break;

      default:
        // TODO: for some reason it is executed even without calling/importing ./packageJson.ts file
        // await displayWelcomeMessage();
        break;
    }
  } catch (error) {
    logError(error);
  }
}

async function removeDependencies(
  dependenciesToRemove: string[],
  cwd: string,
  removeKind: string = "",
): Promise<void> {
  const { dependencies, devDependencies } = readPackageSync();

  const allDependencies = [
    ...Object.keys(dependencies || {}),
    ...Object.keys(devDependencies || {}),
  ];

  const filteredDependencies = allDependencies.filter((key) =>
    dependenciesToRemove.includes(key),
  );

  const packageManager = await detectPackageManager(cwd);

  if (removeKind === "remove-all-packages") {
    log.warn(
      "Removing dependencies except exclusions, but including dependenciesEslintExtended...",
    );
  } else if (removeKind === "remove-all-packages-ignore-exclusions") {
    log.warn("🔴🔴🔴 Removing ALL dependencies... 🔴🔴🔴");
  }

  if (packageManager && filteredDependencies.length > 0) {
    spinner.start("Removing dependencies");

    for (const dependency of filteredDependencies) {
      await removeDependency(dependency, { silent: true });
    }

    spinner.stop();
    log.success(`✅ Dependencies removed: ${filteredDependencies.join(" ")}`);
  }

  if (removeKind === "remove-all-packages") {
    log.success(
      `✅ All dependencies were removed except exclusions: \n${exclusionsUninstalling}\n`,
    );
  }
}

let cachedCWD: null | string = null;

export function getCurrentWorkingDirectory(useCache: boolean = true): string {
  if (useCache && cachedCWD) {
    return cachedCWD;
  }

  try {
    const currentDirectory = normalize(cwd());

    if (useCache) {
      cachedCWD = currentDirectory;
    }

    return currentDirectory;
  } catch (error) {
    console.error("Error getting current working directory:", String(error));

    throw error;
  }
}

async function info(): Promise<void> {
  const { dependenciesObject, dependenciesString } = getInstalledDependencies();
  const appVersion = "1.2.6";
  const appName = "Relivator";

  log.warn("@reliverse/appts\n");

  const infoAppName = ` App Name: ${appName}`;
  const infoAppVersion = ` App Version: ${appVersion}`;
  const infoAppOs = ` OS: ${platform()} ${osVersion()}`;
  const infoAppNode = ` Node: ${nodeVersion}`;

  console.info(
    ` ${infoAppName} | ${infoAppVersion} | ${infoAppOs} | ${infoAppNode}`,
  );

  if (Object.keys(dependenciesObject).length === 0) {
    log.error("\u001B[31m%s\u001B[0m 🚨 No dependencies found");

    // exit(throwErrorOnFailedDepsCommand ? 1 : 0);
  }

  if (isFlag(flag) && flag === "updates") {
    log.info(`Installed dependencies: ${dependenciesString}`);
    spinner.start("Checking for new versions");
    let newVersionFound = false;

    for (const [dep, version] of Object.entries(dependenciesObject)) {
      const cleanedVersion = version.replace(/^\^/, "");
      const metadata = await getLatestVersion(dep);
      const latestVersion = metadata.version || "Unknown";

      if (latestVersion === "Unknown") {
        log.error(`   ${dep}: ${version} (Unable to fetch latest version)`);
      }

      if (
        semver.valid(cleanedVersion) &&
        semver.valid(latestVersion) &&
        semver.gt(latestVersion, cleanedVersion)
      ) {
        log.info(
          `   ${dep}: ${version} (New version available: ${latestVersion})`,
        );
        newVersionFound = true;
      }
    }

    if (newVersionFound) {
      spinner.stop();
      log.success(
        "\u001B[32m🚀 New versions found, please run: pnpm latest\u001B[0m",
      );
    } else {
      spinner.stop();
      log.success("\u001B[32m✅ All dependencies are up-to-date\u001B[0m");
    }
  }

  exit();
}

// ▶️ pnpm deps:check (included in: pnpm deps)
function findUnregisteredPackages(): void {
  const { dependencies = {}, devDependencies = {} } = readPackageSync();

  const allDependencies = {
    ...dependencies,
    ...devDependencies,
  };

  const knownDependencies = new Set<string>([
    ...basicDependencies,
    ...basicDevDependencies,
    ...dependenciesEslintBasic,
    ...dependenciesEslintExtended,
  ]);

  const excludeUnregisteredDependencies = new Set<string>(
    ignoreUnregisteredDependencies,
  );

  const unregisteredDependencies = Object.keys(allDependencies).filter(
    (dep) => {
      // Check if the dependency exists in knownDependencies with or without version suffixes
      if (knownDependencies.has(dep)) {
        return false;
      }

      const depBaseName = dep.split("@")[0];

      return (
        ![...knownDependencies].some((knownDep) => {
          const knownDepBaseName = knownDep.split("@")[0];

          return knownDepBaseName === depBaseName;
        }) && !excludeUnregisteredDependencies.has(dep)
      );
    },
  );

  if (unregisteredDependencies.length > 0) {
    log.warn("🚨 Unregistered dependencies found:\n");
    console.log("[");

    for (const dep of unregisteredDependencies) {
      console.log(`  "${dep}",`);
    }

    console.log("]");
    log.warn(
      "💡 Please add these dependencies to the arrays in the ./packageJson.ts file.\n",
    );

    exit(throwErrorOnFailedDepsCommand ? 1 : 0);
  }
}

async function writePackageJson(packageJson: PackageJson): Promise<void> {
  const packageJsonPath = path.resolve(process.cwd(), "package.json");

  await fs.writeFile(
    packageJsonPath,
    JSON.stringify(packageJson, null, 2),
    "utf8",
  );
}

// ▶️ pnpm deps:locations (included in: pnpm deps)
// eslint-disable-next-line complexity
async function checkIncorrectlyPlacedPackages() {
  const { dependencies = {}, devDependencies = {} } = readPackageSync();

  const packagesToCheck = {
    dependencies: [
      ...basicDevDependencies,
      "chai",
      "concurrently",
      "cross-env",
      "cypress",
      "emotion",
      "enzyme",
      "jest",
      "mocha",
      "nodemon",
      "parcel-bundler",
      "prettier",
      "rimraf",
      "rollup",
      "styled-components",
      "stylelint",
      "vite",
      "webpack",
    ],
    devDependencies: [...basicDependencies],
  };

  const misplacedDependencies = [];
  const misplacedDevDependencies = [];

  // Check dependencies for misplaced packages
  for (const dep of Object.keys(dependencies)) {
    if (
      packagesToCheck.dependencies.includes(dep) ||
      dep.startsWith("@typescript-eslint/") ||
      dep.startsWith("@types/") ||
      dep.startsWith("@putout/") ||
      dep.startsWith("@babel/") ||
      dep.startsWith("babel-") ||
      dep.startsWith("eslint-")
    ) {
      misplacedDependencies.push(dep);
    }
  }

  // Check devDependencies for misplaced packages
  for (const devDep of Object.keys(devDependencies)) {
    if (packagesToCheck.devDependencies.includes(devDep)) {
      misplacedDevDependencies.push(devDep);
    }
  }

  if (automaticPackageJsonDependenciesMover && localDebugEnabled) {
    const updatedDependencies = { ...dependencies };
    const updatedDevDependencies = { ...devDependencies };

    for (const dep of misplacedDependencies) {
      if (updatedDependencies[dep] === undefined) {
        log.error(
          `❌ [package.json | packageJson.ts] Unable to find dependency: ${dep}`,
        );

        return;
      }

      updatedDevDependencies[dep] = updatedDependencies[dep];
      delete updatedDependencies[dep];
    }

    for (const devDep of misplacedDevDependencies) {
      if (updatedDevDependencies[devDep] === undefined) {
        log.error(
          `❌ [package.json | packageJson.ts] Unable to find devDependency: ${devDep}`,
        );

        return;
      }

      updatedDependencies[devDep] = updatedDevDependencies[devDep];
      delete updatedDevDependencies[devDep];
    }

    await writePackageJson({
      dependencies: updatedDependencies,
      devDependencies: updatedDevDependencies,
    });

    log.info(
      "🚀 Packages have been automatically moved. Please run `pnpm install` to update the lockfile.\n",
    );

    return;
  }

  if (misplacedDependencies.length > 0) {
    log.warn(
      // eslint-disable-next-line @stylistic/max-len
      "🚨 [package.json | packageJson.ts] The following packages are currently in `dependencies` but should be in `devDependencies`:",
    );

    for (const dep of misplacedDependencies) {
      log.warn(`- ${dep}`);
    }

    log.info(
      // eslint-disable-next-line @stylistic/max-len
      "💡 [package.json | packageJson.ts] Please move these packages from `dependencies` to `devDependencies`, then run `pnpm install` to update the lockfile.\n",
    );

    exit(throwErrorOnFailedDepsCommand ? 1 : 0);
  }

  if (misplacedDevDependencies.length > 0) {
    log.warn(
      // eslint-disable-next-line @stylistic/max-len
      "🚨 [package.json | packageJson.ts] The following packages are currently in `devDependencies` but should be in `dependencies`:",
    );

    for (const devDep of misplacedDevDependencies) {
      log.warn(`- ${devDep}`);
    }

    log.info(
      // eslint-disable-next-line @stylistic/max-len
      "💡 [package.json | packageJson.ts] Please move these packages from `devDependencies` to `dependencies`, then run `pnpm install` to update the lockfile.\n",
    );

    exit(throwErrorOnFailedDepsCommand ? 1 : 0);
  }
}

// [usage example] ▶️ pnpm deps:use-next-15-rc (or: deps:use-next-15)
// eslint-disable-next-line max-lines-per-function, complexity
async function handleUseFlags(flag: UseFlag) {
  const reactStable = ["react", "react-dom"];
  const nextStable = [...reactStable, "next"];

  const reactRC = ["react@rc", "react-dom@rc"];
  const nextCanary = [...reactRC, "next@canary"];
  const nextRC = [...reactRC, "next@rc"];

  const tailwindStable = ["tailwindcss", "postcss", "autoprefixer"];
  const tailwindNext = [
    "tailwindcss@next",
    "@tailwindcss/postcss@next",
    "@tailwindcss/cli@next",
  ];

  const packageSizes: Record<string, number> = {
    "@tailwindcss/cli": 100,
    "@tailwindcss/postcss": 100,
    autoprefixer: 50,
    next: 500,
    postcss: 50,
    react: 100, // size in kilobytes
    "react-dom": 100,
    tailwindcss: 200,
  };

  function getInstalledDependencies(): Record<string, string> {
    const { dependencies = {}, devDependencies = {} } = readPackageSync();

    return { ...dependencies, ...devDependencies };
  }

  async function measureDownloadSpeed(): Promise<number> {
    const urls = [
      "https://speed.hetzner.de/100MB.bin",
      "http://ipv4.download.thinkbroadband.com/100MB.zip",
      "http://speedtest.tele2.net/100MB.zip",
    ];

    let startTime: number;
    let endTime: number;
    let duration: number;
    const fileSize = 100 * 1024; // size in kilobytes
    const defaultSpeed = 600; // default speed in KB/s if all URLs fail

    for (const url of urls) {
      try {
        startTime = performance.now();
        await axios.get(url, { responseType: "arraybuffer" });
        endTime = performance.now();
        duration = (endTime - startTime) / 1000; // duration in seconds

        return fileSize / duration; // speed in KB/s
      } catch (error) {
        console.error(
          `Failed to download from ${url}: ${String(error) || "Unknown error"}`,
        );
      }
    }

    // Return default speed if all URLs fail
    log.warn("All download URLs failed. Returning default speed.");

    return defaultSpeed;
  }

  async function estimateDownloadTime(
    packages: string[],
    speed: number,
  ): Promise<number> {
    const totalSize = packages.reduce((sum, package_) => {
      const [packageName] = package_.split("@");

      if (
        !packageName ||
        !Object.prototype.hasOwnProperty.call(packageSizes, packageName)
      ) {
        throw new Error(`Package size for '${packageName}' not found.`);
      }

      return sum + (packageSizes[packageName] || 0);
    }, 0);

    return totalSize / speed; // time in seconds
  }

  function isVersionMatching(
    installedVersion: string,
    versionPattern: string,
  ): boolean {
    if (versionPattern.includes("*")) {
      const baseVersion = versionPattern.replace("*", "");

      return semver.satisfies(installedVersion, `^${baseVersion}`);
    }

    return semver.satisfies(installedVersion, versionPattern);
  }

  async function checkAndInstall(
    dependencies: string[],
    installFunction: (
      deps: string[],
      options: { silent: boolean },
    ) => Promise<void>,
    speed: number,
    packageName: string,
  ): Promise<boolean> {
    try {
      if (typeof installFunction !== "function") {
        throw new TypeError("installFunction is not a function");
      }

      const installedDeps = getInstalledDependencies();
      const toInstall = dependencies.filter((dep) => {
        if (!dep) {
          return false;
        }

        const [depName, packageVersion] = dep.split("@");

        // Ensure depName exists in installedDeps before accessing its version
        const installedVersion = depName ? installedDeps[depName] : undefined;

        return (
          !installedVersion ||
          (packageVersion &&
            !isVersionMatching(installedVersion, packageVersion))
        );
      });

      if (toInstall.length === 0) {
        return false; // All dependencies are already installed with the correct versions
      }

      let downloadTime = await estimateDownloadTime(toInstall, speed);

      const packageManager = await detectPackageManager(
        getCurrentWorkingDirectory(),
      );

      if (packageManager?.name === "bun") {
        downloadTime = downloadTime + 12; // add 12 seconds for bun (@see https://bun.sh)
      } else if (packageManager?.name === "pnpm") {
        downloadTime = downloadTime + 17; // add 17 seconds for pnpm (@see https://pnpm.io)
      } else {
        downloadTime = downloadTime + 20; // add 20 seconds for other package managers
      }

      // TODO: In some cases, installation occurs even if the library is already installed.
      // TODO: Perhaps patterns like `15.0.0-canary.95` are not being handled correctly.
      spinner.start(
        `Switching to ${packageName} (wait: ~${Math.ceil(downloadTime)}s)`,
      );

      await installFunction(toInstall, { silent: true });

      return true; // Dependencies were installed
    } catch (error) {
      console.error(`Error during checkAndInstall: ${String(error)}`);

      throw error;
    }
  }

  try {
    const localDppDebugEnabled = localDebugEnabled;
    let speed = 600; // default speed

    if (localDppDebugEnabled) {
      speed = await measureDownloadSpeed();
    }

    switch (flag) {
      case "next-14":
        if (
          await checkAndInstall(nextStable, addDependency, speed, "Next.js 14")
        ) {
          spinner.stop();
          log.info("Switched to: Next.js 14 (✅ installed by default)");
          log.info(`Installed: ${nextStable.join(" ")}`);
          log.info("💡 https://nextjs.org/blog/next-14-2");
        } else {
          spinner.stop();
          log.info("Next.js 14 is already installed.");
        }

        break;

      case "next-15-rc":
        if (
          await checkAndInstall(
            nextStable,
            addDependency,
            speed,
            "Next.js 15 RC",
          )
        ) {
          spinner.stop();
          log.info("Switched to: Next.js 15 RC");
          log.info(`Installed: ${nextStable.join(" ")}`);
          log.info("💡 https://nextjs.org/blog/next-15-rc");
        } else {
          spinner.stop();
          log.info("Next.js 15 RC is already installed.");
        }

        break;

      case "next-15-unstable":
        if (
          await checkAndInstall(
            nextRC,
            addDependency,
            speed,
            "Next.js 15 (unstable)",
          )
        ) {
          spinner.stop();
          log.info("Switched to: Next.js 15 (unstable)");
          log.info(`Installed: ${nextCanary.join(" ")}`);
          log.info("💡 https://nextjs.org/blog/next-15-rc");
        } else {
          spinner.stop();
          log.info("Next.js 15 is already installed.");
        }

        break;

      case "react-18":
        if (
          await checkAndInstall(reactStable, addDependency, speed, "React 18")
        ) {
          spinner.stop();
          log.info("Switched to: React 18 (✅ installed by default)");
          log.info(`Installed: ${reactStable.join(" ")}`);
          log.info(
            "💡 https://github.com/facebook/react/blob/main/CHANGELOG.md",
          );
        } else {
          spinner.stop();
          log.info("React 18 is already installed.");
        }

        break;

      case "react-19-unstable":
        if (
          await checkAndInstall(
            reactRC,
            addDependency,
            speed,
            "React 19 (unstable)",
          )
        ) {
          spinner.stop();
          log.info("Switched to: React 19 (unstable)");
          log.info(`Installed: ${reactRC.join(" ")}`);
          log.info("💡 https://react.dev/blog/2024/04/25/react-19");
        } else {
          spinner.stop();
          log.info("React 19 is already installed.");
        }

        break;

      case "tailwindcss-3":
        if (
          await checkAndInstall(
            tailwindStable,
            addDevDependency,
            speed,
            "Tailwind 3",
          )
        ) {
          spinner.stop();
          log.info("Switched to: Tailwind 3 (✅ installed by default)");
          log.info(`Installed: ${tailwindStable.join(" ")}`);
          log.info("💡 https://tailwindcss.com/blog");
        } else {
          spinner.stop();
          log.info("Tailwind 3 is already installed.");
        }

        break;

      case "tailwindcss-4-unstable":
        if (
          await checkAndInstall(
            tailwindNext,
            addDependency,
            speed,
            "Tailwind 4 (unstable)",
          )
        ) {
          spinner.stop();
          log.info("Switched to: Tailwind 4 (unstable)");
          log.info(`Installed: ${tailwindNext.join(" ")}`);
          log.info("💡 https://tailwindcss.com/blog/tailwindcss-v4-alpha");
        } else {
          spinner.stop();
          log.info("Tailwind 4 is already installed.");
        }

        break;

      default:
        if (flag === undefined) {
          log.error("⛔ The 'use' functional flag requires a secondary flag.");
          log.info(`💡 Available secondary flags: ${useFlags.join(", ")}`);
          log.info(
            // eslint-disable-next-line @stylistic/max-len
            "💡 Example: pnpm deps:use-next-15-rc (or: deps:use-next-15 (or: pnpm tsx packageJson.ts use [secondary-flag]))",
          );
          break;
        }

        log.error(
          `The 'use' flag does not support the following flag: ${flag}`,
        );
        log.info(`Available flags: ${useFlags.join(", ")}`);
        break;
    }
  } catch (error) {
    let packagesToInstall = [];

    switch (flag) {
      case "next-14":
        packagesToInstall = nextStable.map((package_) => `${package_}@latest`);
        break;

      case "next-15-rc":
        packagesToInstall = nextStable.map((package_) => `${package_}@rc`);
        break;

      case "next-15-unstable":
        packagesToInstall = nextCanary;
        break;

      case "react-18":
        packagesToInstall = nextStable.map((package_) => `${package_}@latest`);
        break;

      case "react-19-unstable":
        packagesToInstall = reactRC;
        break;

      case "tailwindcss-3":
        packagesToInstall = tailwindStable.map(
          (package_) => `${package_}@latest`,
        );
        break;

      case "tailwindcss-4-unstable":
        packagesToInstall = tailwindNext;
        break;

      default:
        packagesToInstall = [
          "next@latest",
          "react@latest",
          "tailwindcss@latest",
        ];
        break;
    }

    const packagesToInstallString = packagesToInstall.join(" ");

    log.error(`Error during handleUseFlags: ${String(error)}`);
    log.step(
      `Please install package manually: npx nypm add ${packagesToInstallString}`,
    );

    logError(String(error));
  }
}

async function main(): Promise<void> {
  if (flag) {
    const cwd = getCurrentWorkingDirectory();

    await handleDependencies(flag as (typeof flags)[number], cwd);
  }

  // TODO: for some reason it is executed even without calling/importing ./packageJson.ts file
  // else { await displayWelcomeMessage(); }
}

if (isFlag(flag)) {
  if (flag === "info" || flag === "updates") {
    info(); // ▶️ pnpm deps:info (or: deps:updates)
  } else if (flag === "find-unregistered-packages") {
    findUnregisteredPackages(); // ▶️ pnpm deps:check
  } else if (flag === "find-incorrectly-placed-packages") {
    await checkIncorrectlyPlacedPackages(); // ▶️ pnpm deps:locations
  } else if (flag === "use" && isUseFlag(secondaryFlag)) {
    await handleUseFlags(secondaryFlag); // ▶️ pnpm deps:use-next-15-rc (or: deps:use-next-15)
  } else {
    main(); // ▶️ pnpm deps:install (with other flags)
  }
} else {
  main(); // ▶️ pnpm deps:install (without any valid flag)
}
