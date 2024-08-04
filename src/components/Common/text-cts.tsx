import type { IMjmlTextProps } from "@faire/mjml-react";

import { MjmlText } from "@faire/mjml-react";

export function Text(props: IMjmlTextProps) {
  return (
    <MjmlText
      cssClass="paragraph"
      fontSize="16"
      lineHeight="160%"
      padding="24px 0 0"
      {...props}
    >
      {props.children}
    </MjmlText>
  );
}
