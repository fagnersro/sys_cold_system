"use client";

import { useState } from "react";
import { scheduleData } from "../../data/mock-schedules";
import { MaintenanceSchedule, PriorityLevel } from "../../types/schedule-types";

export function useSchedule() {
  const [searchQuery, setSearchQuery] = useState("");
  const [viewMode, setViewMode] = useState<"calendar" | "list">("list");
  const [selectedSchedule, setSelectedSchedule] = useState<MaintenanceSchedule | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
  };

  const handleAddNew = () => {
    console.log("fui executada")
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

  return {
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
  };
}