"use client"

import { useSchedule } from "../hooks/use-schedule";
import { CalendarView } from "./calendar-view";
import { ListView } from "./list-view";

export function ViewSwitcher ()  {
  const { viewMode } = useSchedule();
  return (
    <>
      {viewMode === "calendar" && <CalendarView />}
      {viewMode === "list" && <ListView />}
    </>
  );
}