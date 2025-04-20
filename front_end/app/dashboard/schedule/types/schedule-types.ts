export type MaintenanceType = "Preventive" | "Corrective" | "Emergency";
export type PriorityLevel = "Critical" | "High" | "Medium" | "Low";
export type ScheduleStatus = "Scheduled" | "Completed" | "Cancelled";

export interface MaintenanceSchedule {
  id: string;
  equipmentId: string;
  type: MaintenanceType;
  date: string;
  time: string;
  technician: string;
  priority: PriorityLevel;
  status: ScheduleStatus;
  description: string;
}

export interface CalendarDay {
  day: number | null;
  date: Date | null;
  events: MaintenanceSchedule[];
}