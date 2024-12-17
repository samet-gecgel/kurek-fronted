"use client"

import * as React from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { DayPicker } from "react-day-picker"
import { cn } from "@/lib/utils"

export type CalendarProps = React.ComponentProps<typeof DayPicker>

function Calendar({
  className,
  classNames,
  showOutsideDays = true,
  ...props
}: CalendarProps) {
  return (
    <DayPicker
      showOutsideDays={showOutsideDays}
      className={cn("w-72 bg-zinc-900 text-white rounded-lg shadow-lg border border-zinc-800", className)}
      classNames={{
        months: "w-full",
        month: "w-full",
        caption: "flex justify-between items-center p-4",
        caption_label: "text-base font-medium text-white",
        nav: "flex items-center gap-1",
        nav_button: "hover:text-blue-500 p-2 rounded-full hover:bg-zinc-800 transition-colors",
        nav_button_previous: "",
        nav_button_next: "",
        table: "w-full border-collapse space-y-1",
        head_row: "grid grid-cols-7",
        head_cell: "text-zinc-400 font-normal text-sm text-center",
        row: "grid grid-cols-7",
        cell: "text-center text-sm p-0 relative",
        day: cn(
          "p-2 font-normal text-zinc-400 hover:bg-zinc-800 rounded-lg transition-colors",
          "flex items-center justify-center mx-auto",
          "aria-selected:bg-blue-600 aria-selected:text-white hover:aria-selected:bg-blue-700"
        ),
        day_today: "text-white",
        day_outside: "text-zinc-500 opacity-50",
        day_disabled: "text-zinc-500",
        day_hidden: "invisible",
        ...classNames,
      }}
      components={{
        IconLeft: ({ ...props }) => (
          <ChevronLeft className="w-4 h-4" {...props} />
        ),
        IconRight: ({ ...props }) => (
          <ChevronRight className="w-4 h-4" {...props} />
        ),
      }}
      {...props}
    />
  )
}
Calendar.displayName = "Calendar"

export { Calendar }
