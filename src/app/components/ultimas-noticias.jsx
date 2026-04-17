import Image from "next/image"
import Link from "next/link"
import { Badge } from "./ui/badge"

const noticias = [
  {
    id: 1,
    slug: "viaje-delegacion-colon-chacabuco",
    titulo: "Viaje de la delegación de Colon a Chacabuco",
    imagen: "/logo_colon_sin_fondo.png",
    tags: [],
  },
  {
    id: 2,
    slug: "primeras-definiciones-2025",
    titulo: "Primeras definiciones del 2025",
    imagen:
      "/logo_colon_sin_fondo.png",
    tags: ["FUTBOL", "FUTBOL MAS..."],
  },
  {
    id: 3,
    slug: "fixture-2025",
    titulo: "Se establecio fixture del 2025",
    imagen:
      "/logo_colon_sin_fondo.png",
    tags: ["FUTBOL", "FUTBOL MAS..."],
  },
]

export default function UltimasNoticias() {
  return (
    <section className="py-8">
      <h2 className="text-2xl font-bold text-center mb-8">Últimas noticias</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {noticias.map((noticia) => (
          <Link
            key={noticia.id}
            href={`/noticias/${noticia.slug}`}
            className="block bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className="relative aspect-[4/3]">
              <Image src={noticia.imagen || "/placeholder.svg"} alt={noticia.titulo} fill className="object-cover" />
              {noticia.isPromo && (
                <div className="absolute inset-0 flex items-center justify-center bg-yellow-400">
                  <button className="bg-red-600 text-white px-6 py-2 rounded-full font-bold">
                    {noticia.buttonText}
                  </button>
                </div>
              )}
            </div>
            <div className="p-4">
              <h3 className="font-bold text-lg mb-2 group-hover:text-red-600">{noticia.titulo}</h3>
              {noticia.tags && noticia.tags.length > 0 && (
                <div className="flex gap-2 flex-wrap">
                  {noticia.tags.map((tag, index) => (
                    <Badge key={index} variant="secondary" className="bg-red-100 text-red-900">
                      {tag}
                    </Badge>
                  ))}
                </div>
              )}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}

