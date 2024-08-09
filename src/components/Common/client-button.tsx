"use client";

import type { ButtonProps } from "@/components/ui/button";

import { Button } from "@/components/ui/button";
import { cn } from "@/utils";

export function ClientButton({ className, ...props }: ButtonProps) {
  // biome-ignore lint/style/useSelfClosingElements: <explanation>
  return <Button className={cn(className)} {...props}></Button>;
}
