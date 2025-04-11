"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { SummaryMetrics } from "../shared/summary-metrics";
import { CostAnalysis } from "./cost-analysis";
import { FailureAnalysis } from "./failure-analysis";

export function ReportDashboard() {
  return (
    <Tabs defaultValue="overview">
      <TabsList className="mb-4">
        <TabsTrigger value="overview">Visão Geral</TabsTrigger>
        <TabsTrigger value="costs">Custos</TabsTrigger>
        <TabsTrigger value="failures">Falhas</TabsTrigger>
      </TabsList>

      <TabsContent value="overview" className="space-y-4">
        <SummaryMetrics />
      </TabsContent>

      <TabsContent value="costs" className="space-y-4">
        <CostAnalysis />
      </TabsContent>

      <TabsContent value="failures" className="space-y-4">
        <FailureAnalysis />
      </TabsContent>
    </Tabs>
  );
}