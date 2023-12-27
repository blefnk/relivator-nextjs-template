import { MjmlText, type IMjmlTextProps } from "@faire/mjml-react";

import { leadingRelaxed, textBase } from "~/islands/primitives/theme";

export function Text(props: IMjmlTextProps) {
  return (
    <MjmlText
      padding="24px 0 0"
      fontSize={textBase}
      lineHeight={leadingRelaxed}
      cssClass="paragraph"
      {...props}
    >
      {props.children}
    </MjmlText>
  );
}
