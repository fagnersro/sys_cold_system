"use client";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MaintenanceSchedule } from "../../types/schedule-types";

type ConfirmationType = "delete" | "complete";

interface ConfirmationDialogProps {
  type: ConfirmationType;
  open: boolean;
  onOpenChange: (open: boolean) => void;
  schedule: MaintenanceSchedule | null;
}

export function ConfirmationDialog({
  type,
  open,
  onOpenChange,
  schedule
}: ConfirmationDialogProps) {
  const title = type === "delete" ? "Confirmar Exclusão" : "Confirmar Conclusão";
  const confirmText = type === "delete" ? "Excluir agendamento" : "Confirmar conclusão";
  const variant = type === "delete" ? "destructive" : "default";

  const description =
    type === "delete"
      ? `Tem certeza de que deseja excluir esta manutenção programada para ${schedule?.equipmentId}? Esta ação não pode ser desfeita.`
      : `Marcar esta tarefa de manutenção como concluída? Isso atualizará o histórico de manutenção do equipamento.`;

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>
        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button variant={variant} onClick={() => onOpenChange(false)}>
            {confirmText}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}