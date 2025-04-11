import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout";
import { PartsTable } from "./components/client/parts-table";
import { partsData, equipmentData, usageHistoryData } from "./data/mock-parts";
import { UsageHistorySection } from "./components/shared/usage-history-section";

export default function InventoryPage() {
  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        {/* Título e descrição */}
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Inventário de Peças</h1>
          <p className="text-muted-foreground">Gerencie peças de reposição e acompanhe os níveis de estoque</p>
        </div>

        {/* Tabela (Client Component) */}
        <PartsTable 
          initialParts={partsData} 
          equipment={equipmentData} 
          usageHistory={usageHistoryData} 
        />

        <UsageHistorySection 
          usageHistory={usageHistoryData} 
          parts={partsData}
          equipment={equipmentData}
        />
      </div>
    </RefrigerationDashboardLayout>
  );
}