"use client";

import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { summaryData } from "../../data/mock-summary-data";
import { LineChart } from "lucide-react";

export function FailureAnalysis() {
  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle>Frequência de Falhas (Últimos 6 Meses)</CardTitle>
        </CardHeader>
        <CardContent className="h-[400px]">
          <div className="h-full w-full overflow-x-auto">
            <div className="h-full min-w-[600px]">
              {/* Line Chart Placeholder */}
              <div className="flex h-full items-center justify-center">
                <LineChart className="h-full w-full text-muted-foreground/50" />
              </div>
            </div>
          </div>
        </CardContent>
      </Card>

      <div className="grid gap-4 md:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Pontos de Falha Comuns</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-red-500"></div>
                  <span className="text-sm">Falha do Compressor</span>
                </div>
                <span className="text-sm font-medium">32%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-yellow-500"></div>
                  <span className="text-sm">Controle de Temperatura</span>
                </div>
                <span className="text-sm font-medium">28%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-blue-500"></div>
                  <span className="text-sm">Vazamento de Refrigerante</span>
                </div>
                <span className="text-sm font-medium">18%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-green-500"></div>
                  <span className="text-sm">Motor do Ventilador</span>
                </div>
                <span className="text-sm font-medium">12%</span>
              </div>

              <div className="flex items-center justify-between">
                <div className="flex items-center">
                  <div className="mr-2 h-2 w-2 rounded-full bg-purple-500"></div>
                  <span className="text-sm">Outros</span>
                </div>
                <span className="text-sm font-medium">10%</span>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Tempo Médio Entre Falhas</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="rounded-lg bg-muted p-4">
                <div className="text-center">
                  <div className="text-3xl font-bold">78 dias</div>
                  <div className="text-sm text-muted-foreground">Média em todos os Equipamentos</div>
                </div>
              </div>

              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <span className="text-sm">CoolMaster X500</span>
                  <span className="text-sm font-medium">92 dias</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">FrostKing 2000</span>
                  <span className="text-sm font-medium">65 dias</span>
                </div>

                <div className="flex items-center justify-between">
                  <span className="text-sm">ArcticPro 1500</span>
                  <span className="text-sm font-medium">54 dias</span>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}