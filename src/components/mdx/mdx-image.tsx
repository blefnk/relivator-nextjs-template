"use client";

import Image from "next/image";

import { cn } from "~/server/utils";

type MdxImageProps = {} & React.ComponentProps<typeof Image>;

export function MdxImage({ className, ...props }: MdxImageProps) {
  return (
    <Image
      {...props}
      alt={props.alt ?? "Uncaptioned"}
      className={cn(className)}
    />
  );
}
