import consola from "consola";
import pc from "picocolors";

consola.info(
  `${pc.dim("@reliverse/addons-relimter/putout")} ⌛ Please wait, Putout is processing your files...\n`,
);

consola.info(
  "💡 If you get the issues notified by Putout, try running pnpm fix:putout-unstable (it's recommended to commit your changes to Git first), you may need to run this command a few times to ensure everything is fully fixed, or just run pnpm lint:putout --disable-all (or fix them, or disable rules manually, or just specify file in 'ignore' section of .putout.json file, especially if issue is thrown by 'parser' (for more information run 'pnpm putout --help' and visit https://github.com/coderaiser/putout)\n",
);
