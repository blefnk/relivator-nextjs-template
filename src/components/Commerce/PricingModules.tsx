import type { HTMLAttributes } from "react";

import { Feather } from "lucide-react";

type IPricing = {
  buttonLabel?: string;
  buttonUrl: string;
  features: string[];
  isPopular?: boolean;
  isStandalone?: boolean;
  observation: string;
  price: string;
  title: string;
};

type IPricingTitle = {
  isStandalone?: boolean;
} & HTMLAttributes<HTMLHeadingElement>;

const PricingTitle = ({ children, isStandalone, ...props }: IPricingTitle) =>
  isStandalone ? (
    <h2 {...props}>{children}</h2>
  ) : (
    <h3 {...props}>{children}</h3>
  );

export const Pricing = ({
  buttonLabel,
  buttonUrl,
  features,
  isPopular,
  isStandalone,
  observation,
  price,
  title,
}: IPricing) => (
  <div
    className={`
      relative flex h-full flex-col overflow-hidden rounded-lg border-2
      border-gray-700 p-6
    `}
  >
    <PricingTitle
      className={`
        mb-1 text-sm font-medium uppercase tracking-widest text-gray-400
      `}
      isStandalone={isStandalone}
    >
      {title}
    </PricingTitle>
    <span
      className={`
        mb-4 border-b border-gray-800 pb-4 text-5xl leading-none text-white
      `}
    >
      {price}
    </span>
    {isPopular ? (
      <span
        className={`
          absolute right-0 top-0 rounded-bl bg-indigo-500 px-3 py-1 text-xs
          tracking-widest text-white
        `}
      >
        POPULAR
      </span>
    ) : null}
    <ul className="flex h-full list-none flex-col">
      {features.map((feature, index) => (
        <li key={index}>
          <p className="mb-2 flex items-center text-gray-400">
            <span
              className={`
                mr-2 inline-flex size-4 shrink-0 items-center justify-center
                rounded-full bg-gray-800 text-gray-500
              `}
            >
              <Feather />
            </span>
            {feature}
          </p>
        </li>
      ))}
    </ul>
    <a
      className="bg-primary" // @ts-expect-error TODO: Fix
      disabled={!buttonUrl}
      href={buttonUrl}
      role="button"
    >
      {buttonUrl ? buttonLabel || "Get started" : buttonLabel || "Coming soon"}
      <svg
        className="ml-auto size-4"
        fill="none"
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <title>Next.js</title>
        <path d="M5 12h14M12 5l7 7-7 7" />
      </svg>
    </a>
    <p className="mt-3 text-xs text-gray-400">{observation}</p>
  </div>
);
