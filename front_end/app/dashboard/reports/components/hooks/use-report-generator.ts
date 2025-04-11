import { useState } from "react";
import { stores } from "../../data/mock-stores";
import { ReportType, TimePeriod } from "../../types/report-types";
import { generateReport } from "../../actions";

export function useReportGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [selectedPeriod, setSelectedPeriod] = useState<TimePeriod>("month");
  const [selectedReportType, setSelectedReportType] = useState<ReportType>("maintenance");
  const [selectedStores, setSelectedStores] = useState<string[]>(stores.map((store) => store.id));

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const result = await generateReport(selectedReportType, selectedPeriod, selectedStores);
      console.log("Report generated:", result);
    } catch (error) {
      console.error("Error generating report:", error);
    } finally {
      setIsGenerating(false);
    }
  };

  const handleStoreToggle = (storeId: string) => {
    setSelectedStores((prev) =>
      prev.includes(storeId) ? prev.filter((id) => id !== storeId) : [...prev, storeId]
    );
  };

  // Adicione estas funções específicas para lidar com os tipos
  const handleReportTypeChange = (value: string) => {
    setSelectedReportType(value as ReportType);
  };

  const handlePeriodChange = (value: string) => {
    setSelectedPeriod(value as TimePeriod);
  };

  return {
    isGenerating,
    selectedPeriod,
    selectedReportType,
    selectedStores,
    handlePeriodChange, // Exporte as novas funções
    handleReportTypeChange,
    handleGenerateReport,
    handleStoreToggle,
  };
}