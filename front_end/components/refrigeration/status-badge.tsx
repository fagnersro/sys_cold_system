import { CheckCircle, AlertTriangle, Clock, PenToolIcon as Tool, Wrench } from "lucide-react"

interface StatusBadgeProps {
  status?: "Completed" | "In Progress" | "Scheduled"
  type?: "Preventive" | "Corrective" | "Emergency"
}

export function StatusBadge({ status, type }: StatusBadgeProps) {
  if (status) {
    switch (status) {
      case "Completed":
        return (
          <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <CheckCircle className="h-3 w-3" />
            <span>Concluído</span>
          </div>
        )
      case "In Progress":
        return (
          <div className="inline-flex items-center gap-1 rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400">
            <AlertTriangle className="h-3 w-3" />
            <span>Em Andamento</span>
          </div>
        )
      case "Scheduled":
        return (
          <div className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Clock className="h-3 w-3" />
            <span>Agendado</span>
          </div>
        )
      default:
        return null
    }
  }

  if (type) {
    switch (type) {
      case "Preventive":
        return (
          <div className="inline-flex items-center gap-1 rounded-full bg-blue-100 px-2.5 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400">
            <Tool className="h-3 w-3" />
            <span>Preventivo</span>
          </div>
        )
      case "Corrective":
        return (
          <div className="inline-flex items-center gap-1 rounded-full bg-green-100 px-2.5 py-0.5 text-xs font-medium text-green-700 dark:bg-green-900/30 dark:text-green-400">
            <Wrench className="h-3 w-3" />
            <span>Corretivo</span>
          </div>
        )
      case "Emergency":
          return (
            <div className="inline-flex items-center gap-1 rounded-full bg-red-100 px-2.5 py-0.5 text-xs font-medium text-red-700 dark:bg-red-900/30 dark:text-red-400">
              <Wrench className="h-3 w-3" />
              <span>Emergência</span>
            </div>
          )
      default:
        return null
    }
  }

  return null
}

