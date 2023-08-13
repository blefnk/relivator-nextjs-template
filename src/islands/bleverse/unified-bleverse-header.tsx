import Link from "next/link";

import appts from "~/app";
import { Globe, Home, Mic, ListMusic, Combine } from "lucide-react";

import {
  Menubar,
  MenubarCheckboxItem,
  MenubarContent,
  MenubarItem,
  MenubarLabel,
  MenubarMenu,
  MenubarRadioGroup,
  MenubarRadioItem,
  MenubarSeparator,
  MenubarShortcut,
  MenubarSub,
  MenubarSubContent,
  MenubarSubTrigger,
  MenubarTrigger,
} from "./menubar";

export async function UnifiedBleverseHeader() {
  return (
    <header className="justify-baseline container sticky top-0 z-40 flex h-9 items-center justify-between border-b border-slate-200 bg-background shadow-none dark:border-slate-800">
      <Menubar className="-ml-4 rounded-none border-b border-none bg-transparent shadow-none md:-ml-2">
        <UnifiedItemBleverseNav />
        <UnifiedItemUtils />
        <UnifiedItemGithub />
        <UnifiedItemGeneral />
        <UnifiedItemPreferences />
      </Menubar>
    </header>
  );
}

// ========================================================

export function UnifiedItemBleverseNav() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="flex items-center font-bold">
        <BleverseIcon />
        {appts.name}
      </MenubarTrigger>
      <MenubarContent>
        <MenubarLink href="/">
          Home {"->"} <MenubarShortcut>⌘Y</MenubarShortcut>
        </MenubarLink>
        <MenubarSeparator />
        <MenubarLabel>Bleverse Apps</MenubarLabel>
        <UnifiedSubCommunity />
        <UnifiedSubStudio />
        <MenubarSeparator />
        <MenubarLabel>More Bleverse Apps</MenubarLabel>
        <MenubarLink href="https://utils.bleverse.com/">
          Web Utilities Collection
        </MenubarLink>
        <MenubarLink href="https://relivator.bleverse.com/">
          Relivator Next.js Starter
        </MenubarLink>
      </MenubarContent>
    </MenubarMenu>
  );
}

export function UnifiedItemPreferences() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="relative hidden md:block">
        Preferences
      </MenubarTrigger>
      <MenubarContent forceMount>
        <MenubarRadioGroup value="system">
          <MenubarRadioItem value="dark">Dark Theme</MenubarRadioItem>
          <MenubarRadioItem value="light">Light Theme</MenubarRadioItem>
          <MenubarRadioItem value="system">System Mode</MenubarRadioItem>
        </MenubarRadioGroup>
        <MenubarSeparator />
        <MenubarLabel>Settings</MenubarLabel>
        <MenubarItem disabled>Account</MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

export function UnifiedItemGeneral() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="relative hidden lg:block">
        General
      </MenubarTrigger>
      <MenubarContent forceMount>
        <MenubarItem disabled>
          Undo <MenubarShortcut>⌘Z</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Redo <MenubarShortcut>⇧⌘Z</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem disabled>
          Cut <MenubarShortcut>⌘X</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Copy <MenubarShortcut>⌘C</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Paste <MenubarShortcut>⌘V</MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem disabled>
          Select All <MenubarShortcut>⌘A</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Close Tab <MenubarShortcut>⌘W</MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Restore Tab <MenubarShortcut>⇧⌘T</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

export function UnifiedItemUtils() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="relative">Tools</MenubarTrigger>
      <MenubarContent forceMount>
        <MenubarLink href="/">
          <span className="flex items-baseline">
            <Home className="mr-1 h-3 w-3" />
            Bleverse Utils {"->"}
          </span>
        </MenubarLink>
        <MenubarSeparator />
        <MenubarItem disabled>Text-to-Speech...</MenubarItem>
        <MenubarItem disabled>
          Speech-to-Text...{" "}
          <MenubarShortcut>
            <Mic className="h-4 w-4" />
          </MenubarShortcut>
        </MenubarItem>
        <MenubarItem disabled>
          Emoji & Symbols{" "}
          <MenubarShortcut>
            <Globe className="h-4 w-4" />
          </MenubarShortcut>
        </MenubarItem>
        <MenubarSeparator />
        <MenubarItem disabled>
          Share This Page <MenubarShortcut>⌘U</MenubarShortcut>
        </MenubarItem>
      </MenubarContent>
    </MenubarMenu>
  );
}

export function UnifiedItemGithub() {
  return (
    <MenubarMenu>
      <MenubarTrigger className="relative">Github</MenubarTrigger>
      <MenubarContent forceMount>
        <MenubarSub>
          <MenubarSubTrigger>@blefnk</MenubarSubTrigger>
          <MenubarSubContent className="w-[160px] md:w-[180px] lg:w-[200px]">
            <MenubarLink href="https://github.com/blefnk/awkwards" external>
              awkwards
            </MenubarLink>
            <MenubarLink href="https://github.com/blefnk/nomaders" external>
              nomaders
            </MenubarLink>
            <MenubarLink href="https://github.com/blefnk/relivator" external>
              relivator
            </MenubarLink>
            <MenubarLink href="https://github.com/blefnk/utils" external>
              utils
            </MenubarLink>
          </MenubarSubContent>
        </MenubarSub>
      </MenubarContent>
    </MenubarMenu>
  );
}

// ========================================================

export function UnifiedSubCommunity() {
  return (
    <MenubarSub>
      <MenubarSubTrigger className="flex">
        <Combine className="mr-1 h-4 w-4" />
        Community
      </MenubarSubTrigger>
      <MenubarSubContent className="w-[160px] md:w-[180px] lg:w-[200px]">
        <MenubarSub>
          <MenubarSubTrigger>Socials...</MenubarSubTrigger>
          <MenubarSubContent className="w-[160px] md:w-[180px] lg:w-[200px]">
            <MenubarLink href="https://twitter.com/bleverse_agency" external>
              Bleverse Twitter
            </MenubarLink>
            <MenubarLink href="https://discord.gg/Pb8uKbwpsJ" external>
              Bleverse Discord
            </MenubarLink>
            <MenubarLink href="https://youtube.com/@bleverse.agency" external>
              Bleverse YouTube
            </MenubarLink>
            <MenubarLink href="https://facebook.com/bleverse" external>
              Bleverse Facebook
            </MenubarLink>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarLink href="https://bleverse.com">
          <span className="flex items-baseline">
            <Home className="mr-1 h-3 w-3" />
            Home
          </span>
          <MenubarShortcut>⇧⌘1</MenubarShortcut>
        </MenubarLink>
        <MenubarSeparator />
        <MenubarLabel>Bleverse Common Links</MenubarLabel>
        <MenubarLink href="https://bleverse.com/space/projects/new">
          Publish Freelance Project
        </MenubarLink>
        <MenubarLink href="https://bleverse.com/space/projects">
          Find Freelance Projects
        </MenubarLink>
        <MenubarSeparator />
        <MenubarLabel>Bleverse Spaces</MenubarLabel>
        <MenubarLink href="https://bleverse.com/space">Space Home</MenubarLink>
        <MenubarLink href="https://bleverse.com/space/stats">
          Space Stats
        </MenubarLink>
        <MenubarLink href="https://bleverse.com/space/docs">
          Space Docs
        </MenubarLink>
        <MenubarLink href="https://bleverse.com/space/billing">
          Subscription
        </MenubarLink>
        <MenubarLink href="https://bleverse.com/space/chat">
          Messages
        </MenubarLink>
        <MenubarLink href="https://bleverse.com/space/settings">
          Settings
        </MenubarLink>
        <MenubarLink href="https://bleverse.com/space/users">Users</MenubarLink>
        <MenubarSeparator />
        <MenubarLabel>Other</MenubarLabel>
        <MenubarLink href="https://bleverse.com/space/achievements">
          Achievements
        </MenubarLink>
        <MenubarLink href="https://bleverse.com/space/bookmarks">
          Bookmarks
        </MenubarLink>
        <MenubarLink href="https://bleverse.com/space/support">
          Support
        </MenubarLink>
        <MenubarSub>
          <MenubarSubTrigger>More...</MenubarSubTrigger>
          <MenubarSubContent className="w-[160px] md:w-[180px] lg:w-[200px]">
            <MenubarLink href="https://bleverse.com/about">
              About Bleverse
            </MenubarLink>
            <MenubarLink href="https://bleverse.com/team">
              Bleverse Team
            </MenubarLink>
            <MenubarLink href="https://bleverse.com/conf">
              Bleverse Conf
            </MenubarLink>
            <MenubarLink href="https://bleverse.com/#features">
              Features
            </MenubarLink>
            <MenubarLink href="https://bleverse.com/#pricing">
              Pricing
            </MenubarLink>
          </MenubarSubContent>
        </MenubarSub>
      </MenubarSubContent>
    </MenubarSub>
  );
}

export function UnifiedSubStudio() {
  return (
    <MenubarSub>
      <MenubarSubTrigger className="flex">
        <ListMusic className="mr-1 h-4 w-4" />
        MF Studio
      </MenubarSubTrigger>
      <MenubarSubContent className="w-[160px] md:w-[180px] lg:w-[200px]">
        <MenubarSub>
          <MenubarSubTrigger>Socials...</MenubarSubTrigger>
          <MenubarSubContent className="w-[160px] md:w-[180px] lg:w-[200px]">
            <MenubarLink href="https://youtube.com/mfpiano" external>
              MF Piano YouTube
            </MenubarLink>
            <MenubarLink href="https://facebook.com/mfpianotutorial" external>
              MF Piano Facebook
            </MenubarLink>
          </MenubarSubContent>
        </MenubarSub>
        <MenubarLink href="https://mfpiano.org">
          <span className="flex items-baseline">
            <Home className="mr-1 h-3 w-3" />
            Home
          </span>
          <MenubarShortcut>⇧⌘2</MenubarShortcut>
        </MenubarLink>
        <MenubarSeparator />
        <MenubarLabel>Studio</MenubarLabel>
        <MenubarLink href="https://mfpiano.org/studio/store">
          Sheets
        </MenubarLink>
        <MenubarLink href="https://mfpiano.org/studio/synth/songs">
          Playing
        </MenubarLink>
        <MenubarLink href="https://mfpiano.org/studio/writing">
          Writing
        </MenubarLink>
        <MenubarLink href="https://mfpiano.org/studio/playlists">
          Playlists
        </MenubarLink>
        <MenubarLink href="https://mfpiano.org/studio/gaming">
          Games
        </MenubarLink>
        <MenubarLink href="https://mfpiano.org/studio/academy">
          Docs
        </MenubarLink>
        <MenubarLink href="https://mfpiano.org/studio/daw">Daw</MenubarLink>
        <MenubarSeparator />
        <MenubarLabel>Synthesizer</MenubarLabel>
        <MenubarLink href="https://mfpiano.org/studio/synth/songs">
          Learn song
        </MenubarLink>
        <MenubarLink href="https://mfpiano.org/studio/synth/freeplay">
          Free play
        </MenubarLink>
        <MenubarLink href="https://mfpiano.org/studio/synth/training/phrases">
          Phrases
        </MenubarLink>
        <MenubarSeparator />
        <MenubarLabel>Other</MenubarLabel>
        <MenubarLink href="https://mfpiano.org/studio/gaming">
          Games
        </MenubarLink>
        <MenubarLink href="https://mfpiano.org/studio/about">About</MenubarLink>
        <MenubarSub>
          <MenubarSubTrigger>Soon</MenubarSubTrigger>
          <MenubarSubContent className="w-[160px] md:w-[180px] lg:w-[200px]">
            <MenubarSub>
              <MenubarSubTrigger>Bleverse Cloud</MenubarSubTrigger>
              <MenubarSubContent>
                <MenubarItem disabled>Update Cloud Library</MenubarItem>
                <MenubarItem disabled>About Space Cloud</MenubarItem>
                <MenubarSeparator />
                <MenubarItem disabled>Organize Library...</MenubarItem>
                <MenubarItem disabled>Export Library...</MenubarItem>
                <MenubarSeparator />
                <MenubarItem disabled>Import Playlist...</MenubarItem>
                <MenubarItem disabled>Export Playlist...</MenubarItem>
                <MenubarItem disabled>Show Duplicate Items</MenubarItem>
                <MenubarSeparator />
                <MenubarItem disabled>Get Album Artworks</MenubarItem>
                <MenubarItem disabled>Get My Tracks Info</MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
            <MenubarItem disabled>
              Import Midi... <MenubarShortcut>⌘O</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>Download Playlist...</MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>
              Space Cloud <MenubarShortcut>⇧⌘R</MenubarShortcut>{" "}
            </MenubarItem>
            <MenubarItem disabled>Convert Midi</MenubarItem>
            <MenubarSeparator />
            <MenubarItem disabled>Synth Setup...</MenubarItem>
            <MenubarItem disabled>
              Print Sheet... <MenubarShortcut>⌘P</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Hide Song... <MenubarShortcut>⌘H</MenubarShortcut>
            </MenubarItem>
            <MenubarItem disabled>
              Hide User... <MenubarShortcut>⇧⌘H</MenubarShortcut>
            </MenubarItem>

            <MenubarSub>
              <MenubarSubTrigger>More...</MenubarSubTrigger>
              <MenubarSubContent className="w-[160px] md:w-[180px] lg:w-[200px]">
                <MenubarCheckboxItem>Show Player</MenubarCheckboxItem>
                <MenubarCheckboxItem checked>Show Lyrics</MenubarCheckboxItem>
                <MenubarSeparator />
                <MenubarItem disabled>Show Status Bar</MenubarItem>
                <MenubarSeparator />
                <MenubarItem disabled>
                  MF Piano Sheets <MenubarShortcut>⌘N</MenubarShortcut>
                </MenubarItem>
                <MenubarItem disabled>Saved Playlists</MenubarItem>
                <MenubarItem disabled>Studio Gen AI</MenubarItem>
                <MenubarItem disabled>
                  Your Sheets <MenubarShortcut>⇧⌘N</MenubarShortcut>
                </MenubarItem>
              </MenubarSubContent>
            </MenubarSub>
          </MenubarSubContent>
        </MenubarSub>
      </MenubarSubContent>
    </MenubarSub>
  );
}

// ========================================================

type MenubarLinkProps = {
  href: string;
  inset?: boolean;
  external?: boolean;
  children: React.ReactNode;
};

function MenubarLink({ href, children, external, inset }: MenubarLinkProps) {
  if (external) {
    return (
      <Link href={href} target="_blank" rel="noreferrer">
        <MenubarItem>{children}</MenubarItem>
      </Link>
    );
  }
  return (
    <Link href={href}>
      <MenubarItem inset={inset}>{children}</MenubarItem>
    </Link>
  );
}

// ========================================================

export function BleverseIcon() {
  return (
    <div
      aria-hidden="true"
      className="relative mr-1 h-5 w-4 rounded-sm border-2 border-current opacity-90"
    >
      <span className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform">
        B
      </span>
    </div>
  );
}
