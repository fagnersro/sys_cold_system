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
import {
  Calendar,
  Plus,
  Search,
  Edit,
  Trash,
  CheckCircle,
  Clock,
  ChevronLeft,
  ChevronRight,
  CalendarDays,
  ListIcon,
} from "lucide-react"
import { StatusBadge } from "@/components/refrigeration/status-badge"

// Mock data for equipment
const equipmentData = [
  { id: "RF-001", model: "CoolMaster X500", storeId: "S001", storeName: "Downtown Supermarket" },
  { id: "RF-002", model: "FrostKing 2000", storeId: "S001", storeName: "Downtown Supermarket" },
  { id: "RF-003", model: "CoolMaster X700", storeId: "S002", storeName: "Westside Grocery" },
  { id: "RF-004", model: "ArcticPro 1500", storeId: "S002", storeName: "Westside Grocery" },
  { id: "RF-005", model: "FrostKing 3000", storeId: "S003", storeName: "Harbor Fresh Market" },
]

// Mock data for scheduled maintenance
const scheduleData = [
  {
    id: "SCH001",
    equipmentId: "RF-001",
    type: "Preventive",
    date: "2023-05-15",
    time: "09:00",
    technician: "John Smith",
    priority: "Medium",
    status: "Scheduled",
    description: "Regular quarterly maintenance",
  },
  {
    id: "SCH002",
    equipmentId: "RF-005",
    type: "Corrective",
    date: "2023-05-12",
    time: "14:30",
    technician: "Maria Garcia",
    priority: "High",
    status: "Scheduled",
    description: "Compressor repair",
  },
  {
    id: "SCH003",
    equipmentId: "RF-003",
    type: "Preventive",
    date: "2023-05-18",
    time: "10:00",
    technician: "Robert Chen",
    priority: "Low",
    status: "Scheduled",
    description: "Annual certification",
  },
  {
    id: "SCH004",
    equipmentId: "RF-002",
    type: "Preventive",
    date: "2023-05-22",
    time: "11:00",
    technician: "Sarah Johnson",
    priority: "Medium",
    status: "Scheduled",
    description: "Filter replacement",
  },
  {
    id: "SCH005",
    equipmentId: "RF-004",
    type: "Emergency",
    date: "2023-05-10",
    time: "08:00",
    technician: "David Kim",
    priority: "Critical",
    status: "Completed",
    description: "Temperature control failure",
  },
]

// Generate calendar days
const generateCalendarDays = (year: number, month: number) => {
  const firstDay = new Date(year, month, 1)
  const lastDay = new Date(year, month + 1, 0)
  const daysInMonth = lastDay.getDate()
  const startingDayOfWeek = firstDay.getDay()

  const days = []

  // Add empty cells for days before the first day of the month
  for (let i = 0; i < startingDayOfWeek; i++) {
    days.push({ day: null, date: null })
  }

  // Add days of the month
  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(year, month, i)
    days.push({
      day: i,
      date: date,
      events: scheduleData.filter((schedule) => {
        const scheduleDate = new Date(schedule.date)
        return scheduleDate.getDate() === i && scheduleDate.getMonth() === month && scheduleDate.getFullYear() === year
      }),
    })
  }

  return days
}

export default function SchedulePage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isConfirmDialogOpen, setIsConfirmDialogOpen] = useState(false)
  const [selectedSchedule, setSelectedSchedule] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [viewMode, setViewMode] = useState<"calendar" | "list">("calendar")

  // Calendar state
  const today = new Date()
  const [currentMonth, setCurrentMonth] = useState(today.getMonth())
  const [currentYear, setCurrentYear] = useState(today.getFullYear())
  const calendarDays = generateCalendarDays(currentYear, currentMonth)

  // Month navigation
  const prevMonth = () => {
    if (currentMonth === 0) {
      setCurrentMonth(11)
      setCurrentYear(currentYear - 1)
    } else {
      setCurrentMonth(currentMonth - 1)
    }
  }

  const nextMonth = () => {
    if (currentMonth === 11) {
      setCurrentMonth(0)
      setCurrentYear(currentYear + 1)
    } else {
      setCurrentMonth(currentMonth + 1)
    }
  }

  // Filter schedule by search query
  const filteredSchedule = scheduleData.filter(
    (schedule) =>
      schedule.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.equipmentId.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.technician.toLowerCase().includes(searchQuery.toLowerCase()) ||
      schedule.description.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  // Sort by priority
  const sortedSchedule = [...filteredSchedule].sort((a, b) => {
    const priorityOrder = { Critical: 0, High: 1, Medium: 2, Low: 3 }
    return (
      priorityOrder[a.priority as keyof typeof priorityOrder] - priorityOrder[b.priority as keyof typeof priorityOrder]
    )
  })

  // Handle form open for new schedule
  const handleAddNew = () => {
    setSelectedSchedule(null)
    setIsDialogOpen(true)
  }

  // Handle form open for editing
  const handleEdit = (schedule: any) => {
    setSelectedSchedule(schedule)
    setIsDialogOpen(true)
  }

  // Handle delete confirmation
  const handleDeleteConfirm = (schedule: any) => {
    setSelectedSchedule(schedule)
    setIsDeleteDialogOpen(true)
  }

  // Handle completion confirmation
  const handleCompletionConfirm = (schedule: any) => {
    setSelectedSchedule(schedule)
    setIsConfirmDialogOpen(true)
  }

  // Get equipment details
  const getEquipmentDetails = (equipmentId: string) => {
    return equipmentData.find((equipment) => equipment.id === equipmentId) || null
  }

  // Get priority class
  const getPriorityClass = (priority: string) => {
    switch (priority) {
      case "Critical":
        return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
      case "High":
        return "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
      case "Medium":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
      case "Low":
        return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  // Month names
  const monthNames = [
    "Janeiro",
    "Fevereiro",
    "Março",
    "Abril",
    "Maio",
    "Junho",
    "Julho",
    "Agosto",
    "Setembro",
    "Outubro",
    "Novembro",
    "Dezembro",
  ]

  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Cronograma de Manutenção</h1>
          <p className="text-muted-foreground">Planejar e gerenciar as próximas atividades de manutenção</p>
        </div>

        {/* Search and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Pesquisar Horários..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <div className="border rounded-md p-1">
              <Button
                variant={viewMode === "calendar" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("calendar")}
                className="px-3"
              >
                <CalendarDays className="h-4 w-4 mr-2" />
                Calendário
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="px-3"
              >
                <ListIcon className="h-4 w-4 mr-2" />
                  Lista
              </Button>
            </div>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Manutenção Programada</span>
            </Button>
          </div>
        </div>

        {/* Calendar View */}
        {viewMode === "calendar" && (
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="flex items-center justify-between border-b p-4">
              <h2 className="text-lg font-semibold">
                {monthNames[currentMonth]} {currentYear}
              </h2>
              <div className="flex items-center gap-2">
                <Button variant="outline" size="icon" onClick={prevMonth}>
                  <ChevronLeft className="h-4 w-4" />
                </Button>
                <Button variant="outline" size="icon" onClick={nextMonth}>
                  <ChevronRight className="h-4 w-4" />
                </Button>
              </div>
            </div>

            <div className="p-4">
              <div className="grid grid-cols-7 gap-1">
                {["Dom", "Seg", "Ter", "Qua", "Qui", "Sex", "Sáb"].map((day, index) => (
                  <div key={index} className="text-center font-medium text-sm py-2">
                    {day}
                  </div>
                ))}

                {calendarDays.map((day, index) => (
                  <div
                    key={index}
                    className={`min-h-[100px] border rounded-md p-1 ${
                      !day.day
                        ? "bg-muted/20"
                        : day.date?.toDateString() === today.toDateString()
                          ? "bg-blue-50 dark:bg-blue-900/10 border-blue-200 dark:border-blue-800"
                          : ""
                    }`}
                  >
                    {day.day && (
                      <>
                        <div className="text-right text-sm font-medium p-1">{day.day}</div>
                        <div className="space-y-1">
                          {day.events &&
                            day.events.map((event, eventIndex) => (
                              <div
                                key={eventIndex}
                                className={`text-xs p-1 rounded truncate cursor-pointer hover:opacity-80 ${
                                  event.type === "Preventive"
                                    ? "bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    : event.type === "Corrective"
                                      ? "bg-orange-100 text-orange-700 dark:bg-orange-900/30 dark:text-orange-400"
                                      : "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
                                }`}
                                onClick={() => handleEdit(event)}
                              >
                                {event.time} - {event.equipmentId}
                              </div>
                            ))}
                        </div>
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* List View */}
        {viewMode === "list" && (
          <div className="rounded-xl border bg-card text-card-foreground shadow">
            <div className="p-4 border-b">
              <h2 className="text-lg font-semibold">Próxima Manutenção</h2>
            </div>

            <div className="divide-y">
              {sortedSchedule.length > 0 ? (
                sortedSchedule.map((schedule) => {
                  const equipment = getEquipmentDetails(schedule.equipmentId)

                  return (
                    <div key={schedule.id} className="p-4 hover:bg-muted/50 transition-colors">
                      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <h3 className="font-medium">{schedule.equipmentId}</h3>
                            <div
                              className={`rounded-full px-2 py-0.5 text-xs font-medium ${getPriorityClass(schedule.priority)}`}
                            >
                              {schedule.priority}
                            </div>
                            <StatusBadge type={schedule.type as any} />
                          </div>
                          <p className="text-sm text-muted-foreground mb-1">
                            {equipment?.model} ({equipment?.storeName})
                          </p>
                          <p className="text-sm mb-2">{schedule.description}</p>
                          <div className="flex items-center gap-4 text-xs text-muted-foreground">
                            <div className="flex items-center gap-1">
                              <Calendar className="h-3.5 w-3.5" />
                              <span>{new Date(schedule.date).toLocaleDateString()}</span>
                            </div>
                            <div className="flex items-center gap-1">
                              <Clock className="h-3.5 w-3.5" />
                              <span>{schedule.time}</span>
                            </div>
                            <div>Técnico(a): {schedule.technician}</div>
                          </div>
                        </div>
                        <div className="flex items-center gap-2">
                          {schedule.status !== "Completed" && (
                            <Button
                              variant="outline"
                              size="sm"
                              className="gap-1"
                              onClick={() => handleCompletionConfirm(schedule)}
                            >
                              <CheckCircle className="h-4 w-4" />
                              <span>Completo</span>
                            </Button>
                          )}
                          <Button variant="ghost" size="icon" onClick={() => handleEdit(schedule)}>
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button variant="ghost" size="icon" onClick={() => handleDeleteConfirm(schedule)}>
                            <Trash className="h-4 w-4" />
                          </Button>
                        </div>
                      </div>
                    </div>
                  )
                })
              ) : (
                <div className="p-8 text-center text-muted-foreground">Nenhuma Manutenção Programada Encontrada.</div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Add/Edit Schedule Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedSchedule ? "Editar Manutenção Programada" : "Agendar Nova Manutenção"}</DialogTitle>
            <DialogDescription>
              {selectedSchedule
                ? "Atualize os detalhes da manutenção programada abaixo."
                : "Preencha os detalhes para agendar uma nova manutenção."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="type">Tipo de Manutenção</Label>
                <Select defaultValue={selectedSchedule?.type || "Preventive"}>
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
                <Label htmlFor="priority">Priority</Label>
                <Select defaultValue={selectedSchedule?.priority || "Medium"}>
                  <SelectTrigger id="priority">
                    <SelectValue placeholder="Select priority" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Critical">Crítico</SelectItem>
                    <SelectItem value="High">Alto</SelectItem>
                    <SelectItem value="Medium">Médio</SelectItem>
                    <SelectItem value="Low">Baixo</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="equipment">Equipamento</Label>
              <Select defaultValue={selectedSchedule?.equipmentId || ""}>
                <SelectTrigger id="equipment">
                  <SelectValue placeholder="Selecione o equipamento" />
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

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="date">Data</Label>
                <Input id="date" type="date" defaultValue={selectedSchedule?.date || ""} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="time">Horário</Label>
                <Input id="time" type="time" defaultValue={selectedSchedule?.time || ""} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="technician">Técnico (a)</Label>
              <Input
                id="technician"
                placeholder="Nome do técnico"
                defaultValue={selectedSchedule?.technician || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="description">Descrição</Label>
              <Textarea
                id="description"
                placeholder="Descreva a manutenção a ser realizada..."
                className="min-h-[100px]"
                defaultValue={selectedSchedule?.description || ""}
              />
            </div>

            <div className="flex items-center space-x-2">
              <input
                type="checkbox"
                id="notify"
                className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
              />
              <Label htmlFor="notify" className="text-sm">
                Enviar lembretes de notificação (24h e 1h antes do horário agendado)
              </Label>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">{selectedSchedule ? "Atualizar Cronograma" : "Manutenção Programada"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza de que deseja excluir esta manutenção programada para {selectedSchedule?.equipmentId}? Esta
              ação não pode ser desfeita.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
             Excluir agendamento
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Completion Confirmation Dialog */}
      <Dialog open={isConfirmDialogOpen} onOpenChange={setIsConfirmDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Conclusão</DialogTitle>
            <DialogDescription>
              Marcar esta tarefa de manutenção como concluída? Isso atualizará o histórico de manutenção do equipamento.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsConfirmDialogOpen(false)}>
              Cancelar
            </Button>
            <Button onClick={() => setIsConfirmDialogOpen(false)}>Confirmar conclusão</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RefrigerationDashboardLayout>
  )
}

