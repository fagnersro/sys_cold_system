"use client";

import { createContext, useContext, useState } from "react";
import { MaintenanceSchedule, PriorityLevel } from "../../types/schedule-types";
import { scheduleData } from "../../data/mock-schedules";

type ScheduleContextType = {
  searchQuery: string;
  viewMode: "calendar" | "list";
  selectedSchedule: MaintenanceSchedule | null;
  isDialogOpen: boolean;
  isDeleteDialogOpen: boolean;
  isConfirmDialogOpen: boolean;
  filteredSchedule: MaintenanceSchedule[];
  sortedSchedule: MaintenanceSchedule[];
  setViewMode: (mode: "calendar" | "list") => void;
  handleSearchChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAddNew: () => void;
  handleEdit: (schedule: MaintenanceSchedule) => void;
  handleDeleteConfirm: (schedule: MaintenanceSchedule) => void;
  handleCompletionConfirm: (schedule: MaintenanceSchedule) => void;
  setIsDialogOpen: (open: boolean) => void;
  setIsDeleteDialogOpen: (open: boolean) => void;
  setIsConfirmDialogOpen: (open: boolean) => void;
};

const ScheduleContext = createContext<ScheduleContextType | undefined>(undefined);

export function ScheduleProvider({ children }: { children: React.ReactNode }) {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar");
  const [selectedSchedule, setSelectedSchedule] = useState<MaintenanceSchedule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddNew = () => {
    console.log("Fui executada")
    setSelectedSchedule(null);
    setIsDialogOpen(true);
  };

  const handleEdit = (schedule: MaintenanceSchedule) => {
    setSelectedSchedule(schedule);
    setIsDialogOpen(true);
  };

  const handleDeleteConfirm = (schedule: MaintenanceSchedule) => {
    setSelectedSchedule(schedule);
    setIsDeleteDialogOpen(true);
  };

  const handleCompletionConfirm = (schedule: MaintenanceSchedule) => {
    setSelectedSchedule(schedule);
    setIsConfirmDialogOpen(true);
  };

  const filteredSchedule = scheduleData.filter(
    (schedule) =>
      schedule.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.equipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.technician.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchQuery.toLowerCase()),
  );

  const sortedSchedule = [...filteredSchedule].sort((a, b) => {
    const priorityOrder: Record<PriorityLevel, number> = { 
      Critical: 0, 
      High: 1, 
      Medium: 2, 
      Low: 3 
    };
    return priorityOrder[a.priority] - priorityOrder[b.priority];
  });

  return (
    <ScheduleContext.Provider
      value={{
        searchQuery,
        viewMode,
        selectedSchedule,
        isDialogOpen,
        isDeleteDialogOpen,
        isConfirmDialogOpen,
        filteredSchedule,
        sortedSchedule,
        setViewMode,
        handleSearchChange,
        handleAddNew,
        handleEdit,
        handleDeleteConfirm,
        handleCompletionConfirm,
        setIsDialogOpen,
        setIsDeleteDialogOpen,
        setIsConfirmDialogOpen
      }}
    >
      {children}
    </ScheduleContext.Provider>
  );
}

export function useSchedule() {
  const context = useContext(ScheduleContext);
  if (context === undefined) {
    throw new Error("useSchedule must be used within a ScheduleProvider");
  }
  return context;
}