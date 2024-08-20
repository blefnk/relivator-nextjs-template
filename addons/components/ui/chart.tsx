"use client";

import type {
  ComponentProps,
  ComponentType,
  CSSProperties,
  ReactNode,
} from "react";
import { createContext, forwardRef, useContext, useId, useMemo } from "react";

import { cn } from "@/utils/reliverse/cn";
import * as RechartsPrimitive from "recharts";

// Format: { THEME_NAME: CSS_SELECTOR }
const THEMES = { dark: ".dark", light: "" } as const;

export type ChartConfig = {
  [k in string]: {
    icon?: ComponentType;
    label?: ReactNode;
  } & (
    | { color?: never; theme: Record<keyof typeof THEMES, string> }
    | { color?: string; theme?: never }
  );
};

type ChartContextProps = {
  config: ChartConfig;
};

const ChartContext = createContext<ChartContextProps | null>(null);

function useChart() {
  const context = useContext(ChartContext);

  if (!context) {
    throw new Error("useChart must be used within a <ChartContainer />");
  }

  return context;
}

const ChartContainer = forwardRef<
  HTMLDivElement,
  {
    children: ComponentProps<
      typeof RechartsPrimitive.ResponsiveContainer
    >["children"];
    config: ChartConfig;
  } & ComponentProps<"div">
>(({ id, children, className, config, ...props }, ref) => {
  const uniqueId = useId();
  const chartId = `chart-${id || uniqueId.replace(/:/g, "")}`;

  return (
    <ChartContext.Provider value={{ config }}>
      <div
        className={cn(
          `
            flex aspect-video justify-center text-xs

            [&_.recharts-cartesian-axis-tick_text]:fill-muted-foreground

            [&_.recharts-cartesian-grid_line[stroke='#ccc']]:stroke-border/50

            [&_.recharts-curve.recharts-tooltip-cursor]:stroke-border

            [&_.recharts-dot[stroke='#fff']]:stroke-transparent

            [&_.recharts-layer]:outline-none

            [&_.recharts-polar-grid_[stroke='#ccc']]:stroke-border

            [&_.recharts-radial-bar-background-sector]:fill-muted

            [&_.recharts-rectangle.recharts-tooltip-cursor]:fill-muted

            [&_.recharts-reference-line_[stroke='#ccc']]:stroke-border

            [&_.recharts-sector[stroke='#fff']]:stroke-transparent

            [&_.recharts-sector]:outline-none

            [&_.recharts-surface]:outline-none
          `,
          className,
        )}
        data-chart={chartId}
        ref={ref}
        {...props}
      >
        <ChartStyle config={config} id={chartId} />
        <RechartsPrimitive.ResponsiveContainer>
          {children}
        </RechartsPrimitive.ResponsiveContainer>
      </div>
    </ChartContext.Provider>
  );
});

ChartContainer.displayName = "Chart";

const ChartStyle = ({ id, config }: { config: ChartConfig; id: string }) => {
  const colorConfig = Object.entries(config).filter(
    ([_, config]) => config.theme || config.color,
  );

  if (colorConfig.length === 0) {
    return null;
  }

  return (
    <style
      dangerouslySetInnerHTML={{
        __html: Object.entries(THEMES)
          .map(
            ([theme, prefix]) => `
${prefix} [data-chart=${id}] {
${colorConfig
  .map(([key, itemConfig]) => {
    const color =
      itemConfig.theme?.[theme as keyof typeof itemConfig.theme] ||
      itemConfig.color;

    return color ? `  --color-${key}: ${color};` : null;
  })
  .join("\n")}
}
`,
          )
          .join("\n"),
      }}
    />
  );
};

const ChartTooltip = RechartsPrimitive.Tooltip;

const ChartTooltipContent = forwardRef<
  HTMLDivElement,
  {
    hideIndicator?: boolean;
    hideLabel?: boolean;
    indicator?: "dashed" | "dot" | "line";
    labelKey?: string;
    nameKey?: string;
  } & ComponentProps<"div"> &
    ComponentProps<typeof RechartsPrimitive.Tooltip>
>(
  (
    {
      active,
      className,
      color,
      formatter,
      hideIndicator = false,
      hideLabel = false,
      indicator = "dot",
      label,
      labelClassName,
      labelFormatter,
      labelKey,
      nameKey,
      payload,
    },
    ref,
  ) => {
    const { config } = useChart();

    const tooltipLabel = useMemo(() => {
      if (hideLabel || !payload?.length) {
        return null;
      }

      const [item] = payload;
      const key = `${labelKey || (item && (item.dataKey || item.name)) || "value"}`;
      const itemConfig = getPayloadConfigFromPayload(config, item, key);
      const value =
        !labelKey && typeof label === "string"
          ? config[label as keyof typeof config]?.label || label
          : itemConfig?.label;

      if (labelFormatter) {
        return (
          <div className={cn("font-medium", labelClassName)}>
            {labelFormatter(value, payload)}
          </div>
        );
      }

      if (!value) {
        return null;
      }

      return <div className={cn("font-medium", labelClassName)}>{value}</div>;
    }, [
      label,
      labelFormatter,
      payload,
      hideLabel,
      labelClassName,
      config,
      labelKey,
    ]);

    if (!active || !payload?.length) {
      return null;
    }

    const nestLabel = payload.length === 1 && indicator !== "dot";

    return (
      <div
        className={cn(
          `
            grid min-w-32 items-start gap-1.5 rounded-lg border border-border/50
            bg-background px-2.5 py-1.5 text-xs shadow-xl
          `,
          className,
        )}
        ref={ref}
      >
        {!nestLabel ? tooltipLabel : null}
        <div className="grid gap-1.5">
          {payload.map((item, index) => {
            const key = `${nameKey || item.name || item.dataKey || "value"}`;
            const itemConfig = getPayloadConfigFromPayload(config, item, key);
            const indicatorColor = color || item.payload.fill || item.color;

            return (
              <div
                className={cn(
                  `
                    flex w-full flex-wrap items-stretch gap-2

                    [&>svg]:size-2.5 [&>svg]:text-muted-foreground
                  `,
                  indicator === "dot" && "items-center",
                )}
                key={item.dataKey}
              >
                {formatter && item?.value !== undefined && item.name ? (
                  formatter(item.value, item.name, item, index, item.payload)
                ) : (
                  <>
                    {itemConfig?.icon ? (
                      <itemConfig.icon />
                    ) : (
                      !hideIndicator && (
                        <div
                          className={cn(
                            `
                              shrink-0 rounded-[2px] border-[--color-border]
                              bg-[--color-bg]
                            `,
                            {
                              "h-2.5 w-2.5": indicator === "dot",
                              "my-0.5": nestLabel && indicator === "dashed",
                              "w-0 border-[1.5px] border-dashed bg-transparent":
                                indicator === "dashed",
                              "w-1": indicator === "line",
                            },
                          )}
                          style={
                            {
                              "--color-bg": indicatorColor,
                              "--color-border": indicatorColor,
                            } as CSSProperties
                          }
                        />
                      )
                    )}
                    <div
                      className={cn(
                        "flex flex-1 justify-between leading-none",
                        nestLabel ? "items-end" : "items-center",
                      )}
                    >
                      <div className="grid gap-1.5">
                        {nestLabel ? tooltipLabel : null}
                        <span className="text-muted-foreground">
                          {itemConfig?.label || item.name}
                        </span>
                      </div>
                      {item.value && (
                        <span
                          className={`
                            font-mono font-medium tabular-nums text-foreground
                          `}
                        >
                          {item.value.toLocaleString()}
                        </span>
                      )}
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  },
);

ChartTooltipContent.displayName = "ChartTooltip";

const ChartLegend = RechartsPrimitive.Legend;

const ChartLegendContent = forwardRef<
  HTMLDivElement,
  {
    hideIcon?: boolean;
    nameKey?: string;
  } & ComponentProps<"div"> &
    Pick<RechartsPrimitive.LegendProps, "payload" | "verticalAlign">
>(
  (
    { className, hideIcon = false, nameKey, payload, verticalAlign = "bottom" },
    ref,
  ) => {
    const { config } = useChart();

    if (!payload?.length) {
      return null;
    }

    return (
      <div
        className={cn(
          "flex items-center justify-center gap-4",
          verticalAlign === "top" ? "pb-3" : "pt-3",
          className,
        )}
        ref={ref}
      >
        {payload.map((item) => {
          const key = `${nameKey || item.dataKey || "value"}`;
          const itemConfig = getPayloadConfigFromPayload(config, item, key);

          return (
            <div
              className={cn(
                `
                  flex items-center gap-1.5

                  [&>svg]:size-3 [&>svg]:text-muted-foreground
                `,
              )}
              key={item.value}
            >
              {itemConfig?.icon && !hideIcon ? (
                <itemConfig.icon />
              ) : (
                <div
                  className="size-2 shrink-0 rounded-[2px]"
                  style={{
                    backgroundColor: item.color,
                  }}
                />
              )}
              {itemConfig?.label}
            </div>
          );
        })}
      </div>
    );
  },
);

ChartLegendContent.displayName = "ChartLegend";

// Helper to extract item config from a payload.
function getPayloadConfigFromPayload(
  config: ChartConfig,
  payload: unknown,
  key: string,
) {
  if (typeof payload !== "object" || payload === null) {
    return;
  }

  const payloadPayload =
    "payload" in payload &&
    typeof payload.payload === "object" &&
    payload.payload !== null
      ? payload.payload
      : undefined;

  let configLabelKey: string = key;

  if (
    key in payload &&
    typeof payload[key as keyof typeof payload] === "string"
  ) {
    configLabelKey = payload[key as keyof typeof payload] as string;
  } else if (
    payloadPayload &&
    key in payloadPayload &&
    typeof payloadPayload[key as keyof typeof payloadPayload] === "string"
  ) {
    configLabelKey = payloadPayload[
      key as keyof typeof payloadPayload
    ] as string;
  }

  return configLabelKey in config
    ? config[configLabelKey]
    : config[key as keyof typeof config];
}

export {
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartStyle,
  ChartTooltip,
  ChartTooltipContent,
};
