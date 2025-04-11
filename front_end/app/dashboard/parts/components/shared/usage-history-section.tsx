import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { BarChart3 } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { UsageHistory, Part, Equipment } from "@/app/dashboard/parts/types/inventory";

interface UsageHistorySectionProps {
  usageHistory: UsageHistory[];
  parts: Part[];
  equipment: Equipment[];
}

export function UsageHistorySection({ usageHistory, parts, equipment }: UsageHistorySectionProps) {
  if (usageHistory.length === 0) {
    return (
      <div className="rounded-xl border bg-card text-card-foreground shadow p-6 text-center">
        <p>Nenhum histórico de uso encontrado</p>
      </div>
    );
  }

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      <div className="flex items-center justify-between border-b px-6 py-4">
        <h2 className="text-lg font-semibold">Histórico de Uso Recente</h2>
        <Button variant="outline" size="sm" className="gap-2">
          <BarChart3 className="h-4 w-4" />
          <span>Visualizar Análises</span>
        </Button>
      </div>

      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Data</TableHead>
              <TableHead>Peça</TableHead>
              <TableHead>Equipamento</TableHead>
              <TableHead>Quantidade</TableHead>
              <TableHead>Técnico(a)</TableHead>
              <TableHead>Manutenção ID</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {usageHistory.map((usage) => {
              const part = parts.find((p) => p.id === usage.partId);
              const equipmentItem = equipment.find((e) => e.id === usage.equipmentId);

              return (
                <TableRow key={usage.id} className="hover:bg-muted/50">
                  <TableCell>{new Date(usage.date).toLocaleDateString()}</TableCell>
                  <TableCell>
                    <div>
                      <div className="font-medium">{part?.name}</div>
                      <div className="text-xs text-muted-foreground">{usage.partId}</div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div>
                      <div>{equipmentItem?.model}</div>
                      <div className="text-xs text-muted-foreground">{usage.equipmentId}</div>
                    </div>
                  </TableCell>
                  <TableCell>{usage.quantity}</TableCell>
                  <TableCell>{usage.technician}</TableCell>
                  <TableCell>
                    <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                      {usage.maintenanceId}
                    </a>
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}