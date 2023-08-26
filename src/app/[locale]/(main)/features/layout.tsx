import { WithChildren } from "~/types";

export default function Layout({ children }: WithChildren) {
  return (
    <div className="duration-really-slow border-b py-8 animate-in fade-in">
      {children}
    </div>
  );
}
