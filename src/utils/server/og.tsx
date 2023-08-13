import { BRAND_NAME } from "~/app";
import { ImageResponse } from "next/server";

export const alt = BRAND_NAME;
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";
export const runtime = "edge";

export default function og() {
  return new ImageResponse(
    (
      <div
        style={{
          fontSize: 128,
          background: "white",
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {BRAND_NAME}
      </div>
    ),
    {
      ...size,
    },
  );
}
