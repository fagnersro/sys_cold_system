'use client'

import {
  Dialog,
  DialogTrigger,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
  DialogFooter,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useState } from "react"

type Equipment = {
  id: string
  model: string
  serialNumber: string
  installationDate: string
  lastMaintenance: string
  status: string
}

type EquipmentDialogProps = {
  mode: "add" | "edit"
  trigger?: React.ReactNode
  equipment?: Partial<Equipment>
  onSave: (data: Equipment) => void
  onCancel?: () => void
}

export function EquipmentDialog({
  mode,
  trigger,
  equipment = {},
  onSave,
  onCancel,
}: EquipmentDialogProps) {
  const [open, setOpen] = useState(false)

  const [formData, setFormData] = useState<Partial<Equipment>>({
    id: equipment.id || "",
    model: equipment.model || "",
    serialNumber: equipment.serialNumber || "",
    installationDate: equipment.installationDate || "",
    lastMaintenance: equipment.lastMaintenance || "",
    status: equipment.status || "Operational",
  })

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = () => {
    if (formData.id && formData.model && formData.serialNumber) {
      onSave(formData as Equipment)
      setOpen(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="max-w-md">
        <DialogHeader>
          <DialogTitle>
            {mode === "add" ? "Adicionar Equipamento" : "Editar Equipamento"}
          </DialogTitle>
          <DialogDescription>
            {mode === "add"
              ? "Preencha os dados para adicionar um novo equipamento."
              : "Atualize os dados do equipamento selecionado."}
          </DialogDescription>
        </DialogHeader>

        <div className="grid gap-4 py-4">
          <div>
            <Label htmlFor="id">ID do Equipamento</Label>
            <Input name="id" value={formData.id} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="model">Modelo</Label>
            <Input name="model" value={formData.model} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="serialNumber">Número de Série</Label>
            <Input name="serialNumber" value={formData.serialNumber} onChange={handleChange} />
          </div>

          <div>
            <Label htmlFor="installationDate">Data de Instalação</Label>
            <Input
              name="installationDate"
              type="date"
              value={formData.installationDate}
              onChange={handleChange}
            />
          </div>

          <div>
            <Label htmlFor="lastMaintenance">Última Manutenção</Label>
            <Input
              name="lastMaintenance"
              type="date"
              value={formData.lastMaintenance}
              onChange={handleChange}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="ghost" onClick={() => { setOpen(false); onCancel?.() }}>
            Cancelar
          </Button>
          <Button onClick={handleSubmit}>
            {mode === "add" ? "Adicionar" : "Salvar"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
