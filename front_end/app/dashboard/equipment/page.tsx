import { RefrigerationDashboardLayout } from "@/components/refrigeration/dashboard-layout"
import { EquipmentAccordion } from "@/components/refrigeration/equipment-accordion"
import { getStoresWithEquipments } from "@/lib/data"

export default async function EquipmentPage() {
  const storesWithEquipments = await getStoresWithEquipments()

  return (
    <RefrigerationDashboardLayout>
      <EquipmentAccordion stores={storesWithEquipments} />
    </RefrigerationDashboardLayout>
  )
}
