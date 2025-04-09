import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { FileText, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import { StatusBadge } from "@/components/refrigeration/status-badge"

interface MaintenanceTableProps {
  data: Array<{
    id: string
    equipmentId: string
    type: string
    date: string
    technician: string
    status: string
  }>
  equipmentData: Array<{
    id: string
    model: string
    storeName: string
  }>
  onEdit: (maintenance: any) => void
  onDelete: (maintenance: any) => void
}

export function MaintenanceTable({ data, equipmentData, onEdit, onDelete }: MaintenanceTableProps) {
  const getEquipmentDetails = (equipmentId: string) => {
    return equipmentData.find((equipment) => equipment.id === equipmentId) || null
  }

  return (
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
        {data.length > 0 ? (
          data.map((maintenance) => {
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
                <TableCell>{new Date(maintenance.date).toLocaleDateString("pt-BR", {
                  day: '2-digit',
                  month: '2-digit',
                  year: '2-digit'
                })}</TableCell>
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
                      onClick={() => onEdit(maintenance)}
                    >
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button
                      variant="ghost"
                      size="icon"
                      title="Delete"
                      onClick={() => onDelete(maintenance)}
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
  )
}