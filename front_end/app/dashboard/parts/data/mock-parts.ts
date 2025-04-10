import { Part, Equipment, UsageHistory } from "../types/inventory"

export const partsData: Part[] = [
  {
    id: "P001",
    name: "Compressor A200",
    category: "Compressor",
    stock: 5,
    minLevel: 3,
    price: 450.0,
    compatibleWith: ["RF-001", "RF-003"],
    lastRestocked: "2023-04-15",
    location: "Warehouse A, Shelf 3",
  },
  {
    id: "P002",
    name: "Filter F100",
    category: "Filter",
    stock: 12,
    minLevel: 10,
    price: 35.5,
    compatibleWith: ["RF-001", "RF-002", "RF-003", "RF-004", "RF-005"],
    lastRestocked: "2023-04-22",
    location: "Warehouse A, Shelf 1",
  },
  {
    id: "P003",
    name: "Condenser C300",
    category: "Condenser",
    stock: 2,
    minLevel: 2,
    price: 320.75,
    compatibleWith: ["RF-002", "RF-005"],
    lastRestocked: "2023-03-30",
    location: "Warehouse B, Shelf 4",
  },
  {
    id: "P004",
    name: "Fan Motor M150",
    category: "Motor",
    stock: 8,
    minLevel: 5,
    price: 125.0,
    compatibleWith: ["RF-001", "RF-003", "RF-004"],
    lastRestocked: "2023-04-10",
    location: "Warehouse A, Shelf 2",
  },
  {
    id: "P005",
    name: "Temperature Sensor TS50",
    category: "Sensor",
    stock: 15,
    minLevel: 8,
    price: 45.25,
    compatibleWith: ["RF-001", "RF-002", "RF-003", "RF-004", "RF-005"],
    lastRestocked: "2023-04-18",
    location: "Warehouse A, Shelf 1",
  },
  {
    id: "P006",
    name: "Control Board CB100",
    category: "Electronics",
    stock: 1,
    minLevel: 2,
    price: 275.5,
    compatibleWith: ["RF-002", "RF-005"],
    lastRestocked: "2023-03-25",
    location: "Warehouse B, Shelf 5",
  },
]

export const equipmentData: Equipment[] = [
  { 
    id: "RF-001", 
    model: "CoolMaster X500" 
  },
  { 
    id: "RF-002", 
    model: "FrostKing 2000" 
  },
  { 
    id: "RF-003", 
    model: "CoolMaster X700" 
  },
  { 
    id: "RF-004", 
    model: "ArcticPro 1500" 
  },
  { 
    id: "RF-005", 
    model: "FrostKing 3000" 
  },
]

export const usageHistoryData: UsageHistory[] = [
  {
    id: "U001",
    partId: "P002",
    equipmentId: "RF-001",
    quantity: 1,
    date: "2023-04-28",
    technician: "John Smith",
    maintenanceId: "M001",
  },
  {
    id: "U002",
    partId: "P005",
    equipmentId: "RF-001",
    quantity: 1,
    date: "2023-04-28",
    technician: "John Smith",
    maintenanceId: "M001",
  },
  {
    id: "U003",
    partId: "P001",
    equipmentId: "RF-005",
    quantity: 1,
    date: "2023-05-01",
    technician: "Maria Garcia",
    maintenanceId: "M002",
  },
  {
    id: "U004",
    partId: "P005",
    equipmentId: "RF-002",
    quantity: 1,
    date: "2023-05-03",
    technician: "Sarah Johnson",
    maintenanceId: "M004",
  },
  {
    id: "U005",
    partId: "P006",
    equipmentId: "RF-002",
    quantity: 1,
    date: "2023-05-03",
    technician: "Sarah Johnson",
    maintenanceId: "M004",
  },
]