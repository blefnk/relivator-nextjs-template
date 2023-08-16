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
  trailingComma: "none",
  arrowParens: "always",
  endOfLine: "lf",
  importOrder: [
    "^~/styles/(.*)$",
    "^~/app.ts",
    "",
    "<TYPES>",
    "^types$",
    "<TYPES>^[./]",
    "^~/types/(.*)$",
    "",
    "^(react/(.*)$)|^(react$)",
    "^(next/(.*)$)|^(next$)",
    "",
    "<THIRD_PARTY_MODULES>",
    "",
    "^~/data/(.*)$",
    "^~/hooks/(.*)$",
    "^~/utils/(.*)$",
    "",
    "^~/islands/(.*)$",
    "^~/app/(.*)$",
    "^~/schema/(.*)$",
    "",
    "^[./]",
    ""
  ],
  plugins: [
    require.resolve("prettier-plugin-tailwindcss"),
    require.resolve("prettier-plugin-packagejson"),
    require.resolve("@ianvs/prettier-plugin-sort-imports")
  ],
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  importOrderTypeScriptVersion: "5.1.6"
};

module.exports = config;
