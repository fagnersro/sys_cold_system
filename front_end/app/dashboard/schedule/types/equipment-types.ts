/**
 * Tipos relacionados a equipamentos de refrigeração
 */

/**
 * Status possíveis de um equipamento
 */
export type EquipmentStatus = 
  | 'operational' 
  | 'maintenance' 
  | 'out_of_service' 
  | 'decommissioned';

/**
 * Tipo de equipamento de refrigeração
 */
export type EquipmentType = 
  | 'refrigerator'
  | 'freezer'
  | 'cooling_system'
  | 'compressor'
  | 'condenser'
  | 'evaporator'
  | 'other';

/**
 * Representação de um equipamento no sistema
 */
export interface Equipment {
  /** ID único do equipamento (ex: RF-001) */
  id: string;
  
  /** Modelo do equipamento (ex: CoolMaster X500) */
  model: string;
  
  /** Tipo de equipamento */
  type: EquipmentType;
  
  /** ID da loja onde o equipamento está instalado */
  storeId: string;
  
  /** Nome da loja (para exibição) */
  storeName: string;
  
  /** Status atual do equipamento */
  status: EquipmentStatus;
  
  /** Data de instalação */
  installationDate: Date;
  
  /** Data da última manutenção */
  lastMaintenanceDate?: Date;
  
  /** Data de validade da garantia */
  warrantyExpiration?: Date;
  
  /** Fabricante do equipamento */
  manufacturer: string;
  
  /** Especificações técnicas */
  specifications: {
    /** Capacidade em BTU */
    capacityBTU?: number;
    
    /** Tensão elétrica (V) */
    voltage?: number;
    
    /** Corrente elétrica (A) */
    current?: number;
    
    /** Fluido refrigerante utilizado */
    refrigerantType?: string;
    
    /** Consumo energético (kWh/mês) */
    energyConsumption?: number;
  };
  
  /** Metadados adicionais */
  metadata?: {
    /** Número de série */
    serialNumber?: string;
    
    /** Código de barras/QR Code */
    barcode?: string;
    
    /** URL da foto do equipamento */
    photoUrl?: string;
    
    /** Notas adicionais */
    notes?: string;
  };
}

/**
 * Dados resumidos para exibição em listas
 */
export type EquipmentSummary = Pick<
  Equipment, 
  'id' | 'model' | 'storeId' | 'storeName' | 'status'
>;

/**
 * Histórico de manutenção do equipamento
 */
export interface MaintenanceHistory {
  /** ID do registro de manutenção */
  id: string;
  
  /** ID do equipamento */
  equipmentId: string;
  
  /** Tipo de manutenção */
  type: 'preventive' | 'corrective' | 'emergency';
  
  /** Data da manutenção */
  date: Date;
  
  /** Técnico responsável */
  technician: string;
  
  /** Descrição do serviço realizado */
  description: string;
  
  /** Peças substituídas */
  replacedParts?: Array<{
    partId: string;
    partName: string;
    quantity: number;
    unitCost: number;
  }>;
  
  /** Custo total da manutenção */
  totalCost: number;
  
  /** Próxima manutenção recomendada */
  nextMaintenanceDate?: Date;
  
  /** Status após manutenção */
  finalStatus: EquipmentStatus;
}

/**
 * Filtros para busca de equipamentos
 */
export interface EquipmentFilters {
  /** Filtro por status */
  status?: EquipmentStatus | EquipmentStatus[];
  
  /** Filtro por tipo */
  type?: EquipmentType | EquipmentType[];
  
  /** Filtro por loja */
  storeId?: string | string[];
  
  /** Filtro por fabricante */
  manufacturer?: string;
  
  /** Filtro por data de instalação */
  installationDateRange?: {
    from?: Date;
    to?: Date;
  };
  
  /** Filtro por garantia expirada */
  warrantyExpired?: boolean;
}