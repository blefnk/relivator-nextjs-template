/** @see https://github.com/raydium-io/raydium-frontend/blob/master/src/functions/judgers/isSSR.ts */

export default function isClientSide() {
  return (
    "document" in globalThis &&
    "window" in globalThis &&
    "history" in globalThis
  );
}
export function isServerSide() {
  return !isClientSide();
}

export const inClient = isClientSide();

export const inServer = isServerSide();

export const isInLocalhost =
  inClient && globalThis.location.hostname === "localhost";
