"use client";

import { useState } from "react";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import {   
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from "@/components/ui/tabs";

import { 
  Table, 
  TableBody, 
  TableCell, 
  TableHead, 
  TableHeader, 
  TableRow } from "@/components/ui/table"

import { 
  Plus, 
  Search, 
  Edit, 
  Trash, 
  QrCode, 
  History, 
  Filter, 
  Download } from "lucide-react";

import { usePartsManagement } from "../hooks/use-parts-management";
import { PartFormDialog, DeleteDialog, QRDialog } from "./dialogs";

import type { 
  Part, 
  Equipment, 
  UsageHistory } from "@/app/dashboard/parts/types/inventory";

interface PartsTableProps {
  initialParts: Part[];
  equipment: Equipment[];
  usageHistory: UsageHistory[];
}

export function PartsTable({ initialParts, equipment, usageHistory }: PartsTableProps) {
  const {
    parts,
    filteredParts,
    lowStockParts,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    selectedPart,
    setSelectedPart,
    getStockStatusClass,
    addPart,
    updatePart,
    deletePart
  } = usePartsManagement(initialParts);

  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [isQRDialogOpen, setIsQRDialogOpen] = useState(false);

  const handleAddNew = () => {
    setSelectedPart(null);
    setIsAddDialogOpen(true);
  };

  const handleEdit = (part: Part) => {
    setSelectedPart(part);
    setIsAddDialogOpen(true);
  };

  const handleDeleteConfirm = (part: Part) => {
    setSelectedPart(part);
    setIsDeleteDialogOpen(true);
  };

  const handleQRCode = (part: Part) => {
    setSelectedPart(part);
    setIsQRDialogOpen(true);
  };

  return (
    <div className="rounded-xl border bg-card text-card-foreground shadow">
      {/* Barra de ações e busca */}
      <div className="flex flex-col gap-4 p-4 sm:flex-row sm:items-center sm:justify-between">
        <div className="relative flex-1 max-w-md">
          <div className="absolute inset-y-0 left-0 flex items-center pl-3">
            <Search className="h-4 w-4 text-muted-foreground" />
          </div>
          <Input
            type="search"
            placeholder="Pesquisar peças por ID, nome ou categoria..."
            className="pl-10"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon">
            <Filter className="h-4 w-4" />
            <span className="sr-only">Filtro</span>
          </Button>
          <Button variant="outline" className="gap-2">
            <Download className="h-4 w-4" />
            <span className="hidden sm:inline">Exportar</span>
          </Button>
          <Button onClick={handleAddNew} className="gap-2">
            <Plus className="h-4 w-4" />
            <span className="hidden sm:inline">Adicionar Peça</span>
          </Button>
        </div>
      </div>

      {/* Abas de categorias */}
      <Tabs defaultValue="all" value={activeTab} onValueChange={setActiveTab}>
        <div className="flex items-center justify-between border-b px-4 py-2">
          <TabsList>
            <TabsTrigger value="all">Todas</TabsTrigger>
            <TabsTrigger value="Compressor">Compressores</TabsTrigger>
            <TabsTrigger value="Filter">Filtros</TabsTrigger>
            <TabsTrigger value="Sensor">Sensores</TabsTrigger>
            <TabsTrigger value="Electronics">Eletrônicos</TabsTrigger>
          </TabsList>
        </div>

        {/* Conteúdo das abas */}
        <TabsContent value="all" className="m-0">
          <PartsTableContent 
            parts={filteredParts} 
            equipment={equipment}
            onEdit={handleEdit}
            onDelete={handleDeleteConfirm}
            onQRCode={handleQRCode}
            getStockStatusClass={getStockStatusClass}
          />
        </TabsContent>
        
        {/* Abas específicas por categoria */}
        {['Compressor', 'Filter', 'Sensor', 'Electronics'].map((category) => (
          <TabsContent key={category} value={category} className="m-0">
            <PartsTableContent 
              parts={filteredParts.filter(p => p.category === category)} 
              equipment={equipment}
              onEdit={handleEdit}
              onDelete={handleDeleteConfirm}
              onQRCode={handleQRCode}
              getStockStatusClass={getStockStatusClass}
            />
          </TabsContent>
        ))}
      </Tabs>

      {/* Diálogos */}
      {/* <PartFormDialog
        open={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        part={selectedPart}
        equipment={equipment}
        onSubmit={(data) => {
          selectedPart 
            ? updatePart({ ...data, id: selectedPart.id })
            : addPart(data);
        }}
      /> */}

        <PartFormDialog
          open={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          part={selectedPart}  // Null para novo cadastro
          equipment={equipment}
          onSubmit={(data) => {
            if (selectedPart) {
              // Lógica para atualizar peça existente
              updatePart({ ...data, id: selectedPart.id });
            } else {
              // Lógica para adicionar nova peça
              addPart(data);
            }
          }}
        />

      <DeleteDialog
        open={isDeleteDialogOpen}
        onOpenChange={setIsDeleteDialogOpen}
        itemName={selectedPart?.name || ''}
        itemId={selectedPart?.id || ''}
        onConfirm={() => {
          if (selectedPart) {
            deletePart(selectedPart.id);
          }
        }}
      />

      <QRDialog
        open={isQRDialogOpen}
        onOpenChange={setIsQRDialogOpen}
        itemId={selectedPart?.id || ''}
        itemName={selectedPart?.name || ''}
      />
    </div>
  );
}

// Componente auxiliar para renderizar o conteúdo da tabela
function PartsTableContent({
  parts,
  equipment,
  onEdit,
  onDelete,
  onQRCode,
  getStockStatusClass
}: {
  parts: Part[];
  equipment: Equipment[];
  onEdit: (part: Part) => void;
  onDelete: (part: Part) => void;
  onQRCode: (part: Part) => void;
  getStockStatusClass: (stock: number, minLevel: number) => string;
}) {
  return (
    <div className="overflow-x-auto">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Nome</TableHead>
            <TableHead>Categoria</TableHead>
            <TableHead>Estoque</TableHead>
            <TableHead>Preço</TableHead>
            <TableHead>Compatível com</TableHead>
            <TableHead className="text-right">Ações</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {parts.length > 0 ? (
            parts.map((part) => (
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
                  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-medium ${getStockStatusClass(part.stock, part.minLevel)}`}>
                    {part.stock} / {part.minLevel}
                  </span>
                </TableCell>
                <TableCell>${part.price.toFixed(2)}</TableCell>
                <TableCell>
                  <div className="flex flex-wrap gap-1">
                    {part.compatibleWith.map((equipId) => {
                      const eq = equipment.find(e => e.id === equipId);
                      return (
                        <span
                          key={equipId}
                          className="inline-flex items-center rounded-full bg-blue-100 px-2 py-0.5 text-xs font-medium text-blue-700 dark:bg-blue-900/30 dark:text-blue-400"
                          title={eq?.model}
                        >
                          {equipId}
                        </span>
                      );
                    })}
                  </div>
                </TableCell>
                <TableCell className="text-right">
                  <div className="flex items-center justify-end gap-2">
                    <Button variant="ghost" size="icon" title="QR Code" onClick={() => onQRCode(part)}>
                      <QrCode className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Editar" onClick={() => onEdit(part)}>
                      <Edit className="h-4 w-4" />
                    </Button>
                    <Button variant="ghost" size="icon" title="Excluir" onClick={() => onDelete(part)}>
                      <Trash className="h-4 w-4" />
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={7} className="h-24 text-center">
                Nenhuma peça encontrada
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}