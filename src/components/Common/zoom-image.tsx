import type { HTMLAttributes } from "react";
import MediumZoom from "react-medium-image-zoom";

import "react-medium-image-zoom/dist/styles.css";

export function Zoom({ children }: HTMLAttributes<HTMLDivElement>) {
  return (
    <MediumZoom classDialog="zoom-image" zoomMargin={80}>
      {children}
    </MediumZoom>
  );
}
