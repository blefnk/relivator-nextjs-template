"use client";

import { LineChart, type LineChartProps } from "@tremor/react";

import { cn, formatPrice } from "~/server/utils";

type SalesChartProps = {
  data: {
    name: string;
    Total: number;
  }[];
} & Omit<LineChartProps, "data" | "index" | "categories">;

export function SalesChart({ data, className, ...props }: SalesChartProps) {
  return (
    <LineChart
      className={cn(className)}
      data={data}
      index="name"
      categories={["Total"]}
      colors={["indigo"]}
      valueFormatter={(value) => formatPrice(value)}
      yAxisWidth={48}
      {...props}
    />
  );
}
