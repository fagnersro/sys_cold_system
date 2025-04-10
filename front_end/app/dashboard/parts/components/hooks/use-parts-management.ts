"use client";

import { useState, useMemo } from "react";
import { Part, Equipment } from "@/app/dashboard/parts/types/inventory";

export function usePartsManagement(initialParts: Part[]) {
  const [parts, setParts] = useState<Part[]>(initialParts);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedPart, setSelectedPart] = useState<Part | null>(null);

  const filteredParts = useMemo(() => {
    return parts.filter(part => {
      // Filtro por busca (ID, nome ou categoria)
      const matchesSearch = 
        part.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        part.category.toLowerCase().includes(searchQuery.toLowerCase());

      // Filtro por categoria (ou 'all' para mostrar todas)
      const matchesCategory = 
        activeTab === "all" || 
        part.category.toLowerCase() === activeTab.toLowerCase();

      return matchesSearch && matchesCategory;
    });
  }, [parts, searchQuery, activeTab]);

  // Partes com estoque baixo
  const lowStockParts = useMemo(() => {
    return parts.filter(part => part.stock <= part.minLevel);
  }, [parts]);

  // Histórico de uso para uma peça específica
  const getPartUsageHistory = (partId: string) => {
    // Esta função seria implementada com os dados de histórico
    return [];
  };

  // Classificação do status do estoque
  const getStockStatusClass = (stock: number, minLevel: number) => {
    if (stock === 0) return "bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400";
    if (stock <= minLevel) return "bg-yellow-100 text-yellow-700 dark:bg-yellow-900/30 dark:text-yellow-400";
    return "bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400";
  };

  return {
    parts,
    filteredParts,
    lowStockParts,
    searchQuery,
    setSearchQuery,
    activeTab,
    setActiveTab,
    selectedPart,
    setSelectedPart,
    getPartUsageHistory,
    getStockStatusClass,
    // Handlers para operações CRUD
    addPart: (newPart: Omit<Part, 'id'>) => {
      const id = `P${(parts.length + 1).toString().padStart(3, '0')}`;
      setParts([...parts, { ...newPart, id }]);
    },
    updatePart: (updatedPart: Part) => {
      setParts(parts.map(p => p.id === updatedPart.id ? updatedPart : p));
    },
    deletePart: (partId: string) => {
      setParts(parts.filter(p => p.id !== partId));
    }
  };
}