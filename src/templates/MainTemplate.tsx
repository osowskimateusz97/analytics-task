import { MainNav } from "@/components/ui/main-nav";
import { DateRangePicker } from "@/components/ui/date-picker/date-range-picker";
import { ModeToggle } from "@/components/ui/mode-toggle";
import { appConfig } from "@/config";
import { useDateRange } from "@/providers/date/dateHook";
import { getLocation } from "@/utils/routing";
import { Outlet, useLocation } from "react-router-dom";

const MainTemplate = () => {
  const location = useLocation();
  const { handleDateRange } = useDateRange();

  return (
    <div className=" grid grid-rows-[auto_auto_auto_1fr] gap-y-4 min-h-screen p-8 pt-6  overflow-hidden">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight capitalize ">
          {getLocation(location.pathname)}
        </h2>
        <div className="flex items-center space-x-2">
          {location.pathname !== "/" ? (
            <DateRangePicker
              initialDateFrom={appConfig.datePicker.from}
              initialDateTo={appConfig.datePicker.to}
              onUpdate={(props) => handleDateRange(props.range)}
            />
          ) : null}

          <ModeToggle />
        </div>
      </div>
      <MainNav />
      <Outlet />
    </div>
  );
};

export default MainTemplate;
