/** @typedef {import("@ianvs/prettier-plugin-sort-imports").PluginConfig} SortImportsConfig */
/** @typedef {import("prettier").Config} PrettierConfig */

/** @type {PrettierConfig | SortImportsConfig} */
const config = {
  semi: true,
  tabWidth: 2,
  printWidth: 80,
  useTabs: false,
  endOfLine: "lf",
  singleQuote: false,
  trailingComma: "none",
  arrowParens: "always",
  bracketSameLine: false,
  // ====================
  importOrder: [
    "^(react/(.*)$)|^(react$)",
    "",
    "^(next/(.*)$)|^(next$)",
    "",
    "<TYPES>",
    "<TYPES>^[./]",
    "<THIRD_PARTY_MODULES>",
    "",
    "^types$",
    "^~/env(.*)$",
    "^~/types/(.*)$",
    "^~/utils/(.*)$",
    "",
    "^~/server/config/(.*)$",
    "^~/server/(.*)$",
    "^~/data/(.*)$",
    "",
    "^~/layout/ui/(.*)$",
    "^~/layout/(.*)$",
    "^~/styles/(.*)$",
    "^~/tests/(.*)$",
    "^~/app/(.*)$",
    "",
    "^[./]",
    "",
  ],
  importOrderTypeScriptVersion: "5.1.6",
  importOrderParserPlugins: ["typescript", "jsx", "decorators-legacy"],
  // ==================================================================
  plugins: [
    require.resolve("@ianvs/prettier-plugin-sort-imports"),
    require.resolve("prettier-plugin-packagejson"),
    require.resolve("prettier-plugin-tailwindcss"),
  ],
};

module.exports = config;
