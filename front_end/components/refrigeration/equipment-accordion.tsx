'use client'

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import { Eye, Edit, Trash, Plus, Filter, Search } from "lucide-react"
import { StatusBadge } from "@/components/refrigeration/status-badge"

import { EquipmentDialog } from "@/components/refrigeration/equipment-dialog"
import { DeleteConfirmDialog } from "@/components/refrigeration/delete-confirm-dialog"
import { deleteEquipment } from "@/lib/actions/deletEquipment"

export function EquipmentAccordion({ stores }: { stores: any[] }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [expandedStores, setExpandedStores] = useState<string[]>(stores.map((store) => store.id))

  const filteredStores = stores.map((store) => ({
    ...store,
    equipment: store.equipment.filter((equipment: any) =>
      [equipment.id, equipment.model, equipment.serialNumber]
        .join(" ")
        .toLowerCase()
        .includes(searchQuery.toLowerCase())
    ),
  }))

  return (
    <div className="flex flex-col gap-6">
      <div>
        <h1 className="text-2xl font-bold tracking-tight">Gestão de Equipamentos</h1>
        <p className="text-muted-foreground">Visualize e gerencie os equipamentos das lojas</p>
      </div>

      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground h-4 w-4" />
          <Input
            type="search"
            placeholder="Pesquise por ID, modelo ou número de série..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
          </Button>
          <EquipmentDialog
            mode="add"
            onSave={(data) => {
              console.log("Novo equipamento:", data)
            }}
            trigger={
              <Button className="gap-2">
                <Plus className="h-4 w-4" />
                <span className="hidden sm:inline">Adicionar equipamento</span>
              </Button>
            }
          />
        </div>
      </div>

      <div className="rounded-xl border bg-card text-card-foreground shadow">
        <Accordion type="multiple" value={expandedStores} onValueChange={setExpandedStores}>
          {stores.map((store) => (
            <AccordionItem key={store.id} value={store.id}>
              <AccordionTrigger className="px-4 py-3 hover:bg-muted/50">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{store.name}</span>
                  <span className="rounded-full bg-primary/10 px-2 py-0.5 text-xs font-medium text-primary">
                    {store.equipment.length} unidades
                  </span>
                </div>
              </AccordionTrigger>
              <AccordionContent>
                <Table>
                  <TableHeader>
                    <TableRow>
                      <TableHead>ID</TableHead>
                      <TableHead>Modelo</TableHead>
                      <TableHead>Status</TableHead>
                      <TableHead>Instalação</TableHead>
                      <TableHead>Última Manutenção</TableHead>
                      <TableHead className="text-right">Ações</TableHead>
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {store.equipment.length ? (
                      store.equipment.map((e: any) => (
                        <TableRow key={e.id}>
                          <TableCell>{e.id}</TableCell>
                          <TableCell>
                            <div>{e.model}</div>
                            <div className="text-xs text-muted-foreground">{e.serialNumber}</div>
                          </TableCell>
                          <TableCell>
                            <StatusBadge statusEquipment={e.status}/>
                          </TableCell>
                          <TableCell>{new Date(e.installationDate).toLocaleDateString("pt-BR", {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                          })}</TableCell>
                          <TableCell>{new Date(e.lastMaintenance).toLocaleDateString("pt-BR", {
                            day: '2-digit',
                            month: '2-digit',
                            year: '2-digit',
                          })}</TableCell>
                          <TableCell className="text-right">
                            <div className="flex gap-2 justify-end">
                              <Button size="icon" variant="ghost"><Eye className="w-4 h-4" /></Button>

                              <EquipmentDialog
                              mode="edit"
                              equipment={e}
                              onSave={(data) => {
                                console.log("Equipamento editado:", data)
                                // Aqui pode chamar mutation, setState, etc.
                              }}
                              trigger={
                                <Button size="icon" variant="ghost">
                                  <Edit className="w-4 h-4" />
                                </Button>
                              }
                            />

                              <DeleteConfirmDialog
                                title="Excluir equipamento"
                                description={`Deseja realmente excluir o equipamento ${e.model}?`}
                                onConfirm={async () => {
                                  await deleteEquipment(e.id) // função que chama a API
                                }}
                                successMessage="Equipamento excluído com sucesso!"
                                errorMessage="Não foi possível excluir o equipamento."
                                trigger={
                                  <Button variant="ghost" size="icon" className="text-red-600 hover:text-red-700">
                                    <Trash className="w-4 h-4" />
                                  </Button>
                                }
                              />

                            </div>
                          </TableCell>
                        </TableRow>
                      ))
                    ) : (
                      <TableRow>
                        <TableCell colSpan={6} className="text-center h-24">
                          Nenhum equipamento encontrado para esta loja.
                        </TableCell>
                      </TableRow>
                    )}
                  </TableBody>
                </Table>
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </div>
  )
}
