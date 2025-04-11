"use client";

import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { File, FileSpreadsheet, ImageIcon } from "lucide-react";
import { exportReport } from "../../actions";

export function ReportExporter() {
  const handleExport = async (format: "pdf" | "csv" | "png") => {
    const result = await exportReport(format, `report_${Date.now()}`);
    if (result.success) {
      console.log(`Export successful: ${result.url}`);
      // Em produção, poderia iniciar o download aqui
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Opções de Exportação</CardTitle>
        <CardDescription>Baixe os dados do relatório em vários formatos</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="flex flex-wrap gap-4">
          <Button variant="outline" className="gap-2" onClick={() => handleExport("pdf")}>
            <File className="h-4 w-4" />
            <span>Exportar como PDF</span>
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => handleExport("csv")}>
            <FileSpreadsheet className="h-4 w-4" />
            <span>Exportar como CSV</span>
          </Button>
          <Button variant="outline" className="gap-2" onClick={() => handleExport("png")}>
            <ImageIcon className="h-4 w-4" />
            <span>Exportar gráficos como PNG</span>
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}