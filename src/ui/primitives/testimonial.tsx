import { cn } from "~/lib/cn";
import { Avatar, AvatarImage } from "~/ui/primitives/avatar";

export interface TestimonialAuthor {
  avatar: string;
  handle: string;
  name: string;
}

export interface TestimonialCardProps {
  author: TestimonialAuthor;
  className?: string;
  href?: string;
  text: string;
}

export function TestimonialCard({
  author,
  className,
  href,
  text,
}: TestimonialCardProps) {
  const Card = href ? "a" : "div";

  return (
    <Card
      {...(href ? { href } : {})}
      className={cn(
        "flex flex-col rounded-lg border-t",
        "bg-gradient-to-b from-muted/50 to-muted/10",
        `
          p-4 text-start
          sm:p-6
        `,
        "hover:from-muted/60 hover:to-muted/20",
        `
          max-w-[320px]
          sm:max-w-[320px]
        `,
        "transition-colors duration-300",
        className,
      )}
    >
      <div className="flex items-center gap-3">
        <Avatar className="h-12 w-12">
          <AvatarImage alt={author.name} src={author.avatar} />
        </Avatar>
        <div className="flex flex-col items-start">
          <h3 className="text-md leading-none font-semibold">{author.name}</h3>
          <p className="text-sm text-muted-foreground">{author.handle}</p>
        </div>
      </div>
      <p
        className={`
          sm:text-md
          mt-4 text-sm text-muted-foreground
        `}
      >
        {text}
      </p>
    </Card>
  );
}
