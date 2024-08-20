import js from "@eslint/js";
import stylistic from "@stylistic/eslint-plugin";
import perfectionist from "eslint-plugin-perfectionist";
import globals from "globals";
import tseslint from "typescript-eslint";

// The current Relivator 1.2.6 version comes with many predefined ESLint configs.
// Run the `pnpm reli:setup` to easily switch between them and set up other tooling.
// Current: addons\scripts\reliverse\relicon\setup\configs\eslint.config.medium.ts
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
    ],
    files: ["**/*.{js,ts,tsx}"],
    languageOptions: {
      globals: {
        ...globals.builtin,
        ...globals.browser,
        ...globals.es2024,
        ...globals.node,
      },
      parserOptions: {
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
      reportUnusedDisableDirectives: "off",
    },
    plugins: {
      "@stylistic": stylistic,
      perfectionist: perfectionist,
    },
    rules: {
      // @see https://eslint.org/docs/latest/use/configure
      ...perfectionist.configs["recommended-natural"].rules,
      ...stylisticConfig.rules,

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

      // @see https://eslint.org/docs/latest/rules
      "error-message": "off",

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
      "sort-imports": "off",
      "sort-keys": "off",
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
  },
  {
    name: "@reliverse/eslint-config/js",
    files: ["**/*.{js,jsx}"],
    ...tseslint.configs.disableTypeChecked,
  },
);
