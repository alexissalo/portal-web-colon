"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { buildNoticiaSlug } from "@/src/lib/slugify"

export default function NoticiaDestacada({ noticias = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)

  // Si no hay noticias, mostrar un mensaje o retornar null
  if (noticias.length === 0) {
    return null
  }

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % noticias.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length)
  }

  // Formatear la fecha
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" }
    return new Date(dateString).toLocaleDateString("es-ES", options)
  }

  return (
    <div className="relative mb-12 group">
      <div className="grid grid-cols-1 md:grid-cols-12 bg-white rounded-lg overflow-hidden">
        <div className="md:col-span-8 relative aspect-[16/9]">
          <Image
            src={noticias[currentIndex].imagen_principal || "/placeholder.svg"}
            alt={noticias[currentIndex].titulo}
            fill
            className="object-cover"
          />
        </div>
        <div className="md:col-span-4 bg-red-600 text-white p-8 flex flex-col justify-center">
          <Link href={`/noticias/${buildNoticiaSlug(noticias[currentIndex].id_noticia, noticias[currentIndex].titulo)}`} className="hover:underline">
            <h2 className="text-2xl font-bold mb-4">{noticias[currentIndex].titulo}</h2>
          </Link>
          <p className="text-gray-200 mb-4">{noticias[currentIndex].subtitulo}</p>
          <div className="text-sm text-gray-300">{formatDate(noticias[currentIndex].fecha_publicacion)}</div>
          {noticias[currentIndex].categoria_nombre && (
            <div className="mt-4">
              <span className="bg-black text-white px-2 py-1 text-xs uppercase">
                {noticias[currentIndex].categoria_nombre}
              </span>
            </div>
          )}
        </div>
      </div>

      {/* Botones de navegación */}
      <button
        onClick={prevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Noticia anterior"
      >
        <ChevronLeft className="w-6 h-6 text-black" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Siguiente noticia"
      >
        <ChevronRight className="w-6 h-6 text-black" />
      </button>
    </div>
  )
}

