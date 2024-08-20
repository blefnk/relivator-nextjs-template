import { getRandomQuote } from "@/scripts/reliverse/quotes";
import { config } from "@reliverse/core";
import { getCurrentDirname, getRootDirname } from "@reliverse/fs";
import consola from "consola";
import fs from "fs-extra";
import * as path from "pathe";
import pc from "picocolors";

// 🀄 @reliverse/addons-relimter [v0.0.0]: Reliverse Formatter Linter
const currentDirname = getCurrentDirname(import.meta.url);
const rootDirname = getRootDirname(import.meta.url, 6);

// TODO: Move technical things to a separate package called `@reliverse/addons-relimter`
// export async function runRelimter(): Promise<void> {
// consola.warn("eslintCacheFilePath:", eslintCacheFilePath);
const eslintCacheFilePath = path.join(
  currentDirname,
  `${rootDirname}/.eslintcache`,
);

if (fs.existsSync(eslintCacheFilePath)) {
  await getRandomQuote();

  consola.info(
    ` If you or your company are using ${config.framework.name} or just appreciate what I'm (@blefnk | https://github.com/blefnk) doing, please consider supporting me to speed up the development.\n🙏 I would be very grateful! By using the following platforms, you'll receive many incredible benefits! Thank you so much!\n${pc.green("💚 https://github.com/sponsors/blefnk 💙 https://paypal.me/blefony 💜 https://patreon.com/blefnk 💛 https://buymeacoffee.com/blefnk 🩷  https://ko-fi.com/blefnk")} \n`,
  );

  consola.info(
    `${pc.dim("@reliverse/addons-relimter/eslint")} ⌛ Please wait, ESLint is processing your files...`,
  );
} else {
  await getRandomQuote();

  consola.info(
    ` If you or your company are using ${config.framework.name} or just appreciate what I'm (@blefnk | https://github.com/blefnk) doing, please consider supporting me to speed up the development.\n🙏 I would be very grateful! By using the following platforms, you'll receive many incredible benefits! Thank you so much!\n${pc.green("💚 https://github.com/sponsors/blefnk 💙 https://paypal.me/blefony 💜 https://patreon.com/blefnk 💛 https://buymeacoffee.com/blefnk 🩷  https://ko-fi.com/blefnk")} \n`,
  );

  consola.info(
    // eslint-disable-next-line @stylistic/max-len
    `${pc.dim("@reliverse/addons-relimter/eslint")} ⌛ Linting and fixing issues with ESLint can take a while on the first run, sometimes a few minutes if there are many problems to resolve. This is especially true when using the fix:putout-unstable command. Please be patient, as subsequent runs will be much faster.\n`,
  );
}
