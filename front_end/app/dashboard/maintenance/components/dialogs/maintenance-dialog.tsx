"use client";

import { Maintenance } from "@/app/dashboard/maintenance/types/maintenance";
import { PartsSelector } from "../maintenance-form/parts-selector";
import { MaintenanceFormFields } from "../maintenance-form/maintenance-form";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";

interface MaintenanceDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  maintenance?: Maintenance | null;
  onSubmit: () => void;
  children: React.ReactNode;
}

export function MaintenanceDialog({
  open,
  onOpenChange,
  maintenance,
  onSubmit,
  children,
}: MaintenanceDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[700px]">
        <DialogHeader>
          <DialogTitle>
            {maintenance ? "Editar Registro de Manutenção" : "Adicionar nova Manutenção"}
          </DialogTitle>
          <DialogDescription>
            {maintenance
              ? "Atualize os detalhes do registro de manutenção abaixo."
              : "Preencha os detalhes para adicionar um novo registro de manutenção."}
          </DialogDescription>
        </DialogHeader>

        {children}

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Cancelar
          </Button>
          <Button type="submit" onClick={onSubmit}>
            {maintenance ? "Atualizar registro" : "Adicionar registro"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}