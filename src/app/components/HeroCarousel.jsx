'use client'

import { useState } from 'react'
import Image from 'next/image'

const news = [
  { id: 1, title: "Victoria en el clásico", image: "/instalaciones/estadio1.jpg" },
  { id: 2, title: "Nuevo fichaje estrella", image: "/logo_colon_sin_fondo.png" },
  { id: 3, title: "Próximo partido crucial", image: "/logo_colon_sin_fondo.png" },
]

export default function HeroCarousel() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % news.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + news.length) % news.length)
  }

  return (
    <div className="relative h-96">
      {news.map((item, index) => (
        <div
          key={item.id}
          className={`absolute top-0 left-0 w-full h-full transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image src={item.image || "/placeholder.svg"} alt={item.title} layout="fill" objectFit="cover" />
          <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-50 text-white p-4">
            <h2 className="text-2xl font-bold">{item.title}</h2>
          </div>
        </div>
      ))}
      <button onClick={prevSlide} className="absolute left-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
        &#10094;
      </button>
      <button onClick={nextSlide} className="absolute right-4 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white p-2 rounded-full">
        &#10095;
      </button>
    </div>
  )
}

