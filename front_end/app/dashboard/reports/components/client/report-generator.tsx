"use client";

import { useReportGenerator } from "../hooks/use-report-generator";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion";
import { Checkbox } from "@/components/ui/checkbox";
import { Input } from "@/components/ui/input";
import { Loader2, FileText } from "lucide-react";
import { stores } from "../../data/mock-stores";

export function ReportGenerator() {
  const {
    selectedReportType,
    selectedPeriod,
    selectedStores,
    isGenerating,
    handleReportTypeChange,
    handlePeriodChange,
    handleStoreToggle,
    handleGenerateReport
  } = useReportGenerator();

  return (
    <div className="space-y-4 p-4">
      <div className="space-y-2">
        <Label htmlFor="report-type">Tipo de relatório</Label>
        <Select 
          value={selectedReportType}
          onValueChange={handleReportTypeChange}
        >
          <SelectTrigger id="report-type">
            <SelectValue placeholder="Select report type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="maintenance">Relatório de Manutenção</SelectItem>
            <SelectItem value="parts">Relatório de uso de Peças</SelectItem>
            <SelectItem value="costs">Relatório de Análise de Custos</SelectItem>
            <SelectItem value="equipment">Relatório de Status do Equipamento</SelectItem>
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="period">Período de Tempo</Label>
        <Select 
          value={selectedPeriod}
          onValueChange={handlePeriodChange}
        >
          <SelectTrigger id="period">
            <SelectValue placeholder="Selecione o período de tempo" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value="week">Semana Passada</SelectItem>
            <SelectItem value="month">Mês Passado</SelectItem>
            <SelectItem value="quarter">Último Trimestre</SelectItem>
            <SelectItem value="year">Ano Passado</SelectItem>
            <SelectItem value="custom">Faixa Personalizada</SelectItem>
          </SelectContent>
        </Select>
      </div>

      {selectedPeriod === "custom" && (
        <div className="grid grid-cols-2 gap-2">
          <div className="space-y-2">
            <Label htmlFor="start-date">Data de Início</Label>
            <Input id="start-date" type="date" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="end-date">Data de Término</Label>
            <Input id="end-date" type="date" />
          </div>
        </div>
      )}

      <Accordion type="multiple" className="w-full">
        {/* AccordionItem para Seleção de Lojas */}
        <AccordionItem value="stores">
          <AccordionTrigger className="text-sm font-medium">
            Selecionar Lojas
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              {stores.map((store) => (
                <div key={store.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={`store-${store.id}`}
                    checked={selectedStores.includes(store.id)}
                    onCheckedChange={() => handleStoreToggle(store.id)}
                  />
                  <Label htmlFor={`store-${store.id}`} className="text-sm cursor-pointer">
                    {store.name}
                  </Label>
                </div>
              ))}
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* AccordionItem para Filtros Avançados */}
        <AccordionItem value="advanced">
          <AccordionTrigger className="text-sm font-medium">
            Filtros Avançados
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="maintenance-type">Tipo de Manutenção</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="maintenance-type">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Tipos</SelectItem>
                    <SelectItem value="preventive">Preventivo</SelectItem>
                    <SelectItem value="corrective">Corretivo</SelectItem>
                    <SelectItem value="emergency">Emergência</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="technician">Técnico (a)</Label>
                <Select defaultValue="all">
                  <SelectTrigger id="technician">
                    <SelectValue placeholder="Select technician" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="all">Todos os Técnicos</SelectItem>
                    <SelectItem value="john">John Smith</SelectItem>
                    <SelectItem value="maria">Maria Garcia</SelectItem>
                    <SelectItem value="robert">Robert Chen</SelectItem>
                    <SelectItem value="sarah">Sarah Johnson</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <div className="flex items-center space-x-2">
                  <Checkbox id="include-costs" />
                  <Label htmlFor="include-costs" className="text-sm">
                    Incluir análise de custos
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="include-parts" />
                  <Label htmlFor="include-parts" className="text-sm">
                    Incluir detalhes das peças
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox id="include-equipment" />
                  <Label htmlFor="include-equipment" className="text-sm">
                    Incluir status do equipamento
                  </Label>
                </div>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>

        {/* AccordionItem para Opções de Exportação */}
        <AccordionItem value="export">
          <AccordionTrigger className="text-sm font-medium">
            Opções de Exportação
          </AccordionTrigger>
          <AccordionContent>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <Checkbox id="export-charts" />
                <Label htmlFor="export-charts" className="text-sm">
                  Incluir gráficos no relatório
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="export-summary" defaultChecked />
                <Label htmlFor="export-summary" className="text-sm">
                  Incluir resumo executivo
                </Label>
              </div>

              <div className="flex items-center space-x-2">
                <Checkbox id="export-details" defaultChecked />
                <Label htmlFor="export-details" className="text-sm">
                  Incluir detalhes completos
                </Label>
              </div>
            </div>
          </AccordionContent>
        </AccordionItem>
      </Accordion>

      <Button 
        onClick={handleGenerateReport} 
        className="w-full" 
        disabled={isGenerating}
      >
        {isGenerating ? (
          <>
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            Gerando...
          </>
        ) : (
          <>
            <FileText className="mr-2 h-4 w-4" />
            Gerar Relatório
          </>
        )}
      </Button>
    </div>
  );
}