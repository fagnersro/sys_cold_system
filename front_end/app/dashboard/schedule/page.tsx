"use client"


import { Suspense } from "react";
import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout";
import { ScheduleToolbar } from "./components/client/schedule-toolbar";
import { CalendarView } from "./components/client/calendar-view";
import { ListView } from "./components/client/list-view";
import { Skeleton } from "@/components/ui/skeleton";
import { useSchedule } from "./components/context/schedule-context";
import { ScheduleDialog } from "./components/client/schedule-dialog";

export default function SchedulePage() {
  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Cronograma de Manutenção</h1>
          <p className="text-muted-foreground">Planejar e gerenciar as próximas atividades de manutenção</p>
        </div>

        <Suspense fallback={<Skeleton className="h-12 w-full" />}>
          <ScheduleToolbar />
          <ScheduleDialog />
        </Suspense>

        <Suspense fallback={<Skeleton className="h-[600px] w-full" />}>
          <ViewSwitcher />
        </Suspense>
      </div>
    </RefrigerationDashboardLayout>
  );
}

function ViewSwitcher() {
  const { viewMode } = useSchedule();
  return (
    <>
      {viewMode === "calendar" && <CalendarView />}
      {viewMode === "list" && <ListView />}
    </>
  );
}