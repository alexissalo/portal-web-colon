import Image from "next/image"
import Link from "next/link"
import { buildNoticiaSlug } from "@/src/lib/slugify"

export default function UltimasNoticias({ noticias = [] }) {
  // Si no hay noticias, mostrar un mensaje
  if (noticias.length === 0) {
    return (
      <section className="py-8">
        <h2 className="text-2xl font-bold text-center mb-8">Últimas noticias</h2>
        <div className="text-center py-12 bg-white rounded-lg shadow-md">
          <p className="text-gray-600">No hay noticias disponibles en este momento.</p>
        </div>
      </section>
    )
  }

  // Formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Últimas noticias</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {noticias.map((noticia) => (
          <div key={noticia.id_noticia} className="bg-white rounded-lg overflow-hidden shadow-md">
            <Link href={`/noticias/${buildNoticiaSlug(noticia.id_noticia, noticia.titulo)}`}>
              <div className="relative aspect-[4/3]">
                <Image
                  src={noticia.imagen_principal || "/placeholder.svg"}
                  alt={noticia.titulo}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-4">
                <h3 className="font-bold text-lg mb-2">{noticia.titulo}</h3>
                <p className="text-gray-600 text-sm mb-3 line-clamp-2">{noticia.subtitulo}</p>
                <div className="flex justify-between items-center">
                  <span className="text-xs text-gray-500">{formatDate(noticia.fecha_publicacion)}</span>
                  {/* {noticia.categoria_nombre && (
                    <div variant="secondary" className="bg-blue-100 text-blue-900">
                       {noticia.categoria_nombre}
                    </div>
                  )} */}
                </div>
                {noticia.tags && noticia.tags.length > 0 && (
                  <div className="mt-2 flex flex-wrap gap-1">
                    {noticia.tags.map((tag, index) => (
                      <div key={index} variant="outline" className="inline-block px-2 py-1 text-xs font-semibold rounded-full bg-red-100 text-red-800">
                        {tag}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </Link>
          </div>
        ))}
      </div>
    </section>
  )
}

