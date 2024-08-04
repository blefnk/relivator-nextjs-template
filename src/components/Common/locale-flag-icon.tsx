type LocaleFlagIconProps = {
  locale: string;
};

export function LocaleFlagIcon({ locale }: LocaleFlagIconProps) {
  const flagIcon = locale;

  if (flagIcon === "en") {
    return <span aria-hidden="true" className="fi fi-gb" />;
  }

  if (flagIcon === "uk") {
    return <span aria-hidden="true" className="fi fi-ua" />;
  }

  if (flagIcon === "pl") {
    return (
      <span
        aria-hidden="true"
        className={`
          fi fi-pl border border-b-0 border-zinc-200

          dark:border-none
        `}
      />
    );
  }

  if (flagIcon === "hi") {
    return <span aria-hidden="true" className="fi fi-in" />;
  }

  if (flagIcon === "fa") {
    return <span aria-hidden="true" className="fi fi-ir" />;
  }

  if (flagIcon === "zh") {
    return <span aria-hidden="true" className="fi fi-cn" />;
  }

  return (
    <span
      aria-hidden="true"
      className={`
        fi

        fi-${flagIcon}
      `}
    />
  );
}
