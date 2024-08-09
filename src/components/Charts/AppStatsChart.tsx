"use client";

import type { ChartConfig } from "@/components/ui/chart";

import { Button } from "@/components/ui/button";
import {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { useToast } from "@/hooks-react/use-toast";
import { Monitor, Smartphone } from "lucide-react";
import { Bar, BarChart, CartesianGrid } from "recharts";

const chartConfig = {
  desktop: {
    color: "var(--chart-1)",
    icon: Monitor,
    label: "Desktop",
  },
  mobile: {
    color: "var(--chart-2)",
    icon: Smartphone,
    label: "Mobile",
  },
} satisfies ChartConfig;

const chartData = [
  { desktop: 186, mobile: 80, month: "January" },
  { desktop: 305, mobile: 200, month: "February" },
  { desktop: 237, mobile: 120, month: "March" },
  { desktop: 73, mobile: 190, month: "April" },
  { desktop: 209, mobile: 130, month: "May" },
  { desktop: 214, mobile: 140, month: "June" },
];

export function AppStatsChart() {
  const { toast } = useToast();

  return (
    <>
      <Button
        className="mt-2"
        onClick={() => {
          toast({
            description: "Still in development. Stay tuned!",
          });
        }}
        size="sm"
        variant="default"
      >
        👋
      </Button>
      <ChartContainer
        className="min-h-[200px] w-full max-w-screen-sm"
        config={chartConfig}
      >
        <BarChart accessibilityLayer data={chartData}>
          <CartesianGrid vertical={false} />
          {/* TODO: fix browser console error */}
          {/* <XAxis
						dataKey="month"
						tickLine={false}
						tickMargin={10}
						axisLine={false}
						tickFormatter={(value) => value.slice(0, 3)}
					/> */}
          <ChartTooltip content={<ChartTooltipContent />} />
          <ChartLegend content={<ChartLegendContent />} />
          <Bar dataKey="desktop" fill="var(--chart-1)" radius={4} />
          <Bar dataKey="mobile" fill="var(--chart-2)" radius={4} />
        </BarChart>
      </ChartContainer>
    </>
  );
} // @see https://ui.shadcn.com/docs/components/chart
