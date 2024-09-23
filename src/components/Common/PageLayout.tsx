import type { ReactNode } from "react";

type Props = {
  children?: ReactNode;
  title: string;
};

export default function PageLayout({ children, title }: Props) {
  return (
    <>
      <div
        style={{
          fontFamily: "system-ui, sans-serif",
          lineHeight: 1.5,
          padding: 24,
        }}
      >
        <div style={{ maxWidth: 510 }}>
          <h1>{title}</h1>
          {children}
        </div>
      </div>
    </>
  );
}
