import { NextResponse } from "next/server"
import pool from "../../../lib/db"

export async function GET(request) {
  try {
    // Obtener parámetros de consulta
    const { searchParams } = new URL(request.url)
    const categoria = searchParams.get("categoria")
    const limit = Number.parseInt(searchParams.get("limit") || "10")
    const page = Number.parseInt(searchParams.get("page") || "1")
    const offset = (page - 1) * limit

    // Construir la consulta SQL base
    let query = `
      SELECT 
        n.id_noticia, 
        n.titulo, 
        n.subtitulo, 
        n.contenido, 
        n.imagen_principal, 
        n.fecha_publicacion, 
        n.tags,
        c.nombre as categoria_nombre
      FROM noticias n
      LEFT JOIN categorias_noticias c ON n.id_categoria = c.id_categoria
    `

    const queryParams = []

    // Añadir filtro por categoría si se proporciona
    if (categoria) {
      query += ` WHERE c.nombre = ?`
      queryParams.push(categoria)
    }

    // Añadir ordenamiento y paginación
    query += ` ORDER BY n.fecha_publicacion DESC LIMIT ? OFFSET ?`
    queryParams.push(limit, offset)

    // Ejecutar la consulta
    const [noticias] = await pool.query(query, queryParams)

    // Procesar los tags JSON - manejar diferentes formatos posibles
    const processedNoticias = noticias.map((noticia) => {
      let tags = []
      if (noticia.tags) {
        // Si ya es un array, usarlo directamente
        if (Array.isArray(noticia.tags)) {
          tags = noticia.tags
        } else {
          try {
            // Intentar parsear como JSON
            tags = JSON.parse(noticia.tags)
          } catch (e) {
            // Si falla, verificar si es una cadena separada por comas
            if (typeof noticia.tags === "string") {
              tags = noticia.tags.split(",").map((tag) => tag.trim())
            }
          }
        }
      }

      return {
        ...noticia,
        tags: tags,
      }
    })

    // Obtener el total de noticias para la paginación
    let countQuery = `
      SELECT COUNT(*) as total 
      FROM noticias n
      LEFT JOIN categorias_noticias c ON n.id_categoria = c.id_categoria
    `

    if (categoria) {
      countQuery += ` WHERE c.nombre = ?`
    }

    const [totalResult] = await pool.query(countQuery, categoria ? [categoria] : [])
    const total = totalResult[0].total

    return NextResponse.json({
      noticias: processedNoticias,
      pagination: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    })
  } catch (error) {
    console.error("Error al obtener noticias:", error)
    return NextResponse.json({ error: "Error al obtener las noticias" }, { status: 500 })
  }
}

