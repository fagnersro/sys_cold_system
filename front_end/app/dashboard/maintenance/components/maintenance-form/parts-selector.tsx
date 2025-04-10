"use client";

import { partsData } from "@/app/dashboard/maintenance/data/mock-parts";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";

interface PartsSelectorProps {
  parts: typeof partsData;
  selectedParts: string[];
  onPartToggle: (partId: string) => void;
}

export function PartsSelector({ 
  parts, 
  selectedParts, 
  onPartToggle 
}: PartsSelectorProps) {
  return (
    <div className="space-y-2">
      <Label>Peças Substituídas</Label>
      <div className="max-h-[200px] overflow-y-auto rounded-md border p-4">
        {parts.map((part) => (
          <div key={part.id} className="flex items-center space-x-2 py-2">
            <Checkbox
              id={`part-${part.id}`}
              checked={selectedParts.includes(part.id)}
              onCheckedChange={() => onPartToggle(part.id)}
            />
            <Label
              htmlFor={`part-${part.id}`}
              className="flex flex-1 items-center justify-between cursor-pointer"
            >
              <span>{part.name}</span>
              <span className="text-xs text-muted-foreground">{part.category}</span>
            </Label>
          </div>
        ))}
      </div>
    </div>
  );
}