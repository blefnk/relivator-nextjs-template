import type { AutoformatPlugin } from "@udecode/plate-autoformat";
import type { PlatePlugin } from "@udecode/plate-common";

import {
  autoformatArrow,
  autoformatLegal,
  autoformatLegalHtml,
  autoformatMath,
  autoformatPunctuation,
  autoformatSmartQuotes,
} from "@udecode/plate-autoformat";

import { autoformatBlocks } from "~/app/[locale]/blog/new/components/auto-format/blocks";
import { autoformatIndentLists } from "~/app/[locale]/blog/new/components/auto-format/indent-list";
import { autoformatMarks } from "~/app/[locale]/blog/new/components/auto-format/marks";

export const autoFormatConfig: Partial<PlatePlugin<AutoformatPlugin>> = {
  options: {
    enableUndoOnDelete: true,
    rules: [
      ...autoformatBlocks,
      ...autoformatIndentLists,
      ...autoformatMarks,
      ...autoformatSmartQuotes,
      ...autoformatPunctuation,
      ...autoformatLegal,
      ...autoformatLegalHtml,
      ...autoformatArrow,
      ...autoformatMath,
    ],
  },
};
