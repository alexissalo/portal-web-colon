"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight } from "lucide-react"

const bannerSlides = [
  {
    id: 1,
    image: "/imagenes/banner1.jpeg",
    title: "Bienvenidos al Club Social y Deportivo Colon de Chivilcoy",
    subtitle: "Más de 90 años de pasión y gloria",
    buttonText: "Conoce nuestra historia",
    buttonLink: "/el-club/historia",
  },
  {
    id: 2,
    image: "/imagenes/banner3.jpeg",
    title: "Tienda Oficial",
    subtitle: "Los mejores productos con los colores del club",
    buttonText: "Visitar tienda",
    buttonLink: "/tienda",
  },
  {
    id: 3,
    image: "/imagenes/banner4.jpeg",
    title: "Academia de Deportes",
    subtitle: "Formamos los campeones del mañana",
    buttonText: "Más información",
    buttonLink: "/registro-deportista",
  },
]

export default function HeroBanner() {
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isAnimating, setIsAnimating] = useState(false)

  useEffect(() => {
    const timer = setInterval(() => {
      handleNextSlide()
    }, 5000)

    return () => clearInterval(timer)
  }, [currentSlide])

  const handleNextSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev + 1) % bannerSlides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const handlePrevSlide = () => {
    if (isAnimating) return
    setIsAnimating(true)
    setCurrentSlide((prev) => (prev - 1 + bannerSlides.length) % bannerSlides.length)
    setTimeout(() => setIsAnimating(false), 500)
  }

  const goToSlide = (index) => {
    if (isAnimating || index === currentSlide) return
    setIsAnimating(true)
    setCurrentSlide(index)
    setTimeout(() => setIsAnimating(false), 500)
  }

  return (
    <section className="relative h-[500px] md:h-[600px] lg:h-[700px] overflow-hidden">
      {/* Slides */}
      {bannerSlides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-all duration-700 ease-in-out ${
            index === currentSlide
              ? "opacity-100 scale-100 z-10"
              : "opacity-0 scale-105 z-0"
          }`}
        >
          {/* Background Image */}
          <div className="absolute inset-0">
            <Image
              src={slide.image || "/placeholder.svg"}
              alt={slide.title}
              fill
              className="object-cover"
              priority={index === 0}
            />
            {/* Overlay gradiente */}
            <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/50 to-transparent" />
          </div>

          {/* Content */}
          <div className="relative h-full container mx-auto px-4 flex items-center">
            <div
              className={`max-w-2xl text-white transition-all duration-700 delay-200 ${
                index === currentSlide
                  ? "translate-x-0 opacity-100"
                  : "-translate-x-10 opacity-0"
              }`}
            >
              <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
                {slide.title}
              </h1>
              <p className="text-xl md:text-2xl mb-8 text-gray-200">
                {slide.subtitle}
              </p>
              <Link
                href={slide.buttonLink}
                className="inline-block bg-red-600 text-white px-8 py-4 rounded-full text-lg font-bold hover:bg-red-700 transition-all duration-300 hover:scale-105 shadow-lg"
              >
                {slide.buttonText}
              </Link>
            </div>
          </div>
        </div>
      ))}

      {/* Navigation Arrows */}
      <button
        onClick={handlePrevSlide}
        className="absolute left-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        aria-label="Slide anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={handleNextSlide}
        className="absolute right-4 top-1/2 -translate-y-1/2 z-20 bg-white/20 hover:bg-white/40 text-white p-3 rounded-full backdrop-blur-sm transition-all duration-300 hover:scale-110"
        aria-label="Siguiente slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Dots Indicators */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex space-x-3">
        {bannerSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`transition-all duration-300 ${
              index === currentSlide
                ? "w-10 h-3 bg-red-600 rounded-full"
                : "w-3 h-3 bg-white/50 hover:bg-white/80 rounded-full"
            }`}
            aria-label={`Ir al slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Progress Bar */}
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-white/20 z-20">
        <div
          className="h-full bg-red-600 transition-all duration-300"
          style={{
            width: `${((currentSlide + 1) / bannerSlides.length) * 100}%`,
          }}
        />
      </div>
    </section>
  )
}
