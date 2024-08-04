import type {
  AutoformatBlockRule,
  AutoformatRule,
} from "@udecode/plate-autoformat";

import { ELEMENT_BLOCKQUOTE } from "@udecode/plate-block-quote";
import {
  ELEMENT_CODE_BLOCK,
  insertEmptyCodeBlock,
} from "@udecode/plate-code-block";
import { ELEMENT_DEFAULT, insertNodes, setNodes } from "@udecode/plate-common";
import {
  ELEMENT_H1,
  ELEMENT_H2,
  ELEMENT_H3,
  ELEMENT_H4,
  ELEMENT_H5,
  ELEMENT_H6,
} from "@udecode/plate-heading";
import { ELEMENT_HR } from "@udecode/plate-horizontal-rule";
import { unwrapList } from "@udecode/plate-list";

const preFormat: AutoformatBlockRule["preFormat"] = (editor) => {
  unwrapList(editor);
};

export const autoformatBlocks: AutoformatRule[] = [
  {
    match: "# ",
    mode: "block",
    preFormat,
    type: ELEMENT_H1,
  },
  {
    match: "## ",
    mode: "block",
    preFormat,
    type: ELEMENT_H2,
  },
  {
    match: "### ",
    mode: "block",
    preFormat,
    type: ELEMENT_H3,
  },
  {
    match: "#### ",
    mode: "block",
    preFormat,
    type: ELEMENT_H4,
  },
  {
    match: "##### ",
    mode: "block",
    preFormat,
    type: ELEMENT_H5,
  },
  {
    match: "###### ",
    mode: "block",
    preFormat,
    type: ELEMENT_H6,
  },
  {
    match: "> ",
    mode: "block",
    preFormat,
    type: ELEMENT_BLOCKQUOTE,
  },
  {
    format: (editor) => {
      insertEmptyCodeBlock(editor, {
        defaultType: ELEMENT_DEFAULT,
        insertNodesOptions: {
          select: true,
        },
      });
    },
    match: "```",
    mode: "block",
    preFormat,
    triggerAtBlockStart: false,
    type: ELEMENT_CODE_BLOCK,
  },
  {
    format: (editor) => {
      setNodes(editor, {
        type: ELEMENT_HR,
      });
      insertNodes(editor, {
        children: [
          {
            text: "",
          },
        ],
        type: ELEMENT_DEFAULT,
      });
    },
    match: ["---", "—-", "___ "],
    mode: "block",
    type: ELEMENT_HR,
  },
];
