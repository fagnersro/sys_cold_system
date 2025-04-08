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
import { useState } from "react"
import { useToast } from "@/components/ui/use-toast"

type DeleteConfirmDialogProps = {
  trigger: React.ReactNode
  title?: string
  description?: string
  onConfirm: () => Promise<void> | void
  successMessage?: string
  errorMessage?: string
}

export function DeleteConfirmDialog({
  trigger,
  title = "Excluir item",
  description = "Tem certeza que deseja excluir este item? Esta ação não pode ser desfeita.",
  onConfirm,
  successMessage = "Item excluído com sucesso.",
  errorMessage = "Erro ao excluir o item.",
}: DeleteConfirmDialogProps) {
  const [open, setOpen] = useState(false)
  const { toast } = useToast()
  const [loading, setLoading] = useState(false)

  const handleDelete = async () => {
    try {
      setLoading(true)
      await onConfirm()
      toast({ title: successMessage, variant: "default" })
      setOpen(false)
    } catch (error) {
      console.error(error)
      toast({ title: errorMessage, variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }
  
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle>{title}</DialogTitle>
          <DialogDescription>{description}</DialogDescription>
        </DialogHeader>

        <DialogFooter>
          <Button variant="ghost" onClick={() => setOpen(false)} disabled={loading}>
            Cancelar
          </Button>
          <Button
            variant="destructive"
            onClick={handleDelete}
            disabled={loading}
          >
            {loading ? "Excluindo..." : "Confirmar exclusão"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
