import type { HTMLAttributes } from "react";

interface IPricing {
  title: string;
  price: string;
  features: string[];
  buttonUrl: string;
  buttonLabel?: string;
  isPopular?: boolean;
  observation: string;
  isStandalone?: boolean;
}

interface IPricingTitle extends HTMLAttributes<HTMLHeadingElement> {
  isStandalone?: boolean;
}

const PricingTitle = ({ isStandalone, children, ...props }: IPricingTitle) => {
  return isStandalone ?
      <h2 {...props}>{children}</h2>
    : <h3 {...props}>{children}</h3>;
};

export const Pricing = ({
  title,
  price,
  features,
  buttonUrl,
  buttonLabel,
  isPopular,
  observation,
  isStandalone,
}: IPricing) => {
  return (
    <div className="relative flex h-full flex-col overflow-hidden rounded-lg border-2 border-gray-700 p-6">
      <PricingTitle
        isStandalone={isStandalone}
        className="mb-1 text-sm font-medium uppercase tracking-widest text-gray-400"
      >
        {title}
      </PricingTitle>
      <span className="mb-4 border-b border-gray-800 pb-4 text-5xl leading-none text-white">
        {price}
      </span>

      {isPopular ?
        <span className="absolute right-0 top-0 rounded-bl bg-indigo-500 px-3 py-1 text-xs tracking-widest text-white">
          POPULAR
        </span>
      : null}

      <ul className="flex h-full list-none flex-col">
        {features.map((feature, index) => (
          // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
          <li key={index}>
            <p className="mb-2 flex items-center text-gray-400">
              <span className="mr-2 inline-flex h-4 w-4 shrink-0 items-center justify-center rounded-full bg-gray-800 text-gray-500">
                {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="h-3 w-3"
                  viewBox="0 0 24 24"
                >
                  {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              {feature}
            </p>
          </li>
        ))}
      </ul>

      <a
        className="bg-primary"
        href={buttonUrl}
        role="button"
        // @ts-expect-error ...
        disabled={!buttonUrl}
      >
        {buttonUrl ?
          buttonLabel || "Get started"
        : buttonLabel || "Coming soon"}
        {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="ml-auto h-4 w-4"
          viewBox="0 0 24 24"
        >
          {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </a>
      <p className="mt-3 text-xs text-gray-400">{observation}</p>
    </div>
  );
};
