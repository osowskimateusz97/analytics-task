import { getAnalytics } from "@/queries/getAnalytics";
import { useQuery } from "@tanstack/react-query";
import { subWeeks } from "date-fns";
import { useState } from "react";

const LAST_MONTH = subWeeks(new Date(), 5);
const TODAY_DATE = new Date();

const defaultConfig = {
  startDate: LAST_MONTH,
  endDate: TODAY_DATE,
};

function Homepage() {
  const [date, setDate] = useState(defaultConfig);
  const { startDate, endDate } = date;
  // Queries
  const query = useQuery({
    queryKey: [startDate, endDate],
    queryFn: () => getAnalytics(startDate, endDate),
  });
  return (
    <div>
      <h1 className="text-blue">Hello world!</h1>
    </div>
  );
}

export default Homepage;
