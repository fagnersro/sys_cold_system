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
  { id: "R001", name: "Administrador", description: "Acesso total a todos os recursos" },
  { id: "R002", name: "Tecnico", description: "Manutênção e gestão de equipamentos" },
  { id: "R003", name: "Gerente", description: "Relatórios e gerenciamento de loja" },
  { id: "R004", name: "Visualizador", description: "Acesso somente a leitura dos dados" },
]

// Mock data for permissions
const permissionsData = {
  Administrador: {
    equipamento: { view: true, create: true, edit: true, delete: true },
    manutenção: { view: true, create: true, edit: true, delete: true },
    agendamento: { view: true, create: true, edit: true, delete: true },
    peças: { view: true, create: true, edit: true, delete: true },
    relatórios: { view: true, create: true, export: true },
    configurações: { view: true, edit: true },
  },
  Tecnico: {
    equipamento: { view: true, create: false, edit: true, delete: false },
    manutenção: { view: true, create: true, edit: true, delete: false },
    agendamento: { view: true, create: true, edit: true, delete: false },
    peças: { view: true, create: false, edit: false, delete: false },
    relatórios: { view: true, create: false, export: false },
    configurações: { view: false, edit: false },
  },
  Gerente: {
    equipamento: { view: true, create: true, edit: true, delete: false },
    manutenção: { view: true, create: false, edit: false, delete: false },
    agendamento: { view: true, create: true, edit: true, delete: true },
    peças: { view: true, create: true, edit: true, delete: false },
    relatórios: { view: true, create: true, export: true },
    configurações: { view: true, edit: false },
  },
  Visualizador: {
    equipamento: { view: true, create: false, edit: false, delete: false },
    manutenção: { view: true, create: false, edit: false, delete: false },
    agendamento: { view: true, create: false, edit: false, delete: false },
    peças: { view: true, create: false, edit: false, delete: false },
    relatórios: { view: true, create: false, export: false },
    configurações: { view: false, edit: false },
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
  const [selectedRole, setSelectedRole] = useState("Administrador")

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
          <h1 className="text-2xl font-bold tracking-tight">Configurações</h1>
          <p className="text-muted-foreground">Gerencie sua conta e preferência do sistema</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="profile" className="gap-2">
              <User className="h-4 w-4" />
              <span className="hidden sm:inline">Perfil</span>
            </TabsTrigger>
            <TabsTrigger value="preferences" className="gap-2">
              <Settings className="h-4 w-4" />
              <span className="hidden sm:inline">Preferências</span>
            </TabsTrigger>
            <TabsTrigger value="stores" className="gap-2">
              <Building className="h-4 w-4" />
              <span className="hidden sm:inline">Lojas</span>
            </TabsTrigger>
            <TabsTrigger value="permissions" className="gap-2">
              <ShieldCheck className="h-4 w-4" />
              <span className="hidden sm:inline">Permissões</span>
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <Card>
              <CardHeader>
                <CardTitle>Perfil do Usuário</CardTitle>
                <CardDescription>Gerencie suas informações pessoais e configurações de conta</CardDescription>
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
                        <span className="sr-only">Carregar Avatar</span>
                        <input id="avatar-upload" type="file" className="hidden" accept="image/*" />
                      </label>
                    </div>
                    <p className="text-sm text-muted-foreground">JPG, PNG or GIF, max 2MB</p>
                  </div>

                  <div className="flex-1 space-y-4">
                    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="first-name">Primeiro Nome</Label>
                        <Input id="first-name" defaultValue="Admin" />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="last-name">Sobrenome</Label>
                        <Input id="last-name" defaultValue="User" />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input id="email" type="email" defaultValue="admin@example.com" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Número de Telefone</Label>
                      <Input id="phone" type="tel" defaultValue="555-123-4567" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="role">Função</Label>
                      <Select defaultValue="administrator" disabled>
                        <SelectTrigger id="role">
                          <SelectValue placeholder="Selecione a função" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="administrator">Administrador</SelectItem>
                          <SelectItem value="technician">Técnico</SelectItem>
                          <SelectItem value="manager">Gerente</SelectItem>
                          <SelectItem value="viewer">Visualizador</SelectItem>
                        </SelectContent>
                      </Select>
                      <p className="text-xs text-muted-foreground">
                        Entre em contato com o administrador do sistema para alterar as funções
                      </p>
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="bio">Bio</Label>
                  <Textarea id="bio" placeholder="Conte-nos um pouco sobre você" className="min-h-[100px]" />
                </div>
              </CardContent>
              <CardFooter className="flex justify-between">
                <Button variant="outline" onClick={handlePasswordChange}>
                  <Lock className="mr-2 h-4 w-4" />
                  Alterar a Senha
                </Button>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Alterações
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <Card>
              <CardHeader>
                <CardTitle>Preferências do sistema</CardTitle>
                <CardDescription>Personalize sua experiência e configurações de notificação</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Aparência</h3>

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
                          {darkMode ? "Atualmente usando tema escuro" : "Atualmente usando tema claro"}
                        </p>
                      </div>
                    </div>
                    <Switch checked={darkMode} onCheckedChange={handleDarkModeToggle} />
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Linguagem</h3>

                  <div className="rounded-lg border p-4">
                    <div className="flex items-center space-x-4">
                      <Globe className="h-5 w-5 text-muted-foreground" />
                      <div className="flex-1">
                        <p className="font-medium">Idioma de Exibição</p>
                        <p className="text-sm text-muted-foreground">
                          Selecione seu idioma preferido para a interface
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
                  <h3 className="text-lg font-medium">Notificações</h3>

                  <div className="space-y-4">
                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Notificações por e-mail</p>
                          <p className="text-sm text-muted-foreground">Receba alertas por e-mail para eventos críticos</p>
                        </div>
                      </div>
                      <Switch checked={emailNotifications} onCheckedChange={setEmailNotifications} />
                    </div>

                    <div className="flex items-center justify-between rounded-lg border p-4">
                      <div className="flex items-center space-x-4">
                        <Bell className="h-5 w-5 text-muted-foreground" />
                        <div>
                          <p className="font-medium">Mostrar Notificações</p>
                          <p className="text-sm text-muted-foreground">Receba notificações no navegador</p>
                        </div>
                      </div>
                      <Switch checked={pushNotifications} onCheckedChange={setPushNotifications} />
                    </div>
                  </div>
                </div>

                <div className="space-y-4">
                  <h3 className="text-lg font-medium">Dados e Privacidade</h3>

                  <div className="rounded-lg border p-4">
                    <div className="space-y-4">
                      <div className="flex items-center space-x-2">
                        <Checkbox id="analytics" />
                        <Label htmlFor="analytics">Permitir coleta anônima de dados de uso</Label>
                      </div>

                      <div className="flex items-center space-x-2">
                        <Checkbox id="cookies" defaultChecked />
                        <Label htmlFor="cookies">Aceitar cookies funcionais</Label>
                      </div>

                      <p className="text-xs text-muted-foreground">
                        Coletamos dados de uso anônimos para melhorar sua experiência.
                        Você pode optar por sair a qualquer momento.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
              <CardFooter>
                <Button>
                  <Save className="mr-2 h-4 w-4" />
                  Salvar Preferências
                </Button>
              </CardFooter>
            </Card>
          </TabsContent>

          {/* Stores Tab */}
          <TabsContent value="stores">
            <Card>
              <CardHeader className="flex flex-row items-center justify-between space-y-0">
                <div>
                  <CardTitle>Gestão de Lojas</CardTitle>
                  <CardDescription>Adicionar, editar e gerenciar locais de lojas</CardDescription>
                </div>
                <Button onClick={handleAddStore}>
                  <Plus className="mr-2 h-4 w-4" />
                   Adicionar Loja
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
                          <span className="font-medium">Gerente:</span> {store.manager} •{" "}
                          <span className="font-medium">Telefone:</span> {store.phone}
                        </p>
                      </div>
                      <div className="mt-4 flex items-center gap-2 sm:mt-0">
                        <Button variant="outline" size="sm" onClick={() => handleEditStore(store)}>
                          <Edit className="mr-2 h-4 w-4" />
                          Editar
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="text-red-500 hover:bg-red-50 hover:text-red-600"
                          onClick={() => handleDeleteStoreConfirm(store)}
                        >
                          <Trash className="mr-2 h-4 w-4" />
                          Deletar
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
                <CardTitle>Premissões de Acesso</CardTitle>
                <CardDescription>Gerenciar funções e permissões de usuário</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="flex flex-col gap-4 sm:flex-row">
                  <div className="w-full space-y-4 sm:w-1/3">
                    <h3 className="text-lg font-medium">Funções do usuário</h3>

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
                      <h4 className="mb-2 font-medium">Adicionar novo usuário</h4>
                      <div className="space-y-2">
                        <div className="space-y-1">
                          <Label htmlFor="new-user-email">Email</Label>
                          <Input id="new-user-email" type="email" placeholder="user@example.com" />
                        </div>
                        <div className="space-y-1">
                          <Label htmlFor="new-user-role">Função</Label>
                          <Select defaultValue="viewer">
                            <SelectTrigger id="new-user-role">
                              <SelectValue placeholder="Select role" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="administrator">Administrador</SelectItem>
                              <SelectItem value="technician">Técnico</SelectItem>
                              <SelectItem value="manager">Gerente</SelectItem>
                              <SelectItem value="viewer">Visualizador</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                        <Button className="w-full">
                          <UserPlus className="mr-2 h-4 w-4" />
                          Convidar Usuário
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="w-full sm:w-2/3">
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <h3 className="text-lg font-medium">Permissões para {selectedRole}</h3>
                        <Button variant="outline" size="sm">
                          <Save className="mr-2 h-4 w-4" />
                          Salvar alterações
                        </Button>
                      </div>

                      <div className="rounded-lg border">
                        <Table>
                          <TableHeader>
                            <TableRow>
                              <TableHead className="w-[200px]">Módulo</TableHead>
                              <TableHead className="text-center">Visualizar</TableHead>
                              <TableHead className="text-center">Criar</TableHead>
                              <TableHead className="text-center">Editar</TableHead>
                              <TableHead className="text-center">Deletar</TableHead>
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
                        <h4 className="mb-2 font-medium">Descrição da Função</h4>
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
            <DialogTitle>{selectedStore ? "Editar Loja" : "Adicionar Nova Loja"}</DialogTitle>
            <DialogDescription>
              {selectedStore ? "Atualize os detalhes da loja abaixo." : "Preencha os detalhes para adicionar um novo local de loja."}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="store-name">Nome da Loja</Label>
              <Input
                id="store-name"
                placeholder="e.g. Downtown Supermarket"
                defaultValue={selectedStore?.name || ""}
                required
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="store-address">Endereço</Label>
              <Textarea
                id="store-address"
                placeholder="Full address"
                defaultValue={selectedStore?.address || ""}
                required
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="store-manager">Gerente</Label>
                <Input
                  id="store-manager"
                  placeholder="Manager name"
                  defaultValue={selectedStore?.manager || ""}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="store-phone">Telefone</Label>
                <Input id="store-phone" placeholder="Phone number" defaultValue={selectedStore?.phone || ""} required />
              </div>
            </div>

            <div className="space-y-2">
              <Label>Localização</Label>
              <div className="h-[200px] rounded-md bg-muted flex items-center justify-center">
                <MapPin className="h-8 w-8 text-muted-foreground" />
                <span className="ml-2 text-muted-foreground">Espaço reservado para Mapa</span>
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
              Cancelar
            </Button>
            <Button type="submit">{selectedStore ? "Atualizar Loja" : "Adicionar Loja"}</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Change Password Dialog */}
      <Dialog open={isPasswordDialogOpen} onOpenChange={setIsPasswordDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Alterar a Senha</DialogTitle>
            <DialogDescription>Digite sua senha atual e uma nova senha abaixo.</DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label htmlFor="current-password">Senha Atual</Label>
              <Input id="current-password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="new-password">Nova Senha</Label>
              <Input id="new-password" type="password" required />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirm-password">Confirme nova Senha</Label>
              <Input id="confirm-password" type="password" required />
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setIsPasswordDialogOpen(false)}>
              Cancelar
            </Button>
            <Button type="submit">Alterar a Senha</Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Store Confirmation Dialog */}
      <Dialog open={isDeleteStoreDialogOpen} onOpenChange={setIsDeleteStoreDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Confirmar Exclusão</DialogTitle>
            <DialogDescription>
              Tem certeza que deseja excluir {selectedStore?.name}? Esta ação não pode ser desfeita e 
              removerá todos os equipamentos associados e registros de manutênção.
            </DialogDescription>
          </DialogHeader>
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsDeleteStoreDialogOpen(false)}>
              Cancelar
            </Button>
            <Button variant="destructive" onClick={() => setIsDeleteStoreDialogOpen(false)}>
              Excluir Loja
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </RefrigerationDashboardLayout>
  )
}

