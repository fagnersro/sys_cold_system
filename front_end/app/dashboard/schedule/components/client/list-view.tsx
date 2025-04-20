"use client";

import { Button } from "@/components/ui/button";
import { CheckCircle, Clock, Edit, Trash } from "lucide-react";
import { StatusBadge } from "@/components/refrigeration/status-badge";
import { useSchedule } from "../context/schedule-context";
import { ScheduleCard } from "../shared/shcedule-card";
import { ConfirmationDialog } from "./confirmation-dialog";
import { equipmentData } from "../../data/mock-equipment";

export function ListView() {
  const {
    sortedSchedule,
    selectedSchedule,
    isDeleteDialogOpen,
    isConfirmDialogOpen,
    handleEdit,
    handleDeleteConfirm,
    handleCompletionConfirm,
    setIsDeleteDialogOpen,
    setIsConfirmDialogOpen
  } = useSchedule();

  return (
    <>
      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="p-4 border-b">
          <h2 className="text-lg font-semibold">Próxima Manutenção</h2>
        </div>

        <div className="divide-y">
          {sortedSchedule.length > 0 ? (
            sortedSchedule.map((schedule) => {
              const equipment = equipmentData.find(e => e.id === schedule.equipmentId);
              
              return (
                <ScheduleCard 
                  key={schedule.id}
                  schedule={schedule}
                  equipment={equipment}
                  onEdit={handleEdit}
                  onDelete={handleDeleteConfirm}
                  onComplete={handleCompletionConfirm}
                />
              );
            })
          ) : (
            <div className="p-8 text-center text-muted-foreground">
              Nenhuma Manutenção Programada Encontrada.
            </div>
          )}
        </div>
      </div>

      <ConfirmationDialog
        type="delete"
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        schedule={selectedSchedule}
      />

      <ConfirmationDialog
        type="complete"
        open={isConfirmDialogOpen}
        onOpenChange={setIsConfirmDialogOpen}
        schedule={selectedSchedule}
      />
    </>
  );
}