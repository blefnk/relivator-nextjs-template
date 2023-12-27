"use client";

import { cn } from "~/utils";

import { Button, type ButtonProps } from "~/islands/primitives/button";

type ClientButtonProps = ButtonProps;

export function ClientButton({ className, ...props }: ClientButtonProps) {
  // biome-ignore lint/style/useSelfClosingElements: <explanation>
  return <Button className={cn(className)} {...props}></Button>;
}
