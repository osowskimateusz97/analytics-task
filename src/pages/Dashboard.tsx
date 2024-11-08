import { RecentSales } from "@/components/ui/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { fetchAnalytics } from "@/queries/fetchAnalytics";
import { useQuery } from "@tanstack/react-query";
import {
  convertToChartData,
  getLatestSales,
  getTopOrder,
  getTopSaler,
  getTotalOrders,
  getTotalSales,
} from "@/utils/calculations";
import { BarChartWithTooltip } from "@/components/ui/charts/bar-chart";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { analyticsDataMapping } from "@/utils/mappings/analyticsDataMapping";
import Spinner from "@/components/ui/spinner";
import DolarIcon from "@/components/ui/icons/DolarIcon";
import OrderIcon from "@/components/ui/icons/OrderIcon";
import StarIcon from "@/components/ui/icons/StarIcon";
import StatCard from "@/components/ui/StatCard";

export default function DashboardPage() {
  // Queries
  const { data, status } = useQuery({
    queryKey: ["analytics"],
    queryFn: async () => fetchAnalytics(),
    select: analyticsDataMapping,
  });

  if (status === "pending") {
    return <Spinner />;
  }

  if (status === "error") {
    return <p>There was an error when fetching your data.</p>;
  }

  return (
    <>
      <div className="grid gap-4  md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Sales"
          iconComponent={<DolarIcon />}
          content={getTotalSales(data)}
        />
        <StatCard
          title="Orders"
          iconComponent={<OrderIcon />}
          content={getTotalOrders(data)}
        />
        <StatCard
          title="Top Saler"
          iconComponent={<StarIcon />}
          content={
            <div className="flex items-center gap-2">
              <p>{getTopSaler(data)?.brand_name}</p>
              <Avatar className="h-12 w-12">
                <AvatarImage
                  className="bg-contain p-1"
                  src={getTopSaler(data)?.logo}
                  alt={getTopSaler(data)?.brand_name}
                />
                <AvatarFallback>
                  <div className="w-12 h-12 bg-gray-300" />
                </AvatarFallback>
              </Avatar>
            </div>
          }
          detail={`Total sales: ${getTopSaler(data)?.totalSales}`}
        />
        <StatCard
          title="Top Orders"
          iconComponent={<StarIcon />}
          content={
            <div className="text-2xl font-bold  flex items-center gap-2">
              <p>{getTopOrder(data).brand_name}</p>
              {
                <Avatar className="h-12 w-12">
                  <AvatarImage
                    className="bg-contain p-1"
                    src={getTopSaler(data)?.logo}
                    alt={getTopSaler(data)?.brand_name}
                  />
                  <AvatarFallback>
                    <div className="w-12 h-12 bg-gray-300" />
                  </AvatarFallback>
                </Avatar>
              }
            </div>
          }
          detail={`Total sales: ${getTopSaler(data)?.totalSales}`}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <div className="col-span-3">
          <BarChartWithTooltip
            title="Sales"
            label="sales"
            data={convertToChartData(data.aggregatedByDate)}
            chartConfig={{
              sales: {
                label: "sales",
                color: "hsl(var(--chart-1))",
              },
            }}
          />
        </div>
        <div className="col-span-3">
          <BarChartWithTooltip
            title="Orders"
            label="orders"
            data={convertToChartData(data.aggregatedByDate)}
            chartConfig={{
              orders: {
                label: "orders",
                color: "hsl(var(--chart-2))",
              },
            }}
          />
        </div>
        <Card className="col-span-2 self-start">
          <CardHeader>
            <CardTitle>Recent Sales</CardTitle>
            <CardDescription>The list of recent 20 sales</CardDescription>
          </CardHeader>
          <CardContent className="p-3">
            <RecentSales data={getLatestSales(data.aggregatedByDate)} />
          </CardContent>
        </Card>
      </div>
    </>
  );
}
