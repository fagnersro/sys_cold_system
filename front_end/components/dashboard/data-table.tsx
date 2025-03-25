"use client"

import { useState } from "react"
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

// Mock data for the table
const initialData = [
  {
    id: "INV-001",
    customer: "John Doe",
    email: "john@example.com",
    amount: "$250.00",
    status: "Paid",
    date: "2023-05-01",
  },
  {
    id: "INV-002",
    customer: "Jane Smith",
    email: "jane@example.com",
    amount: "$125.50",
    status: "Pending",
    date: "2023-05-02",
  },
  {
    id: "INV-003",
    customer: "Robert Johnson",
    email: "robert@example.com",
    amount: "$540.00",
    status: "Paid",
    date: "2023-05-03",
  },
  {
    id: "INV-004",
    customer: "Emily Davis",
    email: "emily@example.com",
    amount: "$90.25",
    status: "Failed",
    date: "2023-05-04",
  },
  {
    id: "INV-005",
    customer: "Michael Wilson",
    email: "michael@example.com",
    amount: "$300.00",
    status: "Pending",
    date: "2023-05-05",
  },
]

type SortField = "id" | "customer" | "amount" | "status" | "date"
type SortDirection = "asc" | "desc"

export function DataTable() {
  const [data, setData] = useState(initialData)
  const [sortField, setSortField] = useState<SortField>("date")
  const [sortDirection, setSortDirection] = useState<SortDirection>("desc")

  // Handle sorting
  const handleSort = (field: SortField) => {
    if (sortField === field) {
      setSortDirection(sortDirection === "asc" ? "desc" : "asc")
    } else {
      setSortField(field)
      setSortDirection("asc")
    }

    // Sort the data
    const sortedData = [...data].sort((a, b) => {
      if (field === "amount") {
        // Remove $ and convert to number for amount sorting
        const aValue = Number.parseFloat(a[field].replace("$", ""))
        const bValue = Number.parseFloat(b[field].replace("$", ""))
        return sortDirection === "asc" ? aValue - bValue : bValue - aValue
      } else {
        const aValue = a[field]
        const bValue = b[field]
        if (sortDirection === "asc") {
          return aValue.localeCompare(bValue)
        } else {
          return bValue.localeCompare(aValue)
        }
      }
    })

    setData(sortedData)
  }

  // Render sort indicator
  const renderSortIndicator = (field: SortField) => {
    if (sortField !== field) return null

    return sortDirection === "asc" ? <ChevronUp className="ml-1 h-4 w-4" /> : <ChevronDown className="ml-1 h-4 w-4" />
  }

  // Get status badge class
  const getStatusClass = (status: string) => {
    switch (status) {
      case "Paid":
        return "bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300"
      case "Pending":
        return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900 dark:text-yellow-300"
      case "Failed":
        return "bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300"
      default:
        return "bg-gray-100 text-gray-700 dark:bg-gray-800 dark:text-gray-300"
    }
  }

  return (
    <div className="overflow-x-auto">
      <table className="w-full border-collapse">
        <thead>
          <tr className="border-b bg-muted/50">
            <th
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              onClick={() => handleSort("id")}
            >
              <div className="flex cursor-pointer items-center">
                Invoice
                {renderSortIndicator("id")}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              onClick={() => handleSort("customer")}
            >
              <div className="flex cursor-pointer items-center">
                Customer
                {renderSortIndicator("customer")}
              </div>
            </th>
            <th
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              onClick={() => handleSort("amount")}
            >
              <div className="flex cursor-pointer items-center">
                Amount
                {renderSortIndicator("amount")}
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
            <th
              className="px-4 py-3 text-left text-sm font-medium text-muted-foreground"
              onClick={() => handleSort("date")}
            >
              <div className="flex cursor-pointer items-center">
                Date
                {renderSortIndicator("date")}
              </div>
            </th>
            <th className="px-4 py-3 text-right text-sm font-medium text-muted-foreground">Actions</th>
          </tr>
        </thead>
        <tbody>
          {data.map((row) => (
            <tr key={row.id} className="border-b transition-colors hover:bg-muted/50">
              <td className="px-4 py-3 text-sm font-medium">{row.id}</td>
              <td className="px-4 py-3 text-sm">
                <div>
                  <div className="font-medium">{row.customer}</div>
                  <div className="text-xs text-muted-foreground">{row.email}</div>
                </div>
              </td>
              <td className="px-4 py-3 text-sm">{row.amount}</td>
              <td className="px-4 py-3 text-sm">
                <span
                  className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStatusClass(row.status)}`}
                >
                  {row.status}
                </span>
              </td>
              <td className="px-4 py-3 text-sm">{new Date(row.date).toLocaleDateString()}</td>
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
          Showing <strong>1</strong> to <strong>5</strong> of <strong>15</strong> results
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="sm" disabled>
            Previous
          </Button>
          <Button variant="outline" size="sm" className="bg-primary text-primary-foreground">
            1
          </Button>
          <Button variant="outline" size="sm">
            2
          </Button>
          <Button variant="outline" size="sm">
            3
          </Button>
          <Button variant="outline" size="sm">
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}

