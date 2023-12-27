import { cls } from "~/utils";

import styles from "./spinner.module.css";

type Props = {
  className?: string;
};

export function Spinner({ className, ...props }: Props) {
  return (
    // biome-ignore lint/a11y/noSvgWithoutTitle: <explanation>
    <svg
      viewBox="0 0 100 100"
      className={cls(styles.svg, className)}
      {...props}
    >
      <circle cx="50" cy="50" r="45" stroke="currentColor" />
    </svg>
  );
}
