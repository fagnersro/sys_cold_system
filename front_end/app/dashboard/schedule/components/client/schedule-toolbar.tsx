"use client";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Plus, CalendarDays, ListIcon } from "lucide-react";
import { useSchedule } from "../context/schedule-context";

export function ScheduleToolbar() {
  const {
    searchQuery,
    viewMode,
    handleSearchChange,
    setViewMode,
    handleAddNew
  } = useSchedule();

  return (
    <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
      <div className="relative flex-1 max-w-md">
        <div className="absolute inset-y-0 left-0 flex items-center pl-3">
          <Search className="h-4 w-4 text-muted-foreground" />
        </div>
        <Input
          type="search"
          placeholder="Pesquisar Horários..."
          className="pl-10"
          value={searchQuery}
          onChange={handleSearchChange}
        />
      </div>
      <div className="flex items-center gap-2">
        <div className="border rounded-md p-1">
          <Button
            variant={viewMode === "calendar" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("calendar")}
            className="px-3"
          >
            <CalendarDays className="h-4 w-4 mr-2" />
            Calendário
          </Button>
          <Button
            variant={viewMode === "list" ? "default" : "ghost"}
            size="sm"
            onClick={() => setViewMode("list")}
            className="px-3"
          >
            <ListIcon className="h-4 w-4 mr-2" />
            Lista
          </Button>
        </div>
        <Button onClick={handleAddNew} className="gap-2">
          <Plus className="h-4 w-4" />
          <span className="hidden sm:inline">Manutenção Programada</span>
        </Button>
      </div>
    </div>
  );
}