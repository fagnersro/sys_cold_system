"use client"

import { useEffect, useRef } from "react"

interface ReportChartProps {
  type: "parts" | "costs"
  period: "week" | "month" | "year"
  equipment: string
}

export function ReportChart({ type, period, equipment }: ReportChartProps) {
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

    // Generate mock data based on period and type
    let labels: string[] = []
    let datasets: { label: string; data: number[]; color: string }[] = []

    // Set labels based on period
    if (period === "week") {
      labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]
    } else if (period === "month") {
      labels = Array.from({ length: 4 }, (_, i) => `Week ${i + 1}`)
    } else {
      labels = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"]
    }

    // Set datasets based on type
    if (type === "parts") {
      datasets = [
        {
          label: "Compressors",
          data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 5)),
          color: "#3b82f6", // blue
        },
        {
          label: "Filters",
          data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 10) + 5),
          color: "#10b981", // green
        },
        {
          label: "Sensors",
          data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 8) + 2),
          color: "#f59e0b", // amber
        },
      ]
    } else {
      datasets = [
        {
          label: "Preventive",
          data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 1000) + 500),
          color: "#3b82f6", // blue
        },
        {
          label: "Corrective",
          data: Array.from({ length: labels.length }, () => Math.floor(Math.random() * 2000) + 1000),
          color: "#ef4444", // red
        },
      ]
    }

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

    // Calculate max value for scaling
    const allValues = datasets.flatMap((dataset) => dataset.data)
    const maxValue = Math.max(...allValues) * 1.2

    // Draw data
    const barWidth = (width - 2 * padding) / labels.length / (datasets.length + 1)

    // Draw bars or lines based on chart type
    if (type === "parts") {
      // Bar chart for parts
      datasets.forEach((dataset, datasetIndex) => {
        ctx.fillStyle = dataset.color

        dataset.data.forEach((value, index) => {
          const x = padding + index * ((width - 2 * padding) / labels.length) + barWidth * (datasetIndex + 0.5)
          const barHeight = ((height - 2 * padding) * value) / maxValue
          const y = height - padding - barHeight

          ctx.fillRect(x, y, barWidth, barHeight)
        })
      })
    } else {
      // Line chart for costs
      datasets.forEach((dataset) => {
        ctx.beginPath()
        ctx.strokeStyle = dataset.color
        ctx.lineWidth = 3

        dataset.data.forEach((value, index) => {
          const x = padding + index * ((width - 2 * padding) / (labels.length - 1))
          const y = height - padding - ((height - 2 * padding) * value) / maxValue

          if (index === 0) {
            ctx.moveTo(x, y)
          } else {
            ctx.lineTo(x, y)
          }
        })

        ctx.stroke()

        // Draw points
        dataset.data.forEach((value, index) => {
          const x = padding + index * ((width - 2 * padding) / (labels.length - 1))
          const y = height - padding - ((height - 2 * padding) * value) / maxValue

          ctx.beginPath()
          ctx.fillStyle = "#ffffff"
          ctx.strokeStyle = dataset.color
          ctx.lineWidth = 2
          ctx.arc(x, y, 4, 0, Math.PI * 2)
          ctx.fill()
          ctx.stroke()
        })
      })
    }

    // Draw labels
    ctx.fillStyle = "#64748b"
    ctx.font = "12px Inter, sans-serif"
    ctx.textAlign = "center"

    // X-axis labels
    labels.forEach((label, index) => {
      const x = padding + index * ((width - 2 * padding) / (type === "parts" ? labels.length : labels.length - 1))
      ctx.fillText(label, x, height - padding + 20)
    })

    // Y-axis labels
    for (let i = 0; i <= 5; i++) {
      const y = height - padding - ((height - 2 * padding) * i) / 5
      const value = type === "costs" ? `$${Math.round((maxValue * i) / 5)}` : Math.round((maxValue * i) / 5).toString()
      ctx.textAlign = "right"
      ctx.fillText(value, padding - 10, y + 4)
    }

    // Draw legend
    const legendY = 20
    let legendX = width - padding - 20

    // Draw legend from right to left
    datasets.reverse().forEach((dataset) => {
      const textWidth = ctx.measureText(dataset.label).width
      legendX -= textWidth + 30

      // Draw color box
      ctx.fillStyle = dataset.color
      ctx.fillRect(legendX, legendY - 8, 12, 12)

      // Draw label
      ctx.fillStyle = "#64748b"
      ctx.textAlign = "left"
      ctx.fillText(dataset.label, legendX + 16, legendY)
    })
  }, [type, period, equipment])

  return (
    <div className="h-[300px] w-full">
      <canvas ref={canvasRef} className="h-full w-full" width={800} height={300} />
    </div>
  )
}

