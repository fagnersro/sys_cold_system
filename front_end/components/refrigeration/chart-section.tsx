"use client"

import { useState } from "react"
import { ReportChart } from "../refrigeration/report-chart"
import { Button } from "@/components/ui/button"
import { RefreshCw } from "lucide-react"

export function ChartSection() {
  const [period, setPeriod] = useState<"week" | "month" | "year">("month")
  const [selectedEquipment, setSelectedEquipment] = useState("all")

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Peças Substituídas */}
      <section className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex flex-col space-y-1.5">
            <h2 className="text-xl font-semibold leading-none tracking-tight">Peças Substituídas</h2>
            <p className="text-sm text-muted-foreground">Histórico de substituições de componentes</p>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="rounded-md border border-input bg-background px-3 py-1 text-sm ring-offset-background"
              value={selectedEquipment}
              onChange={(e) => setSelectedEquipment(e.target.value)}
            >
              <option value="all">Todos os equipamentos</option>
              <option value="RF-001">RF-001</option>
              <option value="RF-002">RF-002</option>
              <option value="RF-003">RF-003</option>
            </select>
            <Button variant="outline" size="icon" title="Refresh data">
              <RefreshCw className="h-4 w-4" />
            </Button>
          </div>
        </div>
        <div className="p-6 pt-0">
          <ReportChart type="parts" period={period} equipment={selectedEquipment} />
        </div>
      </section>

      {/* Custos de Manutenção */}
      <section className="rounded-xl border bg-card text-card-foreground shadow">
        <div className="flex flex-wrap items-center justify-between gap-4 p-6">
          <div className="flex flex-col space-y-1.5">
            <h2 className="text-xl font-semibold leading-none tracking-tight">Custos de manutenção</h2>
            <p className="text-sm text-muted-foreground">Despesas Preventivas vs. Corretivas</p>
          </div>
          <div className="flex items-center gap-2">
            <Button variant={period === "week" ? "default" : "outline"} size="sm" onClick={() => setPeriod("week")}>
              Semana
            </Button>
            <Button variant={period === "month" ? "default" : "outline"} size="sm" onClick={() => setPeriod("month")}>
              Mês
            </Button>
            <Button variant={period === "year" ? "default" : "outline"} size="sm" onClick={() => setPeriod("year")}>
              Ano
            </Button>
          </div>
        </div>
        <div className="p-6 pt-0">
          <ReportChart type="costs" period={period} equipment={selectedEquipment} />
        </div>
      </section>
    </div>
  )
}
