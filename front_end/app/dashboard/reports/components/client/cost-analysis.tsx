"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { summaryData } from "../../data/mock-summary-data";
import { BarChart3, LineChart } from "lucide-react";

export function CostAnalysis() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Custo de Manutenção por Loja</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <div className="h-full w-full overflow-x-auto">
            <div className="h-full min-w-[600px]">
              {/* Bar Chart Placeholder */}
              <div className="flex h-full items-center justify-center">
                <BarChart3 className="h-full w-full text-muted-foreground/50" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Repartição de Custos</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Peças</span>
                  <span className="text-sm">$9,450.75</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[60%] rounded-full bg-blue-500"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Trabalho</span>
                  <span className="text-sm">$5,125.50</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[32%] rounded-full bg-green-500"></div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm font-medium">Outros</span>
                  <span className="text-sm">$1,174.00</span>
                </div>
                <div className="h-2 w-full rounded-full bg-muted">
                  <div className="h-full w-[8%] rounded-full bg-yellow-500"></div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tendências de Custo</CardTitle>
          </CardHeader>
          <CardContent className="h-[200px]">
            <div className="h-full w-full overflow-x-auto">
              <div className="h-full min-w-[300px]">
                {/* Line Chart Placeholder */}
                <div className="flex h-full items-center justify-center">
                  <LineChart className="h-full w-full text-muted-foreground/50" />
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}