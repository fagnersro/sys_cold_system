"use client";

import { useState, useCallback } from "react";
import { Maintenance } from "@/@types/maintenance";

export function useMaintenance() {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);
  const [selectedMaintenance, setSelectedMaintenance] = useState<Maintenance | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [activeTab, setActiveTab] = useState("all");
  const [selectedParts, setSelectedParts] = useState<string[]>([]);

  const handleAddNew = useCallback(() => {
    setSelectedMaintenance(null);
    setSelectedParts([]);
    setIsDialogOpen(true);
  }, []);

  const handleEdit = useCallback((maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setSelectedParts(maintenance.parts);
    setIsDialogOpen(true);
  }, []);

  const handleDeleteConfirm = useCallback((maintenance: Maintenance) => {
    setSelectedMaintenance(maintenance);
    setIsDeleteDialogOpen(true);
  }, []);

  const handlePartToggle = useCallback((partId: string) => {
    setSelectedParts((prev) =>
      prev.includes(partId) ? prev.filter((id) => id !== partId) : [...prev, partId]
    );
  }, []);

  return {
    isDialogOpen,
    isDeleteDialogOpen,
    selectedMaintenance,
    searchQuery,
    activeTab,
    selectedParts,
    setIsDialogOpen,
    setIsDeleteDialogOpen,
    setSearchQuery,
    setActiveTab,
    handleAddNew,
    handleEdit,
    handleDeleteConfirm,
    handlePartToggle,
  };
}