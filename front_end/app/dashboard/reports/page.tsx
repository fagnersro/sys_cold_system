import { ReportGenerator } from "./components/client/report-generator";
import { ReportDashboard } from "./components/client/report-dashboard";
import { ReportExporter } from "./components/client/report-exporter";
import { RecentReports } from "./components/shared/recent-reports";
import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout";
import { Card } from "@/components/ui/card";

export default async function ReportsPage() {
  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Relatórios e Análises</h1>
          <p className="text-muted-foreground">
            Gere relatórios detalhados e analise dados de manutenção
          </p>
        </div>

        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <ReportGenerator />
          </Card>
          
          <div className="md:col-span-2 space-y-6">
            <ReportDashboard />
            <ReportExporter />
            <RecentReports />
          </div>
        </div>
      </div>
    </RefrigerationDashboardLayout>
  );
}