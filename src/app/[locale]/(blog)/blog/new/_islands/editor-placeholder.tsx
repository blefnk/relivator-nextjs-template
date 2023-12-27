/** Reliverse CMS: Blog Post Editor */

import React from "react";
import {
  createNodeHOC,
  createNodesHOC,
  usePlaceholderState,
  type CreateHOCOptions,
  type PlaceholderProps,
  type PlatePluginComponent,
} from "@udecode/plate-common";
import { ELEMENT_H1 } from "@udecode/plate-heading";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";
import { cn } from "~/utils";

interface CustomPlaceholderProps extends PlaceholderProps {
  children: React.ReactNode[];
}

type CustomPlaceholderChild = {
  className?: string;
  nodeProps: {
    className?: string;
    placeholder?: string;
  };
};

export const Placeholder = (props: CustomPlaceholderProps) => {
  const { children, placeholder, nodeProps } = props;

  const { enabled } = usePlaceholderState(props);

  return React.Children.map(children, (child) => {
    if (!React.isValidElement<CustomPlaceholderChild>(child)) {
      return child;
    }

    const elementChild: React.ReactElement<CustomPlaceholderChild> = child;

    return React.cloneElement(elementChild, {
      className: elementChild.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            "before:absolute before:cursor-text before:text-primary before:content-[attr(placeholder)]",
        ),
        placeholder,
      },
    });
  });
};

export const withPlaceholder = createNodeHOC(Placeholder);
export const withPlaceholdersPrimitive: (
  components: Record<string, PlatePluginComponent>,
  options:
    | CreateHOCOptions<CustomPlaceholderProps>
    | CreateHOCOptions<CustomPlaceholderProps>[],
) => Record<string, PlatePluginComponent> = createNodesHOC(Placeholder);

export const withPlaceholders = (
  components: Record<string, PlatePluginComponent>,
) =>
  withPlaceholdersPrimitive(components, [
    {
      key: ELEMENT_PARAGRAPH,
      placeholder: "Type / for slash commands...",
      hideOnBlur: true,
      query: {
        maxLevel: 1,
      },
    },
    {
      key: ELEMENT_H1,
      placeholder: "Untitled",
      hideOnBlur: false,
    },
  ]);

/**
 * Learn more/inspirations:
 * @see https://platejs.org
 * @see https://github.com/noodle-run/noodle/blob/main/src/editor/index.tsx
 */
