/** @type {import("stylelint").Config} */
export default {
  plugins: ["stylelint-scss"],
  extends: ["stylelint-config-standard-scss", "stylelint-config-css-modules"],
  overrides: [{ files: ["**/*.scss"], customSyntax: "postcss-scss" }],
};
