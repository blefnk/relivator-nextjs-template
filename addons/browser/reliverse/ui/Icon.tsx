import type { ReactElement } from "react";

// Image metadata
export const size = {
  height: 32,
  width: 32,
};

export const contentType = "image/png";

type ImageOptions = {
  height: number;
  width: number;
};

export declare function ImageResponse(
  element: ReactElement,
  options: ImageOptions,
): ReactElement;

// Image generation
export default function Icon() {
  return ImageResponse(
    <div
      className={`
        flex size-full items-center justify-center bg-black text-[24px]
        leading-8 text-white
      `}
    >
      S
    </div>, // ^ ImageResponse JSX element
    // ImageResponse options:
    size,
  );
}
