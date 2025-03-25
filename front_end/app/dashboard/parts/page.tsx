"use client"

import { useState } from "react"
import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Plus, Search, Edit, Trash, QrCode, AlertTriangle, BarChart3, History, Filter, Download } from "lucide-react"

// Mock data for parts
const partsData = [
  {
    id: "P001",
    name: "Compressor A200",
    category: "Compressor",
    stock: 5,
    minLevel: 3,
    price: 450.0,
    compatibleWith: ["RF-001", "RF-003"],
    lastRestocked: "2023-04-15",
    location: "Warehouse A, Shelf 3",
  },
  {
    id: "P002",
    name: "Filter F100",
    category: "Filter",
    stock: 12,
    minLevel: 10,
    price: 35.5,
    compatibleWith: ["RF-001", "RF-002", "RF-003", "RF-004", "RF-005"],
    lastRestocked: "2023-04-22",
    location: "Warehouse A, Shelf 1",
  },
  {
    id: "P003",
    name: "Condenser C300",
    category: "Condenser",
    stock: 2,
    minLevel: 2,
    price: 320.75,
    compatibleWith: ["RF-002", "RF-005"],
    lastRestocked: "2023-03-30",
    location: "Warehouse B, Shelf 4",
  },
  {
    id: "P004",
    name: "Fan Motor M150",
    category: "Motor",
    stock: 8,
    minLevel: 5,
    price: 125.0,
    compatibleWith: ["RF-001", "RF-003", "RF-004"],
    lastRestocked: "2023-04-10",
    location: "Warehouse A, Shelf 2",
  },
  {
    id: "P005",
    name: "Temperature Sensor TS50",
    category: "Sensor",
    stock: 15,
    minLevel: 8,
    price: 45.25,
    compatibleWith: ["RF-001", "RF-002", "RF-003", "RF-004", "RF-005"],
    lastRestocked: "2023-04-18",
    location: "Warehouse A, Shelf 1",
  },
  {
    id: "P006",
    name: "Control Board CB100",
    category: "Electronics",
    stock: 1,
    minLevel: 2,
    price: 275.5,
    compatibleWith: ["RF-002", "RF-005"],
    lastRestocked: "2023-03-25",
    location: "Warehouse B, Shelf 5",
  },
]

// Mock data for equipment
const equipmentData = [
  { id: "RF-001", model: "CoolMaster X500" },
  { id: "RF-002", model: "FrostKing 2000" },
  { id: "RF-003", model: "CoolMaster X700" },
  { id: "RF-004", model: "ArcticPro 1500" },
  { id: "RF-005", model: "FrostKing 3000" },
]

// Mock data for usage history
const usageHistoryData = [
  {
    id: "U001",
    partId: "P002",
    equipmentId: "RF-001",
    quantity: 1,
    date: "2023-04-28",
    technician: "John Smith",
    maintenanceId: "M001",
  },
  {
    id: "U002",
    partId: "P005",
    equipmentId: "RF-001",
    quantity: 1,
    date: "2023-04-28",
    technician: "John Smith",
    maintenanceId: "M001",
  },
  {
    id: "U003",
    partId: "P001",
    equipmentId: "RF-005",
    quantity: 1,
    date: "2023-05-01",
    technician: "Maria Garcia",
    maintenanceId: "M002",
  },
  {
    id: "U004",
    partId: "P005",
    equipmentId: "RF-002",
    quantity: 1,
    date: "2023-05-03",
    technician: "Sarah Johnson",
    maintenanceId: "M004",
  },
  {
    id: "U005",
    partId: "P006",
    equipmentId: "RF-002",
    quantity: 1,
    date: "2023-05-03",
    technician: "Sarah Johnson",
    maintenanceId: "M004",
  },
]

export default function PartsPage() {
  const [isDialogOpen, setIsDialogOpen] = useState(false)
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false)
  const [isQrDialogOpen, setIsQrDialogOpen] = useState(false)
  const [selectedPart, setSelectedPart] = useState<any>(null)
  const [searchQuery, setSearchQuery] = useState("")
  const [activeTab, setActiveTab] = useState("all")

  // Filter parts by search query and category
  const filteredParts = partsData.filter((part) => {
    const matchesSearch =
      part.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      part.category.toLowerCase().includes(searchQuery.toLowerCase())

    const matchesCategory = activeTab === "all" || part.category.toLowerCase() === activeTab.toLowerCase()

    return matchesSearch && matchesCategory
  })

  // Get parts that are below minimum level
  const lowStockParts = partsData.filter((part) => part.stock <= part.minLevel)

  // Handle form open for new part
  const handleAddNew = () => {
    setSelectedPart(null)
    setIsDialogOpen(true)
  }

  // Handle form open for editing
  const handleEdit = (part: any) => {
    setSelectedPart(part)
    setIsDialogOpen(true)
  }

  // Handle delete confirmation
  const handleDeleteConfirm = (part: any) => {
    setSelectedPart(part)
    setIsDeleteDialogOpen(true)
  }

  // Handle QR code generation
  const handleQrCode = (part: any) => {
    setSelectedPart(part)
    setIsQrDialogOpen(true)
  }

  // Get part usage history
  const getPartUsageHistory = (partId: string) => {
    return usageHistoryData.filter((usage) => usage.partId === partId)
  }

  // Get stock status class
  const getStockStatusClass = (stock: number, minLevel: number) => {
    if (stock === 0) return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400"
    if (stock <= minLevel) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400"
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400"
  }

  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Parts Inventory</h1>
          <p className="text-muted-foreground">Manage replacement parts and track inventory levels</p>
        </div>

        {/* Low Stock Alert */}
        {lowStockParts.length > 0 && (
          <div className="rounded-xl border border-yellow-200 bg-yellow-50 p-4 dark:border-yellow-900/50 dark:bg-yellow-900/20">
            <div className="flex items-start gap-3">
              <AlertTriangle className="mt-0.5 h-5 w-5 text-yellow-600 dark:text-yellow-500" />
              <div>
                <h3 className="font-medium text-yellow-800 dark:text-yellow-500">Low Stock Alert</h3>
                <p className="mt-1 text-sm text-yellow-700 dark:text-yellow-400">
                  {lowStockParts.length} {lowStockParts.length === 1 ? "part" : "parts"} below minimum stock level.
                </p>
                <div className="mt-2 flex flex-wrap gap-2">
                  {lowStockParts.map((part) => (
                    <div
                      key={part.id}
                      className="rounded-full bg-yellow-100 px-2.5 py-0.5 text-xs font-medium text-yellow-800 dark:bg-yellow-900/50 dark:text-yellow-300"
                    >
                      {part.name} ({part.stock}/{part.minLevel})
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Search and Actions */}
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative flex-1 max-w-md">
            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
              <Search className="h-4 w-4 text-muted-foreground" />
            </div>
            <Input
              type="search"
              placeholder="Search parts by ID, name or category..."
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <div className="flex items-center gap-2">
            <Button variant="outline" size="icon">
              <Filter className="h-4 w-4" />
              <span className="sr-only">Filter</span>
            </Button>
            <Button variant="outline" className="gap-2">
              <Download className="h-4 w-4" />
              <span className="hidden sm:inline">Export</span>
            </Button>
            <Button onClick={handleAddNew} className="gap-2">
              <Plus className="h-4 w-4" />
              <span className="hidden sm:inline">Add Part</span>
            </Button>
          </div>
        </div>

        {/* Parts Tabs and Table */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
            <div className="flex items-center justify-between border-b px-4 py-2">
              <TabsList>
                <TabsTrigger value="all">All Categories</TabsTrigger>
                <TabsTrigger value="compressor">Compressors</TabsTrigger>
                <TabsTrigger value="filter">Filters</TabsTrigger>
                <TabsTrigger value="sensor">Sensors</TabsTrigger>
                <TabsTrigger value="electronics">Electronics</TabsTrigger>
              </TabsList>
            </div>

            <TabsContent value="all" className="m-0">
              <div className="overflow-x-auto">
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Name</TableHead>
                      <TableHead>Category</TableHead>
                      <TableHead>Stock</TableHead>
                      <TableHead>Price</TableHead>
                      <TableHead>Compatible With</TableHead>
                      <TableHead className="text-right">Actions</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {filteredParts.length > 0 ? (
                      filteredParts.map((part) => (
                        <TableRow key={part.id} className="hover:bg-muted/50">
                          <TableCell className="font-medium">{part.id}</TableCell>
                          <TableCell>
                            <div>
                              <div>{part.name}</div>
                              <div className="text-xs text-muted-foreground">{part.location}</div>
                            </div>
                          </TableCell>
                          <TableCell>{part.category}</TableCell>
                          <TableCell>
                            <div className="flex items-center gap-2">
                              <span
                                className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStockStatusClass(part.stock, part.minLevel)}`}
                              >
                                {part.stock} / {part.minLevel}
                              </span>
                            </div>
                          </TableCell>
                          <TableCell>${part.price.toFixed(2)}</TableCell>
                          <TableCell>
                            <div className="flex flex-wrap gap-1">
                              {part.compatibleWith.map((equipId) => {
                                const equipment = equipmentData.find((e) => e.id === equipId)
                                return (
                                  <span
                                    key={equipId}
                                    className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                                    title={equipment?.model}
                                  >
                                    {equipId}
                                  </span>
                                )
                              })}
                            </div>
                          </TableCell>
                          <TableCell className="text-right">
                            <div className="flex items-center justify-end gap-2">
                              <Button variant="ghost" size="icon" title="QR Code" onClick={() => handleQrCode(part)}>
                                <QrCode className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Usage History">
                                <History className="h-4 w-4" />
                              </Button>
                              <Button variant="ghost" size="icon" title="Edit" onClick={() => handleEdit(part)}>
                                <Edit className="h-4 w-4" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                title="Delete"
                                onClick={() => handleDeleteConfirm(part)}
                              >
                                <Trash className="h-4 w-4" />
                              </Button>
                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={7} className="h-24 text-center">
                          No parts found.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </div>
            </TabsContent>

            {/* Other tabs have the same structure */}
            <TabsContent value="compressor" className="m-0">
              {/* Same table structure as "all" tab */}
            </TabsContent>

            <TabsContent value="filter" className="m-0">
              {/* Same table structure as "all" tab */}
            </TabsContent>

            <TabsContent value="sensor" className="m-0">
              {/* Same table structure as "all" tab */}
            </TabsContent>

            <TabsContent value="electronics" className="m-0">
              {/* Same table structure as "all" tab */}
            </TabsContent>
          </Tabs>
        </div>

        {/* Usage History Section */}
        <div className="rounded-xl border bg-card text-card-foreground shadow">
          <div className="flex items-center justify-between border-b px-6 py-4">
            <h2 className="text-lg font-semibold">Recent Usage History</h2>
            <Button variant="outline" size="sm" className="gap-2">
              <BarChart3 className="h-4 w-4" />
              <span>View Analytics</span>
            </Button>
          </div>

          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>Part</TableHead>
                  <TableHead>Equipment</TableHead>
                  <TableHead>Quantity</TableHead>
                  <TableHead>Technician</TableHead>
                  <TableHead>Maintenance ID</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {usageHistoryData.map((usage) => {
                  const part = partsData.find((p) => p.id === usage.partId)
                  const equipment = equipmentData.find((e) => e.id === usage.equipmentId)

                  return (
                    <TableRow key={usage.id} className="hover:bg-muted/50">
                      <TableCell>{new Date(usage.date).toLocaleDateString()}</TableCell>
                      <TableCell>
                        <div>
                          <div className="font-medium">{part?.name}</div>
                          <div className="text-xs text-muted-foreground">{usage.partId}</div>
                        </div>
                      </TableCell>
                      <TableCell>
                        <div>
                          <div>{equipment?.model}</div>
                          <div className="text-xs text-muted-foreground">{usage.equipmentId}</div>
                        </div>
                      </TableCell>
                      <TableCell>{usage.quantity}</TableCell>
                      <TableCell>{usage.technician}</TableCell>
                      <TableCell>
                        <a href="#" className="text-blue-600 hover:underline dark:text-blue-400">
                          {usage.maintenanceId}
                        </a>
                      </TableCell>
                    </TableRow>
                  )
                })}
              </TableBody>
            </Table>
          </div>
        </div>
      </div>

      {/* Add/Edit Part Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedPart ? "Edit Part" : "Add New Part"}</DialogTitle>
            <DialogDescription>
              {selectedPart ? "Update the part details below." : "Fill in the details to add a new part to inventory."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Part Name</Label>
                <Input id="name" placeholder="e.g. Compressor A200" defaultValue={selectedPart?.name || ""} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Category</Label>
                <Select defaultValue={selectedPart?.category || ""}>
                  <SelectTrigger id="category">
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Compressor">Compressor</SelectItem>
                    <SelectItem value="Filter">Filter</SelectItem>
                    <SelectItem value="Condenser">Condenser</SelectItem>
                    <SelectItem value="Motor">Motor</SelectItem>
                    <SelectItem value="Sensor">Sensor</SelectItem>
                    <SelectItem value="Electronics">Electronics</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Current Stock</Label>
                <Input id="stock" type="number" min="0" defaultValue={selectedPart?.stock.toString() || "0"} required />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minLevel">Minimum Level</Label>
                <Input
                  id="minLevel"
                  type="number"
                  min="0"
                  defaultValue={selectedPart?.minLevel.toString() || "0"}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Price ($)</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  defaultValue={selectedPart?.price.toString() || "0.00"}
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="location">Storage Location</Label>
              <Input
                id="location"
                placeholder="e.g. Warehouse A, Shelf 3"
                defaultValue={selectedPart?.location || ""}
              />
            </div>

            <div className="space-y-2">
              <Label>Compatible Equipment</Label>
              <div className="max-h-[150px] overflow-y-auto rounded-md border p-4">
                {equipmentData.map((equipment) => (
                  <div key={equipment.id} className="flex items-center space-x-2 py-2">
                    <input
                      type="checkbox"
                      id={`equipment-${equipment.id}`}
                      className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      defaultChecked={selectedPart?.compatibleWith?.includes(equipment.id)}
                    />
                    <Label
                      htmlFor={`equipment-${equipment.id}`}
                      className="flex flex-1 items-center justify-between cursor-pointer"
                    >
                      <span>{equipment.id}</span>
                      <span className="text-xs text-muted-foreground">{equipment.model}</span>
                    </Label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="notes">Notes</Label>
              <Textarea id="notes" placeholder="Additional information about this part..." className="min-h-[80px]" />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{selectedPart ? "Update Part" : "Add Part"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation Dialog */}
      <Dialog open={isDeleteDialogOpen} onOpenChange={setIsDeleteDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedPart?.name} ({selectedPart?.id})? This action cannot be undone.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteDialogOpen(false)}>
              Delete Part
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* QR Code Dialog */}
      <Dialog open={isQrDialogOpen} onOpenChange={setIsQrDialogOpen}>
        <DialogContent className="sm:max-w-[400px]">
          <DialogHeader>
            <DialogTitle>Part QR Code</DialogTitle>
            <DialogDescription>Scan this code to quickly identify and track {selectedPart?.name}.</DialogDescription>
          </DialogHeader>

          <div className="flex flex-col items-center justify-center py-4">
            <div className="bg-white p-4 rounded-lg">
              {/* Placeholder for QR code - in a real app, this would be generated */}
              <div className="h-48 w-48 bg-gray-100 flex items-center justify-center">
                <QrCode className="h-24 w-24 text-gray-400" />
              </div>
            </div>
            <div className="mt-4 text-center">
              <p className="font-medium">{selectedPart?.id}</p>
              <p className="text-sm text-muted-foreground">{selectedPart?.name}</p>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsQrDialogOpen(false)}>
              Close
            </Button>
            <Button>Print QR Code</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RefrigerationDashboardLayout>
  )
}

