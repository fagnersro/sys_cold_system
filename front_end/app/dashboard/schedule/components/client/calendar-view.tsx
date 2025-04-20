"use client";

import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { useCalendar } from "../hooks/use-calendar";
import { CalendarGrid } from "../shared/calendar-grid";

export function CalendarView() {
  const {
    currentMonth,
    currentYear,
    monthNames,
    calendarDays,
    prevMonth,
    nextMonth,
    viewMode,
    handleEdit
  } = useCalendar();


  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex items-center justify-between border-b p-4">
        <h2 className="text-lg font-semibold">
          {monthNames[currentMonth]} {currentYear}
        </h2>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={prevMonth}>
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={nextMonth}>
            <ChevronRight className="h-4 w-4" />
          </Button>
        </div>
      </div>

      <div className="p-4">
        <CalendarGrid 
          days={calendarDays} 
          onEventClick={handleEdit} 
        />
      </div>
    </div>
  );
}