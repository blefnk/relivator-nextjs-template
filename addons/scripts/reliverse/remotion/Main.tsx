import { useCurrentFrame, useVideoConfig } from "remotion";
import { z } from "zod";

import type { Stargazer } from "./cache";

import { constants } from "./constants";
import { Content } from "./Content";
import { getProgress } from "./utils";

export const mainSchema = z.object({
  duration: z.number().step(1),
  repoName: z.string(),
  repoOrg: z.string(),
  starCount: z.number().step(1),
});

type SchemaProps = z.infer<typeof mainSchema>;

export type MainProps = {
  stargazers: null | Stargazer[];
} & SchemaProps;

export function Main({ repoName, repoOrg, stargazers }: MainProps) {
  const frame = useCurrentFrame();
  const { durationInFrames, fps } = useVideoConfig();

  const extraEnding = fps;

  if (!stargazers) {
    return null;
  }

  const progress = getProgress(
    frame,
    durationInFrames - extraEnding,
    stargazers.length,
    fps,
  );

  const shortName = constants.shortRepoName
    ? repoName.split("-")[0]
    : undefined;

  return (
    <Content
      progress={progress || 0}
      repoName={shortName || repoName}
      repoOrg={repoOrg}
      stargazers={stargazers}
    />
  );
}
