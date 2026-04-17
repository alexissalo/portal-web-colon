// src/app/api/productos/favoritos/route.js
import { NextResponse } from "next/server"
import pool from "@/src/lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const idsParam = searchParams.get("ids")

    if (!idsParam) {
      return NextResponse.json({ productos: [] })
    }

    // Validar que sean números para evitar SQL injection
    const ids = idsParam
      .split(",")
      .map(Number)
      .filter((id) => !isNaN(id) && id > 0)

    if (ids.length === 0) {
      return NextResponse.json({ productos: [] })
    }

    // Placeholders dinámicos: ?, ?, ?
    const placeholders = ids.map(() => "?").join(",")

    const [productos] = await pool.query(
      `SELECT 
        p.id_producto,
        p.nombre,
        p.precio,
        c.nombre as categoria_nombre,
        GROUP_CONCAT(DISTINCT i.ruta_imagen ORDER BY i.id_imagen) as imagen_principal,
        SUM(sp.cantidad) as stock_total
      FROM productos p
      LEFT JOIN categorias_productos c ON p.id_categoria = c.id_categoria
      LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto
      LEFT JOIN stock_productos sp ON p.id_producto = sp.id_producto
      WHERE p.id_producto IN (${placeholders})
      GROUP BY p.id_producto`,
      ids,
    )

    const procesados = productos.map((p) => ({
      ...p,
      imagen_principal: p.imagen_principal
        ? p.imagen_principal.split(",")[0]  // solo la primera imagen
        : "/placeholder.svg",
      tiene_stock: (p.stock_total || 0) > 0,
    }))

    return NextResponse.json({ productos: procesados })
  } catch (error) {
    console.error("Error al obtener favoritos:", error)
    return NextResponse.json({ error: "Error al obtener favoritos" }, { status: 500 })
  }
}