import type { AutoformatRule } from "@udecode/plate-autoformat";

import { ListStyleType, toggleIndentList } from "@udecode/plate-indent-list";

export const autoformatIndentLists: AutoformatRule[] = [
  {
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Disc,
      });
    },
    match: ["* ", "- "],
    mode: "block",
    type: "list",
  },
  {
    format: (editor) => {
      toggleIndentList(editor, {
        listStyleType: ListStyleType.Decimal,
      });
    },
    match: ["1. ", "1) "],
    mode: "block",
    type: "list",
  },
];
