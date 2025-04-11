export type ReportType = "maintenance" | "parts" | "costs" | "equipment";
export type TimePeriod = "week" | "month" | "quarter" | "year" | "custom";

export interface ReportSummary {
  totalSpent: number;
  mostReplacedParts: Array<{ name: string; count: number }>;
  averageRepairTime: number;
  maintenanceByType: {
    preventive: number;
    corrective: number;
    emergency: number;
  };
  maintenanceCostByStore: Record<string, number>;
  failureFrequency: Record<string, number>;
}

export interface RecentReport {
  title: string;
  date: string;
  type: ReportType;
  stores: string[];
}