import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useDateRange } from "@/providers/date/dateHook";
import { DATE_RANGE_TYPE, getDateRange } from "@/utils/dateRangeUtils";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "./ui/form";
import { MouseEvent } from "react";

const FormSchema = z.object({
  dateRange: z.object({
    from: z.date({ required_error: "please fill the from date" }),
    to: z.date({ required_error: "please fill the to date" }),
  }),
});

export function AnalyticsFiltersForm() {
  const { dateRange, setDateRange } = useDateRange();
  console.log("daterange", dateRange);

  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: { dateRange },
  });

  console.log(form.formState.errors);
  function onSubmit({ dateRange }: z.infer<typeof FormSchema>) {
    console.log("hello world");
    setDateRange({
      from: dateRange.from,
      to: dateRange.to,
    });
  }

  const handleClick = (e: MouseEvent<HTMLButtonElement>) => {
    const { id } = e.currentTarget;
    if (!id) throw new Error("There is no id attached to the button");

    const dateRange = getDateRange(id as DATE_RANGE_TYPE);
    form.setValue("dateRange.from", dateRange.from);
    form.setValue("dateRange.to", dateRange.to);
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="dateRange"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Pick range date</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      id="date"
                      variant={"outline"}
                      className={cn(
                        "w-[300px] justify-start text-left font-normal",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      <CalendarIcon />
                      {field.value.from ? (
                        field.value.to ? (
                          <>
                            {format(field.value.from, "LLL dd, y")} -{" "}
                            {format(field.value.to, "LLL dd, y")}
                          </>
                        ) : (
                          format(field.value.from, "LLL dd, y")
                        )
                      ) : (
                        <span>Pick a date</span>
                      )}
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Button id={DATE_RANGE_TYPE.LAST_WEEK} onClick={handleClick}>
                    Last week
                  </Button>
                  <Button id={DATE_RANGE_TYPE.LAST_MONTH} onClick={handleClick}>
                    Last month
                  </Button>
                  <Button id={DATE_RANGE_TYPE.LAST_YEAR} onClick={handleClick}>
                    Last Year
                  </Button>
                  <Calendar
                    initialFocus
                    mode="range"
                    defaultMonth={field.value.from}
                    selected={field.value}
                    onSelect={field.onChange}
                    numberOfMonths={2}
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>Pick start and end date.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button type="submit" className="mt-5">
          Find!
        </Button>
      </form>
    </Form>
  );
}
