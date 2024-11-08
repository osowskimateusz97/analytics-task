import { Pie, PieChart } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartLegend,
  ChartLegendContent,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";
import { ChannelName } from "@/types/analytics";
import { Brand } from "@/types/appConfig";

export const description = "A pie chart with a label list";

export interface PieChartElement {
  brand: Brand;
  brandColor: string;
  channel_name: ChannelName;
  value: number;
}

export interface PieChartProps {
  title: string;
  description: string;
  chart_type: string;
  data: PieChartElement[];
  formatter?: (value: number) => string;
}

export function PieChartComponent({
  title,
  description,
  data,
  chart_type,
  formatter,
}: PieChartProps) {
  const chartConfig = data.reduce((acc, curr) => {
    const { channel_name } = curr;
    acc[channel_name] = {
      label: curr.brand,
      color: curr.brandColor,
    };
    return acc;
  }, {} as Record<ChannelName, { label: string; color: string }>) satisfies ChartConfig;

  const chartData = data.map((e) => ({
    channel_name: e.channel_name,
    brandName: e.brand,
    [chart_type]: e.value,
    fill: e.brandColor,
  }));

  return (
    <Card className="flex flex-col">
      <CardHeader className="items-center pb-0">
        <CardTitle>{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-1 pb-0">
        <ChartContainer
          config={{
            ...chartConfig,
            [chart_type]: { label: chart_type.toUpperCase() },
          }}
          className="mx-auto aspect-square max-h-[250px] [&_.recharts-text]:fill-background"
        >
          <PieChart>
            <ChartTooltip
              formatter={(value, _, props) => {
                const { payload } = props;
                let displayValue = value;
                if (formatter) {
                  displayValue = formatter(value as number);
                }
                return `${payload.brandName} - ${displayValue}`;
              }}
              cursor={false}
              content={<ChartTooltipContent hideLabel />}
            />
            <Pie data={chartData} dataKey={chart_type} nameKey="channel_name" />
            <ChartLegend
              content={<ChartLegendContent nameKey="channel_name" />}
              className="-translate-y-2 flex-wrap gap-2 [&>*]:basis-1/4 [&>*]:justify-center"
            />
          </PieChart>
        </ChartContainer>
      </CardContent>
    </Card>
  );
}
