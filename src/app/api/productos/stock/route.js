import { NextResponse } from "next/server"
import pool from "../../../../lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const id_producto = searchParams.get("id_producto")

    let query = `
      SELECT 
        sp.id_stock,
        sp.id_producto,
        sp.id_talle,
        sp.cantidad,
        t.nombre as talle_nombre,
        t.descripcion as talle_descripcion,
        p.nombre as producto_nombre
      FROM stock_productos sp
      JOIN talles_productos t ON sp.id_talle = t.id_talle
      JOIN productos p ON sp.id_producto = p.id_producto
    `

    const queryParams = []

    if (id_producto) {
      query += " WHERE sp.id_producto = ?"
      queryParams.push(id_producto)
    }

    query += " ORDER BY t.nombre"

    const [stock] = await pool.query(query, queryParams)

    return NextResponse.json({ stock })
  } catch (error) {
    console.error("Error al obtener stock:", error)
    return NextResponse.json({ error: "Error al obtener el stock" }, { status: 500 })
  }
}
