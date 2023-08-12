import React from "react";

import Link from "next/link";

import appts from "~/app";
import { ExternalLink } from "lucide-react";
import { FaDiscord, FaFacebook, FaGithub, FaYoutube } from "react-icons/fa";

import { XTwitterIcon } from "./twitter-x-icon";
import {
  Menubar,
  MenubarContent,
  MenubarItem,
  MenubarMenu,
  MenubarSeparator,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./menubar";

export async function UnifiedBleverseFooter() {
  return (
    <footer className="container flex items-center justify-between border-t border-slate-200 shadow-none dark:border-slate-800">
      <Menubar className="space-y-4 rounded-none border-b border-none shadow-none">
        <MenubarMenu>
          <MenubarTrigger className="flex font-semibold">
            &copy; 2023 Bleverse
          </MenubarTrigger>
          <MenubarContent>
            <MenubarSub>
              <MenubarSubTrigger>Legal</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                <MenubarLink href="/">Privacy Policy</MenubarLink>
                <MenubarLink href="/">Terms of Service</MenubarLink>
                <MenubarLink href="/">Trademark Policy</MenubarLink>
                <MenubarLink href="/">Inactivity Policy</MenubarLink>
                <MenubarLink href="/">Support Terms</MenubarLink>
                <MenubarLink href="/">DMCA Policy</MenubarLink>
                <MenubarLink href="/">DPA and SLA</MenubarLink>
                <MenubarLink href="/">Sub-processors</MenubarLink>
                <MenubarLink href="/">Cookie Preferences</MenubarLink>
                <MenubarLink href="/">Event Code of Conduct</MenubarLink>
                <MenubarLink href="/">Event Terms and Conditions</MenubarLink>
                <MenubarLink href="/">Job Applicant Privacy Notice</MenubarLink>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSub>
              <MenubarSubTrigger>Follow</MenubarSubTrigger>
              <MenubarSubContent className="w-[230px]">
                <span className="sr-only">
                  All social links are opened in a new tab.
                </span>
                <SocialMenuItem
                  title="Bleverse Community"
                  twitter="bleverse_com"
                  github="blefnk"
                  discord="Pb8uKbwpsJ"
                  youtube="@bleverse_com"
                  facebook="groups/bleverse"
                />
                <SocialMenuItem
                  title="MF Piano & Studio"
                  twitter="mfpiano_org"
                  github="blefnk"
                  discord="KtBqSGYhRd"
                  youtube="@mfpiano"
                  facebook="mfpianotutorial"
                />
                <SocialMenuItem
                  title="Bleverse Games"
                  twitter="blefonix_com"
                  github="blefnk"
                  discord="GtkqYDmtSV"
                  youtube="@BleverseGames"
                  facebook="groups/blefonix"
                />
              </MenubarSubContent>
            </MenubarSub>
            <MenubarSeparator />
            <MenubarLink href="/">Home</MenubarLink>
            <MenubarLink href="/">Help</MenubarLink>
          </MenubarContent>
        </MenubarMenu>
      </Menubar>

      <SocialIconsBar />
    </footer>
  );
}

type SocialMenuItemProps = {
  title: string;
  twitter?: string;
  github?: string;
  discord?: string;
  youtube?: string;
  facebook?: string;
};

export function SocialMenuItem({
  title,
  twitter,
  github,
  discord,
  youtube,
  facebook,
}: SocialMenuItemProps) {
  return (
    <MenubarSub>
      <MenubarSubTrigger>{title}</MenubarSubTrigger>
      <MenubarSubContent className="w-[230px]">
        {twitter && (
          <MenubarLink href={`https://x.com/${twitter}`} social>
            <XTwitterIcon className="mr-2" height="14" />
            Twitter
          </MenubarLink>
        )}
        {github && (
          <MenubarLink href={`https://github.com/${github}`} social>
            <FaGithub className="mr-2 h-4 w-4" aria-hidden="true" />
            Github
          </MenubarLink>
        )}
        {discord && (
          <MenubarLink href={`https://discord.gg/${discord}`} social>
            <FaDiscord className="mr-2 h-4 w-4" aria-hidden="true" />
            Discord
          </MenubarLink>
        )}
        {youtube && (
          <MenubarLink href={`https://youtube.com/${youtube}`} social>
            <FaYoutube className="mr-2 h-4 w-4" aria-hidden="true" />
            YouTube
          </MenubarLink>
        )}
        {facebook && (
          <MenubarLink href={`https://facebook.com/${facebook}`} social>
            <FaFacebook className="mr-2 h-4 w-4" aria-hidden="true" />
            Facebook
          </MenubarLink>
        )}
      </MenubarSubContent>
    </MenubarSub>
  );
}

type MenubarLinkProps = {
  href: string;
  inset?: boolean;
  social?: boolean;
  children: React.ReactNode;
};

function MenubarLink({ href, children, social, inset }: MenubarLinkProps) {
  if (social) {
    return (
      <Link href={href} target="_blank" rel="noreferrer">
        <MenubarItem>
          <ExternalLink
            className="mr-2 h-3 w-3 text-muted-foreground"
            aria-hidden="true"
          />
          {children}
        </MenubarItem>
      </Link>
    );
  }

  return (
    <Link href={href}>
      <MenubarItem inset={inset}>{children}</MenubarItem>
    </Link>
  );
}

export function SocialIconsBar() {
  return (
    <Menubar className="hidden border-none shadow-none md:block">
      <div className="flex space-x-4">
        {appts.social.map((network) => (
          <SocialLink key={network.id} {...network} />
        ))}
      </div>
    </Menubar>
  );
}

// @ts-expect-error
const SocialLink = ({ url, IconComponent, label }) =>
  url && (
    <Link href={url} rel="noopener noreferrer" target="_blank">
      <span className="sr-only">{label}</span>
      <IconComponent className="h-6 w-6" aria-hidden="true" />
    </Link>
  );
