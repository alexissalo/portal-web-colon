"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { ChevronLeft, ChevronRight, Heart, ShoppingCart } from "lucide-react"

// 👇 recibe productos como prop, sin datos hardcodeados
export default function ProductCarousel({ productos = [] }) {
  const [currentIndex, setCurrentIndex] = useState(0)
  const [itemsToShow, setItemsToShow] = useState(4)
  const carouselRef = useRef(null)

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) setItemsToShow(1)
      else if (window.innerWidth < 768) setItemsToShow(2)
      else if (window.innerWidth < 1024) setItemsToShow(3)
      else setItemsToShow(4)
    }
    handleResize()
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  const totalSlides = Math.max(productos.length - itemsToShow + 1, 1)

  const nextSlide = () =>
    setCurrentIndex((prev) => (prev + 1 >= totalSlides ? 0 : prev + 1))

  const prevSlide = () =>
    setCurrentIndex((prev) => (prev - 1 < 0 ? totalSlides - 1 : prev - 1))

  const addToCart = (e, productId) => {
    e.preventDefault()
    console.log(`Producto ${productId} agregado al carrito`)
  }

  const addToFavorites = (e, productId) => {
    e.preventDefault()
    console.log(`Producto ${productId} agregado a favoritos`)
  }

  // 👇 estado vacío si no hay productos
  if (productos.length === 0) {
    return (
      <div className="text-center py-12 text-gray-400">
        <ShoppingCart className="h-12 w-12 mx-auto mb-2" />
        <p>No hay productos disponibles.</p>
      </div>
    )
  }

  return (
    <div className="relative group">
      <div className="overflow-hidden" ref={carouselRef}>
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{ transform: `translateX(-${currentIndex * (100 / itemsToShow)}%)` }}
        >
          {productos.map((producto) => (
            <div
              key={producto.id}
              className="flex-none px-2"
              style={{ width: `${100 / itemsToShow}%` }}
            >
              {/* 👇 usa producto.slug generado en el wrapper */}
              <Link href={`/tienda/producto/${producto.slug}`} className="block group">
                <div className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow">
                  <div className="relative aspect-square">
                    <Image
                      src={producto.imagen}
                      alt={producto.nombre}
                      fill
                      className="object-cover transition-transform group-hover:scale-105"
                    />
                    {producto.nuevo && (
                      <div className="absolute top-2 left-2 bg-red-600 text-white text-xs font-bold px-2 py-1 rounded">
                        NUEVO
                      </div>
                    )}
                  </div>
                  <div className="p-4">
                    <h3 className="font-bold text-lg mb-1 group-hover:text-red-600 transition-colors line-clamp-2">
                      {producto.nombre}
                    </h3>
                    <p className="text-gray-600 text-sm mb-2">{producto.categoria}</p>
                    <p className="text-gray-600 mb-3">${Number(producto.precio).toFixed(2)}</p>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>

      <button
        onClick={prevSlide}
        className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 bg-white text-red-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10"
        aria-label="Anterior"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 bg-white text-red-600 p-2 rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition-all z-10"
        aria-label="Siguiente"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      <div className="flex justify-center mt-4">
        {Array.from({ length: totalSlides }).map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentIndex(index)}
            className={`h-2 w-2 rounded-full mx-1 transition-colors ${
              currentIndex === index ? "bg-red-600" : "bg-gray-300"
            }`}
            aria-label={`Ir a slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  )
}