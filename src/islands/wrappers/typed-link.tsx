// ?? https://nextjs.org/docs/app/building-your-application/configuring/typescript#statically-typed-links

// import type { Route } from "next";
import Link from "next/link";

// export default function TLink<T extends string>({
export default function TLink({
  href
}: {
  // href: Route<T> | URL;
  href: URL;
}) {
  return (
    <Link href={href}>
      <div>My TLink</div>
    </Link>
  );
}
