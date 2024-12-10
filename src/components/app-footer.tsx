import { ExternalLink } from "lucide-react";
import Link from "next/link";

export default function AppFooter() {
  return (
    <footer className="flex h-16 shrink-0 items-center gap-2 px-4 text-sm text-muted-foreground border-t border-border/60 pt-1">
      <div className="flex-1 flex justify-center">
        <nav className="flex space-x-4 rounded-full py-4 px-6">
          <Link
            href="https://docs.reliverse.org/relivator"
            target="_blank"
            className="inline-flex gap-0.5 items-center hover:text-foreground"
          >
            Relivator Docs
            <ExternalLink className="w-3 h-3" />
          </Link>
          <Link
            href="https://github.com/blefnk/relivator#readme"
            target="_blank"
            className="inline-flex gap-0.5 items-center hover:text-foreground"
          >
            Download Template
            <ExternalLink className="w-3 h-3" />
          </Link>
        </nav>
      </div>
    </footer>
  );
}
