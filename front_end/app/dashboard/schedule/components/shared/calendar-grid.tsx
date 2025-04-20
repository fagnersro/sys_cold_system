"use client";

import { CalendarDay } from "../../types/schedule-types";
import { Button } from "@/components/ui/button";

interface CalendarGridProps {
  days: CalendarDay[];
  onEventClick: (event: any) => void;
}

export function CalendarGrid({ days, onEventClick }: CalendarGridProps) {
  const today = new Date();

  return (
    <div className="grid grid-cols-7 gap-1">
      {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
        <div key={index} className="text-center font-medium text-sm py-2">
          {day}
        </div>
      ))}

      {days.map((day, index) => (
        <div
          key={index}
          className={`min-h-[100px] border rounded-md p-1 ${
            !day.day
              ? "bg-muted/20"
              : day.date?.toDateString() === today.toDateString()
                ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                : ""
          }`}
        >
          {day.day && (
            <>
              <div className="text-right text-sm font-medium p-1">{day.day}</div>
              <div className="space-y-1">
                {day.events.map((event, eventIndex) => (
                  <Button
                    key={eventIndex}
                    variant="ghost"
                    className={`w-full h-auto p-1 justify-start text-xs rounded truncate ${
                      event.type === "Preventive"
                        ? "bg-blue-100 text-blue-700 hover:bg-blue-200 dark:bg-blue-900/30 dark:text-blue-400"
                        : event.type === "Corrective"
                          ? "bg-orange-100 text-orange-700 hover:bg-orange-200 dark:bg-orange-900/30 dark:text-orange-400"
                          : "bg-red-100 text-red-700 hover:bg-red-200 dark:bg-red-900/30 dark:text-red-400"
                    }`}
                    onClick={() => onEventClick(event)}
                  >
                    {event.time} - {event.equipmentId}
                  </Button>
                ))}
              </div>
            </>
          )}
        </div>
      ))}
    </div>
  );
}