"use client";

import { useState } from "react";

import Image from "next/image";

import { funEmoji } from "@dicebear/collection";
import { createAvatar } from "@dicebear/core";

type AvatarProps = {
  avatarUrl?: string;
  name: string;
  sponsorLevel: number;
};

function generateAvatar(seed: string): string {
  const avatar = createAvatar(funEmoji, {
    seed: seed,
    mouth: ["smileTeeth", "smileLol", "wideSmile", "lilSmile"],
  });

  return avatar.toString();
}

export function AvatarImage({ name, avatarUrl, sponsorLevel }: AvatarProps) {
  const [useAvatar, setUseAvatar] = useState(false);
  const avatarSize = sponsorLevel > 2 ? 150 : sponsorLevel > 1 ? 100 : 50;
  const avatarSvg = generateAvatar(name);

  return (
    <>
      {!useAvatar && avatarUrl ? (
        <Image
          src={avatarUrl}
          alt={`${name}'s avatar`}
          width={avatarSize}
          height={avatarSize}
          // TODO: rounded doesn't work for some reason...
          className="aspect-square rounded-full object-cover"
          onError={() => {
            setUseAvatar(true);
          }}
        />
      ) : (
        <div
          className="aspect-square rounded-full object-cover"
          style={{ width: avatarSize, height: avatarSize }}
          dangerouslySetInnerHTML={{ __html: avatarSvg }}
        />
      )}
    </>
  );
}
