import { HTMLAttributes, type FC } from "react";
import Link from "next/link";
import clsx from "clsx";

import { LanguageSwitcher } from "./language-switcher";
import { UserLogin } from "./user-login";

export const Header: FC<Omit<HTMLAttributes<HTMLElement>, "children">> = ({
  className,
  ...props
}) => {
  return (
    <header
      className={clsx(
        "flex justify-between items-center container mx-auto p-4",
        className,
      )}
      {...props}
    >
      <LanguageSwitcher />
      <Link href="/auth">Sign in</Link>
      <UserLogin />
    </header>
  );
};
