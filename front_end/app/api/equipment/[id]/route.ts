import { NextResponse } from "next/server"
import { db } from "@/lib/db" // ou qualquer ORM que esteja usando

export async function DELETE(req: Request, { params }: { params: { id: string } }) {
  try {
    const id = params.id

    await db.equipment.delete({
      where: { id },
    })

    return NextResponse.json({ success: true }, { status: 200 })
  } catch (error) {
    console.error(error)
    return NextResponse.json({ error: "Erro ao excluir equipamento" }, { status: 500 })
  }
}
