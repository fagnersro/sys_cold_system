"use client"

import { useEffect, useRef } from "react"

interface ReportChartProps {
  period: "day" | "week" | "month" | "year"
}

export function ReportChart({ period }: ReportChartProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    if (!canvasRef.current) return

    // This is a placeholder for a real chart library
    // In a real application, you would use Chart.js or another library
    const ctx = canvasRef.current.getContext("2d")
    if (!ctx) return

    // Clear previous chart
    ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height)

    // Set up chart dimensions
    const width = canvasRef.current.width
    const height = canvasRef.current.height
    const padding = 40

    // Generate mock data based on period
    const dataPoints = period === "day" ? 24 : period === "week" ? 7 : period === "month" ? 30 : 12

    // Generate random data
    const data = Array.from({ length: dataPoints }, () => Math.floor(Math.random() * 80) + 20)

    // Calculate max value for scaling
    const maxValue = Math.max(...data) * 1.2

    // Draw axes
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.moveTo(padding, padding)
    ctx.lineTo(padding, height - padding)
    ctx.lineTo(width - padding, height - padding)
    ctx.stroke()

    // Draw grid lines
    ctx.beginPath()
    ctx.strokeStyle = "#e2e8f0"
    ctx.setLineDash([5, 5])

    // Horizontal grid lines
    for (let i = 1; i <= 5; i++) {
      const y = height - padding - ((height - 2 * padding) * i) / 5
      ctx.moveTo(padding, y)
      ctx.lineTo(width - padding, y)
    }
    ctx.stroke()
    ctx.setLineDash([])

    // Draw data points and line
    const pointWidth = (width - 2 * padding) / (dataPoints - 1)

    // Draw area
    ctx.beginPath()
    ctx.fillStyle = "rgba(59, 130, 246, 0.1)"
    ctx.moveTo(padding, height - padding)

    data.forEach((value, index) => {
      const x = padding + index * pointWidth
      const y = height - padding - ((height - 2 * padding) * value) / maxValue
      ctx.lineTo(x, y)
    })

    ctx.lineTo(padding + (dataPoints - 1) * pointWidth, height - padding)
    ctx.closePath()
    ctx.fill()

    // Draw line
    ctx.beginPath()
    ctx.strokeStyle = "#3b82f6"
    ctx.lineWidth = 3

    data.forEach((value, index) => {
      const x = padding + index * pointWidth
      const y = height - padding - ((height - 2 * padding) * value) / maxValue

      if (index === 0) {
        ctx.moveTo(x, y)
      } else {
        ctx.lineTo(x, y)
      }
    })

    ctx.stroke()

    // Draw points
    data.forEach((value, index) => {
      const x = padding + index * pointWidth
      const y = height - padding - ((height - 2 * padding) * value) / maxValue

      ctx.beginPath()
      ctx.fillStyle = "#ffffff"
      ctx.strokeStyle = "#3b82f6"
      ctx.lineWidth = 2
      ctx.arc(x, y, 4, 0, Math.PI * 2)
      ctx.fill()
      ctx.stroke()
    })

    // Draw labels
    ctx.fillStyle = "#64748b"
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "center"

    // X-axis labels
    const labels =
      period === "day"
        ? Array.from({ length: 24 }, (_, i) => `${i}:00`)
        : period === "week"
          ? ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
          : period === "month"
            ? Array.from({ length: 30 }, (_, i) => `${i + 1}`)
            : ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]

    // Only show a subset of labels to avoid overcrowding
    const labelStep = Math.ceil(labels.length / 10)

    labels.forEach((label, index) => {
      if (index % labelStep === 0 || index === labels.length - 1) {
        const x = padding + index * pointWidth
        ctx.fillText(label, x, height - padding + 20)
      }
    })

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - ((height - 2 * padding) * i) / 5
      const value = Math.round((maxValue * i) / 5)
      ctx.textAlign = "right"
      ctx.fillText(value.toString(), padding - 10, y + 4)
    }
  }, [period])

  return (
    <div className="h-[400px] w-full">
      <canvas ref={canvasRef} className="h-full w-full" width={1000} height={400} />
    </div>
  )
}

