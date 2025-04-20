import { z } from "zod";
import { MaintenanceType, PriorityLevel } from "@/app/dashboard/schedule/types/schedule-types";

// Schema base para agendamento
export const scheduleSchema = z.object({
  equipmentId: z.string().min(1, "Selecione um equipamento"),
  type: z.enum(["Preventive", "Corrective", "Emergency"] as [MaintenanceType, MaintenanceType, MaintenanceType]),
  date: z.string().min(1, "Data é obrigatória"),
  time: z.string().min(1, "Horário é obrigatório"),
  technician: z.string()
    .min(3, "Técnico deve ter pelo menos 3 caracteres")
    .max(50, "Técnico deve ter no máximo 50 caracteres"),
  priority: z.enum(["Critical", "High", "Medium", "Low"] as [PriorityLevel, PriorityLevel, PriorityLevel, PriorityLevel]),
  description: z.string()
    .min(10, "Descrição deve ter pelo menos 10 caracteres")
    .max(500, "Descrição deve ter no máximo 500 caracteres"),
  notify: z.boolean().optional()
});

// Tipo inferido do schema
export type ScheduleFormData = z.infer<typeof scheduleSchema>;