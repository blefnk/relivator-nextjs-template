import { GitHubLogoIcon } from "@radix-ui/react-icons";
import { ExternalLink, File, ImageIcon, PanelLeft } from "lucide-react";
import { Globe } from "lucide-react";
import Link from "next/link";

import { Button } from "~/components/ui/button";
import { ScrollArea } from "~/components/ui/scroll-area";
import {
  Sheet,
  SheetClose,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "~/components/ui/sheet";

import { Icons } from "./icons";
import { Separator } from "./ui/separator";

export function ByBleverseSheet() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button variant="ghost" size="icon" className="w-7 h-7">
          <PanelLeft />
        </Button>
      </SheetTrigger>
      <SheetContent side="right" className="w-[400px]">
        <ScrollArea className="h-full">
          <div className="flex flex-col gap-6 p-6">
            <SheetHeader className="space-y-4">
              <SheetTitle className="flex flex-col text-sm">
                <div className="flex items-center justify-between w-full">
                  <div className="flex flex-col">
                    <span className="text-base font-semibold">Bleverse</span>
                    <span className="text-muted-foreground text-sm">
                      Products
                    </span>
                  </div>
                  <SheetClose className="right-4 top-2 p-1 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none">
                    <kbd className="inline-flex select-none items-center gap-1 rounded border bg-background px-2 py-1 font-mono font-medium opacity-100">
                      <span className="text-xs">ESC</span>
                      <span className="sr-only">Close</span>
                    </kbd>
                  </SheetClose>
                </div>
              </SheetTitle>
            </SheetHeader>
            <Separator />

            <div>
              <h3 className="mb-4 text-sm font-semibold">
                ✨ Reliverse Spaces
              </h3>
              <div className="space-y-4">
                <Link
                  href="https://docs.reliverse.org"
                  className="sheet-link"
                  target="_blank"
                >
                  <File className="h-4 w-4" />
                  Documentation
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">🌌 Bleverse Spaces</h3>
              <div className="space-y-4">
                <Link
                  href="https://discord.gg/Pb8uKbwpsJ"
                  className="sheet-link"
                  target="_blank"
                >
                  <Globe className="h-4 w-4" />
                  Discord Server
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
              </div>
            </div>

            <div>
              <h3 className="mb-4 text-sm font-semibold">🧿 Nazar Kornienko</h3>
              <div className="space-y-4">
                <Link
                  href="https://blefnk.reliverse.org"
                  className="sheet-link"
                  target="_blank"
                >
                  <ImageIcon className="h-4 w-4" />
                  Portfolio
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="https://x.com/blefnk"
                  className="sheet-link"
                  target="_blank"
                >
                  <Icons.x className="h-4 w-4" />
                  Twitter
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
                <Link
                  href="https://github.com/blefnk"
                  className="sheet-link"
                  target="_blank"
                >
                  <GitHubLogoIcon className="h-4 w-4" />
                  GitHub
                  <ExternalLink className="ml-auto h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
