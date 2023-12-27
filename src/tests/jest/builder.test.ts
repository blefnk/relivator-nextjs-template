import { appHost, fullURL } from "~/data/meta/builder";

it("appHost() returns the app host", () => {
  const oldHost = process.env.NEXT_PUBLIC_APP_URL;

  process.env.NEXT_PUBLIC_APP_URL = "https://example.com";
  expect(appHost()).toBe("https://example.com");

  process.env.NEXT_PUBLIC_APP_URL = oldHost;
});

it("appHost() can exclude the protocol", () => {
  const oldHost = process.env.NEXT_PUBLIC_APP_URL;

  process.env.NEXT_PUBLIC_APP_URL = "https://example.com";
  expect(appHost(false)).toBe("example.com");

  process.env.NEXT_PUBLIC_APP_URL = oldHost;
});

it("fullURL() returns a full URL by appending the path to the host", () => {
  const oldHost = process.env.NEXT_PUBLIC_APP_URL;

  process.env.NEXT_PUBLIC_APP_URL = "https://example.com";
  expect(fullURL("/path").toString()).toBe("https://example.com/path");

  process.env.NEXT_PUBLIC_APP_URL = oldHost;
});
