import React from "react";
import { Avatar, AvatarImage, AvatarFallback } from "./avatar";
import { AnalyticsData } from "@/types/analytics";
import { ScrollArea } from "./scroll-area";

// Refactor interface to be more reusable
interface RecentSalesProps {
  data: AnalyticsData[];
}

// RecentSales component
export const RecentSales: React.FC<RecentSalesProps> = ({ data }) => {
  return (
    <ScrollArea className=" self-start rounded-md pr-5 ">
      <div className="space-y-8 h-[350px]">
        {data.map((item, index) => (
          <div key={index} className="flex items-center border-b-2 pb-3">
            <Avatar className="h-12 w-12">
              <AvatarImage
                className="bg-contain p-1"
                src={item.brand_logo}
                alt={item.brand_name}
              />
              <AvatarFallback>
                <div className="w-12 h-12 bg-gray-300" />
              </AvatarFallback>
            </Avatar>
            <div className="ml-4 space-y-1">
              <p className="text-sm font-medium leading-none capitalize">
                {item.brand_name}
              </p>
              <p className="text-sm text-muted-foreground">{`${item.count_orders} Orders`}</p>
            </div>
            <div className="ml-auto font-medium">{`+${item.sum_sales}`}</div>
          </div>
        ))}
      </div>
    </ScrollArea>
  );
};
