import { env } from "~/data/env";
import { appHost, fullURL } from "~/data/meta/builder";

test("appHost() returns the app host", () => {
  const oldHost = env.NEXT_PUBLIC_APP_URL;

  // @ts-expect-error - env vars are readonly
  env.NEXT_PUBLIC_APP_URL = "https://example.com";
  expect(appHost()).toBe("https://example.com");

  // @ts-expect-error - env vars are readonly
  env.NEXT_PUBLIC_APP_URL = oldHost;
});

test("appHost() can exclude the protocol", () => {
  const oldHost = env.NEXT_PUBLIC_APP_URL;

  // @ts-expect-error - env vars are readonly
  env.NEXT_PUBLIC_APP_URL = "https://example.com";
  expect(appHost(false)).toBe("example.com");

  // @ts-expect-error - env vars are readonly
  env.NEXT_PUBLIC_APP_URL = oldHost;
});

test("fullURL() returns a full URL by appending the path to the host", () => {
  const oldHost = env.NEXT_PUBLIC_APP_URL;

  // @ts-expect-error - env vars are readonly
  env.NEXT_PUBLIC_APP_URL = "https://example.com";
  expect(fullURL("/path").toString()).toBe("https://example.com/path");

  // @ts-expect-error - env vars are readonly
  env.NEXT_PUBLIC_APP_URL = oldHost;
});
