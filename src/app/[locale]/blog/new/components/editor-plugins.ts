// Reliverse CMS: Blog Post Editor
import { createAutoformatPlugin } from "@udecode/plate-autoformat";
import {
  createBasicMarksPlugin,
  MARK_BOLD,
  MARK_CODE,
} from "@udecode/plate-basic-marks";
import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
  createExitBreakPlugin,
  createSoftBreakPlugin,
} from "@udecode/plate-break";
import {
  ELEMENT_CODE_BLOCK,
  isCodeBlockEmpty,
  isSelectionAtCodeBlockStart,
  unwrapCodeBlock,
} from "@udecode/plate-code-block";
import {
  createHistoryPlugin,
  createPlugins,
  createReactPlugin,
  isBlockAboveEmpty,
  isSelectionAtBlockStart,
} from "@udecode/plate-common";
import {
  createHeadingPlugin,
  ELEMENT_H1,
  KEYS_HEADING,
} from "@udecode/plate-heading";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { ELEMENT_TODO_LI } from "@udecode/plate-list";
import { ELEMENT_IMAGE } from "@udecode/plate-media";
import { createNodeIdPlugin } from "@udecode/plate-node-id";
import { createNormalizeTypesPlugin } from "@udecode/plate-normalizers";
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from "@udecode/plate-paragraph";
import { createResetNodePlugin } from "@udecode/plate-reset-node";
import { createSelectOnBackspacePlugin } from "@udecode/plate-select";
import { ELEMENT_TD } from "@udecode/plate-table";
import { createTrailingBlockPlugin } from "@udecode/plate-trailing-block";

import { autoFormatConfig } from "~/app/[locale]/blog/new/components/auto-format/plate";
import { withPlaceholders } from "~/app/[locale]/blog/new/components/editor-placeholder";
import { ParagraphElement } from "~/app/[locale]/blog/new/components/elements/paragraph";
import { BoldLeaf } from "~/app/[locale]/blog/new/components/leafs/bold";
import { CodeLeaf } from "~/app/[locale]/blog/new/components/leafs/code";

const resetBlockTypesCommonRule = {
  defaultType: ELEMENT_PARAGRAPH,
  types: [ELEMENT_BLOCKQUOTE, ELEMENT_TODO_LI],
};

const resetBlockTypesCodeBlockRule = {
  defaultType: ELEMENT_PARAGRAPH,
  onReset: unwrapCodeBlock,
  types: [ELEMENT_CODE_BLOCK],
};

export const plugins = createPlugins(
  [
    // Essentials
    createReactPlugin(),
    createHistoryPlugin(),

    // Basic Elements
    createParagraphPlugin(),
    createHeadingPlugin(),

    // Marks
    createBasicMarksPlugin(),

    // Functionality
    createAutoformatPlugin(autoFormatConfig),
    createExitBreakPlugin({
      options: {
        rules: [
          {
            hotkey: "mod+enter",
          },
          {
            before: true,
            hotkey: "mod+shift+enter",
          },
          {
            hotkey: "enter",
            level: 1,
            query: {
              allow: KEYS_HEADING,
              end: true,
              start: true,
            },
            relative: true,
          },
        ],
      },
    }),
    createNodeIdPlugin(),
    createResetNodePlugin({
      options: {
        rules: [
          {
            ...resetBlockTypesCommonRule,
            hotkey: "Enter",
            predicate: isBlockAboveEmpty,
          },
          {
            ...resetBlockTypesCommonRule,
            hotkey: "Backspace",
            predicate: isSelectionAtBlockStart,
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: "Enter",
            predicate: isCodeBlockEmpty,
          },
          {
            ...resetBlockTypesCodeBlockRule,
            hotkey: "Backspace",
            predicate: isSelectionAtCodeBlockStart,
          },
        ],
      },
    }),
    createSelectOnBackspacePlugin({
      options: {
        query: {
          allow: [ELEMENT_IMAGE, ELEMENT_HR],
        },
      },
    }),
    createSoftBreakPlugin({
      options: {
        rules: [
          {
            hotkey: "shift+enter",
          },
          {
            hotkey: "enter",
            query: {
              allow: [ELEMENT_CODE_BLOCK, ELEMENT_BLOCKQUOTE, ELEMENT_TD],
            },
          },
        ],
      },
    }),
    createTrailingBlockPlugin({
      options: {
        type: ELEMENT_PARAGRAPH,
      },
    }),
    createNormalizeTypesPlugin({
      options: {
        rules: [
          {
            path: [0],
            strictType: ELEMENT_H1,
          },
        ],
      },
    }),
  ],
  {
    components: withPlaceholders({
      [ELEMENT_PARAGRAPH]: ParagraphElement, // [ELEMENT_H1]: withCn(HeadingElement, { variant: "h1" }),
      // [ELEMENT_H2]: withCn(HeadingElement, { variant: "h2" }),
      // [ELEMENT_H3]: withCn(HeadingElement, { variant: "h3" }),
      // [ELEMENT_H4]: withCn(HeadingElement, { variant: "h4" }),
      // [ELEMENT_H5]: withCn(HeadingElement, { variant: "h5" }),
      // [ELEMENT_H6]: withCn(HeadingElement, { variant: "h6" }),
      [MARK_BOLD]: BoldLeaf, // [MARK_ITALIC]: withProps(PlateLeaf, { as: "em" }),
      // [MARK_UNDERLINE]: withProps(PlateLeaf, { as: "u" }),
      // [MARK_SUPERSCRIPT]: withProps(PlateLeaf, { as: "sup" }),
      // [MARK_SUBSCRIPT]: withProps(PlateLeaf, { as: "sub" }),
      [MARK_CODE]: CodeLeaf,
    }),
  },
);
