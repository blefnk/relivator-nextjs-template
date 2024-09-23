import type { MainProps } from "./Main";
import type { CalculateMetadataFunction } from "remotion";

import { useCallback } from "react";

import { Composition } from "remotion";

import { constants } from "./constants";
import { fetchStargazers } from "./fetch-data";
import { Main, mainSchema } from "./Main";
import { waitForNoInput } from "./wait-for-no-input";

const FPS = constants.framesPerSecond;

export const RemotionRoot = () => {
  const calculateMetadata: CalculateMetadataFunction<MainProps> = useCallback(
    async ({ abortSignal, props }) => {
      await waitForNoInput(abortSignal, 500);

      const stargazers = await fetchStargazers({
        abortSignal,
        repoName: props.repoName,
        repoOrg: props.repoOrg,
        starCount: props.starCount,
      });

      return {
        durationInFrames: props.duration * FPS,
        props: {
          ...props,
          stargazers,
        },
      };
    },
    [],
  );

  return (
    <Composition
      id="main"
      calculateMetadata={calculateMetadata}
      component={Main}
      durationInFrames={15 * FPS}
      fps={FPS}
      height={540}
      schema={mainSchema}
      width={960}
      defaultProps={{
        duration: 30,
        repoName: "relivator-nextjs-template",
        repoOrg: "blefnk",
        starCount: 900,
        stargazers: null,
      }}
    />
  );
};
