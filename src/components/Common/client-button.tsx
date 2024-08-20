"use client";

import type { ButtonProps } from "@/components/ui/button";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils/reliverse/cn";

export function ClientButton({ className, ...props }: ButtonProps) {
  // biome-ignore lint/style/useSelfClosingElements: <explanation>
  return <Button className={cn(className)} {...props}></Button>;
}
