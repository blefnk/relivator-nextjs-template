type LocaleFlagIconProps = {
  locale: string;
};

export function LocaleFlagIcon({ locale }: LocaleFlagIconProps) {
  const flagIcon = locale;

  if (flagIcon === "en") {
    return <span className="fi fi-gb" aria-hidden="true" />;
  }

  if (flagIcon === "uk") {
    return <span className="fi fi-ua" aria-hidden="true" />;
  }

  if (flagIcon === "pl") {
    return (
      <span
        className={`
          fi fi-pl border border-b-0 border-zinc-200

          dark:border-none
        `}
        aria-hidden="true"
      />
    );
  }

  if (flagIcon === "hi") {
    return <span className="fi fi-in" aria-hidden="true" />;
  }

  if (flagIcon === "fa") {
    return <span className="fi fi-ir" aria-hidden="true" />;
  }

  if (flagIcon === "zh") {
    return <span className="fi fi-cn" aria-hidden="true" />;
  }

  return (
    <span
      className={`
        fi

        fi-${flagIcon}
      `}
      aria-hidden="true"
    />
  );
}
