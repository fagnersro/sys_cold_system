"use client"

import { useState } from "react"
import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash, Eye, Upload, Filter } from "lucide-react"
import { StatusBadge } from "@/components/refrigeration/status-badge"

// Mock data for stores
const stores = [
  { id: "S001", name: "Downtown Supermarket" },
  { id: "S002", name: "Westside Grocery" },
  { id: "S003", name: "Harbor Fresh Market" },
]

// Mock data for equipment
const equipmentData = [
  {
    id: "RF-001",
    model: "CoolMaster X500",
    serialNumber: "CM-X500-12345",
    storeId: "S001",
    status: "Operational",
    installationDate: "2022-03-15",
    lastMaintenance: "2023-04-28",
  },
  {
    id: "RF-002",
    model: "FrostKing 2000",
    serialNumber: "FK-2000-67890",
    storeId: "S001",
    status: "Maintenance Required",
    installationDate: "2021-11-10",
    lastMaintenance: "2023-03-12",
  },
  {
    id: "RF-003",
    model: "CoolMaster X700",
    serialNumber: "CM-X700-54321",
    storeId: "S002",
    status: "Operational",
    installationDate: "2022-06-22",
    lastMaintenance: "2023-05-02",
  },
  {
    id: "RF-004",
    model: "ArcticPro 1500",
    serialNumber: "AP-1500-13579",
    storeId: "S002",
    status: "Critical Alert",
    installationDate: "2020-08-05",
    lastMaintenance: "2023-04-15",
  },
  {
    id: "RF-005",
    model: "FrostKing 3000",
    serialNumber: "FK-3000-24680",
    storeId: "S003",
    status: "Operational",
    installationDate: "2023-01-20",
    lastMaintenance: "2023-05-01",
  },
]

export default function EquipmentPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [selectedEquipment, setSelectedEquipment] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedStores, setExpandedStores] = useState<string[]>(stores.map((store) => store.id))

  // Filter equipment by search query
  const filteredEquipment = equipmentData.filter(
    (equipment) =>
      equipment.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.model.toLowerCase().includes(searchQuery.toLowerCase()) ||
      equipment.serialNumber.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Group equipment by store
  const equipmentByStore = stores.map((store) => ({
    ...store,
    equipment: filteredEquipment.filter((equipment) => equipment.storeId === store.id),
  }))

  // Handle form open for new equipment
  const handleAddNew = () => {
    setSelectedEquipment(null)
    setIsDialogOpen(true)
  }

  // Handle form open for editing
  const handleEdit = (equipment: any) => {
    setSelectedEquipment(equipment)
    setIsDialogOpen(true)
  }

  // Handle delete confirmation
  const handleDeleteConfirm = (equipment: any) => {
    setSelectedEquipment(equipment)
    setIsDeleteDialogOpen(true)
  }

  // Toggle store accordion
  const toggleStore = (storeId: string) => {
    setExpandedStores((prev) => (prev.includes(storeId) ? prev.filter((id) => id !== storeId) : [...prev, storeId]))
  }

  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Gestão de Equipamentos</h1>
          <p className="text-muted-foreground">Visualize e gerencie todos os equipamentos de refrigeração nas lojas</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Pesquise por ID, modelo ou número de série..."
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
              <span className="hidden sm:inline">Adicionar equipamento</span>
            </Button>
          </div>
        </div>

        {/* Equipment Table by Store */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <Accordion type="multiple" value={expandedStores} className="w-full">
            {equipmentByStore.map((store) => (
              <AccordionItem key={store.id} value={store.id}>
                <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                  <div className="flex items-center gap-2">
                    <span className="font-medium">{store.name}</span>
                    <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                      {store.equipment.length} unidades
                    </span>
                  </div>
                </AccordionTrigger>
                <AccordionContent>
                  <div className="overflow-x-auto">
                    <Table>
                      <TableHeader>
                        <TableRow>
                          <TableHead>ID</TableHead>
                          <TableHead>Modelo</TableHead>
                          <TableHead>Status</TableHead>
                          <TableHead>Data de Instalação</TableHead>
                          <TableHead>Última Manutenção</TableHead>
                          <TableHead className="text-right">Ações</TableHead>
                        </TableRow>
                      </TableHeader>
                      <TableBody>
                        {store.equipment.length > 0 ? (
                          store.equipment.map((equipment) => (
                            <TableRow key={equipment.id} className="hover:bg-muted/50">
                              <TableCell className="font-medium">{equipment.id}</TableCell>
                              <TableCell>
                                <div>
                                  <div>{equipment.model}</div>
                                  <div className="text-xs text-muted-foreground">{equipment.serialNumber}</div>
                                </div>
                              </TableCell>
                              <TableCell>
                                <StatusBadge
                                  status={
                                    equipment.status === "Operational"
                                      ? "Completed"
                                      : equipment.status === "Maintenance Required"
                                        ? "Scheduled"
                                        : "In Progress"
                                  }
                                />
                              </TableCell>
                              <TableCell>{new Date(equipment.installationDate).toLocaleDateString()}</TableCell>
                              <TableCell>{new Date(equipment.lastMaintenance).toLocaleDateString()}</TableCell>
                              <TableCell className="text-right">
                                <div className="flex items-center justify-end gap-2">
                                  <Button variant="ghost" size="icon" title="View Details">
                                    <Eye className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Edit"
                                    onClick={() => handleEdit(equipment)}
                                  >
                                    <Edit className="h-4 w-4" />
                                  </Button>
                                  <Button
                                    variant="ghost"
                                    size="icon"
                                    title="Delete"
                                    onClick={() => handleDeleteConfirm(equipment)}
                                  >
                                    <Trash className="h-4 w-4" />
                                  </Button>
                                </div>
                              </TableCell>
                            </TableRow>
                          ))
                        ) : (
                          <TableRow>
                            <TableCell colSpan={6} className="h-24 text-center">
                              Nenhum equipamento encontrado para esta loja.
                            </TableCell>
                          </TableRow>
                        )}
                      </TableBody>
                    </Table>
                  </div>
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>

      {/* Add/Edit Equipment Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedEquipment ? "Edit Equipment" : "Add New Equipment"}</DialogTitle>
            <DialogDescription>
              {selectedEquipment
                ? "Update the equipment details below."
                : "Fill in the details to add new refrigeration equipment."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="model">Modelo</Label>
                <Input
                  id="model"
                  placeholder="e.g. CoolMaster X500"
                  defaultValue={selectedEquipment?.model || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="serialNumber">Número de série</Label>
                <Input
                  id="serialNumber"
                  placeholder="e.g. CM-X500-12345"
                  defaultValue={selectedEquipment?.serialNumber || ""}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="store">Loja</Label>
              <Select defaultValue={selectedEquipment?.storeId || ""}>
                <SelectTrigger id="store">
                  <SelectValue placeholder="Selecione uma loja" />
                </SelectTrigger>
                <SelectContent>
                  {stores.map((store) => (
                    <SelectItem key={store.id} value={store.id}>
                      {store.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="installationDate">Data de instalação</Label>
                <Input
                  id="installationDate"
                  type="date"
                  defaultValue={selectedEquipment?.installationDate || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="status">Status</Label>
                <Select defaultValue={selectedEquipment?.status || "Operational"}>
                  <SelectTrigger id="status">
                    <SelectValue placeholder="Select status" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Operational">Operacional</SelectItem>
                    <SelectItem value="Maintenance Required">Manutenção Necessária</SelectItem>
                    <SelectItem value="Critical Alert">Alerta Crítico</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                placeholder="Informações adicionais sobre este equipamento..."
                className="min-h-[100px]"
              />
            </div>

            <div className="space-y-2">
              <Label>Fotos</Label>
              <div className="flex items-center justify-center w-full">
                <label
                  htmlFor="dropzone-file"
                  className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed rounded-lg cursor-pointer bg-muted/50 hover:bg-muted"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 mb-3 text-muted-foreground" />
                    <p className="mb-2 text-sm text-muted-foreground">
                      <span className="font-semibold">Clique para carregar</span> ou arraste e solte
                    </p>
                    <p className="text-xs text-muted-foreground">PNG, JPG or JPEG (MAX. 5MB)</p>
                  </div>
                  <input id="dropzone-file" type="file" className="hidden" multiple />
                </label>
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">{selectedEquipment ? "Atualizar Equipamento" : "Adicionar equipamento"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja excluir {selectedEquipment?.id} ({selectedEquipment?.model})? Esta ação não pode
              ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Deletar Equipamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RefrigerationDashboardLayout>
  )
}
