import type { ReactNode } from "react"

interface StatusCardProps {
  title: string
  value: string
  description?: string
  icon?: ReactNode
  color?: "blue" | "red" | "green" | "purple" | "yellow"
  percentage?: number
}

export function StatusCard({ title, value, description, icon, color = "blue", percentage }: StatusCardProps) {
  const getColorClasses = (color: string) => {
    switch (color) {
      case "blue":
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
      case "red":
        return "text-red-500 bg-red-100 dark:bg-red-900/30 dark:text-red-400"
      case "green":
        return "text-green-500 bg-green-100 dark:bg-green-900/30 dark:text-green-400"
      case "purple":
        return "text-purple-500 bg-purple-100 dark:bg-purple-900/30 dark:text-purple-400"
      case "yellow":
        return "text-yellow-500 bg-yellow-100 dark:bg-yellow-900/30 dark:text-yellow-400"
      default:
        return "text-blue-500 bg-blue-100 dark:bg-blue-900/30 dark:text-blue-400"
    }
  }

  const getProgressColor = (percentage: number) => {
    if (percentage >= 80) return "bg-green-500"
    if (percentage >= 60) return "bg-yellow-500"
    return "bg-red-500"
  }

  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 text-card-foreground shadow transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <p className="text-2xl font-bold">{value}</p>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        {icon && (
          <div className={`flex h-10 w-10 items-center justify-center rounded-full ${getColorClasses(color)}`}>
            {icon}
          </div>
        )}
      </div>

      {percentage !== undefined && (
        <div className="mt-4 space-y-1">
          <div className="flex items-center justify-between text-xs">
            <span>Status</span>
            <span className="font-medium">{percentage}%</span>
          </div>
          <div className="h-2 w-full overflow-hidden rounded-full bg-gray-100 dark:bg-gray-800">
            <div
              className={`h-full rounded-full ${getProgressColor(percentage)}`}
              style={{ width: `${percentage}%` }}
            />
          </div>
        </div>
      )}

      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full"></div>
    </div>
  )
}

