import { toast } from "@/hooks/use-toast"

export async function deleteEquipment(id: string) {
  // const res = await fetch(`/api/equipments/${id}`, {
  //   method: "DELETE",
  // })

  // if (!res.ok) {
  //   toast({
  //     variant: "destructive",
  //     title: "Erro",
  //     description: "Não foi possível excluir o equipamento.",
  //   })
  //   const error = await res.json()
  //   throw new Error(error?.error || "Erro ao excluir equipamento.")
  // }

  // return true
  async function handleDelete() {
    try {
      // simula exclusão
      await new Promise((res) => setTimeout(res, 1000))

      toast({
        title: "Exclusão realizada",
        description: "Equipamento foi excluído com sucesso.",
      })
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Erro",
        description: "Não foi possível excluir o equipamento.",
      })
    }
  }
  return handleDelete()
}
