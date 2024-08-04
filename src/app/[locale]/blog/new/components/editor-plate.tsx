"use client";

// Reliverse CMS: Blog Post Editor */
import { Plate } from "@udecode/plate-common";
import { ELEMENT_H1 } from "@udecode/plate-heading";

import { plugins } from "~/app/[locale]/blog/new/components/editor-plugins";
import { Editor } from "~/app/[locale]/blog/new/components/editor-ui";

export const PlateEditor = () => {
  const initialValue = [
    {
      id: "1",
      children: [
        {
          text: "",
        },
      ],
      type: ELEMENT_H1,
    },
  ];

  return (
    <Plate initialValue={initialValue} onChange={() => {}} plugins={plugins}>
      <Editor />
    </Plate>
  );
};
