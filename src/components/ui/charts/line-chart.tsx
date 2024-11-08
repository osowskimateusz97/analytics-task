import { Area, AreaChart, CartesianGrid, XAxis } from "recharts";

import { Card, CardContent } from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

interface LineChartProps {
  data: Record<string, unknown>[];
  chartConfig: ChartConfig;
  formatter?: (value: number) => string;
}

export function LineChartComponent({
  data,
  chartConfig,
  formatter,
}: LineChartProps) {
  return (
    <Card>
      <CardContent>
        <ChartContainer config={{ ...chartConfig, views: { label: "Views" } }}>
          <AreaChart data={data}>
            <defs>
              {Object.keys(chartConfig).map((el) => (
                <linearGradient id={`fill${el}`} x1="0" y1="0" x2="0" y2="1">
                  <stop
                    offset="5%"
                    stopColor={chartConfig[el].color}
                    stopOpacity={0.8}
                  />
                  <stop
                    offset="95%"
                    stopColor={chartConfig[el].color}
                    stopOpacity={0.1}
                  />
                </linearGradient>
              ))}
            </defs>
            <CartesianGrid vertical={false} />
            <XAxis
              dataKey="date"
              tickLine={false}
              axisLine={false}
              tickMargin={8}
              minTickGap={32}
              tickFormatter={(value) => {
                const date = new Date(value);
                return date.toLocaleDateString("en-US", {
                  month: "short",
                  day: "numeric",
                });
              }}
            />
            <ChartTooltip
              cursor={false}
              formatter={(value, name) => {
                let displayValue = value;
                if (formatter) {
                  displayValue = formatter(value as number);
                }
                return `${chartConfig[name].label} - ${displayValue}`;
              }}
              content={
                <ChartTooltipContent
                  labelFormatter={(value) => {
                    return new Date(value).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                    });
                  }}
                  indicator="dot"
                />
              }
            />
            {Object.keys(chartConfig).map((el) => (
              <Area
                connectNulls
                dataKey={el}
                type="natural"
                fill={`url(#fill${el})`}
                stroke={chartConfig[el].color}
              />
            ))}

            <ChartLegend content={<ChartLegendContent />} />
          </AreaChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
