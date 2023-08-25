"use client";

import { cn } from "~/server/utils";
import { Button, type ButtonProps } from "~/islands/primitives/button";

interface ClientButtonProps extends ButtonProps {}

export function ClientButton({ className, ...props }: ClientButtonProps) {
  return <Button className={cn(className)} {...props}></Button>;
}
