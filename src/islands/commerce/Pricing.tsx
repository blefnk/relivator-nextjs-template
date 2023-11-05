import { HTMLAttributes } from "react";

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
  return isStandalone ? (
    <h2 {...props}>{children}</h2>
  ) : (
    <h3 {...props}>{children}</h3>
  );
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
    <div className="h-full p-6 rounded-lg border-2 border-gray-700 flex flex-col relative overflow-hidden">
      <PricingTitle
        isStandalone={isStandalone}
        className="text-sm tracking-widest text-gray-400 title-font mb-1 font-medium uppercase"
      >
        {title}
      </PricingTitle>
      <span className="text-5xl text-white pb-4 mb-4 border-b border-gray-800 leading-none">
        {price}
      </span>

      {isPopular ? (
        <span className="bg-indigo-500 text-white px-3 py-1 tracking-widest text-xs absolute right-0 top-0 rounded-bl">
          POPULAR
        </span>
      ) : null}

      <ul className="flex flex-col list-none h-full">
        {features.map((feature, index) => (
          <li key={index}>
            <p className="flex items-center text-gray-400 mb-2">
              <span className="w-4 h-4 mr-2 inline-flex items-center justify-center bg-gray-800 text-gray-500 rounded-full flex-shrink-0">
                <svg
                  fill="none"
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2.5"
                  className="w-3 h-3"
                  viewBox="0 0 24 24"
                >
                  <path d="M20 6L9 17l-5-5"></path>
                </svg>
              </span>
              {feature}
            </p>
          </li>
        ))}
      </ul>

      <a
        className="btn btn-primary"
        href={buttonUrl}
        role="button"
        // @ts-expect-error
        disabled={!buttonUrl}
      >
        {buttonUrl
          ? buttonLabel || "Get started"
          : buttonLabel || "Coming soon"}
        <svg
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          className="w-4 h-4 ml-auto"
          viewBox="0 0 24 24"
        >
          <path d="M5 12h14M12 5l7 7-7 7"></path>
        </svg>
      </a>
      <p className="text-xs text-gray-400 mt-3">{observation}</p>
    </div>
  );
};
