/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import("prettier").Config} PrettierConfig */

/** @type {PrettierConfig | SortImportsConfig} */
const config = {
  printWidth: 80,
  tabWidth: 2,
  semi: true,
  useTabs: false,
  singleQuote: false,
  bracketSameLine: false,
  arrowParens: "always",
  trailingComma: "all",
  endOfLine: "lf",
  importOrder: [
    "^~/styles/(.*)$",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/types/(.*)$",
    "^~/server/(.*)$",
    "^~/data/(.*)$",
    "^~/hooks/(.*)$",
    "^~/forms/(.*)$",
    "^~/islands/(.*)$",
    "^~/app/(.*)$",
    "^~/app.ts",
    "",
    "^[./]",
    "",
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("prettier-plugin-packagejson"),
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
  ],
};

module.exports = config;
