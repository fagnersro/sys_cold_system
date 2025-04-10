export type Maintenance = {
  id: string;
  equipmentId: string;
  type: "Preventive" | "Corrective" | "Emergency";
  date: string;
  technician: string;
  status: "Scheduled" | "In Progress" | "Completed";
  description: string;
  parts: string[];
  reportUrl: string;
};

export type Part = {
  id: string;
  name: string;
  category: string;
  compatible: string[];
};