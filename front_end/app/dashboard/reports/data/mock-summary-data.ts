import { ReportSummary } from "../types/report-types";

export const summaryData: ReportSummary = {
  totalSpent: 15750.25,
  mostReplacedParts: [
    { 
      name: "Filter F100", 
      count: 24 
    },
    { 
      name: "Temperature Sensor TS50", 
      count: 12 
    },
    { 
      name: "Compressor A200", 
      count: 5 
    },
  ],
  averageRepairTime: 3.5,
  maintenanceByType: {
    preventive: 65,
    corrective: 28,
    emergency: 7,
  },
  maintenanceCostByStore: {
    "Downtown Supermarket": 6250.75,
    "Westside Grocery": 5320.5,
    "Harbor Fresh Market": 4179.0,
  },
  failureFrequency: {
    Jan: 4,
    Feb: 6,
    Mar: 3,
    Apr: 5,
    May: 7,
    Jun: 2,
  },
};