/* eslint-disable @eslint-react/dom/no-unsafe-target-blank */
export function NextLogo() {
  return (
    <a href="https://nextjs.org/" rel="noopener" target="_blank">
      {/* biome-ignore lint/a11y/noSvgWithoutTitle: <explanation> */}
      <svg
        fill="none"
        height="24"
        viewBox="0 0 24 24"
        width="24"
        xmlns="http://www.w3.org/2000/svg"
      >
        <g clipPath="url(#clip0_29_46694)">
          <mask
            height="24"
            id="mask0_29_46694"
            maskUnits="userSpaceOnUse"
            style={{ maskType: "alpha" }}
            width="24"
            x="0"
            y="0"
          >
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <path
              d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
              fill="#000"
            ></path>
          </mask>
          <g mask="url(#mask0_29_46694)">
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <path
              d="M12 24c6.627 0 12-5.373 12-12S18.627 0 12 0 0 5.373 0 12s5.373 12 12 12z"
              fill="#000"
            ></path>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <path
              d="M19.935 21.003L9.219 7.2H7.2v9.596h1.615V9.251l9.852 12.728c.444-.297.868-.624 1.268-.976z"
              fill="url(#paint0_linear_29_46694)"
            ></path>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <path
              d="M16.934 7.2h-1.6v9.6h1.6V7.2z"
              fill="url(#paint1_linear_29_46694)"
            ></path>
          </g>
        </g>
        <defs>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint0_linear_29_46694"
            x1="14.534"
            x2="19.267"
            y1="15.533"
            y2="21.4"
          >
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <stop stopColor="#fff"></stop>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
          </linearGradient>
          <linearGradient
            gradientUnits="userSpaceOnUse"
            id="paint1_linear_29_46694"
            x1="16.134"
            x2="16.107"
            y1="7.2"
            y2="14.25"
          >
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <stop stopColor="#fff"></stop>
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <stop offset="1" stopColor="#fff" stopOpacity="0"></stop>
          </linearGradient>
          <clipPath id="clip0_29_46694">
            {/* biome-ignore lint/style/useSelfClosingElements: <explanation> */}
            <path d="M0 0H24V24H0z" fill="#fff"></path>
          </clipPath>
        </defs>
      </svg>
    </a>
  );
}
