"use client"

import { useState } from "react"
import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash, Upload, Filter, FileText } from "lucide-react"
import { StatusBadge } from "@/components/refrigeration/status-badge"

// Mock data for equipment
const equipmentData = [
  { id: "RF-001", model: "CoolMaster X500", storeId: "S001", storeName: "Downtown Supermarket" },
  { id: "RF-002", model: "FrostKing 2000", storeId: "S001", storeName: "Downtown Supermarket" },
  { id: "RF-003", model: "CoolMaster X700", storeId: "S002", storeName: "Westside Grocery" },
  { id: "RF-004", model: "ArcticPro 1500", storeId: "S002", storeName: "Westside Grocery" },
  { id: "RF-005", model: "FrostKing 3000", storeId: "S003", storeName: "Harbor Fresh Market" },
]

// Mock data for parts
const partsData = [
  { id: "P001", name: "Compressor A200", category: "Compressor", compatible: ["RF-001", "RF-003"] },
  {
    id: "P002",
    name: "Filter F100",
    category: "Filter",
    compatible: ["RF-001", "RF-002", "RF-003", "RF-004", "RF-005"],
  },
  { id: "P003", name: "Condenser C300", category: "Condenser", compatible: ["RF-002", "RF-005"] },
  { id: "P004", name: "Fan Motor M150", category: "Motor", compatible: ["RF-001", "RF-003", "RF-004"] },
  {
    id: "P005",
    name: "Temperature Sensor TS50",
    category: "Sensor",
    compatible: ["RF-001", "RF-002", "RF-003", "RF-004", "RF-005"],
  },
  { id: "P006", name: "Control Board CB100", category: "Electronics", compatible: ["RF-002", "RF-005"] },
]

// Mock data for maintenance records
const maintenanceData = [
  {
    id: "M001",
    equipmentId: "RF-001",
    type: "Preventive",
    date: "2023-04-28",
    technician: "John Smith",
    status: "Completed",
    description: "Regular maintenance, replaced filters",
    parts: ["P002", "P005"],
    reportUrl: "#",
  },
  {
    id: "M002",
    equipmentId: "RF-005",
    type: "Corrective",
    date: "2023-05-01",
    technician: "Maria Garcia",
    status: "In Progress",
    description: "Compressor issues, ordered replacement parts",
    parts: ["P001"],
    reportUrl: "#",
  },
  {
    id: "M003",
    equipmentId: "RF-003",
    type: "Preventive",
    date: "2023-05-02",
    technician: "Robert Chen",
    status: "Scheduled",
    description: "Annual certification and inspection",
    parts: [],
    reportUrl: "#",
  },
  {
    id: "M004",
    equipmentId: "RF-002",
    type: "Emergency",
    date: "2023-05-03",
    technician: "Sarah Johnson",
    status: "Completed",
    description: "Fixed temperature control system failure",
    parts: ["P005", "P006"],
    reportUrl: "#",
  },
  {
    id: "M005",
    equipmentId: "RF-004",
    type: "Preventive",
    date: "2023-05-05",
    technician: "David Kim",
    status: "Scheduled",
    description: "Quarterly maintenance check",
    parts: ["P002"],
    reportUrl: "#",
  },
]

export default function MaintenancePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedMaintenance, setSelectedMaintenance] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")
  const [selectedParts, setSelectedParts] = useState<string[]>([])

  // Filter maintenance records by search query and type
  const filteredMaintenance = maintenanceData.filter((maintenance) => {
    const matchesSearch =
      maintenance.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintenance.equipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      maintenance.technician.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesType = activeTab === "all" || maintenance.type.toLowerCase() === activeTab.toLowerCase()

    return matchesSearch && matchesType
  })

  // Handle form open for new maintenance
  const handleAddNew = () => {
    setSelectedMaintenance(null)
    setSelectedParts([])
    setIsDialogOpen(true)
  }

  // Handle form open for editing
  const handleEdit = (maintenance: any) => {
    setSelectedMaintenance(maintenance)
    setSelectedParts(maintenance.parts)
    setIsDialogOpen(true)
  }

  // Handle delete confirmation
  const handleDeleteConfirm = (maintenance: any) => {
    setSelectedMaintenance(maintenance)
    setIsDeleteDialogOpen(true)
  }

  // Handle part selection
  const handlePartToggle = (partId: string) => {
    setSelectedParts((prev) => (prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]))
  }

  // Get equipment details
  const getEquipmentDetails = (equipmentId: string) => {
    return equipmentData.find((equipment) => equipment.id === equipmentId) || null
  }

  // Get part details
  const getPartDetails = (partId: string) => {
    return partsData.find((part) => part.id === partId) || null
  }

  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Manutenção</h1>
          <p className="text-muted-foreground">Rastreie e gerencie atividades de manutenção para todos os equipamentos</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Pesquise por ID, equipamento ou técnico..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Adicionar Manutenção</span>
            </Button>
          </div>
        </div>

        {/* Maintenance Tabs and Table */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between border-b px-4 py-2">
              <TabsList>
                <TabsTrigger value="all">Todos</TabsTrigger>
                <TabsTrigger value="preventive">Preventivo</TabsTrigger>
                <TabsTrigger value="corrective">Corretivo</TabsTrigger>
                <TabsTrigger value="emergency">Emergência</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Técnico (a)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaintenance.length > 0 ? (
                      filteredMaintenance.map((maintenance) => {
                        const equipment = getEquipmentDetails(maintenance.equipmentId)

                        return (
                          <TableRow key={maintenance.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{maintenance.id}</TableCell>
                            <TableCell>
                              <div>
                                <div>{maintenance.equipmentId}</div>
                                <div className="text-xs text-muted-foreground">
                                  {equipment?.model} ({equipment?.storeName})
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge type={maintenance.type as any} />
                            </TableCell>
                            <TableCell>{new Date(maintenance.date).toLocaleDateString()}</TableCell>
                            <TableCell>{maintenance.technician}</TableCell>
                            <TableCell>
                              <StatusBadge status={maintenance.status as any} />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" title="View Report">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                  onClick={() => handleEdit(maintenance)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                  onClick={() => handleDeleteConfirm(maintenance)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Nenhum registro de manutenção encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="preventive" className="m-0">
              {/* Same table structure as "all" tab */}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Técnico (a)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaintenance.length > 0 ? (
                      filteredMaintenance.map((maintenance) => {
                        const equipment = getEquipmentDetails(maintenance.equipmentId)

                        return (
                          <TableRow key={maintenance.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{maintenance.id}</TableCell>
                            <TableCell>
                              <div>
                                <div>{maintenance.equipmentId}</div>
                                <div className="text-xs text-muted-foreground">
                                  {equipment?.model} ({equipment?.storeName})
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge type={maintenance.type as any} />
                            </TableCell>
                            <TableCell>{new Date(maintenance.date).toLocaleDateString()}</TableCell>
                            <TableCell>{maintenance.technician}</TableCell>
                            <TableCell>
                              <StatusBadge status={maintenance.status as any} />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" title="View Report">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                  onClick={() => handleEdit(maintenance)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                  onClick={() => handleDeleteConfirm(maintenance)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Nenhum registro de manutenção encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="corrective" className="m-0">
              {/* Same table structure as "all" tab */}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Técnico (a)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaintenance.length > 0 ? (
                      filteredMaintenance.map((maintenance) => {
                        const equipment = getEquipmentDetails(maintenance.equipmentId)

                        return (
                          <TableRow key={maintenance.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{maintenance.id}</TableCell>
                            <TableCell>
                              <div>
                                <div>{maintenance.equipmentId}</div>
                                <div className="text-xs text-muted-foreground">
                                  {equipment?.model} ({equipment?.storeName})
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge type={maintenance.type as any} />
                            </TableCell>
                            <TableCell>{new Date(maintenance.date).toLocaleDateString()}</TableCell>
                            <TableCell>{maintenance.technician}</TableCell>
                            <TableCell>
                              <StatusBadge status={maintenance.status as any} />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" title="View Report">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                  onClick={() => handleEdit(maintenance)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                  onClick={() => handleDeleteConfirm(maintenance)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Nenhum registro de manutenção encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            <TabsContent value="emergency" className="m-0">
              {/* Same table structure as "all" tab */}

              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Equipamento</TableHead>
                      <TableHead>Tipo</TableHead>
                      <TableHead>Data</TableHead>
                      <TableHead>Técnico (a)</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredMaintenance.length > 0 ? (
                      filteredMaintenance.map((maintenance) => {
                        const equipment = getEquipmentDetails(maintenance.equipmentId)

                        return (
                          <TableRow key={maintenance.id} className="hover:bg-muted/50">
                            <TableCell className="font-medium">{maintenance.id}</TableCell>
                            <TableCell>
                              <div>
                                <div>{maintenance.equipmentId}</div>
                                <div className="text-xs text-muted-foreground">
                                  {equipment?.model} ({equipment?.storeName})
                                </div>
                              </div>
                            </TableCell>
                            <TableCell>
                              <StatusBadge type={maintenance.type as any} />
                            </TableCell>
                            <TableCell>{new Date(maintenance.date).toLocaleDateString()}</TableCell>
                            <TableCell>{maintenance.technician}</TableCell>
                            <TableCell>
                              <StatusBadge status={maintenance.status as any} />
                            </TableCell>
                            <TableCell className="text-right">
                              <div className="flex items-center justify-end gap-2">
                                <Button variant="ghost" size="icon" title="View Report">
                                  <FileText className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Edit"
                                  onClick={() => handleEdit(maintenance)}
                                >
                                  <Edit className="h-4 w-4" />
                                </Button>
                                <Button
                                  variant="ghost"
                                  size="icon"
                                  title="Delete"
                                  onClick={() => handleDeleteConfirm(maintenance)}
                                >
                                  <Trash className="h-4 w-4" />
                                </Button>
                              </div>
                            </TableCell>
                          </TableRow>
                        )
                      })
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          Nenhum registro de manutenção encontrado.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </div>

      {/* Add/Edit Maintenance Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[700px]">
          <DialogHeader>
            <DialogTitle>{selectedMaintenance ? "Editar Registro de Manutenção" : "Adicionar nova Manutenção"}</DialogTitle>
            <DialogDescription>
              {selectedMaintenance
                ? "Atualize os detalhes do registro de manutenção abaixo."
                : "Preencha os detalhes para adicionar um novo registro de manutenção."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Manutenção</Label>
                <Select defaultValue={selectedMaintenance?.type || "Preventive"}>
                  <SelectTrigger id="type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Preventive">Preventivo</SelectItem>
                    <SelectItem value="Corrective">Corretivo</SelectItem>
                    <SelectItem value="Emergency">Emergência</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label htmlFor="equipment">Equipamento</Label>
                <Select defaultValue={selectedMaintenance?.equipmentId || ""}>
                  <SelectTrigger id="equipment">
                    <SelectValue placeholder="Select equipment" />
                  </SelectTrigger>
                  <SelectContent>
                    {equipmentData.map((equipment) => (
                      <SelectItem key={equipment.id} value={equipment.id}>
                        {equipment.id} - {equipment.model} ({equipment.storeName})
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data de Manutenção</Label>
                <Input id="date" type="date" defaultValue={selectedMaintenance?.date || ""} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="technician">Técnico (a)</Label>
                <Input
                  id="technician"
                  placeholder="Technician name"
                  defaultValue={selectedMaintenance?.technician || ""}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="status">Status</Label>
              <Select defaultValue={selectedMaintenance?.status || "Scheduled"}>
                <SelectTrigger id="status">
                  <SelectValue placeholder="Select status" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Scheduled">Agendado</SelectItem>
                  <SelectItem value="In Progress">Em Andamento</SelectItem>
                  <SelectItem value="Completed">Concluído</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva as atividades de manutenção..."
                className="min-h-[100px]"
                defaultValue={selectedMaintenance?.description || ""}
              />
            </div>

            <div className="space-y-2">
              <Label>Peças Substituídas</Label>
              <div className="max-h-[200px] overflow-y-auto rounded-md border p-4">
                {partsData.map((part) => (
                  <div key={part.id} className="flex items-center space-x-2 py-2">
                    <Checkbox
                      id={`part-${part.id}`}
                      checked={selectedParts.includes(part.id)}
                      onCheckedChange={() => handlePartToggle(part.id)}
                    />
                    <Label
                      htmlFor={`part-${part.id}`}
                      className="flex flex-1 items-center justify-between cursor-pointer"
                    >
                      <span>{part.name}</span>
                      <span className="text-xs text-muted-foreground">{part.category}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Relatório Técnico</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="report-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Clique para Carregar</span> ou arraste e solte
                    </p>
                    <p className="text-xs text-muted-foreground">PDF, JPG or PNG (MAX. 10MB)</p>
                  </div>
                  <input id="report-file" type="file" className="hidden" />
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">{selectedMaintenance ? "Atualizar registro" : "Adicionar registro"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja excluir o registro de manutenção? {selectedMaintenance?.id}? Esta ação não pode ser
              desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Excluir registro
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RefrigerationDashboardLayout>
  )
}

