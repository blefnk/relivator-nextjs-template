import { Img, useVideoConfig } from "remotion";

import type { Stargazer } from "./cache";

import { constants } from "./constants";
import { RepoHeader } from "./repo";

const W = 1280 / 2.5;
const H = 720 / 2.5;

export function Content({
  progress,
  repoName,
  repoOrg,
  stargazers,
}: {
  progress: number;
  repoName: string;
  repoOrg: string;
  stargazers: Stargazer[];
}) {
  const gap = constants.boxGap;
  const startY = 76 - gap;
  const dy = progress * gap;
  const { width } = useVideoConfig();

  return (
    <div
      style={{
        backgroundColor: "#f6f8fa",
        flex: 1,
        maxHeight: H,
        maxWidth: W,
        minHeight: H,
        position: "relative",
        transform: `scale(${width / W})`,
        transformOrigin: "top left",
      }}
    >
      {stargazers.map((stargazer, index) => {
        const isHidden = Math.abs(index - progress) > 3;
        const grow = 0;
        const opacity = Math.min(0.1 + progress - index, 1);

        return isHidden ? null : (
          <StarBox
            avatarUrl={stargazer.avatarUrl}
            date={stargazer.date}
            grow={grow}
            key={stargazer.login}
            name={stargazer.name}
            opacity={opacity}
            repoName={repoName}
            starNumber={index + 1}
            y={startY - gap * index + dy}
          />
        );
      })}
      <RepoHeader name={repoName} org={repoOrg} stars={Math.round(progress)} />
    </div>
  );
}

function StarBox({
  name,
  avatarUrl,
  date,
  grow,
  opacity,
  repoName,
  starNumber,
  y,
}: {
  avatarUrl: string;
  date: string;
  grow: number;
  name: string;
  opacity: number;
  repoName: string;
  starNumber: number;
  y: number;
}) {
  const d = new Date(date);
  const dateString = d.toLocaleDateString("en-US", {
    day: "2-digit",
    month: "short",
    year: "numeric",
  });

  return (
    <div
      style={{
        background: "white",
        border: "1px solid #e1e4e8",
        borderRadius: 6,
        display: "flex",
        height: constants.boxHeight,
        left: 24,
        maxHeight: constants.boxHeight,
        minHeight: constants.boxHeight,
        opacity,
        padding: 12,
        position: "absolute",
        right: 24,
        top: 0,
        transform: `translateY(${y}px) scale(${1 + grow * 0.07})`,
      }}
    >
      <Img
        height={constants.avatarSize}
        src={avatarUrl}
        style={{
          borderRadius: "50%",
        }}
        width={constants.avatarSize}
      />
      <div
        style={{
          display: "flex",
          flex: 1,
          flexDirection: "column",
          marginLeft: "12px",
          maxWidth: 560,
          minWidth: 0,
        }}
      >
        <h3
          style={{
            fontSize: constants.fontSizeLG,
            fontWeight: 600,
            maxWidth: 360,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          {name}
        </h3>
        <div
          style={{
            fontSize: constants.fontSizeLG,
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
          }}
        >
          starred <b>{repoName}</b>{" "}
          <span
            style={{
              color: "#586069",
            }}
          >
            on {dateString}
          </span>
        </div>
      </div>
      <div
        style={{
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          height: constants.containerSize,
          justifyContent: "space-between",
          width: constants.containerSize,
        }}
      >
        <span
          style={{
            color: "#586069",
            fontSize: constants.fontSizeXS,
          }}
        >
          Star
        </span>
        <div
          style={{
            fontSize: constants.fontSizeXL,
          }}
        >
          <span
            style={{
              color: "#586069",
              fontSize: constants.fontSizeLG,
            }}
          >
            #
          </span>
          {starNumber}
        </div>
      </div>
    </div>
  );
}
