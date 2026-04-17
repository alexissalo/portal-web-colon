import { NextResponse } from "next/server"
import pool from "../../../../lib/db"

export async function GET(request) {
  try {
    // Obtener las noticias más recientes como destacadas
    const [noticias] = await pool.query(`
      SELECT 
        n.id_noticia, 
        n.titulo, 
        n.subtitulo, 
        n.imagen_principal, 
        n.fecha_publicacion,
        n.tags,
        c.nombre as categoria_nombre
      FROM noticias n
      LEFT JOIN categorias_noticias c ON n.id_categoria = c.id_categoria
      ORDER BY n.fecha_publicacion DESC
      LIMIT 5
    `)

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

    return NextResponse.json({ noticias: processedNoticias })
  } catch (error) {
    console.error("Error al obtener noticias destacadas:", error)
    return NextResponse.json({ error: "Error al obtener las noticias destacadas" }, { status: 500 })
  }
}

