import { BarChartWithTooltip } from "@/components/ui/charts/bar-chart";
import { LineChartComponent } from "@/components/ui/charts/line-chart";
import { PieChartComponent } from "@/components/ui/charts/pie-chart";
import DolarIcon from "@/components/ui/icons/DolarIcon";
import Spinner from "@/components/ui/spinner";
import StatCard from "@/components/ui/StatCard";
import { useDateRange } from "@/providers/date/dateHook";
import { fetchAnalytics } from "@/queries/fetchAnalytics";
import { convertToChartData, getTotalSales } from "@/utils/calculations";
import { formatCurrencyPLN } from "@/utils/currencyFormatting";
import { analyticsDataMapping } from "@/utils/mappings/analyticsDataMapping";
import {
  getChartConfig,
  getPieChartData,
  processLineChartData,
} from "@/utils/mappings/chartMapping";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";

const SalesPage = () => {
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
          title="Total sales"
          iconComponent={<DolarIcon />}
          content={getTotalSales(data)}
        />
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
        <div className="col-span-4">
          <LineChartComponent
            data={processLineChartData(data.aggregatedByDate, "sum_sales")}
            chartConfig={getChartConfig(data.aggregatedByChannel)}
            formatter={formatCurrencyPLN}
          />
        </div>
        <div className="col-span-4 flex flex-col gap-3">
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
          <PieChartComponent
            title="Sales in detail"
            description="Present sales by channels"
            chart_type="sales"
            data={getPieChartData(data.aggregatedByChannel, "total_sales")}
            formatter={formatCurrencyPLN}
          />
        </div>
      </div>
    </>
  );
};

export default SalesPage;
