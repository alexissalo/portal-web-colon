"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const noticias = [
  {
    id: 1,
    slug: "colon-cerro-el-anio-de-manera-contundente",
    titulo: "Colon cerró el año de manera contundente",
    descripcion: "Le ganó 2-0 a Gimnasia en su cancha.",
    imagen:
      "/logo_colon_sin_fondo.png",
  },
  // Más noticias destacadas aquí
]

export default function NoticiaDestacada() {
  const [currentIndex, setCurrentIndex] = useState(0)

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev + 1) % noticias.length)
  }

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev - 1 + noticias.length) % noticias.length)
  }

  return (
    <div className="relative mb-12 group">
      <Link href={`/noticias/${noticias[currentIndex].slug}`} className="block">
        <div className="grid grid-cols-1 md:grid-cols-12 bg-white rounded-lg overflow-hidden">
          <div className="md:col-span-8 relative aspect-[16/9]">
            <Image
              src={noticias[currentIndex].imagen || "/placeholder.svg"}
              alt={noticias[currentIndex].titulo}
              fill
              className="object-cover"
            />
          </div>
          <div className="md:col-span-4 bg-red-600 text-white p-8 flex flex-col justify-center">
            <h2 className="text-2xl font-bold mb-4">{noticias[currentIndex].titulo}</h2>
            <p className="text-gray-200">{noticias[currentIndex].descripcion}</p>
          </div>
        </div>
      </Link>

      <button
        onClick={(e) => {
          e.preventDefault()
          prevSlide()
        }}
        className="absolute left-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Noticia anterior"
      >
        <ChevronLeft className="w-6 h-6 text-red-600" />
      </button>
      <button
        onClick={(e) => {
          e.preventDefault()
          nextSlide()
        }}
        className="absolute right-4 top-1/2 -translate-y-1/2 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center shadow-lg transition-opacity opacity-0 group-hover:opacity-100"
        aria-label="Siguiente noticia"
      >
        <ChevronRight className="w-6 h-6 text-red-600" />
      </button>
    </div>
  )
}

