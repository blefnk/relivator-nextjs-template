import type { JSXElementConstructor, ReactElement, ReactNode } from "react";

// interface LocaleConfig {
//   code: string;
//   dateFormat: string;
//   enabled: boolean;
//   hrefLang: string;
//   langDir: string;
//   localName: string;
//   name: string;
// }
export type FormattedMessage =
  | ReactElement<HTMLElement, JSXElementConstructor<HTMLElement> | string>
  | ReadonlyArray<ReactNode>
  | string;
