import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout"
import { StatusCard } from "@/components/refrigeration/status-card"
import { MaintenanceTable } from "@/components/refrigeration/maintenance-table"
import { ChartSection } from "@/components/refrigeration/chart-section"
import {
  Snowflake,
  AlertTriangle,
  PenToolIcon as Tool,
  DollarSign,
  Calendar,
} from "lucide-react"

import { StatusBadge } from "@/components/refrigeration/status-badge"

export default async function RefrigerationDashboardPage() {
  const equipmentList = [
    { id: "RF-001", name: "Cold Storage A", temp: "-18°C", health: 90, status: "Operational" },
    { id: "RF-002", name: "Freezer Unit B", temp: "-22°C", health: 78, status: "Operational" },
    { id: "RF-003", name: "Display Case C", temp: "2°C", health: 65, status: "Maintenance Required" },
    { id: "RF-004", name: "Walk-in Cooler D", temp: "4°C", health: 88, status: "Operational" },
    { id: "RF-005", name: "Processing Room E", temp: "-5°C", health: 45, status: "Critical Alert" },
    { id: "RF-006", name: "Transport Unit F", temp: "-15°C", health: 81, status: "Operational" },
  ]

  const upcomingMaintenance = [
    { id: "RF-002", type: "Preventiva", date: "2023-05-15", tech: "John Smith", task: "Filter Replacement" },
    { id: "RF-005", type: "Corretiva", date: "2023-05-12", tech: "Maria Garcia", task: "Compressor Repair" },
    { id: "RF-003", type: "Inspeção", date: "2023-05-18", tech: "Robert Chen", task: "Annual Certification" },
    { id: "RF-001", type: "Preventiva", date: "2023-05-22", tech: "Sarah Johnson", task: "Coolant Refill" },
  ]

  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Painel de Refrigeração</h1>
          <p className="text-muted-foreground">Monitore e gerencie seu equipamento de refrigeração com eficiência</p>
        </div>

        {/* Status Cards */}
        <section className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          <StatusCard
            title="Equipamento Ativo"
            value="42"
            description="3 unidades em manutenção"
            icon={<Snowflake className="h-5 w-5" />}
            color="blue"
            percentage={87}
          />
          <StatusCard
            title="Manutenção Pendente"
            value="7"
            description="2 alertas críticos"
            icon={<AlertTriangle className="h-5 w-5" />}
            color="red"
            percentage={15}
          />
          <StatusCard
            title="Peças em Estoque"
            value="156"
            description="12 itens abaixo do limite"
            icon={<Tool className="h-5 w-5" />}
            color="green"
            percentage={68}
          />
          <StatusCard
            title="Custo mensal"
            value="$12,450"
            description="18% abaixo do orçamento"
            icon={<DollarSign className="h-5 w-5" />}
            color="purple"
            percentage={82}
          />
        </section>

        {/* Maintenance History */}
        <section className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-xl font-semibold leading-none tracking-tight">Histórico de Manutenção</h2>
            <p className="text-sm text-muted-foreground">Registros de serviços recentes e manutenção programada</p>
          </div>
          <MaintenanceTable />
        </section>

        {/* Charts Interativos */}
        <ChartSection />

        {/* Equipment Health */}
        <section className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-xl font-semibold leading-none tracking-tight">Visão Geral da Saúde do Equipamento</h2>
            <p className="text-sm text-muted-foreground">Situação atual dos sistemas de refrigeração críticos</p>
          </div>
          <div className="p-6 pt-0">
            <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {equipmentList.map((equipment) => (
                <div key={equipment.id} className="rounded-lg border bg-background p-4 transition-all hover:shadow-md">
                  <div className="mb-2 flex items-center justify-between">
                    <div className="font-medium">{equipment.name}</div>
                    <div className="text-xs font-medium text-muted-foreground">{equipment.id}</div>
                  </div>
                  <div className="mb-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Snowflake className="h-4 w-4 text-blue-500" />
                      <span className="text-sm font-medium">{equipment.temp}</span>
                    </div>

                    <StatusBadge statusEquipment={equipment.status}/>
                  
                  </div>
                  <div className="space-y-1">
                    <div className="flex items-center justify-between text-xs">
                      <span>Saúde</span>
                      <span className="font-medium">{equipment.health}%</span>
                    </div>
                    <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
                      <div
                        className={`h-full rounded-full ${
                          equipment.health > 80
                            ? "bg-green-500"
                            : equipment.health > 60
                            ? "bg-yellow-500"
                            : "bg-red-500"
                        }`}
                        style={{ width: `${equipment.health}%` }}
                      />
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Upcoming Maintenance */}
        <section className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex flex-col space-y-1.5 p-6">
            <h2 className="text-xl font-semibold leading-none tracking-tight">Próxima Manutenção</h2>
            <p className="text-sm text-muted-foreground">Serviço e inspeções programadas</p>
          </div>
          <div className="p-6 pt-0 space-y-4">
            {upcomingMaintenance.map((item, i) => (
              <div key={i} className="flex items-start gap-4">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                  <Calendar className="h-5 w-5" />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex flex-wrap items-center justify-between gap-2">
                    <p className="font-medium">{item.task}</p>
                    <div
                      className={`rounded-full px-2 py-1 text-xs font-medium ${
                        item.type === "Preventiva"
                          ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          : item.type === "Corretiva"
                          ? "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                          : "bg-purple-100 text-purple-700 dark:bg-purple-900/30 dark:text-purple-400"
                      }`}
                    >
                      {item.type}
                    </div>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    Equipamento: <span className="font-medium">{item.id}</span> • Técnico(a):{" "}
                    <span className="font-medium">{item.tech}</span>
                  </p>
                  <p className="text-sm font-medium text-primary">
                    {new Date(item.date).toLocaleDateString("pt-BR", {
                      weekday: "long",
                      month: "short",
                      day: "numeric",
                    })}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </RefrigerationDashboardLayout>
  )
}
