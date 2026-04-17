import { NextResponse } from "next/server"
import pool from "../../../../lib/db"
import { extractIdFromSlug } from "../../../../lib/slugify"  // 👈

export async function GET(request, { params }) {
  try {
    const slug = params?.slug
    const id = extractIdFromSlug(slug)  // 👈 único cambio

    // Obtener el producto con sus detalles
    const [productos] = await pool.query(
      `
      SELECT 
        p.id_producto,
        p.nombre,
        p.descripcion,
        p.precio,
        p.fecha_creacion,
        c.nombre as categoria_nombre,
        c.id_categoria,
        GROUP_CONCAT(DISTINCT i.ruta_imagen) as imagenes
      FROM productos p
      LEFT JOIN categorias_productos c ON p.id_categoria = c.id_categoria
      LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto
      WHERE p.id_producto = ?
      GROUP BY p.id_producto
    `,
      [id],
    )

    if (productos.length === 0) {
      return NextResponse.json({ error: "Producto no encontrado" }, { status: 404 })
    }

    const producto = productos[0]

    // Obtener el stock por talles
    const [stock] = await pool.query(
      `
      SELECT 
        sp.cantidad,
        t.id_talle,
        t.nombre as talle_nombre,
        t.descripcion as talle_descripcion
      FROM stock_productos sp
      JOIN talles_productos t ON sp.id_talle = t.id_talle
      WHERE sp.id_producto = ?
      ORDER BY t.nombre
    `,
      [id],
    )

    // Obtener productos relacionados (misma categoría)
    const [relacionados] = await pool.query(
      `
      SELECT 
        p.id_producto,
        p.nombre,
        p.precio,
        GROUP_CONCAT(DISTINCT i.ruta_imagen ORDER BY i.id_imagen) as imagen_principal
      FROM productos p
      LEFT JOIN imagenes_productos i ON p.id_producto = i.id_producto
      WHERE p.id_categoria = ? AND p.id_producto != ?
      GROUP BY p.id_producto
      ORDER BY RAND()
      LIMIT 4
    `,
      [producto.id_categoria, id],
    )

    // Procesar los datos
    const productoCompleto = {
      ...producto,
      imagenes: producto.imagenes ? producto.imagenes.split(",") : [],
      stock: stock,
      stock_total: stock.reduce((total, item) => total + item.cantidad, 0),
      tiene_stock: stock.some((item) => item.cantidad > 0),
    }

    const relacionadosProcesados = relacionados.map((rel) => ({
      ...rel,
      imagen_principal: rel.imagen_principal || "/placeholder.svg",
    }))

    return NextResponse.json({
      producto: productoCompleto,
      relacionados: relacionadosProcesados,
    })
  } catch (error) {
    console.error("Error al obtener el producto:", error)
    return NextResponse.json({ error: "Error al obtener el producto" }, { status: 500 })
  }
}


