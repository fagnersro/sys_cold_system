"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Edit, Trash } from "lucide-react";
import { StatusBadge } from "@/components/refrigeration/status-badge";
import { MaintenanceSchedule } from "../../types/schedule-types";
import { Equipment } from "../../types/equipment-types";

interface ScheduleCardProps {
  schedule: MaintenanceSchedule;
  equipment?: Equipment;
  onEdit: (schedule: MaintenanceSchedule) => void;
  onDelete: (schedule: MaintenanceSchedule) => void;
  onComplete: (schedule: MaintenanceSchedule) => void;
}

export function ScheduleCard({
  schedule,
  equipment,
  onEdit,
  onDelete,
  onComplete
}: ScheduleCardProps) {
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
      case "High":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400";
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300";
    }
  };

  return (
    <div className="p-4 hover:bg-muted/50 transition-colors">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-1">
            <h3 className="font-medium">{schedule.equipmentId}</h3>
            <div
              className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityClass(schedule.priority)}`}
            >
              {schedule.priority}
            </div>
            <StatusBadge type={schedule.type} />
          </div>
          <p className="text-sm text-muted-foreground mb-1">
            {equipment?.model} ({equipment?.storeName})
          </p>
          <p className="text-sm mb-2">{schedule.description}</p>
          <div className="flex items-center gap-4 text-xs text-muted-foreground">
            <div className="flex items-center gap-1">
              <span>{new Date(schedule.date).toLocaleDateString("pt-BR", {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit',
              })}</span>
            </div>
            <div className="flex items-center gap-1">
              <span>{schedule.time}</span>
            </div>
            <div>Técnico(a): {schedule.technician}</div>
          </div>
        </div>
        <div className="flex items-center gap-2">
          {schedule.status !== "Completed" && (
            <Button
              variant="outline"
              size="sm"
              className="gap-1"
              onClick={() => onComplete(schedule)}
            >
              <CheckCircle className="h-4 w-4" />
              <span>Completo</span>
            </Button>
          )}
          <Button variant="ghost" size="icon" onClick={() => onEdit(schedule)}>
            <Edit className="h-4 w-4" />
          </Button>
          <Button variant="ghost" size="icon" onClick={() => onDelete(schedule)}>
            <Trash className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </div>
  );
}