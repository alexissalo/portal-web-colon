import Link from 'next/link'
import Image from 'next/image'
import { buildNoticiaSlug } from '@/src/lib/slugify'

async function getUltimasNoticias() {
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || "http://localhost:4000"
  const res = await fetch(`${baseUrl}/api/noticias?limit=3`, {
    next: { revalidate: 3600 }
  })

  if (!res.ok) return []

  const data = await res.json()
  return data.noticias ?? data ?? []
}

export default async function NewsSection() {
  const noticias = await getUltimasNoticias()

  return (
    <section>
      <h2 className="text-2xl font-bold mb-4">Últimas Noticias</h2>
      <div className="space-y-4">
        {noticias.map((noticia) => (
          <div key={noticia.id_noticia} className="flex space-x-4 border-b pb-4">
            <Image
              src={noticia.imagen_principal || "/placeholder.svg"}
              alt={noticia.titulo}
              width={100}
              height={100}
              className="object-cover rounded"
            />
            <div>
              <h3 className="font-semibold">{noticia.titulo}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{noticia.subtitulo}</p>
              <Link
                href={`/noticias/${buildNoticiaSlug(noticia.id_noticia, noticia.titulo)}`}
                className="text-red-600 hover:underline text-sm"
              >
                Leer más
              </Link>
            </div>
          </div>
        ))}
      </div>
    </section>
  )
}