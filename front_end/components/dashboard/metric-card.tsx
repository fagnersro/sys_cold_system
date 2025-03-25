import type { ReactNode } from "react"
import { ArrowUpRight, ArrowDownRight, Minus } from "lucide-react"

interface MetricCardProps {
  title: string
  value: string
  description?: string
  icon?: ReactNode
  trend?: "up" | "down" | "neutral"
  trendValue?: string
}

export function MetricCard({ title, value, description, icon, trend, trendValue }: MetricCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-xl border bg-card p-6 text-card-foreground shadow transition-all hover:shadow-md hover:-translate-y-1">
      <div className="flex justify-between">
        <div className="space-y-1">
          <p className="text-sm font-medium text-muted-foreground">{title}</p>
          <div className="flex items-baseline gap-2">
            <p className="text-2xl font-bold">{value}</p>
            {trend && trendValue && (
              <div
                className={`flex items-center text-xs font-medium ${
                  trend === "up" ? "text-green-500" : trend === "down" ? "text-red-500" : "text-muted-foreground"
                }`}
              >
                {trend === "up" ? (
                  <ArrowUpRight className="mr-1 h-3 w-3" />
                ) : trend === "down" ? (
                  <ArrowDownRight className="mr-1 h-3 w-3" />
                ) : (
                  <Minus className="mr-1 h-3 w-3" />
                )}
                {trendValue}
              </div>
            )}
          </div>
          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
        {icon && (
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
            {icon}
          </div>
        )}
      </div>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-primary to-primary/70 transition-all duration-300 group-hover:w-full"></div>
    </div>
  )
}

