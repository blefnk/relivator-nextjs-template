/** Reliverse CMS: Blog Post Editor */

"use client";

import { Plate } from "@udecode/plate-common";
import { ELEMENT_H1 } from "@udecode/plate-heading";

import { plugins } from "./editor-plugins";
import { Editor } from "./editor-ui";

export const PlateEditor = () => {
  const initialValue = [
    {
      id: "1",
      type: ELEMENT_H1,
      children: [{ text: "" }],
    },
  ];

  return (
    <Plate
      plugins={plugins}
      initialValue={initialValue}
      onChange={(e) => {
        console.log(e);
      }}
    >
      <Editor />
    </Plate>
  );
};

/**
 * Learn more/inspirations:
 * @see https://platejs.org
 * @see https://github.com/noodle-run/noodle/blob/main/src/editor/index.tsx
 */
