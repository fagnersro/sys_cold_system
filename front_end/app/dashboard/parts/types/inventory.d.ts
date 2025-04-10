export type Part = {
  id: string;
  name: string;
  category: string;
  stock: number;
  minLevel: number;
  price: number;
  compatibleWith: string[];
  lastRestocked: string;
  location: string;
};

export type Equipment = {
  id: string;
  model: string;
};

export type UsageHistory = {
  id: string;
  partId: string;
  equipmentId: string;
  quantity: number;
  date: string;
  technician: string;
  maintenanceId: string;
};