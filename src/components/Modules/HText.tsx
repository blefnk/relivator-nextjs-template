type HeadingProps = {
  children: string;
  className?: string;
  subtext?: string;
};

export default function HeadingText({
  children,
  className,
  subtext,
}: HeadingProps) {
  return (
    <div
      className={`
        space-y-2

        ${className}
      `}
    >
      <h1
        className={`
          text-3xl font-bold text-primary

          lg:text-4xl
        `}
      >
        {children}
      </h1>
      {subtext && (
        <h2
          className={`
            font-light text-muted-foreground

            lg:text-lg
          `}
        >
          {subtext}
        </h2>
      )}
    </div>
  );
}
