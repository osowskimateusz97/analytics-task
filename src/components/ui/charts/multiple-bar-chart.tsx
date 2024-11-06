import { TrendingUp } from "lucide-react";
import { Bar, BarChart, CartesianGrid, XAxis } from "recharts";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  ChartConfig,
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
} from "@/components/ui/chart";

export const description = "A multiple bar chart";

const chartData = [
  { month: "January", sales: 186, orders: 80 },
  { month: "February", sales: 305, orders: 200 },
  { month: "March", sales: 237, orders: 120 },
  { month: "April", sales: 73, orders: 190 },
  { month: "May", sales: 209, orders: 130 },
  { month: "June", sales: 214, orders: 140 },
];

const chartConfig = {
  desktop: {
    label: "Desktop",
    color: "hsl(var(--chart-1))",
  },
  mobile: {
    label: "Mobile",
    color: "hsl(var(--chart-2))",
  },
} satisfies ChartConfig;

interface MulipleBarChartComponentProps {
  data: Record<string, string | number>[];
}

export function MulipleBarChartComponent({
  data,
}: MulipleBarChartComponentProps) {
  return (
    <ChartContainer config={chartConfig}>
      <BarChart accessibilityLayer data={data}>
        <CartesianGrid vertical={false} />
        <XAxis
          dataKey="day"
          tickLine={false}
          tickMargin={10}
          axisLine={false}
          //   tickFormatter={(value) => value.slice(0, 3)}
        />
        <ChartTooltip
          cursor={false}
          content={<ChartTooltipContent indicator="dashed" />}
        />
        <Bar dataKey="orders" fill="var(--color-desktop)" radius={4} />
        <Bar dataKey="sales" fill="var(--color-mobile)" radius={4} />
      </BarChart>
    </ChartContainer>
  );
}
