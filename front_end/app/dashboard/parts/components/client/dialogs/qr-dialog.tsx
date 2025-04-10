"use client";

import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { QrCode } from "lucide-react";

interface QRDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  itemId: string;
  itemName: string;
}

export function QRDialog({ open, onOpenChange, itemId, itemName }: QRDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[400px]">
        <DialogHeader>
          <DialogTitle>QR Code</DialogTitle>
          <DialogDescription>
            Código para identificação rápida do item
          </DialogDescription>
        </DialogHeader>

        <div className="flex flex-col items-center py-4 gap-4">
          <div className="bg-white p-4 rounded-lg border">
            <div className="h-48 w-48 bg-gray-100 flex items-center justify-center">
              <QrCode className="h-24 w-24 text-gray-400" />
            </div>
          </div>
          <div className="text-center">
            <p className="font-medium">{itemId}</p>
            <p className="text-sm text-muted-foreground">{itemName}</p>
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={() => onOpenChange(false)}>
            Fechar
          </Button>
          <Button onClick={() => window.print()}>
            Imprimir QR Code
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}