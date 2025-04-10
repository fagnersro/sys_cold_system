"use client";

import { Maintenance } from "@/app/dashboard/maintenance/types/maintenance";
import { equipmentData } from "@/app/dashboard/maintenance/data/mock-equipment";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Upload } from "lucide-react";

interface MaintenanceFormFieldsProps {
  maintenance?: Maintenance | null;
}

export function MaintenanceFormFields({ maintenance }: MaintenanceFormFieldsProps) {
  return (
    <div className="grid gap-4 py-4">
      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="type">Tipo de Manutenção</Label>
          <Select defaultValue={maintenance?.type || "Preventive"}>
            <SelectTrigger id="type">
              <SelectValue placeholder="Selecione o tipo" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Preventive">Preventivo</SelectItem>
              <SelectItem value="Corrective">Corretivo</SelectItem>
              <SelectItem value="Emergency">Emergência</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="equipment">Equipamento</Label>
          <Select defaultValue={maintenance?.equipmentId || ""}>
            <SelectTrigger id="equipment">
              <SelectValue placeholder="Selecione o equipamento" />
            </SelectTrigger>
            <SelectContent>
              {equipmentData.map((equipment) => (
                <SelectItem key={equipment.id} value={equipment.id}>
                  {equipment.id} - {equipment.model} ({equipment.storeName})
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="space-y-2">
          <Label htmlFor="date">Data de Manutenção</Label>
          <Input 
            id="date" 
            type="date" 
            defaultValue={maintenance?.date || ""} 
            required 
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="technician">Técnico (a)</Label>
          <Input
            id="technician"
            placeholder="Nome do técnico"
            defaultValue={maintenance?.technician || ""}
            required
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>
        <Select defaultValue={maintenance?.status || "Scheduled"}>
          <SelectTrigger id="status">
            <SelectValue placeholder="Selecione o status" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="Scheduled">Agendado</SelectItem>
            <SelectItem value="In Progress">Em Andamento</SelectItem>
            <SelectItem value="Completed">Concluído</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Descrição</Label>
        <Textarea
          id="description"
          placeholder="Descreva as atividades de manutenção..."
          className="min-h-[100px]"
          defaultValue={maintenance?.description || ""}
        />
      </div>

      <div className="space-y-2">
        <Label>Relatório Técnico</Label>
        <div className="flex items-center justify-center w-full">
          <label
            htmlFor="report-file"
            className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
          >
            <div className="flex flex-col items-center justify-center pt-5 pb-6">
              <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
              <p className="mb-2 text-sm text-muted-foreground">
                <span className="font-semibold">Clique para Carregar</span> ou arraste e solte
              </p>
              <p className="text-xs text-muted-foreground">PDF, JPG or PNG (MAX. 10MB)</p>
            </div>
            <input id="report-file" type="file" className="hidden" />
          </label>
        </div>
      </div>
    </div>
  );
}