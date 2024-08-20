import js from "@eslint/js";
import reactCommunity from "@eslint-react/eslint-plugin";
// @ts-expect-error missing types
import nextPlugin from "@next/eslint-plugin-next";
import stylistic from "@stylistic/eslint-plugin";
import tanstack from "@tanstack/eslint-plugin-query";
// @ts-expect-error missing types
import barrel from "eslint-plugin-barrel-files";
// @ts-expect-error missing types
import drizzle from "eslint-plugin-drizzle";
// @ts-expect-error missing types
import eslintComments from "eslint-plugin-eslint-comments";
import importX from "eslint-plugin-import-x";
import jsonc from "eslint-plugin-jsonc";
// @ts-expect-error missing types
import jsxA11yPlugin from "eslint-plugin-jsx-a11y";
// @ts-expect-error missing types
import markdown from "eslint-plugin-markdown";
import nodePlugin from "eslint-plugin-n";
// @ts-expect-error missing types
import noComments from "eslint-plugin-no-comments";
// @ts-expect-error missing types
import noRelative from "eslint-plugin-no-relative-import-paths";
import perfectionist from "eslint-plugin-perfectionist";
// @ts-expect-error missing types
import promisePlugin from "eslint-plugin-promise";
// @ts-expect-error missing types
import reactJsxRuntime from "eslint-plugin-react/configs/jsx-runtime.js";
// @ts-expect-error missing types
import reactRecommended from "eslint-plugin-react/configs/recommended.js";
// @ts-expect-error missing types
import reactHooks from "eslint-plugin-react-hooks";
// @ts-expect-error missing types
import reactRefresh from "eslint-plugin-react-refresh";
import tailwindReadable from "eslint-plugin-readable-tailwind";
import * as regexp from "eslint-plugin-regexp";
import sonarjs from "eslint-plugin-sonarjs";
// @ts-expect-error missing types
import eslintPluginSort from "eslint-plugin-sort";
// @ts-expect-error missing types
import sortExports from "eslint-plugin-sort-exports";
// @ts-expect-error missing types
import tailwindcss from "eslint-plugin-tailwindcss";
import unicorn from "eslint-plugin-unicorn";
import yaml from "eslint-plugin-yml";
import globals from "globals";
import tseslint from "typescript-eslint";

// The current Relivator 1.2.6 version comes with many predefined ESLint configs.
// Run the `pnpm reli:setup` to easily switch between them and set up other tooling.
// Current: addons\scripts\reliverse\relicon\setup\configs\eslint.config.ultimate.ts
//
const stylisticConfig = stylistic.configs.customize({
  indent: 2,
  jsx: true,
  quoteProps: "as-needed",
  quotes: "double",
  semi: true,
});

// ===================================================================
// Steps if you want to use the new React Compiler:
// - npx nypm add -D babel-plugin-react-compiler
// - npx nypm add -D eslint-plugin-react-compiler
// - import compiler from "eslint-plugin-react-compiler";
// - Add the compiler plugin to the plugins object (["react-compiler": compiler,])
// - Add the compiler rules to the rules object
// - Set experimental.reactCompiler to true in next.config.js
// @see https://react.dev/learn/react-compiler
// ===================================================================
//
// @see https://eslint.org
// @see https://typescript-eslint.io
// @see https://github.com/blefnk/relivator
//
export default tseslint.config(
  js.configs.recommended,
  {
    ignores: [
      "**/.{git,next,astro,turbo,million,output}/",
      "**/{node_modules,build,dist,drizzle}/",
      "pnpm-lock.yaml",
    ],
  },
  {
    name: "@reliverse/eslint-config/core",
    extends: [
      ...tseslint.configs.strictTypeChecked,
      ...tseslint.configs.stylisticTypeChecked,
      sonarjs.configs.recommended,
      nodePlugin.configs["flat/recommended-module"],
      reactCommunity.configs["recommended-type-checked"],
      eslintPluginSort.configs["flat/recommended"],
      unicorn.configs["flat/recommended"],
      regexp.configs["flat/recommended"],
    ],
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.es2024,
        ...globals.node,
      },
      parser: tseslint.parser,
      parserOptions: {
        // TODO: `projectService` throws an error when creating new files not implicitly
        // TODO: included in tsconfig.json (thats we are using `project: true` for now)
        ecmaFeatures: {
          impliedStrict: true,
          jsx: true,
        },
        project: true,
        tsconfigRootDir: import.meta.dirname,
        warnOnUnsupportedTypeScriptVersion: false,
      },
    },
    linterOptions: {
      reportUnusedDisableDirectives: "warn",
    },
    plugins: {
      ...reactRecommended.plugins,
      "@next/next": nextPlugin,
      "@stylistic": stylistic,
      "@tanstack/query": tanstack,
      "barrel-files": { rules: barrel.rules },
      "@typescript-eslint": tseslint.plugin,
      drizzle: drizzle,
      "eslint-comments": eslintComments,
      "import-x": importX,
      "jsx-a11y": {
        rules: jsxA11yPlugin.rules,
      },
      "no-relative-import-paths": noRelative,
      perfectionist: perfectionist,
      promise: promisePlugin,
      "react/jsx-runtime": reactJsxRuntime,
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
      "readable-tailwind": tailwindReadable,
      sort: eslintPluginSort,
      "sort-exports": sortExports,
      tailwindcss: tailwindcss,
    },
    rules: {
      // @see https://eslint.org/docs/latest/use/configure
      ...perfectionist.configs["recommended-natural"].rules,
      ...stylisticConfig.rules,
      ...importX.configs.recommended.rules,
      ...jsxA11yPlugin.configs.recommended.rules,
      ...nextPlugin.configs.recommended.rules,
      ...promisePlugin.configs.recommended.rules,
      ...reactHooks.configs.recommended.rules,
      ...reactJsxRuntime.rules,
      ...reactRecommended.rules,
      ...tailwindReadable.configs.error.rules,
      ...tailwindReadable.configs.warning.rules,
      ...tailwindcss.configs.recommended.rules,

      // @see https://npmjs.com/package/eslint-plugin-barrel-files
      "barrel-files/avoid-importing-barrel-files": "off",

      // Alternative: https://npmjs.com/package/eslint-plugin-no-barrel-files
      "barrel-files/avoid-barrel-files": "warn",
      "barrel-files/avoid-namespace-import": "off",
      "barrel-files/avoid-re-export-all": "off",

      // @see https://eslint-react.xyz/rules/overview
      "@eslint-react/dom/no-dangerously-set-innerhtml": "off",
      "@eslint-react/no-array-index-key": "off",
      "@eslint-react/no-leaked-conditional-rendering": "off",
      "@eslint-react/no-unstable-context-value": "off",
      "@eslint-react/no-unstable-default-props": "off",
      "@eslint-react/prefer-destructuring-assignment": "off",
      "@eslint-react/prefer-read-only-props": "off",

      // @see https://nextjs.org/docs/app/building-your-application/configuring/eslint#eslint-plugin
      "@next/next/no-duplicate-head": "off",
      "@next/next/no-html-link-for-pages": "off",

      // @see https://eslint.style/rules
      "@stylistic/array-bracket-newline": [
        "off",
        {
          minItems: 10,
          multiline: true,
        },
      ],
      "@stylistic/array-bracket-spacing": [
        "warn",
        "never",
        {
          arraysInArrays: false,
          objectsInArrays: false,
          singleValue: false,
        },
      ],
      "@stylistic/arrow-parens": ["warn", "always"],

      // { requireForBlockBody: true },
      "@stylistic/arrow-spacing": [
        "warn",
        {
          after: true,
          before: true,
        },
      ],
      "@stylistic/block-spacing": ["warn", "always"],
      "@stylistic/brace-style": [
        "off",
        "1tbs",
        {
          allowSingleLine: true,
        },
      ],
      "@stylistic/comma-dangle": [
        "warn",
        {
          // TODO: fix `Unexpected trailing comma.` when `type<>`
          arrays: "always-multiline",
          enums: "always-multiline",
          exports: "always-multiline",
          functions: "always-multiline",
          generics: "always-multiline",
          imports: "always-multiline",
          objects: "always-multiline",
          tuples: "always-multiline",
        },
      ],
      "@stylistic/comma-spacing": [
        "warn",
        {
          after: true,
          before: false,
        },
      ],
      "@stylistic/comma-style": ["warn", "last"],
      "@stylistic/computed-property-spacing": ["off", "always"],
      "@stylistic/dot-location": ["warn", "property"],
      "@stylistic/eol-last": "warn",
      "@stylistic/function-call-argument-newline": ["warn", "consistent"],
      "@stylistic/function-call-spacing": ["warn", "never"],
      "@stylistic/function-paren-newline": [
        // TODO: fix incompatibility with biome (or with something else)
        "off",
        "multiline-arguments",
      ],
      "@stylistic/generator-star-spacing": [
        "warn",
        {
          after: true,
          before: false,
          method: {
            after: false,
            before: true,
          },
        },
      ],
      "@stylistic/implicit-arrow-linebreak": ["off", "beside"],
      "@stylistic/indent": [
        // TODO: fix incompatibility with biome (or with something else)
        "off",
        2,
        {
          ignoredNodes: [
            "TSTypeLiteral > TSPropertySignature",
            "TSUnionType > TSTypeLiteral",
          ],
          SwitchCase: 1,
        },
      ],
      "@stylistic/indent-binary-ops": ["off", 2],

      // @see https://eslint.style/rules
      "@stylistic/jsx-child-element-spacing": "off",
      "@stylistic/jsx-closing-bracket-location": "off",
      "@stylistic/jsx-closing-tag-location": "off",
      "@stylistic/jsx-curly-newline": "off",
      "@stylistic/jsx-indent": [
        "off",
        2,
        {
          checkAttributes: true,
          indentLogicalExpressions: true,
        },
      ],
      "@stylistic/jsx-indent-props": ["warn", 2],
      "@stylistic/jsx-one-expression-per-line": "off",
      "@stylistic/jsx-pascal-case": "off",
      "@stylistic/jsx-self-closing-comp": "off",
      "@stylistic/jsx-wrap-multilines": [
        "warn",
        {
          arrow: "parens",
          assignment: "parens",
          condition: "ignore",
          declaration: "parens",
          logical: "ignore",
          prop: "ignore",
          return: "parens",
        },
      ],
      "@stylistic/key-spacing": [
        "warn",
        {
          afterColon: true,
          beforeColon: false,
        },
      ],
      "@stylistic/keyword-spacing": [
        "warn",
        {
          after: true,
          before: true,
        },
      ],
      "@stylistic/linebreak-style": ["warn", "unix"],
      "@stylistic/lines-around-comment": [
        "warn",
        {
          afterBlockComment: false,
          afterHashbangComment: true,
          afterLineComment: false,
          allowArrayEnd: true,
          allowArrayStart: true,
          allowBlockEnd: true,
          allowBlockStart: true,
          allowClassEnd: true,
          allowClassStart: true,
          allowEnumEnd: true,
          allowEnumStart: true,
          allowInterfaceEnd: true,
          allowInterfaceStart: true,
          allowModuleEnd: true,
          allowModuleStart: true,
          allowObjectEnd: true,
          allowObjectStart: true,
          allowTypeEnd: true,
          allowTypeStart: true,
          applyDefaultIgnorePatterns: true,
          beforeBlockComment: true,
          beforeLineComment: true,
          ignorePattern:
            "@type\\s.+|@ts-expect-error|biome-ignore|TODO:|import",
        },
      ],

      // @see https://eslint.style/rules/default/max-len
      "@stylistic/max-len": [
        // @see https://github.com/eslint/eslint/issues/11325
        "warn",
        {
          // TODO: change to 80 in 1.3.0 GA release (@see https://github.com/prettier/prettier/issues)
          code: 120,
          ignoreComments: false,
          ignorePattern: "^[\\s]*(//|<!--) (es|style)lint-.+",
          ignoreRegExpLiterals: false,
          ignoreStrings: false,
          ignoreTemplateLiterals: false,
          ignoreTrailingComments: false,
          ignoreUrls: true,
          tabWidth: 2,
        },
      ],
      "@stylistic/max-statements-per-line": [
        "off",
        {
          max: 1,
        },
      ],
      "@stylistic/member-delimiter-style": [
        "warn",
        {
          multiline: {
            delimiter: "comma",
            requireLast: false,
          },
          multilineDetection: "brackets",
          overrides: {
            interface: {
              multiline: {
                delimiter: "semi",
                requireLast: true,
              },
              singleline: {
                delimiter: "semi",
                requireLast: false,
              },
            },
            typeLiteral: {
              multiline: {
                delimiter: "semi",
                requireLast: true,
              },
              singleline: {
                delimiter: "semi",
                requireLast: false,
              },
            },
          },
          singleline: {
            delimiter: "comma",
            requireLast: false,
          },
        },
      ],
      "@stylistic/multiline-ternary": [
        "off",
        "always-multiline",
        {
          ignoreJSX: true,
        },
      ],
      "@stylistic/new-parens": ["warn", "always"],
      "@stylistic/newline-per-chained-call": [
        "warn",
        {
          ignoreChainWithDepth: 3,
        },
      ],
      "@stylistic/no-confusing-arrow": "off",
      "@stylistic/no-extra-parens": "off",
      "@stylistic/no-extra-semi": "warn",
      "@stylistic/no-floating-decimal": "warn",
      "@stylistic/no-mixed-operators": [
        "error",
        {
          allowSamePrecedence: true,
          groups: [
            ["&", "|", "^", "~", "<<", ">>", ">>>"],
            ["==", "!=", "===", "!==", ">", ">=", "<", "<="],
            ["in", "instanceof"],
          ],
        },
      ],
      "@stylistic/no-mixed-spaces-and-tabs": "error",
      "@stylistic/no-multi-spaces": "warn",
      "@stylistic/no-multiple-empty-lines": [
        "warn",
        {
          max: 1,
          maxBOF: 0,
          maxEOF: 0,
        },
      ],
      "@stylistic/no-tabs": "off",
      "@stylistic/no-trailing-spaces": "off",
      "@stylistic/no-whitespace-before-property": "warn",
      "@stylistic/nonblock-statement-body-position": [
        "warn",
        "beside",
        {
          overrides: {
            do: "any",
            else: "any",
            if: "any",
            while: "below",
          },
        },
      ],
      "@stylistic/object-curly-newline": [
        "warn",
        {
          consistent: true,
          multiline: true,
        },
      ],
      "@stylistic/object-curly-spacing": [
        "warn",
        "always",
        {
          arraysInObjects: true,
          objectsInObjects: true,
        },
      ],
      "@stylistic/object-property-newline": [
        "warn",
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
      "@stylistic/one-var-declaration-per-line": "off",
      "@stylistic/operator-linebreak": [
        "warn",
        "after",
        {
          overrides: {
            ":": "ignore",
            "?": "ignore",
            "||": "ignore",
          },
        },
      ],
      "@stylistic/padded-blocks": [
        "warn",
        {
          blocks: "never",
          classes: "never",
          switches: "never",
        },
        {
          allowSingleLineBlocks: false,
        },
      ],
      "@stylistic/padding-line-between-statements": [
        "warn",
        {
          blankLine: "always",
          next: "function",
          prev: "function",
        },
        {
          blankLine: "always",
          next: "*",
          prev: ["const", "let", "var"],
        },
        {
          blankLine: "any",
          next: ["const", "let", "var"],
          prev: ["const", "let", "var"],
        },
        {
          blankLine: "always",
          next: ["multiline-const", "multiline-let", "multiline-var"],
          prev: ["multiline-const", "multiline-let", "multiline-var"],
        },
        {
          blankLine: "always",
          next: ["throw", "return"],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "const",
          prev: ["interface", "type"],
        },
        {
          blankLine: "always",
          next: ["if", "for", "class", "switch", "while", "with"],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "*",
          prev: ["if", "for", "class", "switch", "while", "with"],
        },
        {
          blankLine: "always",
          next: ["interface", "type"],
          prev: "*",
        },
        {
          blankLine: "always",
          next: "function",
          prev: "function-overload",
        },
        {
          blankLine: "always",
          next: "export",
          prev: "*",
        },
      ],
      "@stylistic/quote-props": ["warn", "as-needed"],
      "@stylistic/quotes": [
        "warn",
        "double",
        {
          avoidEscape: true,
        },
      ],
      "@stylistic/rest-spread-spacing": ["warn", "never"],
      "@stylistic/semi": ["warn", "always"],
      "@stylistic/semi-spacing": [
        "off",
        {
          after: true,
          before: false,
        },
      ],
      "@stylistic/semi-style": ["warn", "last"],
      "@stylistic/space-before-blocks": ["warn", "always"],
      "@stylistic/space-before-function-paren": [
        "warn",
        {
          anonymous: "always",
          named: "never",
        },
      ],
      "@stylistic/space-in-parens": ["warn", "never"],
      "@stylistic/space-infix-ops": [
        "warn",
        {
          int32Hint: false,
        },
      ],
      "@stylistic/space-unary-ops": [
        "warn",
        {
          nonwords: false,
          overrides: {
            "++": false,
            new: false,
          },
          words: true,
        },
      ],
      "@stylistic/spaced-comment": [
        "warn",
        "always",
        {
          block: {
            balanced: true,
            exceptions: ["*"],
            markers: ["!"],
          },
          line: {
            exceptions: ["-", "+"],
            markers: ["/"],
          },
        },
      ],
      "@stylistic/switch-colon-spacing": [
        "warn",
        {
          after: true,
          before: false,
        },
      ],
      "@stylistic/template-curly-spacing": ["warn", "never"],
      "@stylistic/template-tag-spacing": ["warn", "never"],
      "@stylistic/type-annotation-spacing": [
        "warn",
        {
          after: true,
          before: false,
          overrides: {
            arrow: {
              after: true,
              before: true,
            },
          },
        },
      ],
      "@stylistic/type-generic-spacing": "off",
      "@stylistic/wrap-iife": ["warn", "outside"],
      "@stylistic/wrap-regex": "off",
      "@stylistic/yield-star-spacing": ["off", "both"],

      // @see https://tanstack.com/query/latest/docs/eslint/eslint-plugin-query
      "@tanstack/query/exhaustive-deps": "error",
      "@tanstack/query/no-rest-destructuring": "error",
      "@tanstack/query/stable-query-client": "error",

      // @see https://typescript-eslint.io/rules
      "@typescript-eslint/array-type": [
        "off",
        {
          // default: "array-simple",
          default: "generic",
        },
      ],
      "@typescript-eslint/await-thenable": "off",
      "@typescript-eslint/ban-ts-comment": [
        "error",
        {
          minimumDescriptionLength: 9,
          "ts-check": false,
          "ts-expect-error": "allow-with-description",
          "ts-ignore": true,
          "ts-nocheck": true,
        },
      ],
      "@typescript-eslint/camelcase": "off",
      "@typescript-eslint/consistent-indexed-object-style": "error",
      "@typescript-eslint/consistent-type-assertions": [
        "error",
        {
          assertionStyle: "as",
        },
      ],
      "@typescript-eslint/consistent-type-definitions": ["error", "type"],
      "@typescript-eslint/consistent-type-imports": [
        "warn",
        {
          disallowTypeAnnotations: true,
          fixStyle: "separate-type-imports",
          prefer: "type-imports",
        },
      ],
      "@typescript-eslint/default-param-last": "off",
      "@typescript-eslint/dot-notation": "off",
      "@typescript-eslint/explicit-function-return-type": [
        "off",
        {
          allowExpressions: true,
          allowTypedFunctionExpressions: true,
        },
      ],
      "@typescript-eslint/explicit-member-accessibility": "off",
      "@typescript-eslint/explicit-module-boundary-types": "off",
      "@typescript-eslint/interface-name-prefix": "off",
      "@typescript-eslint/method-signature-style": ["off", "method"],
      "@typescript-eslint/naming-convention": [
        "error",
        {
          custom: {
            match: true,
            regex: "^I[A-Z]",
          },
          format: ["PascalCase"],
          selector: "interface",
        },
        {
          format: ["PascalCase"],
          selector: "typeLike",
        },
      ],
      "@typescript-eslint/no-array-constructor": "off",
      "@typescript-eslint/no-base-to-string": "off",
      "@typescript-eslint/no-confusing-non-null-assertion": "off",
      "@typescript-eslint/no-duplicate-enum-values": "off",
      "@typescript-eslint/no-duplicate-type-constituents": "off",
      "@typescript-eslint/no-dynamic-delete": "off",
      "@typescript-eslint/no-empty-function": "off",
      "@typescript-eslint/no-explicit-any": "off",
      "@typescript-eslint/no-floating-promises": "off",
      "@typescript-eslint/no-for-in-array": "off",
      "@typescript-eslint/no-implied-eval": "off",
      "@typescript-eslint/no-import-type-side-effects": "off",
      "@typescript-eslint/no-inferrable-types": "off",
      "@typescript-eslint/no-invalid-void-type": "off",
      "@typescript-eslint/no-misused-new": "off",
      "@typescript-eslint/no-misused-promises": [
        "off",
        {
          checksVoidReturn: {
            attributes: false,
          },
        },
      ],
      "@typescript-eslint/no-namespace": "error",
      "@typescript-eslint/no-non-null-asserted-nullish-coalescing": "off",
      "@typescript-eslint/no-non-null-asserted-optional-chain": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      "@typescript-eslint/no-redeclare": "off",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/no-require-imports": "off",
      "@typescript-eslint/no-shadow": "off",
      "@typescript-eslint/no-this-alias": "off",
      "@typescript-eslint/no-unnecessary-boolean-literal-compare": "off",
      "@typescript-eslint/no-unnecessary-condition": [
        "off",
        {
          allowConstantLoopConditions: false,
        },
      ],
      "@typescript-eslint/no-unnecessary-qualifier": "off",
      "@typescript-eslint/no-unnecessary-type-arguments": "off",
      "@typescript-eslint/no-unnecessary-type-assertion": "off",
      "@typescript-eslint/no-unnecessary-type-constraint": "off",
      "@typescript-eslint/no-unsafe-argument": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-declaration-merging": "off",
      "@typescript-eslint/no-unsafe-enum-comparison": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/no-unsafe-return": "off",
      "@typescript-eslint/no-unused-expressions": [
        "off",
        {
          allowShortCircuit: true,
        },
      ],
      "@typescript-eslint/no-unused-vars": [
        "warn",
        {
          args: "all",
          argsIgnorePattern: "^_",
          caughtErrors: "all",
          caughtErrorsIgnorePattern: "^_",
          destructuredArrayIgnorePattern: "^_",
          ignoreRestSiblings: true,
          varsIgnorePattern: "^_",
        },
      ],
      "@typescript-eslint/no-use-before-define": "off",
      "@typescript-eslint/non-nullable-type-assertion-style": "off",
      "@typescript-eslint/only-throw-error": "off",
      "@typescript-eslint/prefer-for-of": "off",
      "@typescript-eslint/prefer-includes": "off",
      "@typescript-eslint/prefer-literal-enum-member": "off",
      "@typescript-eslint/prefer-nullish-coalescing": [
        "off",
        {
          ignoreConditionalTests: true,
          ignorePrimitives: true,
        },
      ],
      "@typescript-eslint/prefer-optional-chain": "off",
      "@typescript-eslint/prefer-readonly": "off",
      "@typescript-eslint/prefer-reduce-type-parameter": "off",
      "@typescript-eslint/prefer-regexp-exec": "off",
      "@typescript-eslint/prefer-string-starts-ends-with": "off",
      "@typescript-eslint/promise-function-async": "off",
      "@typescript-eslint/require-array-sort-compare": "off",
      "@typescript-eslint/require-await": "off",
      "@typescript-eslint/restrict-plus-operands": "off",
      "@typescript-eslint/restrict-template-expressions": [
        "off",
        {
          allowAny: true,
          allowBoolean: true,
          allowNullish: true,
          allowNumber: true,
          allowRegExp: true,
        },
      ],
      "@typescript-eslint/return-await": "off",
      "@typescript-eslint/strict-boolean-expressions": "off",
      "@typescript-eslint/switch-exhaustiveness-check": "off",
      "@typescript-eslint/triple-slash-reference": [
        "error",
        {
          lib: "always",
          path: "always",
          types: "prefer-import",
        },
      ],

      // We don't use classes (!) This rule adds about 23s to the lint time
      "@typescript-eslint/unbound-method": "off",
      "@typescript-eslint/unified-signatures": "off",

      // @see https://eslint.org/docs/latest/rules
      complexity: [
        "warn",
        {
          max: 20,
        },
      ],
      "consistent-function-scoping": "off",
      "constructor-super": "off",
      curly: ["warn", "all"],

      // @see https://orm.drizzle.team/docs/eslint-plugin
      "drizzle/enforce-delete-with-where": [
        "warn",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],
      "drizzle/enforce-update-with-where": [
        "warn",
        {
          drizzleObjectName: ["db", "ctx.db"],
        },
      ],

      // @see https://eslint.org/docs/latest/rules
      "error-message": "off",

      // @see https://mysticatea.github.io/eslint-plugin-eslint-comments/rules
      "eslint-comments/disable-enable-pair": [
        "off",
        {
          allowWholeFile: false,
        },
      ],
      "eslint-comments/no-aggregating-enable": "error",
      "eslint-comments/no-duplicate-disable": "error",
      "eslint-comments/no-unlimited-disable": "error",
      "eslint-comments/no-unused-disable": "error",
      "eslint-comments/no-unused-enable": "error",
      "eslint-comments/no-use": [
        "error",
        {
          allow: [
            "eslint-disable",
            "eslint-disable-line",
            "eslint-disable-next-line",
            "eslint-enable",
            "global",
          ],
        },
      ],
      "eslint-comments/require-description": [
        "off",
        {
          ignore: [],
        },
      ],

      // @see https://eslint.org/docs/latest/rules
      "filename-case": "off",
      "for-direction": "off",
      "getter-return": "off",
      "id-denylist": [
        "off",
        "any",
        "Boolean",
        "callback",
        "cb",
        "data",
        "e",
        "err",
        "number",
        "Number",
        "string",
        "String",
        "undefined",
        "Undefined",
      ],
      "id-match": "error",
      "import-style": "off",
      // @see https://github.com/un-ts/eslint-plugin-import-x
      "import-x/consistent-type-specifier-style": ["error", "prefer-top-level"],
      "import-x/default": "off",
      "import-x/export": "error",
      "import-x/first": "off",
      "import-x/named": "off",
      "import-x/namespace": "off",
      "import-x/newline-after-import": "warn",
      "import-x/no-absolute-path": "error",
      "import-x/no-amd": "error",
      "import-x/no-anonymous-default-export": "off",
      "import-x/no-cycle": [
        "off",
        {
          ignoreExternal: true,
          maxDepth: 3,
        },
      ],
      "import-x/no-default-export": "off",
      "import-x/no-extraneous-dependencies": [
        "off",
        {
          devDependencies: true,
          optionalDependencies: false,
          peerDependencies: true,
        },
      ],
      "import-x/no-mutable-exports": "error",
      "import-x/no-named-as-default": "off",
      "import-x/no-named-as-default-member": "off",
      "import-x/no-named-default": "error",
      "import-x/no-named-export": "off",
      "import-x/no-relative-packages": "off",
      "import-x/no-self-import": "off",
      "import-x/no-unresolved": "off",
      "import-x/no-useless-path-segments": [
        "error",
        {
          commonjs: true,
        },
      ],
      "import-x/order": "off",
      "import-x/prefer-default-export": "off",

      // @see https://github.com/jsx-eslint/eslint-plugin-jsx-a11y
      "jsx-a11y/alt-text": [
        "error",
        {
          area: ["Area"],
          elements: ["img", "object", "area", 'input[type="image"]'],
          img: ["Image"],
          'input[type="image"]': ["InputImage"],
          object: ["Object"],
        },
      ],
      "jsx-a11y/aria-props": "error",
      "jsx-a11y/aria-proptypes": "error",
      "jsx-a11y/aria-unsupported-elements": "error",
      "jsx-a11y/click-events-have-key-events": "off",
      "jsx-a11y/no-noninteractive-element-interactions": "off",
      "jsx-a11y/role-has-required-aria-props": "error",
      "jsx-a11y/role-supports-aria-props": "error",
      "max-depth": ["warn", 10],
      "max-lines": ["off", 700],
      "max-lines-per-function": [
        "warn",
        {
          IIFEs: true,
          max: 200,
          skipBlankLines: true,
          skipComments: true,
        },
      ],
      "max-statements": [
        "warn",
        100,
        {
          ignoreTopLevelFunctions: false,
        },
      ],

      // @see https://github.com/eslint-community/eslint-plugin-n#-rules
      "n/exports-style": ["off", "module.exports"],
      "n/no-extraneous-import": "off",
      "n/no-missing-import": "off",
      "n/no-process-exit": "off",
      "n/no-unpublished-import": "off",
      "n/no-unsupported-features/es-syntax": "off",
      "n/no-unsupported-features/node-builtins": "off",

      // @see https://eslint.org/docs/latest/rules
      "no-abusive-eslint-disable": "off",
      "no-anonymous-default-export": "off",
      "no-array-reduce": "off",
      "no-async-promise-executor": "off",
      "no-await-in-promise-methods": "off",
      "no-case-declarations": "off",
      "no-compare-neg-zero": "off",
      "no-cond-assign": "off",
      "no-console": [
        "off",
        {
          allow: ["log", "warn", "error", "info", "trace", "clear"],
        },
      ],
      "no-const-assign": "off",
      "no-constant-binary-expression": "off",
      "no-constant-condition": "off",
      "no-control-regex": "off",
      "no-delete-var": "off",
      "no-document-cookie": "off",
      "no-dupe-args": "off",
      "no-dupe-else-if": "off",
      "no-dupe-keys": "off",
      "no-duplicate-case": "off",
      "no-empty": "off",
      "no-empty-file": "off",
      "no-empty-pattern": "off",
      "no-empty-static-block": "off",
      "no-ex-assign": "off",
      "no-fallthrough": [
        "error",
        {
          commentPattern: ".*intentional fallthrough.*",
        },
      ],
      "no-func-assign": "off",
      "no-global-assign": "off",
      "no-import-assign": "off",
      "no-invalid-regexp": "off",
      "no-invalid-remove-event-listener": "off",
      "no-irregular-whitespace": "off",
      "no-keyword-prefix": "off",
      "no-lonely-if": "error",
      "no-magic-numbers": [
        "off",
        {
          detectObjects: true,
          enforceConst: true,
          ignore: [-1, 0, 1],
          ignoreArrayIndexes: true,
        },
      ],
      "no-new-native-nonconstructor": "off",
      "no-nonoctal-decimal-escape": "off",
      "no-obj-calls": "off",
      "no-object-as-default-parameter": "off",
      "no-octal": "off",
      "no-prototype-builtins": "off",
      "no-redeclare": "off",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          allowSameFolder: true,
          prefix: "~",
          rootDir: "src",
        },
      ],

      // @see https://eslint.org/docs/latest/rules
      "no-restricted-exports": [
        "error",
        {
          restrictedNamedExports: ["default", "then"],
        },
      ],
      "no-restricted-globals": [
        "error",
        {
          name: "isFinite",
          message:
            "Use Number.isFinite instead https://github.com/airbnb/javascript#standard-library--isfinite",
        },
        {
          name: "fetch",
          message: "Please use https://github.com/unjs/ofetch instead.",
        },
        {
          name: "crypto",
          message:
            "Please use uncrypto instead (https://unjs.io/packages/uncrypto)",
        },
        {
          name: "isNaN",
          message:
            "Use Number.isNaN instead https://github.com/airbnb/javascript#standard-library--isnan",
        },
      ],
      "no-restricted-imports": [
        "error",

        // {
        //   name: "next/link",
        //   message:
        //     "Please import from '~/navigation' OR from '@/components/ui/link' instead.",
        // },
        // {
        //   name: "next/navigation",
        //   importNames: [
        //     "redirect",
        //     "permanentRedirect",
        //     "useRouter",
        //     "usePathname",
        //   ],
        //   message: "Please import from '~/navigation' instead.",
        // },
        {
          name: "inquirer",
          message:
            "This is the legacy version of Inquirer.js. While it still receives maintenance, it is not actively developed. For the new Inquirer, see @inquirer/prompts – https://npmjs.com/package/@inquirer/prompts",
        },
        {
          name: "process",
          importNames: ["env"],
          message: "Please use `import { env } from '~/env'` instead.",
        },
        {
          name: "react",
          importNames: ["default"],
          message: "Named imports should be used instead.",
        },
        {
          name: "lodash",
          message:
            "Don't use lodash, use radash instead (in case you still need it, use lodash/{module} import).",
        },
        {
          name: "fs",
          message:
            "Please use fs-extra instead (https://npmjs.com/package/fs-extra)\n\nJust use: import fs from 'fs-extra'",
        },
        {
          name: "path",
          message: "Please use pathe instead (https://unjs.io/packages/pathe)",
        },
      ],
      "no-restricted-properties": [
        "error",
        {
          message:
            "Use `import { env } from '~/env'` instead to ensure validated types.",
          object: "process",
          property: "env",
        },
        {
          message: "Please use destr instead (https://github.com/unjs/destr)",
          object: "JSON",
          property: "parse",
        },
        {
          message: "arguments.callee is deprecated",
          object: "arguments",
          property: "callee",
        },
        {
          message: "Please use Number.isFinite instead",
          object: "global",
          property: "isFinite",
        },
        {
          message: "Please use Number.isFinite instead",
          object: "self",
          property: "isFinite",
        },
        {
          message: "Please use Number.isFinite instead",
          object: "window",
          property: "isFinite",
        },
        {
          message: "Please use Number.isNaN instead",
          object: "global",
          property: "isNaN",
        },
        {
          message: "Please use Number.isNaN instead",
          object: "self",
          property: "isNaN",
        },
        {
          message: "Please use Number.isNaN instead",
          object: "window",
          property: "isNaN",
        },
        {
          message: "Use the exponentiation operator (**) instead",
          object: "Math",
          property: "pow",
        },
      ],
      "no-restricted-syntax": [
        "off",
        {
          message: "Potential circular dependency found",
          selector: "ImportDeclaration[source.value='.']",
        },
        {
          message:
            "Please import and use `consola` library instead (https://unjs.io/packages/consola) (use Cmd/Ctrl+Shift+P to replace all `console.*` with `consola.*`)",
          selector:
            "CallExpression[callee.object.name=console][callee.property.name=/^(log|info|warn|error|trace)$/]",
        },
        {
          message:
            "Unexpected `consola.log` statement. Remove it or use `info|warn|error|trace|success|...` instead.",
          selector:
            "CallExpression[callee.object.name=consola][callee.property.name=/^(log)$/]",
        },
      ],
      "no-self-assign": "off",
      "no-setter-return": "off",
      "no-shadow": [
        "off",
        {
          allow: ["params"],
          builtinGlobals: false,
          hoist: "functions",
          ignoreOnInitialization: false,
        },
      ],
      "no-shadow-restricted-names": "off",
      "no-sparse-arrays": "off",
      "no-thenable": "off",
      "no-this-assignment": "off",
      "no-this-before-super": "off",
      "no-throw-literal": "off",
      "no-undef": "off",
      "no-unexpected-multiline": "off",
      "no-unnecessary-polyfills": "off",
      "no-unreachable": "off",
      "no-unsafe-finally": "off",
      "no-unsafe-negation": "off",
      "no-unsafe-optional-chaining": [
        "error",
        {
          disallowArithmeticOperators: true,
        },
      ],
      "no-unused-expressions": "off",
      "no-unused-properties": "off",
      "no-unused-vars": "off",
      "no-use-before-define": [
        "error",
        {
          allowNamedExports: false,
          classes: false,
          functions: false,
          variables: false,
        },
      ],
      "no-useless-backreference": "off",
      "no-useless-catch": "off",
      "no-useless-escape": "off",
      "no-useless-rename": [
        "off",
        {
          ignoreDestructuring: false,
          ignoreExport: false,
          ignoreImport: false,
        },
      ],
      "no-useless-switch-case": "off",
      "no-var": "error",
      "no-warning-comments": [
        // TODO: consider using "start" option instead (with "todo", "hack", "hacky", "temp", "temporary")
        "off",
        {
          // `location: "start"` helper
          decoration: ["/", "*", "=", "!", "#"],
          location: "anywhere",
          terms: ["fixme", "xxx"],
        },
      ],
      "no-with": "off",
      "object-shorthand": "off",
      "perfectionist/sort-exports": [
        "warn",
        {
          ignoreCase: true,
          order: "asc",
          type: "natural",
        },
      ],

      // @see https://perfectionist.dev/rules
      "perfectionist/sort-imports": [
        "warn",
        {
          // TODO: When using Bun, we need to set 'environment' to 'bun'.
          customGroups: {
            type: {
              next: ["next", "next/*", "next/*/*"],
              react: ["react", "react-*"],
            },
            value: {
              next: ["next", "next/*", "next/*/*"],
              react: ["react", "react-*"],
            },
          },
          environment: "node",
          groups: [
            "react",
            "next",
            "type",
            ["builtin", "external"],
            "internal-type",
            "internal",
            ["parent-type", "sibling-type", "index-type"],
            ["parent", "sibling", "index"],
            "object",
            "side-effect",
            "side-effect-style",
            "style",
            "unknown",
          ],
          ignoreCase: true,
          internalPattern: ["~/**"],
          maxLineLength: undefined,
          newlinesBetween: "always",
          order: "asc",
          type: "natural",
        },
      ],

      // @see https://perfectionist.dev/rules
      "perfectionist/sort-object-types": [
        "warn",
        {
          customGroups: {
            _: [
              "_",
              "top",
              "type",
              "order",
              "meta",
              "ignoreCase",
              "partitionByComment",
              "partitionByNewLine",
              "styledComponents",
              "ignorePattern",
              "groups",
              "eslint",
              "customGroups",
              "bottom",
            ],
            db: ["userId", "productId", "storeId", "createdById"],
            bottom: ["createdAt", "updatedAt"],
            callback: "on*",
            eslint: ["files", "extends"],
            meta: ["slug", "title", "description"],
            top: ["id", "db", "name", "_"],
          },
          groupKind: "mixed",
          groups: ["multiline", "unknown", "callback"],
          ignoreCase: true,
          order: "asc",
          partitionByNewLine: false,
          type: "alphabetical",
        },
      ],
      "perfectionist/sort-objects": [
        "off",
        {
          // TODO: fix (`pnpm check:eslint`: 61297.924 ms)
          customGroups: {
            _: [
              "_",
              "top",
              "type",
              "order",
              "meta",
              "ignoreCase",
              "partitionByComment",
              "partitionByNewLine",
              "styledComponents",
              "ignorePattern",
              "groups",
              "eslint",
              "customGroups",
              "bottom",
            ],
            db: ["userId", "productId", "storeId", "createdById"],
            bottom: ["createdAt", "updatedAt"],
            eslint: ["files", "extends"],
            meta: ["slug", "title", "description"],
            top: ["id", "db", "name", "_"],
          },
          groups: ["top", "unknown"],
          ignoreCase: true,
          ignorePattern: [],
          order: "asc",
          partitionByComment: false,
          partitionByNewLine: false,
          styledComponents: true,
          type: "natural",
        },
      ],
      "perfectionist/sort-jsx-props": [
        // TODO: fix (`pnpm check:eslint`: 14226.536 ms)
        "off",
      ],
      "perfectionist/sort-union-types": [
        "warn",
        {
          groups: [],
          ignoreCase: true,
          order: "asc",
          type: "natural",
        },
      ],
      "prefer-blob-reading-methods": "off",
      "prefer-const": [
        "error",
        {
          destructuring: "any",
          ignoreReadBeforeAssign: true,
        },
      ],
      "prefer-destructuring": [
        "off",
        {
          AssignmentExpression: {
            array: true,
            object: false,
          },
          VariableDeclarator: {
            array: false,
            object: true,
          },
        },
        {
          enforceForRenamedProperties: false,
        },
      ],
      "prefer-dom-node-text-content": "off",
      "prefer-event-target": "off",
      "prefer-logical-operator-over-ternary": "off",
      "prefer-template": "error",
      "prefer-top-level-await": "off",

      // @see https://eslint.org/docs/latest/rules
      "promise/always-return": "off",
      "promise/catch-or-return": "off",
      "react/jsx-no-target-blank": [
        "error",
        {
          allowReferrer: true,
          enforceDynamicLinks: "always",
          forms: true,
          links: true,
          warnOnSpreadAttributes: false,
        },
      ],

      // @see https://github.com/jsx-eslint/eslint-plugin-react
      "react/no-invalid-html-attribute": "error",
      "react/no-unescaped-entities": "off",
      "react/no-unknown-property": "off",
      // TODO: https://github.com/shadcn-ui/ui/issues/120
      "react/prop-types": "off",

      // "react-compiler/react-compiler": "error",
      "react/react-in-jsx-scope": "off",
      // TODO: fix error in eslint console (@see https://npmjs.com/package/eslint-plugin-react-compiler)
      "react-hooks/exhaustive-deps": "off",

      // @see https://npmjs.com/package/eslint-plugin-react-hooks
      "react-hooks/rules-of-hooks": "off",

      // @see https://github.com/ArnaudBarre/eslint-plugin-react-refresh
      "react-refresh/only-export-components": [
        "off",
        {
          allowConstantExport: true,
          allowExportNames: ["generateMetadata", "viewport"],
        },
      ],

      // @see https://github.com/schoero/eslint-plugin-readable-tailwind
      "readable-tailwind/multiline": ["off"],
      "readable-tailwind/no-unnecessary-whitespace": ["error"],
      "readable-tailwind/sort-classes": ["error"],

      // @see https://github.com/SonarSource/eslint-plugin-sonarjs#rules (errors in: rules-of-hooks, no-fallthrough)
      "sonarjs/cognitive-complexity": "off",
      "sonarjs/default-param-last": "off",
      "sonarjs/deprecation": "off",
      "sonarjs/different-types-comparison": "off",
      "sonarjs/function-return-type": "off",
      "sonarjs/hook-use-state": "off",
      "sonarjs/jsx-no-constructed-context-values": "off",
      "sonarjs/jsx-no-useless-fragment": "off",
      "sonarjs/new-cap": "off",
      "sonarjs/no-array-index-key": "off",
      "sonarjs/no-base-to-string": "off",
      "sonarjs/no-commented-code": "off",
      "sonarjs/no-dead-store": "off",
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/no-gratuitous-expressions": "off",
      "sonarjs/no-identical-expressions": "off",
      "sonarjs/no-invalid-await": "off",
      "sonarjs/no-misused-promises": "off",
      "sonarjs/no-nested-conditional": "off",
      "sonarjs/no-nested-functions": "off",
      "sonarjs/no-nested-template-literals": "off",
      "sonarjs/no-redeclare": "off",
      "sonarjs/no-redundant-optional": "off",
      "sonarjs/no-redundant-type-constituents": "off",
      "sonarjs/no-unknown-property": "off",
      "sonarjs/no-unstable-nested-components": "off",
      "sonarjs/no-unused-expressions": "off",
      "sonarjs/no-useless-intersection": "off",
      "sonarjs/null-dereference": "off",
      "sonarjs/prefer-for-of": "off",
      "sonarjs/prefer-nullish-coalescing": "off",
      "sonarjs/redundant-type-aliases": "off",
      "sonarjs/rules-of-hooks": "off",
      "sonarjs/slow-regex": "off",
      "sonarjs/sonar-jsx-no-leaked-render": "off",
      "sonarjs/sonar-no-fallthrough": "off",
      "sonarjs/sonar-no-unused-vars": "off",
      "sonarjs/sonar-prefer-optional-chain": "off",
      "sonarjs/sonar-prefer-read-only-props": "off",
      "sonarjs/sonar-prefer-regexp-exec": "off",
      "sonarjs/table-header": "off",
      "sonarjs/todo-tag": "off",
      "sonarjs/unused-import": "off",
      "sonarjs/void-use": "off",

      // @see https://github.com/mskelton/eslint-plugin-sort#list-of-supported-rules
      "sort/destructuring-properties": "off",
      "sort/export-members": "off",
      "sort/exports": [
        "off",
        {
          caseSensitive: false,
          groups: [
            {
              order: 50,
              type: "default",
            },
            {
              order: 10,
              type: "sourceless",
            },
            {
              order: 30,
              regex: "^~",
            },
            {
              order: 20,
              type: "dependency",
            },
            {
              order: 40,
              type: "other",
            },
          ],
          natural: true,
          typeOrder: "first",
        },
      ],
      "sort/import-members": "off",
      "sort/imports": "off",
      "sort/object-properties": "off",
      "sort/string-enums": "off",
      "sort/string-unions": "off",
      "sort/type-properties": "off",

      // @see https://github.com/jrdrg/eslint-plugin-sort-exports#usage
      "sort-exports/sort-exports": [
        "off",
        {
          disableAutofixer: true,
          ignoreCase: true,
          sortDir: "asc",
          sortExportKindFirst: "type",
        },
      ],
      "sort-imports": "off",
      "sort-keys": "off",

      // @see https://github.com/francoismassart/eslint-plugin-tailwindcss#supported-rules
      "tailwindcss/classnames-order": "off",

      // Adds ~15s to the lint time (!)
      "tailwindcss/no-custom-classname": "off",

      // @see https://github.com/sindresorhus/eslint-plugin-unicorn
      "unicorn/catch-error-name": [
        "off",
        {
          name: "e",
        },
      ],
      "unicorn/consistent-destructuring": "off",
      "unicorn/consistent-function-scoping": "off",
      "unicorn/empty-brace-spaces": "off",
      "unicorn/filename-case": [
        "off",
        {
          case: "pascalCase",
          ignore: [
            String.raw`.*\.(jsx|tsx)$`,
            // TODO: remove in GA branch of 1.3.0 version
            String.raw`.*\.(js|ts|cjs|cts|mjs|mts|d\.ts)$`,
            // TODO: decide in 1.3.x
            String.raw`^(layout|page|loading|not-found|error|global-error)\.(jsx|tsx)$`,
            String.raw`^(template|default|icon|apple-icon|opengraph-image)\.(jsx|tsx)$`,
          ],
        },
      ],
      "unicorn/import-style": "off",
      "unicorn/no-abusive-eslint-disable": "off",
      "unicorn/no-anonymous-default-export": "off",
      "unicorn/no-array-callback-reference": "off",
      "unicorn/no-array-reduce": "off",
      "unicorn/no-await-expression-member": "off",
      "unicorn/no-empty-file": "off",
      "unicorn/no-negated-condition": "off",
      "unicorn/no-nested-ternary": "off",
      "unicorn/no-null": [
        "off",
        {
          checkStrictEquality: true,
        },
      ],
      "unicorn/no-object-as-default-parameter": "off",
      "unicorn/no-unused-properties": "warn",
      "unicorn/no-useless-switch-case": "off",
      "unicorn/numeric-separators-style": [
        "off",
        {
          onlyIfContainsSeparator: true,
        },
      ],
      "unicorn/prefer-array-flat-map": "off",
      "unicorn/prefer-code-point": "off",
      "unicorn/prefer-date-now": "off",
      "unicorn/prefer-logical-operator-over-ternary": "off",
      "unicorn/prefer-native-coercion-functions": "off",
      "unicorn/prefer-node-protocol": "off",
      "unicorn/prefer-optional-catch-binding": "off",
      "unicorn/prefer-string-raw": "off",
      "unicorn/prefer-string-replace-all": "off",
      "unicorn/prefer-string-slice": "off",
      "unicorn/prefer-switch": "off",
      "unicorn/prefer-ternary": "off",
      "unicorn/prefer-top-level-await": "off",
      "unicorn/prevent-abbreviations": [
        "warn",
        {
          // TODO: consider limiting to a single option, in this case auto-fix works; check the default replacements:
          // TODO: @see https://github.com/sindresorhus/eslint-plugin-unicorn/blob/main/rules/shared/abbreviations.js
          allowList: {
            getInitialProps: true,
          },
          extendDefaultReplacements: true,

          // note: if rule script realizes that it cannot rename specific word elsewhere, then auto-fix is turned off
          ignore: [String.raw`\.e2e$`, /^ignore/i],
          replacements: {
            db: {
              database: false,
            },
            arg: {
              argument: false,
            },
            args: {
              arguments: false,
            },
            ctx: {
              context: false,
            },
            dev: {
              development: false,
            },
            dir: {
              direction: false,
            },
            dst: {
              daylightSavingTime: false,
              distribution: false,
            },
            e: {
              error: false,
            },
            env: {
              environment: false,
            },
            mod: {
              module: false,
            },
            param: {
              parameter: false,
            },
            params: {
              parameters: false,
            },
            props: {
              properties: false,
            },
            ref: {
              reference: false,
            },
            refs: {
              references: false,
            },
            req: {
              request: false,
            },
            res: {
              resource: false,
              response: false,
              result: false,
            },
            src: {
              source: false,
            },
            str: {
              string: false,
            },
          },
        },
      ],
      "unicorn/switch-case-braces": ["off", "avoid"],
      "use-isnan": "off",
      "valid-typeof": "off",
      yoda: [
        "error",
        "never",
        {
          onlyEquality: true,
        },
      ],
    },
    settings: {
      // @see https://github.com/jsx-eslint/eslint-plugin-react#configuration
      formComponents: ["Form"],
      // @see https://github.com/un-ts/eslint-plugin-import-x
      "import-x/internal-regex": "^~/",

      // @see https://github.com/jsx-eslint/eslint-plugin-react#configuration
      linkComponents: [
        {
          name: "Link",
          linkAttribute: ["href"],
        },
      ],

      // @see https://github.com/jsx-eslint/eslint-plugin-react#configuration
      react: {
        version: "detect",
      },

      // @see https://eslint-react.xyz/docs/configuration
      reactOptions: {
        additionalHooks: {
          useLayoutEffect: ["useIsomorphicLayoutEffect"],
        },
        importSource: "react",
        jsxPragma: "createElement",
        jsxPragmaFrag: "Fragment",
        version: "detect",
      },

      // @see https://tailwindcss.com
      tailwindcss: {
        callees: ["cn", "classnames", "buttonClassName"],
      },
    },
  },
  {
    name: "@reliverse/eslint-config/js",
    files: ["**/*.{js,jsx}"],
    ...tseslint.configs.disableTypeChecked,
  },
  {
    name: "@reliverse/eslint-config/md",
    extends: [...markdown.configs.recommended],
    files: ["**/*.md"],
    plugins: {
      markdown,
    },
  },
  // import * as mdx from "eslint-plugin-mdx";
  // {
  // name: "@reliverse/config-eslint/markdown-core",
  // @see https://github.com/eslint/markdown
  // files: ["**/*.md"],
  // processor: "markdown/markdown",
  // },
  // {
  // name: "@reliverse/config-eslint/markdown-codeblock",
  // @see https://github.com/eslint/markdown#advanced-configuration
  // files: ["**/*.md/*.js"],
  // },
  // @see https://github.com/mdx-js/eslint-mdx#flat-config
  // {
  //   ...mdx.flat,
  //   name: "@reliverse/config-eslint/mdx-core",
  //   files: ["**/*.mdx"],
  //   languageOptions: {},
  //   processor: mdx.createRemarkProcessor({
  //     languageMapper: {},
  //     lintCodeBlocks: true,
  //   }),
  //   rules: {
  //     ...mdx.flat.rules,
  //     "@stylistic/max-len": [
  //       "warn",
  //       {
  //         code: 1000,
  //       },
  //     ],
  //     "@stylistic/semi": "off",
  //     "mdx/remark": "error",
  //     "no-unused-expressions": "off",
  //   },
  // },
  // {
  //   ...mdx.flatCodeBlocks,
  //   name: "@reliverse/config-eslint/mdx-codeblock",
  //   files: ["**/*.mdx/*.js"],
  //   languageOptions: {},
  //   rules: { ...mdx.flatCodeBlocks.rules },
  // },
  {
    // @see https://ota-meshi.github.io/eslint-plugin-yml
    name: "@reliverse/config-eslint/yaml",
    extends: [...yaml.configs["flat/standard"]],
    files: ["**/*.{yml,yaml}"],
    plugins: {
      yml: yaml,
    },
    rules: {
      "@stylistic/max-len": "off",
      "@stylistic/spaced-comment": "off",
      "yml/no-empty-mapping-value": "off",
    },
  },
  {
    name: "@reliverse/config-eslint/jsonc-core",

    // @see https://ota-meshi.github.io/eslint-plugin-jsonc/rules
    extends: [...jsonc.configs["flat/recommended-with-json"]],
    files: ["**/*.{json,jsonc,json5}"],
    plugins: {
      jsonc: jsonc,
    },
    rules: {
      "@stylistic/max-len": "off",
      "jsonc/array-bracket-newline": [
        "off",
        {
          minItems: 3,
          multiline: true,
        },
      ],
      "jsonc/array-bracket-spacing": ["off", "always"],
      "jsonc/array-element-newline": ["off", "always"],
      "jsonc/comma-dangle": ["error", "never"],
      "jsonc/comma-style": ["error", "last"],
      "jsonc/indent": ["error", 2],
      "jsonc/key-spacing": [
        "error",
        {
          afterColon: true,
          beforeColon: false,
          mode: "strict",
        },
      ],
      "jsonc/no-bigint-literals": "error",
      "jsonc/no-binary-expression": "error",
      "jsonc/no-binary-numeric-literals": "error",
      "jsonc/no-dupe-keys": ["error"],
      "jsonc/no-escape-sequence-in-identifier": "error",
      "jsonc/no-floating-decimal": "error",
      "jsonc/no-hexadecimal-numeric-literals": "error",
      "jsonc/no-infinity": "error",
      "jsonc/no-irregular-whitespace": [
        "error",
        {
          skipComments: false,
          skipRegExps: false,
          skipStrings: true,
          skipTemplates: false,
        },
      ],
      "jsonc/no-multi-str": "error",
      "jsonc/no-nan": "error",
      "jsonc/no-number-props": "error",
      "jsonc/no-numeric-separators": "error",
      "jsonc/no-octal": "error",
      "jsonc/no-octal-escape": "error",
      "jsonc/no-octal-numeric-literals": "error",
      "jsonc/no-parenthesized": "error",
      "jsonc/no-plus-sign": "error",
      "jsonc/no-regexp-literals": "error",
      "jsonc/no-sparse-arrays": "error",
      "jsonc/no-template-literals": "error",
      "jsonc/no-undefined-value": "error",
      "jsonc/no-unicode-codepoint-escapes": "error",
      "jsonc/no-useless-escape": "error",
      "jsonc/object-curly-newline": ["off", "always"],
      "jsonc/object-curly-spacing": [
        "error",
        "always",
        {
          arraysInObjects: true,
          objectsInObjects: true,
        },
      ],
      "jsonc/object-property-newline": [
        "error",
        {
          allowAllPropertiesOnSameLine: true,
        },
      ],
      "jsonc/quote-props": "error",
      "jsonc/quotes": "error",

      // @see https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-array-values.html
      "jsonc/sort-array-values": [
        "warn",
        {
          order: {
            natural: true,
            type: "asc",
          },
          pathPattern: ".*",
        },
      ],

      // @see https://ota-meshi.github.io/eslint-plugin-jsonc/rules/sort-keys.html
      "jsonc/sort-keys": [
        "warn",
        {
          order: {
            natural: true,
            type: "asc",
          },
          pathPattern: ".*",
        },
      ],
      "jsonc/space-unary-ops": "error",
      "jsonc/valid-json-number": "error",
      "no-irregular-whitespace": "off",
      "no-unused-expressions": "off",
      "no-unused-vars": "off",
      strict: "off",
    },
  },
  {
    name: "@reliverse/config-eslint/json-package",

    // @see https://ota-meshi.github.io/eslint-plugin-jsonc/rules/auto.html
    extends: [...jsonc.configs["flat/recommended-with-json"]],
    files: ["package.json"],
    plugins: {
      jsonc: jsonc,
    },
    rules: {
      "jsonc/array-bracket-newline": ["off", "always"],
      "jsonc/sort-array-values": [
        "error",
        {
          order: {
            natural: true,
            type: "asc",
          },
          pathPattern: "^files$",
        },
      ],
      "jsonc/sort-keys": [
        "warn",
        {
          order: [
            "name",
            "displayName",
            "version",
            "private",
            "description",
            "categories",
            "keywords",
            "homepage",
            "bugs",
            "repository",
            "funding",
            "license",
            "qna",
            "author",
            "maintainers",
            "contributors",
            "publisher",
            "sideEffects",
            "type",
            "imports",
            "exports",
            "main",
            "svelte",
            "umd:main",
            "jsdelivr",
            "unpkg",
            "module",
            "source",
            "jsnext:main",
            "browser",
            "react-native",
            "types",
            "typesVersions",
            "typings",
            "style",
            "example",
            "examplestyle",
            "assets",
            "bin",
            "man",
            "directories",
            "files",
            "workspaces",
            "binary",
            "scripts",
            "betterScripts",
            "contributes",
            "activationEvent",
            "husky",
            "simple-git-hooks",
            "pre-commit",
            "commitlint",
            "lint-staged",
            "nano-staged",
            "config",
            "nodemonConfig",
            "browserify",
            "babel",
            "browserslist",
            "xo",
            "prettier",
            "eslintConfig",
            "eslintIgnore",
            "npmpackagejsonlint",
            "release",
            "remarkConfig",
            "stylelint",
            "ava",
            "jest",
            "mocha",
            "nyc",
            "tap",
            "oclif",
            "resolutions",
            "dependencies",
            "devDependencies",
            "dependenciesMeta",
            "peerDependencies",
            "peerDependenciesMeta",
            "optionalDependencies",
            "bundledDependencies",
            "bundleDependencies",
            "extensionPack",
            "extensionDependencies",
            "flat",
            "packageManager",
            "engines",
            "engineStrict",
            "volta",
            "languageName",
            "os",
            "cpu",
            "preferGlobal",
            "publishConfig",
            "icon",
            "badges",
            "galleryBanner",
            "preview",
            "markdown",
            "pnpm",
          ],
          pathPattern: "^$",
        },
        {
          order: {
            natural: false,
            type: "asc",
          },
          pathPattern: "^(?:dev|peer|optional|bundled)?[Dd]ependencies(Meta)?$",
        },
        {
          order: {
            natural: true,
            type: "asc",
          },
          pathPattern: "^(?:resolutions|overrides|pnpm.overrides)$",
        },
        {
          order: {
            natural: true,
            type: "asc",
          },
          pathPattern: "^scripts.*$",
        },
        {
          order: ["types", "import", "require", "default"],
          pathPattern: "^exports.*$",
        },
        {
          order: [
            "pre-applypatch",
            "applypatch-msg",
            "post-applypatch",
            "pre-commit",
            "pre-merge-commit",
            "prepare-commit-msg",
            "commit-msg",
            "post-commit",
            "pre-rebase",
            "post-checkout",
            "post-merge",
            "pre-push",
            "pre-receive",
            "update",
            "post-receive",
            "post-update",
            "push-to-checkout",
            "pre-auto-gc",
            "post-rewrite",
            "sendemail-validate",
            "fsmonitor-watchman",
            "p4-pre-submit",
            "post-index-chang",
          ],
          pathPattern: "^(?:gitHooks|husky|simple-git-hooks)$",
        },
        {
          order: ["url", "email"],
          pathPattern: "bugs",
        },
        {
          order: ["type", "url"],
          pathPattern: "(repository|funding|license)",
        },
        {
          order: ["name", "email", "url"],
          pathPattern: "author",
        },
      ],
    },
  },
  {
    name: "@reliverse/config-eslint/json-tsconfig",

    // @see https://ota-meshi.github.io/eslint-plugin-jsonc/rules
    extends: [...jsonc.configs["flat/recommended-with-json"]],
    files: ["**/tsconfig.json", "**/ts.config.*.json"],
    plugins: {
      jsonc: jsonc,
    },
    rules: {
      "jsonc/sort-keys": [
        "warn",
        {
          order: [
            "extends",
            "compilerOptions",
            "references",
            "files",
            "include",
            "exclude",
          ],
          pathPattern: "^$",
        },
        {
          order: [
            // Projects
            "incremental",
            "composite",
            "tsBuildInfoFile",
            "disableSourceOfProjectReferenceRedirect",
            "disableSolutionSearching",
            "disableReferencedProjectLoad",

            // Language and Environment
            "target",
            "jsx",
            "jsxFactory",
            "jsxFragmentFactory",
            "jsxImportSource",
            "lib",
            "moduleDetection",
            "noLib",
            "reactNamespace",
            "useDefineForClassFields",
            "emitDecoratorMetadata",
            "experimentalDecorators",

            // Modules
            "baseUrl",
            "rootDir",
            "rootDirs",
            "customConditions",
            "module",
            "moduleResolution",
            "moduleSuffixes",
            "noResolve",
            "paths",
            "resolveJsonModule",
            "resolvePackageJsonExports",
            "resolvePackageJsonImports",
            "typeRoots",
            "types",
            "allowArbitraryExtensions",
            "allowImportingTsExtensions",
            "allowUmdGlobalAccess",

            // JavaScript Support
            "allowJs",
            "checkJs",
            "maxNodeModuleJsDepth",

            // Type Checking
            "strict",
            "strictBindCallApply",
            "strictFunctionTypes",
            "strictNullChecks",
            "strictPropertyInitialization",
            "allowUnreachableCode",
            "allowUnusedLabels",
            "alwaysStrict",
            "exactOptionalPropertyTypes",
            "noFallthroughCasesInSwitch",
            "noImplicitAny",
            "noImplicitOverride",
            "noImplicitReturns",
            "noImplicitThis",
            "noPropertyAccessFromIndexSignature",
            "noUncheckedIndexedAccess",
            "noUnusedLocals",
            "noUnusedParameters",
            "useUnknownInCatchVariables",

            // Emit
            "declaration",
            "declarationDir",
            "declarationMap",
            "downlevelIteration",
            "emitBOM",
            "emitDeclarationOnly",
            "importHelpers",
            "importsNotUsedAsValues",
            "inlineSourceMap",
            "inlineSources",
            "mapRoot",
            "newLine",
            "noEmit",
            "noEmitHelpers",
            "noEmitOnError",
            "outDir",
            "outFile",
            "preserveConstEnums",
            "preserveValueImports",
            "removeComments",
            "sourceMap",
            "sourceRoot",
            "stripInternal",

            // Interop Constraints
            "allowSyntheticDefaultImports",
            "esModuleInterop",
            "forceConsistentCasingInFileNames",
            "isolatedModules",
            "preserveSymlinks",
            "verbatimModuleSyntax",

            // Completeness
            "skipDefaultLibCheck",
            "skipLibCheck",

            // Plugins
            "plugins",
          ],
          pathPattern: "^compilerOptions$",
        },
      ],
    },
  },
  {
    name: "@reliverse/addons",
    files: ["addons/scripts/**/*.ts"],
    rules: {
      "barrel-files/avoid-importing-barrel-files": "off",
      "barrel-files/avoid-barrel-files": "off",
      "barrel-files/avoid-namespace-import": "off",
      "barrel-files/avoid-re-export-all": "off",
    },
  },
  {
    name: "@reliverse/addons-metadata",
    files: ["src/constants/metadata.ts"],
    rules: {
      "barrel-files/avoid-importing-barrel-files": "off",
      "barrel-files/avoid-barrel-files": "off",
      "barrel-files/avoid-namespace-import": "off",
      "barrel-files/avoid-re-export-all": "off",
    },
  },
  {
    name: "@reliverse/config-eslint/addons-academy",

    // @reliverse/academy
    files: ["addons/scripts/reliverse/academy/**/*.json"],
    rules: {
      "jsonc/sort-array-values": "off",
      "jsonc/sort-keys": "off",
    },
  },
  {
    name: "@reliverse/config-eslint/addons-cspell",

    // @see https://cspell.org
    files: ["**/cspell.json"],
    rules: {
      "jsonc/sort-array-values": "off",
      "jsonc/sort-keys": "off",
    },
  },
  {
    // @see https://github.com/coderaiser/putout#readme
    name: "@reliverse/config-eslint/addons-putout",
    files: [
      "**/.putout.json",
      "**/.putout.recommended.json",
      "**/.putout.rules-disabled.json",
    ],
    rules: {
      "jsonc/sort-array-values": "off",
      "jsonc/sort-keys": "off",
    },
  },
  {
    // @see https://github.com/coderaiser/putout#readme
    name: "@reliverse/config-eslint/addons-putout",
    files: ["addons/scripts/reliverse/academy/**/*.json"],
    rules: {
      "jsonc/sort-array-values": "off",
      "jsonc/sort-keys": "off",
    },
  },
  {
    name: "@reliverse/config-eslint/addons-core",

    // @see https://github.com/blefnk/reliverse-website-builder
    files: ["addons/**/*.{ts,tsx}"],
    rules: {
      "no-console": "off",
      "no-relative-import-paths/no-relative-import-paths": [
        "error",
        {
          allowSameFolder: true,
          prefix: "@",
          rootDir: "addons",
        },
      ],
      "unicorn/no-process-exit": "off",
    },
  },
  {
    name: "@reliverse/config-eslint/addons-remotion",

    // @see https://remotion.dev/docs/contributing/formatting#eslint
    files: ["addons/scripts/reliverse/remotion/*.{ts,tsx}"],
    rules: {
      "no-relative-import-paths/no-relative-import-paths": "off",
    },
  },
  {
    name: "@reliverse/config-eslint/addons-eslint",

    // @see https://eslint.org/docs/latest/use/configure
    files: [
      "eslint.config.js",
      "addons/**/eslint.config.{recommended,minimal,rules-disabled}.{ts,js}",
    ],
    rules: {
      "max-lines": "off",
      "no-inline-comments": "off",
    },
  },
  {
    name: "@reliverse/config-eslint/addons-no-comments",

    // @see https://npmjs.com/package/eslint-plugin-no-comments
    files: ["addons/scripts/reliverse/template/index.ts"],
    plugins: {
      "no-comments": noComments,
    },
    rules: {
      "no-comments/disallowComments": "warn",
    },
  },
);
