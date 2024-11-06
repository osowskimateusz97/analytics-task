import { BarChartMixed } from "@/components/ui/charts/bar-chart";
import { LineChartComponent } from "@/components/ui/charts/line-chart";
import { MainNav } from "@/components/Dashboard/main-nav";
import { RecentSales } from "@/components/Dashboard/recent-sales";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { DateRangePicker } from "@/components/ui/date-picker/date-range-picker";
import { useDateRange } from "@/providers/date/dateHook";
import { getAnalytics } from "@/queries/getAnalytics";
import { useQuery } from "@tanstack/react-query";
import { format } from "date-fns";
import { PieChartComponent } from "@/components/ui/charts/pie-chart";
import { ModeToggle } from "@/components/ui/mode-toggle";
import {
  convertToChartData,
  getLatestSales,
  getTopOrder,
  getTopSaler,
  getTotalOrders,
  getTotalSales,
} from "@/utils/calculations";
import { BarChartWithTooltip } from "@/components/ui/charts/bar-chart-with-label";
import { appConfig } from "@/config";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export default function DashboardPage() {
  const {
    dateRange: { from, to },
    handleDateRange,
  } = useDateRange();

  // Queries
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: [format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd")],
    queryFn: () => getAnalytics(from, to),
    enabled: !!(from && to),
  });

  return (
    <div className="hidden flex-col md:flex">
      <div className="flex-1 space-y-4 p-8 pt-6">
        <div className="flex items-center justify-between space-y-2">
          <h2 className="text-3xl font-bold tracking-tight">Dashboard</h2>
          <div className="flex items-center space-x-2">
            <DateRangePicker
              initialDateFrom={appConfig.datePicker.from}
              initialDateTo={appConfig.datePicker.to}
              onUpdate={(props) => handleDateRange(props.range)}
            />
            <ModeToggle />
          </div>
        </div>
        <MainNav />
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {isSuccess ? (
            <>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Sales</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5 text-muted-foreground"
                  >
                    <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {getTotalSales(data)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">Orders</CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5 text-muted-foreground"
                  >
                    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
                    <circle cx="9" cy="7" r="4" />
                    <path d="M22 21v-2a4 4 0 0 0-3-3.87M16 3.13a4 4 0 0 1 0 7.75" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold">
                    {getTotalOrders(data)}
                  </div>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Top Saler
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5 text-muted-foreground"
                  >
                    <rect width="20" height="14" x="2" y="5" rx="2" />
                    <path d="M2 10h20" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold flex items-center gap-2">
                    <p>{getTopSaler(data).brandName}</p>
                    {
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          className="bg-contain p-1"
                          src={getTopSaler(data).logo}
                          alt={getTopSaler(data).brandName}
                        />
                        <AvatarFallback>
                          <div className="w-12 h-12 bg-gray-300" />
                        </AvatarFallback>
                      </Avatar>
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total sales: {getTopSaler(data).totalSales}
                  </p>
                </CardContent>
              </Card>
              <Card>
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">
                    Top Orders
                  </CardTitle>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    className="h-5 w-5 text-muted-foreground"
                  >
                    <path d="M22 12h-4l-3 9L9 3l-3 9H2" />
                  </svg>
                </CardHeader>
                <CardContent>
                  <div className="text-2xl font-bold  flex items-center gap-2">
                    <p>{getTopOrder(data).brandName}</p>
                    {
                      <Avatar className="h-12 w-12">
                        <AvatarImage
                          className="bg-contain p-1"
                          src={getTopSaler(data).logo}
                          alt={getTopSaler(data).brandName}
                        />
                        <AvatarFallback>
                          <div className="w-12 h-12 bg-gray-300" />
                        </AvatarFallback>
                      </Avatar>
                    }
                  </div>
                  <p className="text-xs text-muted-foreground">
                    Total orders: {getTopOrder(data).totalOrders}
                  </p>
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-8">
          {isSuccess ? (
            <>
              <div className="col-span-4">
                <BarChartWithTooltip
                  title="Sales in detail"
                  label="sales"
                  data={convertToChartData(data.aggregatedByDate)}
                />
              </div>
              <Card className="col-span-4">
                <CardHeader>
                  <CardTitle>Recent Sales</CardTitle>
                  <CardDescription>
                    You made 265 sales this month.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-3">
                  <RecentSales data={getLatestSales(data.aggregatedByDate)} />
                </CardContent>
              </Card>
            </>
          ) : null}
        </div>
        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 max-h-28">
          <div className="col-span-2">
            <PieChartComponent />
          </div>
          <div className="col-span-2">
            <BarChartMixed />
          </div>
          <div className="col-span-3">
            <LineChartComponent />
          </div>
        </div>
      </div>
    </div>
  );
}
