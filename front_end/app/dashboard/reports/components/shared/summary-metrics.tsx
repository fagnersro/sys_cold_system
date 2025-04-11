import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { summaryData } from "../../data/mock-summary-data";
import { DollarSign, Package, Clock, PieChart } from "lucide-react";

export function SummaryMetrics() {
  return (
    <div className="grid gap-4 md:grid-cols-3">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Total gasto</CardTitle>
          <DollarSign className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">${summaryData.totalSpent.toLocaleString()}</div>
          <p className="text-xs text-muted-foreground">Para o período selecionado</p>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Peças mais substituídas</CardTitle>
          <Package className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="space-y-2">
            {summaryData.mostReplacedParts.map((part, index) => (
              <div key={index} className="flex items-center justify-between">
                <span className="text-sm">{part.name}</span>
                <span className="text-sm font-medium">{part.count}</span>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
          <CardTitle className="text-sm font-medium">Tempo médio de reparo</CardTitle>
          <Clock className="h-4 w-4 text-muted-foreground" />
        </CardHeader>
        <CardContent>
          <div className="text-2xl font-bold">{summaryData.averageRepairTime} horas</div>
          <p className="text-xs text-muted-foreground">Do relatório à conclusão</p>
        </CardContent>
      </Card>
    </div>
  );
}