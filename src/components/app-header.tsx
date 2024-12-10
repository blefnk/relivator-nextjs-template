import type { User } from "@clerk/nextjs/server";

import Link from "next/link";

import { CartSheet } from "~/components/checkout/cart-sheet";
import { AuthDropdown } from "~/components/layouts/auth-dropdown";
import { ProductsCombobox } from "~/components/products-combobox";
import { siteConfig } from "~/config/site";

import { ByBleverseSheet } from "./by-bleverse";
import { LocaleSwitcher } from "./i18n/LocaleSwitcher";
import { Icons } from "./icons";
import { Navigation } from "./layouts/navigation";
import { ThemeSwitcher } from "./theming";

export default function AppHeader({ user }: { user: User | null }) {
  return (
    <header className="flex h-20 shrink-0 items-center justify-between gap-2 px-4 mt-2 pb-2 border-b">
      <Link href="/" className="items-center space-x-2 hidden sm:flex">
        <Icons.logo className="h-6 w-6" aria-hidden="true" />
        <span className="font-bold text-base">{siteConfig.name}</span>
        <span className="sr-only">Home</span>
      </Link>

      <div className="flex items-center space-x-2">
        <Navigation items={siteConfig.mainNav} />
        <ProductsCombobox />
        <CartSheet />
      </div>

      <div className="flex items-center gap-2">
        <AuthDropdown user={user} />
        <LocaleSwitcher />
        <ThemeSwitcher variant="outline" />
        <ByBleverseSheet />
      </div>
    </header>
  );
}
