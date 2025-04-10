"use client";

import { useEffect } from "react";
import { Part, Equipment } from "@/app/dashboard/parts/types/inventory";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Textarea } from "@/components/ui/textarea";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

// Schema de validação
const partFormSchema = z.object({
  name: z.string().min(2, "Nome deve ter pelo menos 2 caracteres"),
  category: z.string().min(1, "Selecione uma categoria"),
  stock: z.number().min(0, "Estoque não pode ser negativo"),
  minLevel: z.number().min(0, "Nível mínimo não pode ser negativo"),
  price: z.number().min(0, "Preço não pode ser negativo"),
  compatibleWith: z.array(z.string()).min(1, "Selecione pelo menos um equipamento"),
  location: z.string().min(1, "Localização é obrigatória"),
  lastRestocked: z.string(),
  notes: z.string().optional()
});

type PartFormValues = z.infer<typeof partFormSchema>;

interface PartFormDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  part?: Part | null;
  equipment: Equipment[];
  onSubmit: (partData: Omit<Part, 'id'>) => void;
}

export function PartFormDialog({ open, onOpenChange, part, equipment, onSubmit }: PartFormDialogProps) {
  const { register, handleSubmit, reset, formState: { errors }, setValue, watch } = useForm<PartFormValues>({
    resolver: zodResolver(partFormSchema),
    defaultValues: {
      name: part?.name || '',
      category: part?.category || 'Compressor',
      stock: part?.stock || 0,
      minLevel: part?.minLevel || 0,
      price: part?.price || 0,
      compatibleWith: part?.compatibleWith || [],
      location: part?.location || '',
      lastRestocked: part?.lastRestocked || new Date().toISOString().split('T')[0],
      notes: ''
    }
  });

  const compatibleWith = watch("compatibleWith");

  // Reset form when part changes
  useEffect(() => {
    if (part) {
      reset({
        name: part.name,
        category: part.category,
        stock: part.stock,
        minLevel: part.minLevel,
        price: part.price,
        compatibleWith: part.compatibleWith,
        location: part.location,
        lastRestocked: part.lastRestocked,
        notes: ''
      });
    } else {
      reset({
        name: '',
        category: 'Compressor',
        stock: 0,
        minLevel: 0,
        price: 0,
        compatibleWith: [],
        location: '',
        lastRestocked: new Date().toISOString().split('T')[0],
        notes: ''
      });
    }
  }, [part, reset]);

  const handleFormSubmit = (data: PartFormValues) => {
    onSubmit({
      name: data.name,
      category: data.category,
      stock: Number(data.stock),
      minLevel: Number(data.minLevel),
      price: Number(data.price),
      compatibleWith: data.compatibleWith,
      location: data.location,
      lastRestocked: data.lastRestocked
    });
    onOpenChange(false);
  };

  const toggleEquipmentCompatibility = (equipmentId: string) => {
    const newCompatible = compatibleWith.includes(equipmentId)
      ? compatibleWith.filter(id => id !== equipmentId)
      : [...compatibleWith, equipmentId];
    setValue("compatibleWith", newCompatible);
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[600px]">
        <form onSubmit={handleSubmit(handleFormSubmit)}>
          <DialogHeader>
            <DialogTitle>{part ? "Editar Peça" : "Adicionar Peça"}</DialogTitle>
            <DialogDescription>
              {part ? "Atualize os detalhes da peça" : "Preencha os campos para adicionar uma nova peça"}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            {/* Nome e Categoria */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="name">Nome da Peça*</Label>
                <Input
                  id="name"
                  {...register("name")}
                  placeholder="Ex: Compressor A200"
                />
                {errors.name && <p className="text-sm text-red-500">{errors.name.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="category">Categoria*</Label>
                <Select
                  value={watch("category")}
                  onValueChange={(value) => setValue("category", value)}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selecione" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Compressor">Compressor</SelectItem>
                    <SelectItem value="Filter">Filtro</SelectItem>
                    <SelectItem value="Condenser">Condensador</SelectItem>
                    <SelectItem value="Motor">Motor</SelectItem>
                    <SelectItem value="Sensor">Sensor</SelectItem>
                    <SelectItem value="Electronics">Eletrônicos</SelectItem>
                  </SelectContent>
                </Select>
                {errors.category && <p className="text-sm text-red-500">{errors.category.message}</p>}
              </div>
            </div>

            {/* Estoque, Nível Mínimo e Preço */}
            <div className="grid grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="stock">Estoque Atual*</Label>
                <Input
                  id="stock"
                  type="number"
                  min="0"
                  {...register("stock", { valueAsNumber: true })}
                />
                {errors.stock && <p className="text-sm text-red-500">{errors.stock.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="minLevel">Nível Mínimo*</Label>
                <Input
                  id="minLevel"
                  type="number"
                  min="0"
                  {...register("minLevel", { valueAsNumber: true })}
                />
                {errors.minLevel && <p className="text-sm text-red-500">{errors.minLevel.message}</p>}
              </div>
              <div className="space-y-2">
                <Label htmlFor="price">Preço Unitário*</Label>
                <Input
                  id="price"
                  type="number"
                  min="0"
                  step="0.01"
                  {...register("price", { valueAsNumber: true })}
                />
                {errors.price && <p className="text-sm text-red-500">{errors.price.message}</p>}
              </div>
            </div>

            {/* Localização e Data */}
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="location">Localização</Label>
                <Input
                  id="location"
                  {...register("location")}
                  placeholder="Ex: Armazém A, Prateleira 3"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="lastRestocked">Última Reposição</Label>
                <Input
                  id="lastRestocked"
                  type="date"
                  {...register("lastRestocked")}
                />
              </div>
            </div>

            {/* Equipamentos Compatíveis */}
            <div className="space-y-2">
              <Label>Equipamentos Compatíveis*</Label>
              {errors.compatibleWith && (
                <p className="text-sm text-red-500">{errors.compatibleWith.message}</p>
              )}
              <div className="max-h-[150px] overflow-y-auto rounded-md border p-2">
                {equipment.length > 0 ? (
                  equipment.map((item) => (
                    <div key={item.id} className="flex items-center space-x-2 py-1">
                      <input
                        type="checkbox"
                        id={`equip-${item.id}`}
                        checked={compatibleWith.includes(item.id)}
                        onChange={() => toggleEquipmentCompatibility(item.id)}
                        className="h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                      />
                      <Label htmlFor={`equip-${item.id}`} className="flex flex-1 items-center justify-between cursor-pointer">
                        <span>{item.id}</span>
                        <span className="text-xs text-muted-foreground">{item.model}</span>
                      </Label>
                    </div>
                  ))
                ) : (
                  <p className="text-sm text-muted-foreground p-2">Nenhum equipamento cadastrado</p>
                )}
              </div>
            </div>

            {/* Notas Adicionais */}
            <div className="space-y-2">
              <Label htmlFor="notes">Notas</Label>
              <Textarea
                id="notes"
                {...register("notes")}
                placeholder="Informações adicionais sobre esta peça..."
                className="min-h-[80px]"
              />
            </div>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancelar
            </Button>
            <Button type="submit">
              {part ? "Atualizar Peça" : "Adicionar Peça"}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}