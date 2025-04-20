import { Equipment } from "../types/equipment-types";

/**
 * Dados mockados de equipamentos de refrigeração
 * 
 * Este mock simula uma base de equipamentos para desenvolvimento e testes
 */
export const equipmentData: Equipment[] = [
  {
    id: "RF-001",
    model: "CoolMaster X500",
    type: "refrigerator",
    storeId: "S001",
    storeName: "Downtown Supermarket",
    status: "operational",
    installationDate: new Date("2022-01-15"),
    lastMaintenanceDate: new Date("2023-06-20"),
    warrantyExpiration: new Date("2024-01-15"),
    manufacturer: "CoolTech",
    specifications: {
      capacityBTU: 18000,
      voltage: 220,
      current: 15,
      refrigerantType: "R-404A",
      energyConsumption: 350
    },
    metadata: {
      serialNumber: "CMX500-12345",
      barcode: "800123456789",
      notes: "Equipamento na área de laticínios"
    }
  },
  {
    id: "RF-002",
    model: "FrostKing 2000",
    type: "freezer",
    storeId: "S001",
    storeName: "Downtown Supermarket",
    status: "operational",
    installationDate: new Date("2021-11-10"),
    lastMaintenanceDate: new Date("2023-05-15"),
    warrantyExpiration: new Date("2023-11-10"),
    manufacturer: "FrostTech",
    specifications: {
      capacityBTU: 24000,
      voltage: 220,
      current: 20,
      refrigerantType: "R-507",
      energyConsumption: 420
    },
    metadata: {
      serialNumber: "FK2000-67890",
      barcode: "800987654321",
      notes: "Freezer horizontal para carnes"
    }
  },
  {
    id: "RF-003",
    model: "CoolMaster X700",
    type: "refrigerator",
    storeId: "S002",
    storeName: "Westside Grocery",
    status: "maintenance",
    installationDate: new Date("2022-03-22"),
    lastMaintenanceDate: new Date("2023-04-10"),
    warrantyExpiration: new Date("2024-03-22"),
    manufacturer: "CoolTech",
    specifications: {
      capacityBTU: 22000,
      voltage: 220,
      current: 18,
      refrigerantType: "R-404A",
      energyConsumption: 380
    },
    metadata: {
      serialNumber: "CMX700-45678",
      notes: "Em manutenção preventiva"
    }
  },
  {
    id: "RF-004",
    model: "ArcticPro 1500",
    type: "cooling_system",
    storeId: "S002",
    storeName: "Westside Grocery",
    status: "operational",
    installationDate: new Date("2023-01-05"),
    lastMaintenanceDate: new Date("2023-07-18"),
    warrantyExpiration: new Date("2025-01-05"),
    manufacturer: "ArcticCool",
    specifications: {
      capacityBTU: 30000,
      voltage: 380,
      current: 25,
      refrigerantType: "R-410A",
      energyConsumption: 550
    }
  },
  {
    id: "RF-005",
    model: "FrostKing 3000",
    type: "freezer",
    storeId: "S003",
    storeName: "Harbor Fresh Market",
    status: "out_of_service",
    installationDate: new Date("2020-08-30"),
    lastMaintenanceDate: new Date("2023-02-15"),
    manufacturer: "FrostTech",
    specifications: {
      capacityBTU: 28000,
      voltage: 220,
      current: 22,
      refrigerantType: "R-507",
      energyConsumption: 480
    },
    metadata: {
      serialNumber: "FK3000-13579",
      notes: "Aguardando peça para reparo - compressor danificado"
    }
  },
  {
    id: "RF-006",
    model: "CoolFlow C-200",
    type: "compressor",
    storeId: "S003",
    storeName: "Harbor Fresh Market",
    status: "operational",
    installationDate: new Date("2022-09-12"),
    lastMaintenanceDate: new Date("2023-08-01"),
    warrantyExpiration: new Date("2024-09-12"),
    manufacturer: "CoolTech",
    specifications: {
      capacityBTU: 25000,
      voltage: 220,
      current: 20,
      refrigerantType: "R-404A",
      energyConsumption: 400
    }
  },
  {
    id: "RF-007",
    model: "EcoFrost EF-100",
    type: "evaporator",
    storeId: "S001",
    storeName: "Downtown Supermarket",
    status: "operational",
    installationDate: new Date("2023-02-18"),
    manufacturer: "EcoCool Systems",
    specifications: {
      capacityBTU: 15000,
      voltage: 220,
      energyConsumption: 280
    }
  }
];

/**
 * Função auxiliar para buscar equipamento por ID
 */
export const getEquipmentById = (id: string): Equipment | undefined => {
  return equipmentData.find(equipment => equipment.id === id);
};

/**
 * Função para filtrar equipamentos por loja
 */
export const getEquipmentByStore = (storeId: string): Equipment[] => {
  return equipmentData.filter(equipment => equipment.storeId === storeId);
};

/**
 * Função para buscar equipamentos por status
 */
export const getEquipmentByStatus = (status: Equipment['status']): Equipment[] => {
  return equipmentData.filter(equipment => equipment.status === status);
};