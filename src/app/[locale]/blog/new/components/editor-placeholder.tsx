// Reliverse CMS: Blog Post Editor
import type { ReactElement, ReactNode } from "react";
import { Children, cloneElement, isValidElement } from "react";

import type {
  CreateHOCOptions,
  PlaceholderProps,
  PlatePluginComponent,
} from "@udecode/plate-common";

import { cn } from "@/utils/reliverse/cn";
import { createNodesHOC, usePlaceholderState } from "@udecode/plate-common";
import { ELEMENT_H1 } from "@udecode/plate-heading";
import { ELEMENT_PARAGRAPH } from "@udecode/plate-paragraph";

type CustomPlaceholderProps = {
  children: ReactNode[];
} & PlaceholderProps;

type CustomPlaceholderChild = {
  nodeProps: {
    className?: string;
    placeholder?: string;
  };
  className?: string;
};

const Placeholder = (props: CustomPlaceholderProps) => {
  const { children, nodeProps, placeholder } = props;

  const { enabled } = usePlaceholderState(props);

  // eslint-disable-next-line @eslint-react/no-children-map
  return Children.map(children, (child) => {
    if (!isValidElement<CustomPlaceholderChild>(child)) {
      return child;
    }

    const elementChild: ReactElement<CustomPlaceholderChild> = child;

    // eslint-disable-next-line @eslint-react/no-clone-element
    return cloneElement(elementChild, {
      className: elementChild.props.className,
      nodeProps: {
        ...nodeProps,
        className: cn(
          enabled &&
            `
              before:absolute before:cursor-text before:text-primary
              before:content-[attr(placeholder)]
            `,
        ),
        placeholder,
      },
    });
  });
};

// const withPlaceholder = createNodeHOC(Placeholder);
const withPlaceholdersPrimitive: (
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
      hideOnBlur: true,
      key: ELEMENT_PARAGRAPH,
      placeholder: "Type / for slash commands...",
      query: {
        maxLevel: 1,
      },
    },
    {
      hideOnBlur: false,
      key: ELEMENT_H1,
      placeholder: "Untitled",
    },
  ]); /// / Learn more/inspirations:// @see https://platejs.org// @see https://github.com/noodle-run/noodle/blob/main/src/editor/index.tsx//
