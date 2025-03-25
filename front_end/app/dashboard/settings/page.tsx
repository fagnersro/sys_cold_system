"use client"

import { useState } from "react"
import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
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
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import {
  User,
  Upload,
  Lock,
  Moon,
  Sun,
  Bell,
  Globe,
  Building,
  MapPin,
  Plus,
  Edit,
  Trash,
  Save,
  UserPlus,
  ShieldCheck,
  Eye,
  EyeOff,
  Settings,
  Check,
  X,
} from "lucide-react"

// Mock data for stores
const storesData = [
  {
    id: "S001",
    name: "Downtown Supermarket",
    address: "123 Main St, Downtown, City",
    phone: "555-123-4567",
    manager: "John Anderson",
    coordinates: { lat: 40.7128, lng: -74.006 },
  },
  {
    id: "S002",
    name: "Westside Grocery",
    address: "456 West Ave, Westside, City",
    phone: "555-987-6543",
    manager: "Emily Rodriguez",
    coordinates: { lat: 40.7218, lng: -74.0434 },
  },
  {
    id: "S003",
    name: "Harbor Fresh Market",
    address: "789 Harbor Blvd, Harborside, City",
    phone: "555-456-7890",
    manager: "Michael Chen",
    coordinates: { lat: 40.7023, lng: -73.9871 },
  },
]

// Mock data for user roles
const rolesData = [
  { id: "R001", name: "Administrator", description: "Full access to all features" },
  { id: "R002", name: "Technician", description: "Maintenance and equipment management" },
  { id: "R003", name: "Manager", description: "Reports and store management" },
  { id: "R004", name: "Viewer", description: "Read-only access to data" },
]

// Mock data for permissions
const permissionsData = {
  Administrator: {
    equipment: { view: true, create: true, edit: true, delete: true },
    maintenance: { view: true, create: true, edit: true, delete: true },
    schedule: { view: true, create: true, edit: true, delete: true },
    parts: { view: true, create: true, edit: true, delete: true },
    reports: { view: true, create: true, export: true },
    settings: { view: true, edit: true },
  },
  Technician: {
    equipment: { view: true, create: false, edit: true, delete: false },
    maintenance: { view: true, create: true, edit: true, delete: false },
    schedule: { view: true, create: true, edit: true, delete: false },
    parts: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: false, export: false },
    settings: { view: false, edit: false },
  },
  Manager: {
    equipment: { view: true, create: true, edit: true, delete: false },
    maintenance: { view: true, create: false, edit: false, delete: false },
    schedule: { view: true, create: true, edit: true, delete: true },
    parts: { view: true, create: true, edit: true, delete: false },
    reports: { view: true, create: true, export: true },
    settings: { view: true, edit: false },
  },
  Viewer: {
    equipment: { view: true, create: false, edit: false, delete: false },
    maintenance: { view: true, create: false, edit: false, delete: false },
    schedule: { view: true, create: false, edit: false, delete: false },
    parts: { view: true, create: false, edit: false, delete: false },
    reports: { view: true, create: false, export: false },
    settings: { view: false, edit: false },
  },
}

export default function SettingsPage() {
  const [activeTab, setActiveTab] = useState("profile")
  const [isStoreDialogOpen, setIsStoreDialogOpen] = useState(false)
  const [isPasswordDialogOpen, setIsPasswordDialogOpen] = useState(false)
  const [isDeleteStoreDialogOpen, setIsDeleteStoreDialogOpen] = useState(false)
  const [selectedStore, setSelectedStore] = useState<any>(null)
  const [darkMode, setDarkMode] = useState(false)
  const [language, setLanguage] = useState("en")
  const [emailNotifications, setEmailNotifications] = useState(true)
  const [pushNotifications, setPushNotifications] = useState(true)
  const [selectedRole, setSelectedRole] = useState("Administrator")

  // Handle store form open for new store
  const handleAddStore = () => {
    setSelectedStore(null)
    setIsStoreDialogOpen(true)
  }

  // Handle store form open for editing
  const handleEditStore = (store: any) => {
    setSelectedStore(store)
    setIsStoreDialogOpen(true)
  }

  // Handle store delete confirmation
  const handleDeleteStoreConfirm = (store: any) => {
    setSelectedStore(store)
    setIsDeleteStoreDialogOpen(true)
  }

  // Handle password change dialog
  const handlePasswordChange = () => {
    setIsPasswordDialogOpen(true)
  }

  // Handle dark mode toggle
  const handleDarkModeToggle = () => {
    setDarkMode(!darkMode)
    // In a real app, this would update the theme
    if (!darkMode) {
      document.documentElement.classList.add("dark")
    } else {
      document.documentElement.classList.remove("dark")
    }
  }

  return (
    <RefrigerationDashboardLayout>
      <div className="flex flex-col gap-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold tracking-tight">Settings</h1>
          <p className="text-muted-foreground">Manage your account and system preferences</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Profile</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Preferences</span>
            </TabsTrigger>
            <TabsTrigger value="stores" className="gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Stores</span>
            </TabsTrigger>
            <TabsTrigger value="permissions" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Permissions</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>User Profile</CardTitle>
                <CardDescription>Manage your personal information and account settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-6 sm:flex-row">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="relative">
                      <div className="h-24 w-24 overflow-hidden rounded-full bg-muted">
                        <User className="h-full w-full p-4 text-muted-foreground" />
                      </div>
                      <label
                        htmlFor="avatar-upload"
                        className="absolute bottom-0 right-0 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-primary text-primary-foreground hover:bg-primary/90"
                      >
                        <Upload className="h-4 w-4" />
                        <span className="sr-only">Upload avatar</span>
                        <input id="avatar-upload" type="file" className="hidden" accept="image/*" />
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground">JPG, PNG or GIF, max 2MB</p>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">First Name</Label>
                        <Input id="first-name" defaultValue="Admin" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Last Name</Label>
                        <Input id="last-name" defaultValue="User" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="admin@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input id="phone" type="tel" defaultValue="555-123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Role</Label>
                      <Select defaultValue="administrator" disabled>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Select role" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="administrator">Administrator</SelectItem>
                          <SelectItem value="technician">Technician</SelectItem>
                          <SelectItem value="manager">Manager</SelectItem>
                          <SelectItem value="viewer">Viewer</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">Contact your system administrator to change roles</p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Tell us a little about yourself" className="min-h-[100px]" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePasswordChange}>
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Changes
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>System Preferences</CardTitle>
                <CardDescription>Customize your experience and notification settings</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Appearance</h3>

                  <div className="flex items-center justify-between rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      {darkMode ? (
                        <Moon className="h-5 w-5 text-blue-500" />
                      ) : (
                        <Sun className="h-5 w-5 text-yellow-500" />
                      )}
                      <div>
                        <p className="font-medium">Dark Mode</p>
                        <p className="text-sm text-muted-foreground">
                          {darkMode ? "Currently using dark theme" : "Currently using light theme"}
                        </p>
                      </div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Language</h3>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">Display Language</p>
                        <p className="text-sm text-muted-foreground">
                          Select your preferred language for the interface
                        </p>
                      </div>
                      <Select value={language} onValueChange={setLanguage}>
                        <SelectTrigger className="w-[180px]">
                          <SelectValue placeholder="Select language" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="en">English</SelectItem>
                          <SelectItem value="es">Español</SelectItem>
                          <SelectItem value="pt">Português</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Notifications</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Email Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive email alerts for critical events</p>
                        </div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Push Notifications</p>
                          <p className="text-sm text-muted-foreground">Receive push notifications in the browser</p>
                        </div>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Data & Privacy</h3>

                  <div className="rounded-lg border p-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="analytics" />
                        <Label htmlFor="analytics">Allow anonymous usage data collection</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="cookies" defaultChecked />
                        <Label htmlFor="cookies">Accept functional cookies</Label>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        We collect anonymous usage data to improve your experience. You can opt out at any time.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Save Preferences
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Stores Tab */}
          <TabsContent value="stores">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Store Management</CardTitle>
                  <CardDescription>Add, edit, and manage store locations</CardDescription>
                </div>
                <Button onClick={handleAddStore}>
                  <Plus className="mr-2 h-4 w-4" />
                  Add Store
                </Button>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {storesData.map((store) => (
                    <div
                      key={store.id}
                      className="flex flex-col rounded-lg border p-4 sm:flex-row sm:items-center sm:justify-between"
                    >
                      <div className="space-y-1">
                        <h3 className="font-medium">{store.name}</h3>
                        <div className="flex items-center text-sm text-muted-foreground">
                          <MapPin className="mr-1 h-3.5 w-3.5" />
                          <span>{store.address}</span>
                        </div>
                        <p className="text-sm">
                          <span className="font-medium">Manager:</span> {store.manager} •{" "}
                          <span className="font-medium">Phone:</span> {store.phone}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 sm:mt-0">
                        <Button variant="outline" size="sm" onClick={() => handleEditStore(store)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDeleteStoreConfirm(store)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Delete
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          {/* Permissions Tab */}
          <TabsContent value="permissions">
            <Card>
              <CardHeader>
                <CardTitle>Access Permissions</CardTitle>
                <CardDescription>Manage user roles and permissions</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="w-full space-y-4 sm:w-1/3">
                    <h3 className="text-lg font-medium">User Roles</h3>

                    <div className="space-y-2">
                      {rolesData.map((role) => (
                        <div
                          key={role.id}
                          className={`cursor-pointer rounded-lg border p-3 transition-colors hover:bg-muted/50 ${
                            selectedRole === role.name ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" : ""
                          }`}
                          onClick={() => setSelectedRole(role.name)}
                        >
                          <div className="font-medium">{role.name}</div>
                          <div className="text-sm text-muted-foreground">{role.description}</div>
                        </div>
                      ))}
                    </div>

                    <div className="rounded-lg border p-4">
                      <h4 className="mb-2 font-medium">Add New User</h4>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="new-user-email">Email</Label>
                          <Input id="new-user-email" type="email" placeholder="user@example.com" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="new-user-role">Role</Label>
                          <Select defaultValue="viewer">
                            <SelectTrigger id="new-user-role">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="administrator">Administrator</SelectItem>
                              <SelectItem value="technician">Technician</SelectItem>
                              <SelectItem value="manager">Manager</SelectItem>
                              <SelectItem value="viewer">Viewer</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Invite User
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-2/3">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Permissions for {selectedRole}</h3>
                        <Button variant="outline" size="sm">
                          <Save className="mr-2 h-4 w-4" />
                          Save Changes
                        </Button>
                      </div>

                      <div className="rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[200px]">Module</TableHead>
                              <TableHead className="text-center">View</TableHead>
                              <TableHead className="text-center">Create</TableHead>
                              <TableHead className="text-center">Edit</TableHead>
                              <TableHead className="text-center">Delete</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {Object.entries(permissionsData[selectedRole as keyof typeof permissionsData]).map(
                              ([module, permissions]) => (
                                <TableRow key={module}>
                                  <TableCell className="font-medium capitalize">{module}</TableCell>
                                  <TableCell className="text-center">
                                    {permissions.view ? (
                                      <Eye className="mx-auto h-4 w-4 text-green-500" />
                                    ) : (
                                      <EyeOff className="mx-auto h-4 w-4 text-muted-foreground" />
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {permissions.create !== undefined ? (
                                      permissions.create ? (
                                        <Check className="mx-auto h-4 w-4 text-green-500" />
                                      ) : (
                                        <X className="mx-auto h-4 w-4 text-muted-foreground" />
                                      )
                                    ) : permissions.export !== undefined ? (
                                      permissions.export ? (
                                        <Check className="mx-auto h-4 w-4 text-green-500" />
                                      ) : (
                                        <X className="mx-auto h-4 w-4 text-muted-foreground" />
                                      )
                                    ) : null}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {permissions.edit ? (
                                      <Check className="mx-auto h-4 w-4 text-green-500" />
                                    ) : (
                                      <X className="mx-auto h-4 w-4 text-muted-foreground" />
                                    )}
                                  </TableCell>
                                  <TableCell className="text-center">
                                    {permissions.delete !== undefined ? (
                                      permissions.delete ? (
                                        <Check className="mx-auto h-4 w-4 text-green-500" />
                                      ) : (
                                        <X className="mx-auto h-4 w-4 text-muted-foreground" />
                                      )
                                    ) : null}
                                  </TableCell>
                                </TableRow>
                              ),
                            )}
                          </TableBody>
                        </Table>
                      </div>

                      <div className="rounded-lg border p-4">
                        <h4 className="mb-2 font-medium">Role Description</h4>
                        <Textarea
                          defaultValue={rolesData.find((role) => role.name === selectedRole)?.description}
                          className="min-h-[100px]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>

      {/* Add/Edit Store Dialog */}
      <Dialog open={isStoreDialogOpen} onOpenChange={setIsStoreDialogOpen}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedStore ? "Edit Store" : "Add New Store"}</DialogTitle>
            <DialogDescription>
              {selectedStore ? "Update the store details below." : "Fill in the details to add a new store location."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Store Name</Label>
              <Input
                id="store-name"
                placeholder="e.g. Downtown Supermarket"
                defaultValue={selectedStore?.name || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-address">Address</Label>
              <Textarea
                id="store-address"
                placeholder="Full address"
                defaultValue={selectedStore?.address || ""}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-manager">Manager</Label>
                <Input
                  id="store-manager"
                  placeholder="Manager name"
                  defaultValue={selectedStore?.manager || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-phone">Phone</Label>
                <Input id="store-phone" placeholder="Phone number" defaultValue={selectedStore?.phone || ""} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Location</Label>
              <div className="h-[200px] rounded-md bg-muted flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Map placeholder</span>
              </div>
              <p className="text-xs text-muted-foreground">
                Click on the map to set the store location or enter coordinates manually below.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-lat">Latitude</Label>
                <Input id="store-lat" placeholder="e.g. 40.7128" defaultValue={selectedStore?.coordinates?.lat || ""} />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-lng">Longitude</Label>
                <Input
                  id="store-lng"
                  placeholder="e.g. -74.0060"
                  defaultValue={selectedStore?.coordinates?.lng || ""}
                />
              </div>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsStoreDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">{selectedStore ? "Update Store" : "Add Store"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Change Password</DialogTitle>
            <DialogDescription>Enter your current password and a new password below.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Current Password</Label>
              <Input id="current-password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">New Password</Label>
              <Input id="new-password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirm New Password</Label>
              <Input id="confirm-password" type="password" required />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancel
            </Button>
            <Button type="submit">Change Password</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Store Confirmation Dialog */}
      <Dialog open={isDeleteStoreDialogOpen} onOpenChange={setIsDeleteStoreDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirm Deletion</DialogTitle>
            <DialogDescription>
              Are you sure you want to delete {selectedStore?.name}? This action cannot be undone and will remove all
              associated equipment and maintenance records.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteStoreDialogOpen(false)}>
              Cancel
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteStoreDialogOpen(false)}>
              Delete Store
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RefrigerationDashboardLayout>
  )
}

