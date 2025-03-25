import type { ReactNode } from "react"

interface FuturisticCardProps {
  icon: ReactNode
  title: string
  description: string
}

export function FuturisticCard({ icon, title, description }: FuturisticCardProps) {
  return (
    <div className="group relative overflow-hidden rounded-2xl bg-white p-6 shadow-sm transition-all hover:shadow-md hover:-translate-y-1 border border-black/5">
      <div className="mb-4 flex size-12 items-center justify-center rounded-full bg-blue-100 text-blue-600">{icon}</div>
      <h3 className="mb-2 text-xl font-bold">{title}</h3>
      <p className="text-black/70">{description}</p>
      <div className="absolute bottom-0 left-0 h-1 w-0 bg-gradient-to-r from-blue-600 to-blue-400 transition-all duration-300 group-hover:w-full"></div>
    </div>
  )
}
