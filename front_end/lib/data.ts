//EQUIPAMENT

export async function getStoresWithEquipments() {
  const stores = [
    { id: "S001", name: "Downtown Supermarket" },
    { id: "S002", name: "Westside Grocery" },
    { id: "S003", name: "Harbor Fresh Market" },
  ]

  const equipmentData = [
    {
          id: "RF-001",
          model: "CoolMaster X500",
          serialNumber: "CM-X500-12345",
          storeId: "S001",
          status: "Operational",
          installationDate: "2022-03-15",
          lastMaintenance: "2023-04-28",
        },
        {
          id: "RF-002",
          model: "FrostKing 2000",
          serialNumber: "FK-2000-67890",
          storeId: "S001",
          status: "Maintenance Required",
          installationDate: "2021-11-10",
          lastMaintenance: "2023-03-12",
        },
        {
          id: "RF-003",
          model: "CoolMaster X700",
          serialNumber: "CM-X700-54321",
          storeId: "S002",
          status: "Operational",
          installationDate: "2022-06-22",
          lastMaintenance: "2023-05-02",
        },
        {
          id: "RF-004",
          model: "ArcticPro 1500",
          serialNumber: "AP-1500-13579",
          storeId: "S002",
          status: "Critical Alert",
          installationDate: "2020-08-05",
          lastMaintenance: "2023-04-15",
        },
        {
          id: "RF-005",
          model: "FrostKing 3000",
          serialNumber: "FK-3000-24680",
          storeId: "S003",
          status: "Operational",
          installationDate: "2023-01-20",
          lastMaintenance: "2023-05-01",
        },
  ]

  const equipmentByStore = stores.map((store) => ({
    ...store,
    equipment: equipmentData.filter((e) => e.storeId === store.id),
  }))

  return equipmentByStore
}
