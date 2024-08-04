import type {
  AutoformatBlockRule,
  AutoformatRule,
} from "@udecode/plate-autoformat";
import type { PlateEditor } from "@udecode/plate-common";
import type { TTodoListItemElement } from "@udecode/plate-list";

import {
  ELEMENT_CODE_BLOCK,
  ELEMENT_CODE_LINE,
} from "@udecode/plate-code-block";
import {
  getParentNode,
  isBlock,
  isElement,
  isType,
  setNodes,
} from "@udecode/plate-common";
import {
  ELEMENT_LI,
  ELEMENT_OL,
  ELEMENT_TODO_LI,
  ELEMENT_UL,
  toggleList,
  unwrapList,
} from "@udecode/plate-list";

const preFormat: AutoformatBlockRule["preFormat"] = (editor) => {
  unwrapList(editor);
};

const format = (editor: PlateEditor, customFormatting: () => void) => {
  if (editor.selection) {
    const parentEntry = getParentNode(editor, editor.selection);

    if (!parentEntry) {
      return;
    }

    const [node] = parentEntry;

    if (
      isElement(node) &&
      !isType(editor, node, ELEMENT_CODE_BLOCK) &&
      !isType(editor, node, ELEMENT_CODE_LINE)
    ) {
      customFormatting();
    }
  }
};

// const formatText = (editor: PlateEditor, text: string) => {
//   format(editor, () => editor.insertText(text));
// };
const formatList = (editor: PlateEditor, type: string) => {
  format(editor, () =>
    toggleList(editor, {
      type,
    }),
  );
};

export const autoformatLists: AutoformatRule[] = [
  {
    format: (editor) => {
      formatList(editor, ELEMENT_UL);
    },
    match: ["* ", "- "],
    mode: "block",
    preFormat,
    type: ELEMENT_LI,
  },
  {
    format: (editor) => {
      formatList(editor, ELEMENT_OL);
    },
    match: ["1. ", "1) "],
    mode: "block",
    preFormat,
    type: ELEMENT_LI,
  },
  {
    match: "[] ",
    mode: "block",
    type: ELEMENT_TODO_LI,
  },
  {
    format: (editor) => {
      setNodes<TTodoListItemElement>(
        editor,
        {
          checked: true,
          type: ELEMENT_TODO_LI,
        },
        {
          match: (n) => isBlock(editor, n),
        },
      );
    },
    match: "[x] ",
    mode: "block",
    type: ELEMENT_TODO_LI,
  },
];
