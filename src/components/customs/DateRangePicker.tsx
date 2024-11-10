import React, { useEffect, useState } from "react"
import { Popover, PopoverContent, PopoverTrigger } from "../ui/popover"
import { cn } from "@/lib/utils"
import { addDays, format } from "date-fns"
import { DateRange } from "react-day-picker"
import { Button } from "../ui/button"
import { Calendar } from "../ui/calendar"
import { RiCalendarEventLine } from "react-icons/ri"
import { differenceInDays } from "date-fns"

interface DateRangePickerProps extends React.HTMLAttributes<HTMLDivElement> {
  selectedDate?: { from: Date; to: Date }
  onSelectDate?: (date: DateRange) => void | undefined
}

export const DateRangePicker: React.FC<DateRangePickerProps> = ({
  selectedDate,
  className,
  onSelectDate,
}) => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(),
    to: addDays(new Date(), 2),
  })

  let appliedSelectedAt = false

  useEffect(() => {
    if (selectedDate && !appliedSelectedAt) {
      setDate({ from: selectedDate.from, to: selectedDate.to })
      if (onSelectDate) {
        onSelectDate({ from: selectedDate.from, to: selectedDate.to })
      }
      appliedSelectedAt = true
    }
  }, [])

  const handleDateSelect = (date: DateRange | undefined) => {
    if (date?.from && date?.to) {
      const daysSelected = differenceInDays(date.to, date.from)
      if (daysSelected > 4) {
        console.log("Date range should not exceed 5 days")
        return
      }
    }
    setDate(date)
    if (onSelectDate) {
      onSelectDate(date!)
    }
  }

  return (
    <>
      <div className={cn("grid gap-2", className)}>
        <Popover>
          <PopoverTrigger asChild>
            <Button
              id="date"
              variant={"outline"}
              className={cn(
                "w-[300px] justify-start text-left font-normal",
                !date && "text-muted-foreground"
              )}>
              <RiCalendarEventLine className="mr-2" />
              {date?.from ? (
                date.to ? (
                  <>
                    {format(date.from, "LLL dd, y")} -{" "}
                    {format(date.to, "LLL dd, y")}
                  </>
                ) : (
                  format(date.from, "LLL dd, y")
                )
              ) : (
                <span>โปรดเลือกวันที่</span>
              )}
            </Button>
          </PopoverTrigger>
          <PopoverContent
            className="w-auto p-0"
            align="start">
            <Calendar
              initialFocus
              mode="range"
              defaultMonth={date?.from}
              selected={date}
              onSelect={handleDateSelect}
              numberOfMonths={2}
              disabled={{
                before: new Date(),
              }}
            />
          </PopoverContent>
        </Popover>
      </div>
    </>
  )
}
