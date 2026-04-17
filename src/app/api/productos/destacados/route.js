import { NextResponse } from "next/server"
import pool from "../../../../lib/db"

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url)
    const limit = Number.parseInt(searchParams.get("limit") || "8")

    // Obtener productos destacados (los más recientes o con más stock)
    const [productos] = await pool.query(
      `
      SELECT 
        p.id_producto,
        p.nombre,
        p.precio,
        c.nombre as categoria_nombre,
        GROUP_CONCAT(DISTINCT i.ruta_imagen ORDER BY i.id_imagen) as imagen_principal,
        SUM(sp.cantidad) as stock_total,
        p.fecha_creacion
      FROM productos p
      LEFT JOIN categorias_productos c ON p.id_categoria = c.id_categoria
      LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto
      LEFT JOIN stock_productos sp ON p.id_producto = sp.id_producto
      GROUP BY p.id_producto
      HAVING stock_total > 0
      ORDER BY p.fecha_creacion DESC, stock_total DESC
      LIMIT ?
    `,
      [limit],
    )

    const processedProductos = productos.map((producto) => ({
      ...producto,
      imagen_principal: producto.imagen_principal || "/placeholder.svg",
      nuevo: new Date(producto.fecha_creacion) > new Date(Date.now() - 30 * 24 * 60 * 60 * 1000), // Nuevo si tiene menos de 30 días
    }))

    return NextResponse.json({ productos: processedProductos })
  } catch (error) {
    console.error("Error al obtener productos destacados:", error)
    return NextResponse.json({ error: "Error al obtener los productos destacados" }, { status: 500 })
  }
}
