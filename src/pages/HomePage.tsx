import { ModeToggle } from "@/components/mode-toggle";
import { getAnalytics } from "@/queries/getAnalytics";
import { useQuery } from "@tanstack/react-query";
import { AnalyticsFiltersForm } from "@/components/analytics-filters-form";
import { useDateRange } from "@/providers/date/dateHook";
import { format } from "date-fns";

function Homepage() {
  const {
    dateRange: { from, to },
  } = useDateRange();

  // Queries
  const { isLoading, isError, isSuccess, data } = useQuery({
    queryKey: [format(from, "yyyy-MM-dd"), format(to, "yyyy-MM-dd")],
    queryFn: () => getAnalytics(from!, to!),
    enabled: !!(from && to),
  });

  return (
    <div>
      <ModeToggle />
      <AnalyticsFiltersForm />
      {isLoading ? <p>Fetching data..</p> : null}
      {isError ? <p>Error during fetching analitics</p> : null}
      {isSuccess && data
        ? data.map((analytics, idx) => (
            <p key={idx}>{analytics.channel_name}</p>
          ))
        : null}
    </div>
  );
}

export default Homepage;
