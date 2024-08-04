"use client";

import type { ButtonProps } from "@/browser/reliverse/ui/Button";

import { Button } from "@/browser/reliverse/ui/Button";

import { cn } from "~/utils";

export function ClientButton({ className, ...props }: ButtonProps) {
  // biome-ignore lint/style/useSelfClosingElements: <explanation>
  return <Button className={cn(className)} {...props}></Button>;
}
