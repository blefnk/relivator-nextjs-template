type Card = {
  description: string;
  href: string;
  linkText: string;
  title: string;
};

export function LearnMore({ cards }: { cards: Card[] }) {
  return (
    <div className="relative bg-white" id="features">
      <div
        className={`
          mx-auto grid w-full max-w-[75rem] grid-cols-4 gap-8 pb-24 pt-16
        `}
      >
        <div>
          <span className="text-[0.8125rem]/5 font-medium text-[#6C47FF]">
            What's next
          </span>
          <h2
            className={`
              mb-3 mt-2 text-xl/[1.625rem] font-semibold tracking-tight
              text-[#131316]
            `}
          >
            Learn more from our&nbsp;resources
          </h2>
          <p className="text-[0.8125rem]/5 text-[#5E5F6E]">
            Prebuilt components to handle essential functionality like user
            sign-in, sign-up, and account management.
          </p>
        </div>
        {cards.map((card) => (
          <a
            className={`
              flex flex-col overflow-hidden rounded-lg border border-[#F2F2F4]
            `}
            href={card.href}
            key={card.title}
            rel="noopener"
            target="_blank"
          >
            <div className="flex-1 space-y-1 bg-[#FAFAFB] px-4 py-3">
              <h3 className="text-sm font-medium tracking-tight text-[#131316]">
                {card.title}
              </h3>
              <p className="text-[0.8125rem]/5 text-[#5E5F6E]">
                {card.description}
              </p>
            </div>
            <div
              className={`
                flex items-center gap-1.5 border-t border-[#EDEDF0] bg-[#F5F5F7]
                px-4 py-2 text-[0.8125rem]/5 font-medium text-[#131316]
              `}
            >
              {card.linkText}
              {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
              <svg
                fill="none"
                height="16"
                viewBox="0 0 16 16"
                width="16"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect
                  fill="#EEEEF0"
                  height="12"
                  rx="3"
                  width="12"
                  x="2"
                  y="2"
                />
                <path
                  d="M5.75 10.25L10.25 5.75M10.25 5.75H6.75M10.25 5.75V9.25"
                  stroke="#9394A1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="1.5"
                />
              </svg>
            </div>
          </a>
        ))}
      </div>
    </div>
  );
}
