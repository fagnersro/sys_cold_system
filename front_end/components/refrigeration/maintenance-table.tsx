"use client"

import { useEffect, useState, type JSX } from "react"
import { ChevronDown, ChevronUp, MoreHorizontal, Eye, Edit, Trash } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { StatusBadge } from "@/components/refrigeration/status-badge"

// Mock data for the table
const initialData = [
  {
    id: "RF-001",
    serviceType: "Preventive",
    date: "2023-04-28",
    technician: "John Smith",
    status: "Completed",
    notes: "Regular maintenance, replaced filters",
  },
  {
    id: "RF-005",
    serviceType: "Corrective",
    date: "2023-05-01",
    technician: "Maria Garcia",
    status: "In Progress",
    notes: "Compressor issues, ordered replacement parts",
  },
  {
    id: "RF-003",
    serviceType: "Preventive",
    date: "2023-05-02",
    technician: "Robert Chen",
    status: "Scheduled",
    notes: "Annual certification and inspection",
  },
  {
    id: "RF-002",
    serviceType: "Corrective",
    date: "2023-05-03",
    technician: "Sarah Johnson",
    status: "Completed",
    notes: "Fixed temperature control system",
  },
  {
    id: "RF-004",
    serviceType: "Preventive",
    date: "2023-05-05",
    technician: "David Kim",
    status: "Scheduled",
    notes: "Quarterly maintenance check",
  },
]

type SortField = "id" | "serviceType" | "date" | "technician" | "status"
type SortDirection = "asc" | "desc"
type FilterType = "All" | "Preventive" | "Corrective"

export function MaintenanceTable() {
  const [data, setData] = useState(initialData)
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")
  const [filterType, setFilterType] = useState<FilterType>("All")

  useEffect(() => {
    let filtered = initialData
  
    if (filterType !== "All") {
      filtered = initialData.filter(item => item.serviceType === filterType)
    }
  
    const sorted = [...filtered].sort((a, b) => {
      const aValue = a[sortField]
      const bValue = b[sortField]
  
      if (sortField === "date") {
        const aDate = new Date(aValue)
        const bDate = new Date(bValue)
        return sortDirection === "asc"
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime()
      }
  
      return sortDirection === "asc"
        ? aValue.localeCompare(bValue)
        : bValue.localeCompare(aValue)
    })
  
    setData(sorted)
  }, [sortField, sortDirection, filterType])
  
  
  // Handle sorting
  const handleSort = (field: SortField) => {
    let newSortDirection: SortDirection
  
    if (sortField === field) {
      newSortDirection = sortDirection === "asc" ? "desc" : "asc"
    } else {
      setSortField(field)
      newSortDirection = "asc"
    }
    
    setSortDirection(newSortDirection)

    const sortedData = [...data].sort((a, b) => {
      const aValue = a[field]
      const bValue = b[field]
  
      if (field === "date") {
        const aDate = new Date(aValue)
        const bDate = new Date(bValue)
        return newSortDirection === "asc"
          ? aDate.getTime() - bDate.getTime()
          : bDate.getTime() - aDate.getTime()
      } else {
        return newSortDirection === "asc"
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue)
      }
    })
  
    setData(sortedData)
  }
  
  // Handle filtering
  const handleFilter = (type: FilterType) => {
    setFilterType(type)
    
    if (type === "All") {
      setData(initialData)
    } else {
      const filteredData = initialData.filter(item => item.serviceType === type)
      setData(filteredData)
    }
  }
  
  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null
    
    return sortDirection === "asc" ? (
      <ChevronUp className="ml-1 h-4 w-4" />
    ) : (
      <ChevronDown className="ml-1 h-4 w-4" />
    )
  }
  
  return (
    <div className="overflow-x-auto">
      <div className="flex items-center justify-between px-4 py-2">
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium">Filter:</span>
          <Button 
            variant={filterType === "All" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleFilter("All")}
          >
            All
          </Button>
          <Button 
            variant={filterType === "Preventive" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleFilter("Preventive")}
          >
            Preventive
          </Button>
          <Button 
            variant={filterType === "Corrective" ? "default" : "outline"} 
            size="sm"
            onClick={() => handleFilter("Corrective")}
          >
            Corrective
          </Button>
        </div>
      </div>
      
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              onClick={() => handleSort("id")}
            >
              <div className="flex cursor-pointer items-center">
                Equipment ID
                {renderSortIndicator("id")}
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              onClick={() => handleSort("serviceType")}
            >
              <div className="flex cursor-pointer items-center">
                Service Type
                {renderSortIndicator("serviceType")}
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              onClick={() => handleSort("date")}
            >
              <div className="flex cursor-pointer items-center">
                Date
                {renderSortIndicator("date")}
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              onClick={() => handleSort("technician")}
            >
              <div className="flex cursor-pointer items-center">
                Technician
                {renderSortIndicator("technician")}
              </div>
            </th>
            <th 
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              onClick={() => handleSort("status")}
            >
              <div className="flex cursor-pointer items-center">
                Status
                {renderSortIndicator("status")}
              </div>
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">
              Actions
            </th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr 
              key={row.id} 
              className="border-b transition-colors hover:bg-muted/50"
            >
              <td className="px-4 py-3 text-sm font-medium">{row.id}</td>
              <td className="px-4 py-3 text-sm">
                <StatusBadge type={row.serviceType as "Preventive" | "Corrective"} />
              </td>
              <td className="px-4 py-3 text-sm">{new Date(row.date).toLocaleDateString("pt-BR", {
                day: "2-digit",
                month: "2-digit",
                year: "2-digit"
              })}
              </td>
              <td className="px-4 py-3 text-sm">{row.technician}</td>
              <td className="px-4 py-3 text-sm">
                <StatusBadge status={row.status as "Completed" | "In Progress" | "Scheduled"} />
              </td>
              <td className="px-4 py-3 text-right">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal className="h-4 w-4" />
                      <span className="sr-only">Open menu</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuLabel>Actions</DropdownMenuLabel>
                    <DropdownMenuItem>
                      <Eye className="mr-2 h-4 w-4" />
                      <span>View details</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem>
                      <Edit className="mr-2 h-4 w-4" />
                      <span>Edit</span>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem className="text-red-600">
                      <Trash className="mr-2 h-4 w-4" />
                      <span>Delete</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
      
      {/* Pagination */}
      <div className="flex items-center justify-between px-4 py-4">
        <div className="text-sm text-muted-foreground">
          Showing <strong>{data.length}</strong> of <strong>{initialData.length}</strong> records
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
 }



