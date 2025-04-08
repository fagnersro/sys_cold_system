"use client"

import { useState } from "react"
import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Loader2,
  FileText,
  Download,
  BarChart3,
  PieChart,
  LineChart,
  FileIcon as FilePdf,
  FileSpreadsheet,
  ImageIcon,
  DollarSign,
  Clock,
  Package,
  RefreshCw,
} from "lucide-react"

// Mock data for stores
const stores = [
  { id: "S001", name: "Downtown Supermarket" },
  { id: "S002", name: "Westside Grocery" },
  { id: "S003", name: "Harbor Fresh Market" },
]

// Mock data for summary metrics
const summaryData = {
  totalSpent: 15750.25,
  mostReplacedParts: [
    { name: "Filter F100", count: 24 },
    { name: "Temperature Sensor TS50", count: 12 },
    { name: "Compressor A200", count: 5 },
  ],
  averageRepairTime: 3.5, // in hours
  maintenanceByType: {
    preventive: 65,
    corrective: 28,
    emergency: 7,
  },
  maintenanceCostByStore: {
    "Downtown Supermarket": 6250.75,
    "Westside Grocery": 5320.5,
    "Harbor Fresh Market": 4179.0,
  },
  failureFrequency: {
    Jan: 4,
    Feb: 6,
    Mar: 3,
    Apr: 5,
    May: 7,
    Jun: 2,
  },
}

export default function ReportsPage() {
  const [isGenerating, setIsGenerating] = useState(false)
  const [selectedPeriod, setSelectedPeriod] = useState("month")
  const [selectedReportType, setSelectedReportType] = useState("maintenance")
  const [selectedStores, setSelectedStores] = useState<string[]>(stores.map((store) => store.id))

  // Handle report generation
  const handleGenerateReport = () => {
    setIsGenerating(true)

    // Simulate API call
    setTimeout(() => {
      setIsGenerating(false)
    }, 2000)
  }

  // Handle store selection
  const handleStoreToggle = (storeId: string) => {
    setSelectedStores((prev) => (prev.includes(storeId) ? prev.filter((id) => id !== storeId) : [...prev, storeId]))
  }

  // Handle export functions
  const handleExportPDF = () => {
    // In a real app, this would generate and download a PDF
    console.log("Exporting as PDF...")
  }

  const handleExportCSV = () => {
    // In a real app, this would generate and download a CSV
    console.log("Exporting as CSV...")
  }

  const handleExportPNG = () => {
    // In a real app, this would generate and download PNG images of charts
    console.log("Exporting as PNG...")
  }

  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Relatórios e Análises</h1>
          <p className="text-muted-foreground">Gere leratórios detalhados e annalise dados de manutenção</p>
        </div>

        {/* Report Creation Section */}
        <div className="grid gap-6 md:grid-cols-3">
          <Card className="md:col-span-1">
            <CardHeader>
              <CardTitle>Gerador de Relatórios</CardTitle>
              <CardDescription>Configurar e gerar relatórios personalizados</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="report-type">Tipo de relatório</Label>
                  <Select value={selectedReportType} onValueChange={setSelectedReportType}>
                    <SelectTrigger id="report-type">
                      <SelectValue placeholder="Select report type" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="maintenance">Relatório de Manutenção</SelectItem>
                      <SelectItem value="parts">Relatório de uso de Peças</SelectItem>
                      <SelectItem value="costs">Relatório de Análise de Custos</SelectItem>
                      <SelectItem value="equipment">Relatório de Status do Equipamento</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="period">Período de Tempo</Label>
                  <Select value={selectedPeriod} onValueChange={setSelectedPeriod}>
                    <SelectTrigger id="period">
                      <SelectValue placeholder="Selecione o período de tempo" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="week">Semana Passada</SelectItem>
                      <SelectItem value="month">Mês Passado</SelectItem>
                      <SelectItem value="quarter">Último Trimestre</SelectItem>
                      <SelectItem value="year">Ano Passado</SelectItem>
                      <SelectItem value="custom">Faixa Personalizada</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                {selectedPeriod === "custom" && (
                  <div className="grid grid-cols-2 gap-2">
                    <div className="space-y-2">
                      <Label htmlFor="start-date">Data de Início</Label>
                      <Input id="start-date" type="date" />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="end-date">Data de Término</Label>
                      <Input id="end-date" type="date" />
                    </div>
                  </div>
                )}

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="stores">
                    <AccordionTrigger className="text-sm font-medium">Selecionar Lojas</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-2">
                        {stores.map((store) => (
                          <div key={store.id} className="flex items-center space-x-2">
                            <Checkbox
                              id={`store-${store.id}`}
                              checked={selectedStores.includes(store.id)}
                              onCheckedChange={() => handleStoreToggle(store.id)}
                            />
                            <Label htmlFor={`store-${store.id}`} className="text-sm cursor-pointer">
                              {store.name}
                            </Label>
                          </div>
                        ))}
                      </div>
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="advanced">
                    <AccordionTrigger className="text-sm font-medium">Filtros Avançados</AccordionTrigger>
                    <AccordionContent>
                      <div className="space-y-3">
                        <div className="space-y-2">
                          <Label htmlFor="maintenance-type">Tipo de Manutênção</Label>
                          <Select defaultValue="all">
                            <SelectTrigger id="maintenance-type">
                              <SelectValue placeholder="Select type" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos os Tipos</SelectItem>
                              <SelectItem value="preventive">Preventivo</SelectItem>
                              <SelectItem value="corrective">Corretivo</SelectItem>
                              <SelectItem value="emergency">Emergência</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="space-y-2">
                          <Label htmlFor="technician">Tecnico (a)</Label>
                          <Select defaultValue="all">
                            <SelectTrigger id="technician">
                              <SelectValue placeholder="Select technician" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="all">Todos os Técnicos</SelectItem>
                              <SelectItem value="john">John Smith</SelectItem>
                              <SelectItem value="maria">Maria Garcia</SelectItem>
                              <SelectItem value="robert">Robert Chen</SelectItem>
                              <SelectItem value="sarah">Sarah Johnson</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="include-costs" />
                          <Label htmlFor="include-costs" className="text-sm">
                            Incluir análise de custos
                          </Label>
                        </div>

                        <div className="flex items-center space-x-2">
                          <Checkbox id="include-parts" />
                          <Label htmlFor="include-parts" className="text-sm">
                            Incluir detalhes das peças
                          </Label>
                        </div>
                      </div>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

                <Button onClick={handleGenerateReport} className="w-full" disabled={isGenerating}>
                  {isGenerating ? (
                    <>
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                      Gerando...
                    </>
                  ) : (
                    <>
                      <FileText className="mr-2 h-4 w-4" />
                      Gerar Relatório
                    </>
                  )}
                </Button>
              </div>
            </CardContent>
          </Card>

          <Card className="md:col-span-2">
            <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
              <div>
                <CardTitle>Painel de Análise</CardTitle>
                <CardDescription>Principais métricas e indicadores de desempenho</CardDescription>
              </div>
              <Button variant="outline" size="icon">
                <RefreshCw className="h-4 w-4" />
              </Button>
            </CardHeader>
            <CardContent>
              <Tabs defaultValue="overview">
                <TabsList className="mb-4">
                  <TabsTrigger value="overview">Visão Geral</TabsTrigger>
                  <TabsTrigger value="costs">Custos</TabsTrigger>
                  <TabsTrigger value="failures">Falhas</TabsTrigger>
                </TabsList>

                <TabsContent value="overview" className="space-y-4">
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

                  <Card>
                    <CardHeader>
                      <CardTitle>Distribuição do tipo de Manutênção</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[300px]">
                      <div className="h-full w-full overflow-x-auto">
                        <div className="h-full min-w-[400px]">
                          {/* Pie Chart */}
                          <div className="flex h-full items-center justify-center">
                            <div className="relative h-64 w-64">
                              <PieChart className="h-full w-full text-muted-foreground/50" />
                              <div className="absolute inset-0 flex flex-col items-center justify-center">
                                <div className="text-center">
                                  <div className="text-sm font-medium">Total</div>
                                  <div className="text-3xl font-bold">100</div>
                                  <div className="text-xs text-muted-foreground">Registro de manutênção</div>
                                </div>
                              </div>
                            </div>
                            <div className="ml-8 space-y-2">
                              <div className="flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-blue-500"></div>
                                <span className="text-sm">
                                  Preventivo ({summaryData.maintenanceByType.preventive}%)
                                </span>
                              </div>
                              <div className="flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-yellow-500"></div>
                                <span className="text-sm">
                                  Corretivo ({summaryData.maintenanceByType.corrective}%)
                                </span>
                              </div>
                              <div className="flex items-center">
                                <div className="mr-2 h-3 w-3 rounded-full bg-red-500"></div>
                                <span className="text-sm">Emergência ({summaryData.maintenanceByType.emergency}%)</span>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="costs" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Custo de Manutênção por Loja</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <div className="h-full w-full overflow-x-auto">
                        <div className="h-full min-w-[600px]">
                          {/* Bar Chart */}
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
                            {/* Line Chart */}
                            <div className="flex h-full items-center justify-center">
                              <LineChart className="h-full w-full text-muted-foreground/50" />
                            </div>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </TabsContent>

                <TabsContent value="failures" className="space-y-4">
                  <Card>
                    <CardHeader>
                      <CardTitle>Frequência de Falhas (Últimos 6 Meses)</CardTitle>
                    </CardHeader>
                    <CardContent className="h-[400px]">
                      <div className="h-full w-full overflow-x-auto">
                        <div className="h-full min-w-[600px]">
                          {/* Line Chart */}
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
                </TabsContent>
              </Tabs>
            </CardContent>
          </Card>
        </div>

        {/* Data Export Section */}
        <Card>
          <CardHeader>
            <CardTitle>Opções de Exportação</CardTitle>
            <CardDescription>Baixe os dados do relatório em vários formatos</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-4">
              <Button variant="outline" className="gap-2" onClick={handleExportPDF}>
                <FilePdf className="h-4 w-4" />
                <span>Exportar como PDF</span>
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleExportCSV}>
                <FileSpreadsheet className="h-4 w-4" />
                <span>Exportar como CSV</span>
              </Button>
              <Button variant="outline" className="gap-2" onClick={handleExportPNG}>
                <ImageIcon className="h-4 w-4" />
                <span>Exportar gráficos como PNG</span>
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Recent Reports Section */}
        <Card>
          <CardHeader>
            <CardTitle>Relatórios Recentes</CardTitle>
            <CardDescription>Relatórios gerados Anteriormente</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                {
                  title: "Monthly Maintenance Report",
                  date: "2023-05-01",
                  type: "maintenance",
                  stores: ["Downtown Supermarket", "Westside Grocery"],
                },
                {
                  title: "Q1 Cost Analysis",
                  date: "2023-04-15",
                  type: "costs",
                  stores: ["All Stores"],
                },
                {
                  title: "Parts Usage Report",
                  date: "2023-04-10",
                  type: "parts",
                  stores: ["Harbor Fresh Market"],
                },
              ].map((report, index) => (
                <div
                  key={index}
                  className="flex items-center justify-between rounded-lg border p-4 hover:bg-muted/50 transition-colors"
                >
                  <div>
                    <h3 className="font-medium">{report.title}</h3>
                    <p className="text-sm text-muted-foreground">
                      {new Date(report.date).toLocaleDateString()} • {report.type} • {report.stores.join(", ")}
                    </p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Button variant="ghost" size="icon">
                      <FileText className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon">
                      <Download className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </RefrigerationDashboardLayout>
  )
}

