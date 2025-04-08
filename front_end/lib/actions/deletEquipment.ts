export async function deleteEquipment(id: string) {
  const res = await fetch(`/api/equipments/${id}`, {
    method: "DELETE",
  })

  if (!res.ok) {
    const error = await res.json()
    throw new Error(error?.error || "Erro ao excluir equipamento.")
  }

  return true
}
