import type { ButtonHTMLAttributes, ReactNode } from "react"
import { cn } from "@/lib/utils"

interface AuthButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  children: ReactNode
  variant?: "primary" | "secondary"
  size?: "default" | "sm" | "lg"
}

export function AuthButton({ children, className, variant = "primary", size = "default", ...props }: AuthButtonProps) {
  return (
    <button
      className={cn(
        "relative inline-flex items-center justify-center overflow-hidden rounded-lg font-medium transition-all duration-200",
        "focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2",
        "disabled:pointer-events-none disabled:opacity-50",
        "hover:scale-[1.02] active:scale-[0.98]",
        variant === "primary" &&
          "bg-gradient-to-r from-blue-600 to-blue-500 text-white shadow-md hover:shadow-lg hover:shadow-blue-500/20",
        variant === "secondary" && "border border-black/10 bg-white text-black hover:bg-black/5",
        size === "default" && "h-11 px-5 text-sm",
        size === "sm" && "h-9 px-4 text-xs",
        size === "lg" && "h-12 px-8 text-base",
        className,
      )}
      {...props}
    >
      <span className="absolute inset-0 overflow-hidden rounded-lg">
        <span className="absolute inset-0 rounded-lg bg-[radial-gradient(75%_100%_at_50%_0%,rgba(255,255,255,0.6)_0%,rgba(255,255,255,0)_75%)] opacity-0 transition-opacity hover:opacity-100"></span>
      </span>
      <span className="z-10 flex items-center gap-2">{children}</span>
    </button>
  )
}