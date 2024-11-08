import { BarChartWithTooltip } from "@/components/ui/charts/bar-chart";
import { LineChartComponent } from "@/components/ui/charts/line-chart";
import { PieChartComponent } from "@/components/ui/charts/pie-chart";
import OrderIcon from "@/components/ui/icons/OrderIcon";
import Spinner from "@/components/ui/spinner";
import StatCard from "@/components/ui/StatCard";
import { useDateRange } from "@/providers/date/dateHook";
import { fetchAnalytics } from "@/queries/fetchAnalytics";
import { convertToChartData, getTotalOrders } from "@/utils/calculations";
import { formatNumber } from "@/utils/currencyFormatting";
import { analyticsDataMapping } from "@/utils/mappings/analyticsDataMapping";
import {
  getChartConfig,
  getPieChartData,
  processLineChartData,
} from "@/utils/mappings/chartMapping";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const OrdersPage = () => {
  // extract quering data to the custom hook
  const {
    dateRange: { from, to },
  } = useDateRange();

  const { data, status } = useQuery({
    queryKey: [format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd")],
    queryFn: async () => fetchAnalytics(from, to),
    enabled: !!(from && to),
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
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatCard
          title="Total orders"
          iconComponent={<OrderIcon />}
          content={getTotalOrders(data)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <div className="col-span-4">
          <LineChartComponent
            data={processLineChartData(data.aggregatedByDate, "sum_orders")}
            chartConfig={getChartConfig(data.aggregatedByChannel)}
            formatter={formatNumber}
          />
        </div>
        <div className="col-span-3 flex flex-col gap-3">
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
          <PieChartComponent
            title="Sales in detail"
            description="Present sales by channels"
            chart_type="sales"
            data={getPieChartData(data.aggregatedByChannel, "total_orders")}
            formatter={formatNumber}
          />
        </div>
      </div>
    </>
  );
};

export default OrdersPage;
